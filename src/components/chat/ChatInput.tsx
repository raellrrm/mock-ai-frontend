"use client";
import { Mic, Paperclip, SendHorizontal } from 'lucide-react';

export default function ChatInput() {
    return (
        <footer className="shrink-0 bg-slate-50 px-6 pb-4 pt-2">
            <div className="relative flex items-center rounded-full border border-slate-200 bg-white px-3 py-1.5 shadow-inner shadow-slate-100/50">

                <button className="flex h-10 w-10 items-center justify-center text-slate-400 hover:text-slate-600">
                    <Paperclip className="h-5 w-5" />
                </button>

                <input
                    type="text"
                    placeholder="Digite sua resposta..."
                    className="flex-1 px-3 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none"
                />

                <div className="flex items-center gap-2">
                    <button className="flex h-10 w-10 items-center justify-center rounded-full bg-indigo-600 text-white transition-all hover:bg-indigo-700 active:scale-95 shadow-lg shadow-indigo-500/30">
                        <Mic className="h-5 w-5" />
                    </button>

                    <button className="flex h-10 w-10 items-center justify-center rounded-full bg-slate-200 text-slate-400">
                        <SendHorizontal className="h-5 w-5" />
                    </button>
                </div>
            </div>
            <p className="mt-2 text-center text-xs text-slate-400">
                Pressione <kbd className="font-semibold text-slate-600">Enter</kbd> para enviar ou <kbd className="font-semibold text-slate-600">Shift+Enter</kbd> para nova linha
            </p>
        </footer>
    );
}