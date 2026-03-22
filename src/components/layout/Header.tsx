"use client"
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

export default function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-slate-800 bg-slate-950/80 backdrop-blur-md">
      <div className="container mx-auto flex h-16 items-center justify-between px-4 sm:px-6 lg:px-8">
   
        <div className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-indigo-600 font-bold text-white">
            M
          </div>
          <span className="text-xl font-bold tracking-tight text-white">
            Mock<span className="text-indigo-400">AI</span>
          </span>
        </div>

        <nav className="flex items-center gap-6">
          <Link 
            href="/login" 
            className="text-sm font-medium text-slate-300 transition-colors hover:text-white"
          >
            Entrar
          </Link>
          <Link
            href="/register"
            className="group flex items-center gap-2 rounded-full bg-indigo-600 px-5 py-2 text-sm font-semibold text-white transition-all hover:bg-indigo-700 active:scale-95"
          >
            Começar Grátis
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </nav>
      </div>
    </header>
  );
}