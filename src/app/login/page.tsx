'use client';

import AuthLayout from '@/components/auth/AuthLayout';
import AuthInput from '@/components/auth/AuthInput';
import SocialAuth from '@/components/auth/SocialAuth';
import { Mail, Lock, Eye, ArrowRight } from 'lucide-react';
import Link from 'next/link';

export default function LoginPage() {
  return (
    <AuthLayout 
      sideTitle="Domine sua próxima entrevista técnica com IA"
      sideSubtitle="Pratique entrevistas realistas, receba feedback instantâneo e aumente suas chances de sucesso."
    >
      <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-xl shadow-slate-200/50">
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold text-slate-900">Bem-vindo de volta</h2>
          <p className="text-slate-500 text-sm mt-1">Entre na sua conta para continuar</p>
        </div>

        <form className="flex flex-col gap-5">
          <AuthInput 
            label="E-mail"
            placeholder="seu@email.com"
            type="email"
            icon={<Mail className="h-4 w-4" />}
          />

          <AuthInput 
            label="Senha"
            placeholder="••••••••"
            type="password"
            icon={<Lock className="h-4 w-4" />}
            rightElement={<Eye className="h-4 w-4" />}
          />

          <div className="flex items-center justify-between">
            <label className="flex items-center gap-2 text-sm text-slate-600 cursor-pointer">
              <input type="checkbox" className="rounded border-slate-300 text-indigo-600 focus:ring-indigo-500" />
              Lembrar de mim
            </label>
            <Link href="#" className="text-sm font-semibold text-indigo-600 hover:text-indigo-700">
              Esqueceu a senha?
            </Link>
          </div>

          <button className="flex items-center justify-center gap-2 w-full rounded-xl bg-indigo-600 py-3 font-bold text-white transition-all hover:bg-indigo-700 active:scale-[0.98]">
            Entrar <ArrowRight className="h-4 w-4" />
          </button>
        </form>

        <div className="mt-8">
          <SocialAuth />
        </div>
      </div>

      <p className="mt-8 text-center text-sm text-slate-500">
        Não tem uma conta?{' '}
        <Link href="/register" className="font-bold text-indigo-600 hover:underline">
          Criar conta grátis
        </Link>
      </p>
    </AuthLayout>
  );
}