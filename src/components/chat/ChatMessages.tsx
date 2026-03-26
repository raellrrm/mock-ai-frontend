"use client";
import { RootState } from '@/store/store';
import { Bot, UserIcon } from 'lucide-react';
import { useRef } from 'react';
import { useSelector } from 'react-redux';

export interface Message {
    id: string;
    role: 'user' | 'ai';
    type: 'text' | 'audio';
    content: string;
    audioUrl?: string;
    createdAt: Date;
}

interface ChatMessagesProps {
    messages: Message[];
}

export default function ChatMessages({ messages }: ChatMessagesProps) {
    const { user } = useSelector((state: RootState) => state.auth);
    const messagesEndRef = useRef<HTMLDivElement>(null);

    return (
        <main className="flex-1 overflow-y-auto bg-white p-4 sm:p-6">
            <div className="mx-auto flex max-w-3xl flex-col gap-6">
                <div className="flex gap-4">
                    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-indigo-100 text-indigo-600">
                        <Bot className="h-5 w-5" />
                    </div>
                    <div className="flex flex-col gap-1 items-start max-w-[85%] sm:max-w-[75%]">
                        <span className="text-xs font-semibold text-slate-500">MockAI</span>
                        <div className="rounded-2xl rounded-tl-none bg-slate-100 px-4 py-3 text-sm text-slate-800">
                            Olá, {user?.name?.split(' ')[0] || 'candidato'}! Bem-vindo à sua simulação de entrevista para Desenvolvedor Java Sênior. Quando estiver pronto, me diga um pouco sobre a sua experiência com Spring Boot e microsserviços.
                        </div>
                    </div>
                </div>

                {messages?.map((msg) => {
                    const isUser = msg.role === 'user';

                    return (
                        <div key={msg.id} className={`flex gap-4 ${isUser ? 'flex-row-reverse' : 'flex-row'}`}>
                            <div className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full ${isUser ? 'bg-indigo-600 text-white' : 'bg-indigo-100 text-indigo-600'
                                }`}>
                                {isUser ? <UserIcon className="h-5 w-5" /> : <Bot className="h-5 w-5" />}
                            </div>

                            <div className={`flex flex-col gap-1 max-w-[85%] sm:max-w-[75%] ${isUser ? 'items-end' : 'items-start'}`}>
                                <span className="text-xs font-semibold text-slate-500">
                                    {isUser ? 'Você' : 'MockAI'}
                                </span>

                                <div className={`rounded-2xl px-4 py-3 text-sm shadow-sm ${isUser
                                        ? 'rounded-tr-none bg-indigo-600 text-white'
                                        : 'rounded-tl-none bg-slate-100 text-slate-800'
                                    }`}>
                                    {msg.type === 'text' && (
                                        <p className="whitespace-pre-wrap leading-relaxed">{msg.content}</p>
                                    )}

                                    {msg.type === 'audio' && msg.audioUrl && (
                                        <div className="flex flex-col gap-2">
                                            <span className="text-xs opacity-80">{msg.content}</span>
                                            <audio
                                                controls
                                                src={msg.audioUrl}
                                                className="h-10 w-[240px] sm:w-[300px]"
                                            />
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    );
                })}

                <div ref={messagesEndRef} />
            </div>
        </main>
    );
}