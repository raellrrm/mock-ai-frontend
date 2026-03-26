'use client';

import { CheckCircle, Clock, Menu } from 'lucide-react';
import { useState, useEffect } from 'react';

interface ChatHeaderProps {
  onOpenSidebar: () => void;
}

export default function ChatHeader({ onOpenSidebar }: ChatHeaderProps) {
  const [seconds, setSeconds] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setSeconds((prev) => prev + 1);
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const formatTime = (totalSeconds: number) => {
    const mins = Math.floor(totalSeconds / 60).toString().padStart(2, '0');
    const secs = (totalSeconds % 60).toString().padStart(2, '0');
    return `${mins}:${secs}`;
  };

  return (
    <header className="flex h-16 shrink-0 items-center justify-between border-b border-slate-200 bg-white px-4 sm:px-6">
      <div className="flex items-center gap-3">
        <button 
          onClick={onOpenSidebar}
          className="rounded-md p-1.5 text-slate-500 hover:bg-slate-100 lg:hidden"
        >
          <Menu className="h-5 w-5" />
        </button>

        <div className="flex flex-col">
          <h1 className="text-base sm:text-lg font-bold text-slate-950 truncate max-w-[200px] sm:max-w-md">
            Senior Java Developer Interview
          </h1>
          <div className="flex items-center gap-2 text-sm text-slate-500">
            <Clock className="h-3.5 w-3.5" />
            <span className="font-mono tabular-nums tracking-tight">{formatTime(seconds)}</span>
            <span className="rounded-full bg-violet-100 px-2.5 py-0.5 text-[10px] sm:text-xs font-semibold text-violet-700">
              Em andamento
            </span>
          </div>
        </div>
      </div>

      <button className="flex items-center gap-2 rounded-lg bg-indigo-600 px-3 sm:px-4 py-2 text-xs sm:text-sm font-semibold text-white transition-colors hover:bg-indigo-700 active:scale-95">
        <CheckCircle className="h-4 w-4 hidden sm:block" />
        <span className="cursor-pointer hidden sm:block">Finalizar Sessão</span>
        <span className="cursor-pointer sm:hidden">Finalizar</span>
      </button>
    </header>
  );
}