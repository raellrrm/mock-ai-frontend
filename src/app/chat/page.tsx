'use client';

import { useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '@/store/store';
import { Bot, ArrowLeft } from 'lucide-react';

import Sidebar from '@/components/chat/Sidebar';

export default function ChatWelcomePage() {
  const { isAuthenticated, user } = useSelector((state: RootState) => state.auth);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  if (!isAuthenticated) return null;

  return (
    <div className="flex h-screen w-full overflow-hidden bg-white">
      <Sidebar isOpen={isSidebarOpen} onToggle={() => setIsSidebarOpen(!isSidebarOpen)} />

      <main className="flex flex-1 flex-col items-center justify-center bg-slate-50 p-6 text-center relative">
        
        {!isSidebarOpen && (
           <button 
             onClick={() => setIsSidebarOpen(true)}
             className="absolute left-6 top-6 flex items-center gap-2 text-sm font-medium text-slate-500 hover:text-indigo-600 lg:hidden"
           >
             <ArrowLeft className="h-4 w-4" /> Abrir Menu
           </button>
        )}

        <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-indigo-100 border border-indigo-200 shadow-sm">
          <Bot className="h-10 w-10 text-indigo-600" />
        </div>
        
        <h1 className="mb-2 text-2xl font-bold text-slate-900">
          Bem-vindo ao MockAI, {user?.name?.split(' ')[0] || 'Dev'}!
        </h1>
        
        <p className="max-w-md text-sm text-slate-500">
          Selecione uma sessão no menu lateral para continuar o seu treino ou clique em 
          <strong className="text-slate-700"> Nova Entrevista</strong> para iniciar uma nova simulação técnica.
        </p>
      </main>
    </div>
  );
}