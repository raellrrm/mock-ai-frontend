"use client";
import { CheckCircle, Clock } from 'lucide-react';

export default function ChatHeader() {
    return (
        <header className="flex h-16 items-center justify-between border-b border-slate-200 bg-white px-6 shrink-0">
            <div className="flex flex-col">
                <h1 className="text-lg font-bold text-slate-950">Senior Java Developer Interview</h1>
                <div className="flex items-center gap-2 text-sm text-slate-500">
                    <Clock className="h-3.5 w-3.5" />
                    <span>05:55</span>
                    <span className="rounded-full bg-violet-100 px-2.5 py-0.5 text-xs font-semibold text-violet-700">Em andamento</span>
                </div>
            </div>
            <button className="flex items-center gap-2 rounded-lg bg-indigo-600 px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-indigo-700 active:scale-95">
                <CheckCircle className="h-4 w-4" />
                Finalizar Sessão
            </button>
        </header>
    );
}