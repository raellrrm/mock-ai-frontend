'use client';

import AuthLayout from '@/components/auth/AuthLayout';
import AuthInput from '@/components/auth/AuthInput';
import SocialAuth from '@/components/auth/SocialAuth';
import { Mail, Lock, Eye, User, ArrowRight } from 'lucide-react';
import Link from 'next/link';

export default function RegisterPage() {
  return (
    <AuthLayout 
      sideTitle="Acelere sua carreira com simulações reais"
      sideSubtitle="Desenvolva confiança e receba feedbacks técnicos de alto nível."
    >
      {/* Card Compacto */}
      <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-lg shadow-slate-200/40">
        <div className="text-center mb-6">
          <h2 className="text-xl font-bold text-slate-900">Crie sua conta gratuita</h2>
          <p className="text-slate-500 text-xs mt-1">Comece a praticar em menos de 2 minutos</p>
        </div>

        <form className="flex flex-col gap-4">
          <AuthInput 
            label="Nome Completo"
            placeholder="Ex: João da Silva"
            type="text"
            icon={<User className="h-4 w-4" />}
          />

          <AuthInput 
            label="E-mail"
            placeholder="seu@email.com"
            type="email"
            icon={<Mail className="h-4 w-4" />}
          />

          <div className="grid grid-cols-2 gap-4">
            <AuthInput 
              label="Senha"
              placeholder="••••••••"
              type="password"
              icon={<Lock className="h-4 w-4" />}
            />
            <AuthInput 
              label="Confirmar"
              placeholder="••••••••"
              type="password"
              icon={<Lock className="h-4 w-4" />}
            />
          </div>

          <button className="flex items-center justify-center gap-2 w-full rounded-lg bg-indigo-600 py-2.5 text-sm font-bold text-white transition-all hover:bg-indigo-700 active:scale-95 mt-2">
            Criar minha conta <ArrowRight className="h-4 w-4" />
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