'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useDispatch } from 'react-redux';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import axios from 'axios';
import { registerSchema, RegisterFormData } from '@/validations/auth.schema';
import { authService } from '@/services/auth.service';
import AuthLayout from '@/components/auth/AuthLayout';
import AuthInput from '@/components/auth/AuthInput';
import SocialAuth from '@/components/auth/SocialAuth';
import { Mail, Lock, User, ArrowRight, Loader2 } from 'lucide-react';
import { setCredentials } from '@/slices/authSlice';

export default function RegisterPage() {
  const router = useRouter();
  const dispatch = useDispatch();
  const [apiError, setApiError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
  });

  const onSubmit = async (data: RegisterFormData) => {
    try {
      setApiError(null);

      const user = await authService.register({
        name: data.name,
        email: data.email,
        password: data.password,
      });

      dispatch(setCredentials(user));
      router.push('/chat');

    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        setApiError(error.response.data.message || 'Erro ao criar conta. Verifique os dados.');
      } else {
        setApiError('Ocorreu um erro no servidor. Tente mais tarde.');
      }
    }
  };

  return (
    <AuthLayout
      sideTitle="Acelere sua carreira com simulações reais"
      sideSubtitle="Desenvolva confiança e receba feedbacks técnicos de alto nível."
    >
      <div className="rounded-2xl border border-slate-100 bg-white p-6 shadow-lg shadow-slate-200/40">
        <div className="mb-6 text-center">
          <h2 className="text-xl font-bold text-slate-900">Crie sua conta gratuita</h2>
          <p className="mt-1 text-xs text-slate-500">Comece a praticar em menos de 2 minutos</p>
        </div>

        {apiError && (
          <div className="mb-4 rounded-lg bg-red-50 p-3 text-sm font-medium text-red-600 border border-red-100">
            {apiError}
          </div>
        )}

        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
          <AuthInput
            label="Nome Completo"
            placeholder="Ex: João da Silva"
            type="text"
            icon={<User className="h-4 w-4" />}
            {...register('name')}
            error={errors.name?.message}
          />

          <AuthInput
            label="E-mail"
            placeholder="seu@email.com"
            type="email"
            icon={<Mail className="h-4 w-4" />}
            {...register('email')}
            error={errors.email?.message}
          />

          <div className="grid grid-cols-2 gap-4">
            <AuthInput
              label="Senha"
              placeholder="••••••••"
              type="password"
              icon={<Lock className="h-4 w-4" />}
              {...register('password')}
              error={errors.password?.message}
            />
            <AuthInput
              label="Confirmar"
              placeholder="••••••••"
              type="password"
              icon={<Lock className="h-4 w-4" />}
              {...register('confirmPassword')}
              error={errors.confirmPassword?.message}
            />
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="mt-2 flex w-full items-center justify-center gap-2 rounded-lg bg-indigo-600 py-2.5 text-sm font-bold text-white transition-all hover:bg-indigo-700 active:scale-95 disabled:opacity-70 disabled:cursor-not-allowed"
          >
            {isSubmitting ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <>Criar minha conta <ArrowRight className="h-4 w-4" /></>
            )}
          </button>
        </form>

        <div className="mt-6">
          <SocialAuth />
        </div>
      </div>

      <p className="mt-6 text-center text-xs text-slate-500">
        Já tem uma conta?{' '}
        <Link href="/login" className="font-bold text-indigo-600 hover:underline">
          Fazer login
        </Link>
      </p>
    </AuthLayout>
  );
}