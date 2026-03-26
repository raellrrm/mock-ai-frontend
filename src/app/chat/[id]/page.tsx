// 📁 Camiho: src/app/chat/[id]/page.tsx
'use client';

import { useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '@/store/store';
import { Loader2 } from 'lucide-react';

import Sidebar from '@/components/chat/Sidebar';
import ChatHeader from '@/components/chat/ChatHeader';
import ChatMessages, { Message } from '@/components/chat/ChatMessages';
import ChatInput from '@/components/chat/ChatInput';
import { chatService } from '@/services/chat.service';

// 1. Tipagem das props para receber os parâmetros da URL dinamicamente
interface ChatPageProps {
  params: {
    id: string;
  };
}

export default function ChatPage({ params }: ChatPageProps) {
  const { isAuthenticated } = useSelector((state: RootState) => state.auth);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const [messages, setMessages] = useState<Message[]>([]);
  const [isAiTyping, setIsAiTyping] = useState(false);

  const sessionId = params.id;

  const handleSendMessage = async (content: string, type: 'text' | 'audio', audioBlob?: Blob) => {
    
    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      type,
      content,
      audioUrl: type === 'audio' && audioBlob ? URL.createObjectURL(audioBlob) : undefined,
      createdAt: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setIsAiTyping(true);

    try {
      const aiResponse = await chatService.sendMessage({
        sessionId: sessionId,
        content,
        type,
        audioBlob,
      });

      setMessages((prev) => [...prev, aiResponse]);

    } catch (error) {
      console.error('Erro ao comunicar com a IA:', error);
    } finally {
      setIsAiTyping(false);
    }
  };

  if (!isAuthenticated) return null;

  return (
    <div className="flex h-screen w-full overflow-hidden bg-white">
      <Sidebar isOpen={isSidebarOpen} onToggle={() => setIsSidebarOpen(!isSidebarOpen)} />

      <div className="flex flex-1 flex-col overflow-hidden relative">
        <ChatHeader onOpenSidebar={() => setIsSidebarOpen(true)} />
        
        <ChatMessages messages={messages} />

        {isAiTyping && (
          <div className="absolute bottom-24 left-6 flex items-center gap-2 rounded-full bg-slate-100 px-4 py-2 text-xs font-medium text-slate-500 shadow-sm animate-pulse">
            <Loader2 className="h-3 w-3 animate-spin" />
            MockAI a analisar resposta...
          </div>
        )}
        
        <ChatInput onSendMessage={handleSendMessage} />
      </div>
    </div>
  );
}