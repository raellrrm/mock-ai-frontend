"use client"

import { ArrowRight } from 'lucide-react';

export default function CtaSection() {
  return (
    <section className="relative overflow-hidden bg-slate-950 py-24 px-4 sm:px-6 lg:px-8">
      
      <div className="absolute top-1/2 left-1/2 -z-10 h-[300px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-indigo-600/5 blur-[100px]" />

      <div className="container mx-auto text-center">
        <h2 className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
          Pronto para começar?
        </h2>
        
        <p className="mx-auto mt-6 max-w-xl text-lg text-slate-400">
          Junte-se a milhares de profissionais que já estão melhorando suas 
          habilidades de entrevista com a MockAI.
        </p>

        <div className="mt-10 flex justify-center">
          <button className="group flex h-14 items-center gap-2 rounded-xl bg-indigo-600 px-10 text-base font-bold text-white transition-all hover:bg-indigo-700 hover:shadow-[0_0_30px_rgba(79,70,229,0.5)] active:scale-95">
            Começar Grátis Agora
            <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
          </button>
        </div>
      </div>
    </section>
  );
}