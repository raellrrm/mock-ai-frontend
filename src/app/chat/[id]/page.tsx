'use client';

import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '@/store/store';
import { Loader2 } from 'lucide-react';
import { useRouter, useParams } from 'next/navigation';
import Sidebar from '@/components/chat/Sidebar';
import ChatHeader from '@/components/chat/ChatHeader';
import ChatMessages, { Message } from '@/components/chat/ChatMessages';
import ChatInput from '@/components/chat/ChatInput';
import { chatService } from '@/services/chat.service';

export default function ChatPage() {
  const [chatTitle, setChatTitle] = useState('Carregando...');
  const router = useRouter();

  const params = useParams();
  const sessionId = params?.id as string;

  const { isAuthenticated } = useSelector((state: RootState) => state.auth);

  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [messages, setMessages] = useState<Message[]>([]);
  const [isAiTyping, setIsAiTyping] = useState(false);
  const [isLoadingHistory, setIsLoadingHistory] = useState(true);

  useEffect(() => {

    const fetchChatHistory = async () => {
      try {
        setIsLoadingHistory(true);

        const [sessionData, messagesData] = await Promise.all([
          chatService.getChatById(sessionId),
          chatService.getMessagesChatById(sessionId)
        ]);


        if(sessionData?.title) {
          setChatTitle(sessionData.title);
        }

        if (Array.isArray(messagesData)) {
          setMessages(messagesData);
        }

      } catch (error) {
        console.error('Erro ao buscar histórico:', error);
      } finally {
        setIsLoadingHistory(false);
      }
    };

    if (sessionId) {
      fetchChatHistory();
    }
  }, [sessionId, router]);

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
        <ChatHeader title={chatTitle} onOpenSidebar={() => setIsSidebarOpen(true)} />

        {isLoadingHistory ? (
          <div className="flex flex-1 flex-col items-center justify-center bg-white text-slate-400">
            <Loader2 className="h-8 w-8 animate-spin text-indigo-500 mb-4" />
            <p className="text-sm font-medium">A carregar o histórico da entrevista...</p>
          </div>
        ) : (
          <ChatMessages messages={messages} />
        )}

        {isAiTyping && (
          <div className="absolute bottom-24 left-6 flex items-center gap-2 rounded-full bg-slate-100 px-4 py-2 text-xs font-medium text-slate-500 shadow-sm animate-pulse">
            <Loader2 className="h-3 w-3 animate-spin" />
            MockAI a analisar resposta...
          </div>
        )}

        {!isLoadingHistory && (
          <ChatInput onSendMessage={handleSendMessage} />
        )}
      </div>
    </div>
  );
}