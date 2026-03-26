"use client";
import { Bot } from 'lucide-react';

export default function ChatMessages() {
    return (
        <div className="flex-1 overflow-y-auto bg-slate-50 p-6 space-y-6 selection:bg-indigo-100">

            <div className="flex gap-4">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-indigo-600 text-white shadow-lg shadow-indigo-500/20">
                    <Bot className="h-5 w-5" />
                </div>
                <div className="flex flex-col items-start gap-1">
                    <div className="max-w-2xl rounded-2xl rounded-tl-none bg-white p-5 text-base font-medium text-slate-800 border border-slate-100 shadow-sm shadow-slate-200/50">
                        <p>Olá! Vamos começar uma nova entrevista técnica. Qual posição você gostaria de praticar hoje?</p>
                    </div>
                    <span className="ml-1 text-xs text-slate-400">13:31</span>
                </div>
            </div>

        </div>
    );
}