"use client"
import { BotMessageSquare, Mic, Goal } from 'lucide-react';
import FeatureCard from './FeatureCard';

const featuresData = [
  {
    icon: <BotMessageSquare className="h-6 w-6" />,
    title: 'IA Inteligente',
    description: 'Nossa IA adapta as perguntas ao seu nível de experiência e à vaga desejada.',
  },
  {
    icon: <Mic className="h-6 w-6" />,
    title: 'Resposta por Voz',
    description: 'Pratique como em uma entrevista real usando reconhecimento de voz avançado.',
  },
  {
    icon: <Goal className="h-6 w-6" />,
    title: 'Feedback Detalhado',
    description: 'Receba análises detalhadas de suas respostas e dicas de melhoria.',
  },
];

export default function FeaturesGrid() {
  return (
    <section id="features" className="py-24 px-4 sm:px-6 lg:px-8">
      <div className="container mx-auto">
      
        <div className="mx-auto mb-16 max-w-2xl text-center">
          <h2 className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl">
            Por que escolher a MockAI?
          </h2>
          <p className="mt-6 text-lg text-slate-400">
            Ferramentas avançadas para você se preparar da melhor forma para suas entrevistas técnicas.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          {featuresData.map((feature, index) => (
            <FeatureCard
              key={index} 
              icon={feature.icon}
              title={feature.title}
              description={feature.description}
            />
          ))}
        </div>
      </div>
    </section>
  );
}