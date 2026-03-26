import Sidebar from '@/components/chat/Sidebar';
import ChatHeader from '@/components/chat/ChatHeader';
import ChatMessages from '@/components/chat/ChatMessages';
import ChatInput from '@/components/chat/ChatInput';

export default function ChatPage() {
  return (
    <div className="flex h-screen w-full overflow-hidden bg-white">
      
      <Sidebar />

      <div className="flex flex-1 flex-col overflow-hidden">
        
        <ChatHeader />
        
        <ChatMessages />
        
        <ChatInput />

      </div>
    </div>
  );
}