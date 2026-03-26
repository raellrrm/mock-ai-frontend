'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useDispatch } from 'react-redux';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { loginSchema, LoginFormData } from '@/validations/auth.schema';
import { authService } from '@/services/auth.service';
import AuthLayout from '@/components/auth/AuthLayout';
import AuthInput from '@/components/auth/AuthInput';
import SocialAuth from '@/components/auth/SocialAuth';
import { Mail, Lock, Eye, EyeOff, ArrowRight, Loader2 } from 'lucide-react';
import axios from 'axios';
import { setCredentials } from '@/slices/authSlice';

export default function LoginPage() {
    const router = useRouter();
    const dispatch = useDispatch();

    const [showPassword, setShowPassword] = useState(false);
    const [apiError, setApiError] = useState<string | null>(null);

    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm<LoginFormData>({
        resolver: zodResolver(loginSchema),
    });

    const onSubmit = async (data: LoginFormData) => {
        try {
            setApiError(null);

            const user = await authService.login(data);

            dispatch(setCredentials(user));

            router.push('/chat');
            router.refresh();

        } catch (error) {
            if (axios.isAxiosError(error) && error.response) {
                setApiError(error.response.data.message || 'Credenciais inválidas. Tente novamente.');
            } else {
                setApiError('Ocorreu um erro no servidor. Tente mais tarde.');
            }
        }
    };

    return (
        <AuthLayout
            sideTitle="Domine a sua próxima entrevista técnica com IA"
            sideSubtitle="Pratique entrevistas realistas e receba feedback instantâneo."
        >
            <div className="rounded-2xl border border-slate-100 bg-white p-6 shadow-lg shadow-slate-200/40">
                <div className="mb-6 text-center">
                    <h2 className="text-xl font-bold text-slate-900">Bem-vindo de volta</h2>
                    <p className="mt-1 text-xs text-slate-500">Entre na sua conta para continuar</p>
                </div>

                {apiError && (
                    <div className="mb-4 rounded-lg bg-red-50 p-3 text-sm font-medium text-red-600 border border-red-100">
                        {apiError}
                    </div>
                )}

                <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
                    <AuthInput
                        label="E-mail"
                        placeholder="seu@email.com"
                        type="email"
                        icon={<Mail className="h-4 w-4" />}
                        {...register('email')}
                        error={errors.email?.message}
                    />

                    <AuthInput
                        label="Palavra-passe"
                        placeholder="••••••••"
                        type={showPassword ? 'text' : 'password'}
                        icon={<Lock className="h-4 w-4" />}
                        {...register('password')}
                        error={errors.password?.message}
                        rightElement={
                            showPassword ?
                                <EyeOff className="h-4 w-4" onClick={() => setShowPassword(false)} /> :
                                <Eye className="h-4 w-4" onClick={() => setShowPassword(true)} />
                        }
                    />

                    <div className="flex items-center justify-between">
                        <label className="flex cursor-pointer items-center gap-2 text-xs text-slate-500">
                            <input type="checkbox" className="rounded border-slate-300 text-indigo-600" />
                            Lembrar-me
                        </label>
                        <Link href="#" className="text-xs font-bold text-indigo-600 hover:text-indigo-700">
                            Esqueceu a palavra-passe?
                        </Link>
                    </div>

                    <button
                        type="submit"
                        disabled={isSubmitting}
                        className="mt-2 flex w-full items-center justify-center gap-2 rounded-lg bg-indigo-600 py-2.5 text-sm font-bold text-white transition-all hover:bg-indigo-700 active:scale-95 disabled:opacity-70 disabled:cursor-not-allowed"
                    >
                        {isSubmitting ? (
                            <Loader2 className="h-4 w-4 animate-spin" />
                        ) : (
                            <>Entrar <ArrowRight className="h-4 w-4" /></>
                        )}
                    </button>
                </form>

                <div className="mt-6">
                    <SocialAuth />
                </div>
            </div>

            <p className="mt-6 text-center text-xs text-slate-500">
                Não tem uma conta?{' '}
                <Link href="/register" className="font-bold text-indigo-600 hover:underline">
                    Criar conta grátis
                </Link>
            </p>
        </AuthLayout>
    );
}