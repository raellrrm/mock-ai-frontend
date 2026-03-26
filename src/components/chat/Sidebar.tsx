"use client";
import { authService } from '@/services/auth.service';
import { logoutSuccess } from '@/slices/authSlice';
import { RootState } from '@/store/store';
import axios from 'axios';
import { Bot, MessageSquare, Plus, Settings, LogOut } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

const recentSessions = [
    { title: 'Senior Java Developer Interview', time: 'Hoje, 14:30', active: true },
    { title: 'React Frontend Interview', time: 'Ontem, 10:00' },
    { title: 'System Design Interview', time: '20 Mar, 16:45' },
    { title: 'Python Backend Interview', time: '18 Mar, 09:00' },
    { title: 'DevOps Engineer Interview', time: '15 Mar, 11:30' },
];

export default function Sidebar() {

    const dispatch = useDispatch();
    const router = useRouter();

    const { user } = useSelector((state: RootState) => state.auth)

    const handleLogout = async () => {
        try {
            await authService.logout();
        } catch (error) {
            console.error('Erro ao encerrar sessão no servidor:', error);
        } finally {
            dispatch(logoutSuccess());
            router.push('/login');
        }
    }

    const getInitials = (name?: string) => {
        if (!name) return 'U'; // 'U' de Usuário como fallback
        const names = name.trim().split(' ');
        if (names.length === 1) return names[0].charAt(0).toUpperCase();
        return (names[0].charAt(0) + names[names.length - 1].charAt(0)).toUpperCase();
    };

    return (
        <aside className="flex h-full w-72 flex-col border-r border-slate-900 bg-slate-950 p-4 text-white">
            <div className="flex items-center justify-between pb-6">
                <div className="flex items-center gap-2">
                    <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-indigo-600 font-bold">M</div>
                    <span className="text-xl font-bold">MockAI</span>
                </div>
                <button className="text-slate-600 hover:text-white">&lsaquo;</button>
            </div>

            <button className="flex w-full items-center justify-center gap-2 rounded-lg bg-indigo-600 px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-indigo-700">
                <Plus className="h-4 w-4" />
                Nova Entrevista
            </button>

            <div className="flex-grow space-y-1 overflow-y-auto pt-8">
                <h2 className="px-3 text-xs font-semibold uppercase tracking-wider text-slate-600">Sessões Recentes</h2>
                {recentSessions.map((session, index) => (
                    <div key={index} className={`flex cursor-pointer items-center gap-3 rounded-lg px-3 py-2 text-sm ${session.active ? 'bg-slate-900 text-white' : 'text-slate-400 hover:bg-slate-900/50 hover:text-white'}`}>
                        <MessageSquare className={`h-4 w-4 shrink-0 ${session.active ? 'text-indigo-400' : 'text-slate-600'}`} />
                        <div className="flex flex-col overflow-hidden">
                            <span className="truncate font-bold">{session.title}</span>
                            <span className="text-xs text-slate-600">{session.time}</span>
                        </div>
                    </div>
                ))}
            </div>

            <div className="border-t border-slate-900 pt-4 mt-auto">
                <div className="flex items-center gap-3 rounded-xl bg-slate-900/50 p-3 border border-slate-900">
                    
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-slate-800 font-semibold text-indigo-300 border border-slate-700">
                        {getInitials(user?.name)}
                    </div>
                    
                    <div className="flex flex-1 flex-col overflow-hidden">
                        <span className="truncate text-sm font-bold">
                            {user?.name || 'Carregando...'}
                        </span>
                        <span className="truncate text-xs text-slate-500">
                            {user?.email || ''}
                        </span>
                    </div>

                    <button className="text-slate-600 hover:text-white">
                        <Settings className="h-4 w-4" />
                    </button>
                    <button onClick={handleLogout} className="text-slate-600 cursor-pointer hover:text-red-400">
                        <LogOut className="h-4 w-4" />
                    </button>
                </div>
            </div>
        </aside>
    );
}