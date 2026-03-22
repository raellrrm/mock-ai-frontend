"use client"
import { ArrowRight, Zap } from 'lucide-react';

export default function HeroSection() {
  return (
    <section className="relative overflow-hidden px-4 pt-20 pb-16 sm:px-6 lg:px-8 lg:pt-5">
 
      <div className="absolute top-0 left-1/2 -z-10 h-[400px] w-[600px] -translate-x-1/2 rounded-full bg-indigo-500/10 blur-[120px]" />

      <div className="container mx-auto text-center">

        <div className="mb-8 flex justify-center">
          <div className="flex items-center gap-2 rounded-full border border-indigo-500/30 bg-indigo-500/10 px-4 py-1.5 text-xs font-medium text-indigo-300">
            <Zap className="h-3.5 w-3.5 fill-indigo-400" />
            Entrevistas técnicas alimentadas por IA
          </div>
        </div>

        <h1 className="mx-auto max-w-4xl text-4xl font-extrabold tracking-tight text-white sm:text-6xl">
          Domine suas entrevistas técnicas com{' '}
          <span className="bg-gradient-to-r from-indigo-400 to-violet-400 bg-clip-text text-transparent">
            inteligência artificial
          </span>
        </h1>

        <p className="mx-auto mt-8 max-w-2xl text-md text-slate-400 sm:text-xl">
          Pratique entrevistas realistas, receba feedback instantâneo e aumente suas chances de conseguir a vaga dos seus sonhos.
        </p>

        <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <button className="group flex h-12 items-center gap-2 rounded-lg bg-indigo-600 px-8 text-sm font-semibold text-white transition-all hover:bg-indigo-700 hover:shadow-[0_0_20px_rgba(79,70,229,0.4)] active:scale-95">
            Começar Entrevista
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </button>
          
          <button className="flex h-12 items-center rounded-lg border border-slate-800 bg-slate-900/50 px-8 text-sm font-semibold text-white transition-colors hover:bg-slate-800">
            Ver Demonstração
          </button>
        </div>
      </div>
    </section>
  );
}