'use client';

import { X } from 'lucide-react';
import { createChatSchema, CreateChatFormData } from '@/validations/chat.schema';
import { z } from 'zod'
import FormModal from './FormModal';

interface NewChatModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSubmit: (data: CreateChatFormData) => Promise<void>;
}

type FormInput = z.input<typeof createChatSchema>;
type FormOutput = z.infer<typeof createChatSchema>;


export default function NewChatModal({ isOpen, onClose, onSubmit }: NewChatModalProps) {
    
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-[60] flex items-center justify-center bg-slate-950/60 p-4 backdrop-blur-sm">
            <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-2xl">

                <div className="mb-6 flex items-center justify-between">
                    <h2 className="text-lg font-bold text-slate-900">Configurar Simulação</h2>
                    <button
                        onClick={onClose}
                        className="rounded-full p-1 text-slate-400 hover:bg-slate-100 hover:text-slate-600"
                    >
                        <X className="h-5 w-5" />
                    </button>
                </div>
                <FormModal onSubmit={onSubmit} onClose={onClose}/>
            </div>
        </div>
    );
}