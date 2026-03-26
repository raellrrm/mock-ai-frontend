"use client";

import { authService } from '@/services/auth.service';
import { chatService, ChatType } from '@/services/chat.service';
import { logoutSuccess } from '@/slices/authSlice';
import { RootState } from '@/store/store';
import { MessageSquare, Plus, Settings, LogOut, ChevronLeft, ChevronRight, Loader2 } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

interface SidebarProps {
    isOpen: boolean;
    onToggle: () => void;
}

const recentSessions = [
    { title: 'Senior Java Developer Interview', time: 'Hoje, 14:30', active: true },
    { title: 'React Frontend Interview', time: 'Ontem, 10:00' },
];

export default function Sidebar({ isOpen, onToggle }: SidebarProps) {
    const dispatch = useDispatch();
    const router = useRouter();
    const { user } = useSelector((state: RootState) => state.auth);
    const [isCreating, setIsCreating] = useState(false);

    const handleCreateNewChat = async () => {
        try {
            setIsCreating(true);

            const novaSessao = await chatService.createSession({
                title: 'Entrevista Front-end - App Financeiro',
                type: ChatType.TECH_INTERVIEW,
                tags: ['react', 'nextjs', 'typescript', 'cybersecurity']
            });

            router.push(`/chat/${novaSessao.id}`);

            if (window.innerWidth < 1024) onToggle();

        } catch (error) {
            console.error('Erro ao criar a sessão de chat:', error);
        } finally {
            setIsCreating(false);
        }
    };

    const handleLogout = async () => {
        try {
            await authService.logout();
        } catch (error) {
            console.error('Erro ao sair:', error);
        } finally {
            dispatch(logoutSuccess());
            window.location.href = '/login';
        }
    };

    const getInitials = (name?: string) => {
        if (!name) return 'U';
        const names = name.trim().split(' ');
        if (names.length === 1) return names[0].charAt(0).toUpperCase();
        return (names[0].charAt(0) + names[names.length - 1].charAt(0)).toUpperCase();
    };

    return (
        <>
            {isOpen && (
                <div
                    className="fixed inset-0 z-40 bg-slate-950/50 backdrop-blur-sm lg:hidden"
                    onClick={onToggle}
                />
            )}

            <aside
                className={`fixed inset-y-0 left-0 z-50 flex h-full flex-col border-r border-slate-900 bg-slate-950 text-white transition-all duration-300 ease-in-out lg:relative
                ${isOpen ? 'w-72 translate-x-0' : 'w-20 -translate-x-full lg:translate-x-0'}
            `}
            >
                <div className={`flex items-center pb-6 pt-4 ${isOpen ? 'justify-between px-4' : 'justify-center flex-col px-0'}`}>
                    <div className="flex items-center gap-2">
                        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-indigo-600 font-bold">M</div>
                        {isOpen && <span className="text-xl font-bold">MockAI</span>}
                    </div>

                    <button onClick={onToggle} className={` cursor-pointer rounded-md p-1.5 text-slate-500 hover:bg-slate-900 hover:text-white transition-colors ${!isOpen && 'mt-4'}`}>
                        {isOpen ? <ChevronLeft className="h-5 w-5" /> : <ChevronRight className="h-5 w-5" />}
                    </button>
                </div>

                <div className="px-4">
                    <button
                        onClick={handleCreateNewChat}
                        disabled={isCreating}
                        className={`flex w-full items-center justify-center gap-2 rounded-lg bg-indigo-600 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-indigo-700 disabled:opacity-70 ${isOpen ? 'px-4' : 'px-0'}`}
                    >
                        {isCreating ? <Loader2 className="h-5 w-5 shrink-0 animate-spin" /> : <Plus className="h-5 w-5 shrink-0" />}
                        {isOpen && <span>Nova Entrevista</span>}
                    </button>
                </div>

                <div className="flex-grow space-y-1 overflow-y-auto pt-8 px-4">
                    {isOpen && <h2 className="mb-2 px-3 text-[10px] font-bold uppercase tracking-wider text-slate-600">Sessões Recentes</h2>}
                    {recentSessions.map((session, index) => (
                        <div key={index} className={`flex cursor-pointer items-center rounded-lg py-2 transition-colors ${isOpen ? 'gap-3 px-3' : 'justify-center px-0'} ${session.active ? 'bg-slate-900 text-white' : 'text-slate-400 hover:bg-slate-900/50 hover:text-white'}`} title={session.title}>
                            <MessageSquare className={`h-4 w-4 shrink-0 ${session.active ? 'text-indigo-400' : 'text-slate-600'}`} />
                            {isOpen && (
                                <div className="flex flex-col overflow-hidden">
                                    <span className="truncate text-sm font-bold">{session.title}</span>
                                    <span className="text-xs text-slate-600">{session.time}</span>
                                </div>
                            )}
                        </div>
                    ))}
                </div>

                <div className="border-t border-slate-900 p-4 mt-auto">
                    <div className={`flex items-center rounded-xl bg-slate-900/50 border border-slate-900 transition-all ${isOpen ? 'gap-3 p-3' : 'justify-center p-2 flex-col gap-2'}`}>
                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-slate-800 font-semibold text-indigo-300 border border-slate-700" title={user?.name}>
                            {getInitials(user?.name)}
                        </div>

                        {isOpen && (
                            <div className="flex flex-1 flex-col overflow-hidden">
                                <span className="truncate text-sm font-bold">{user?.name || 'Carregando...'}</span>
                                <span className="truncate text-xs text-slate-500">{user?.email || ''}</span>
                            </div>
                        )}

                        <div className={`flex ${isOpen ? 'gap-2' : 'flex-col gap-3 mt-2'}`}>
                            {isOpen && (
                                <button className="text-slate-500 hover:text-white transition-colors">
                                    <Settings className="h-4 w-4" />
                                </button>
                            )}
                            <button onClick={handleLogout} className="text-slate-500 cursor-pointer hover:text-red-400 transition-colors" title="Sair">
                                <LogOut className="h-4 w-4" />
                            </button>
                        </div>
                    </div>
                </div>
            </aside>
        </>
    );
}