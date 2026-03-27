import { ChatType } from "@/services/chat.service";
import { CreateChatFormData, createChatSchema } from "@/validations/chat.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import { useForm } from "react-hook-form";
import { z } from 'zod'

type FormInput = z.input<typeof createChatSchema>;
type FormOutput = z.infer<typeof createChatSchema>;

interface FormModalProps {
    onSubmit: (data: CreateChatFormData) => Promise<void>;
    onClose: () => void;
}

export default function FormModal({onClose, onSubmit}: FormModalProps) {
    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
        reset,
    } = useForm<FormInput, any, FormOutput>({
        resolver: zodResolver(createChatSchema),
        defaultValues: {
            title: '',
            type: ChatType.TECH_INTERVIEW,
            tags: '',
        }
    });

    const handleFormSubmit = async(data: CreateChatFormData) => {
        await onSubmit(data);
    }

    return (
        <form onSubmit={handleSubmit(handleFormSubmit)} className="flex flex-col gap-4">

            <div className="flex flex-col gap-1">
                <label className="text-xs font-bold uppercase tracking-wide text-slate-600">Título da Sessão</label>
                <input
                    {...register('title')}
                    placeholder="Ex: Entrevista Java + React"
                    className={`text-slate-900 w-full rounded-lg border px-3 py-2 text-sm outline-none transition-colors ${errors.title ? 'border-red-500 focus:border-red-500' : 'border-slate-200 focus:border-indigo-500'
                        }`}
                />
                {errors.title && <span className="text-xs font-medium text-red-500">{errors.title.message}</span>}
            </div>

            <div className="flex flex-col gap-1">
                <label className="text-xs font-bold uppercase tracking-wide text-slate-600">Tipo de Simulação</label>
                <select
                    {...register('type')}
                    className="text-slate-900 w-full rounded-lg border border-slate-200 px-3 py-2 text-sm outline-none focus:border-indigo-500"
                >
                    <option value={ChatType.TECH_INTERVIEW}>Entrevista Técnica (Tech Interview)</option>
                    <option value={ChatType.ENGLISH_PRACTICE}>Prática de Inglês (English Practice)</option>
                </select>
                {errors.type && <span className="text-xs font-medium text-red-500">{errors.type.message}</span>}
            </div>

            <div className="flex flex-col gap-1">
                <label className="text-xs font-bold uppercase tracking-wide text-slate-600">Tecnologias (Tags)</label>
                <input
                    {...register('tags')}
                    placeholder="Ex: java, spring-boot, react"
                    className={`text-slate-900 w-full rounded-lg border px-3 py-2 text-sm outline-none transition-colors ${errors.tags ? 'border-red-500 focus:border-red-500' : 'border-slate-200 focus:border-indigo-500'
                        }`}
                />
                <p className="text-[10px] text-slate-500">Separe as tecnologias por vírgulas.</p>
                {errors.tags && <span className="text-xs font-medium text-red-500">{errors.tags.message}</span>}
            </div>

            <div className="mt-4 flex gap-3">
                <button
                    type="button"
                    onClick={onClose}
                    className="flex-1 rounded-lg border border-slate-200 bg-white py-2.5 text-sm font-bold text-slate-700 hover:bg-slate-50"
                >
                    Cancelar
                </button>
                <button
                    type="submit"
                    disabled={isSubmitting}
                    className="flex-1 flex items-center justify-center gap-2 rounded-lg bg-indigo-600 py-2.5 text-sm font-bold text-white hover:bg-indigo-700 disabled:opacity-70"
                >
                    {isSubmitting ? <Loader2 className="h-4 w-4 animate-spin" /> : 'Iniciar Sessão'}
                </button>
            </div>
        </form>
    )
}