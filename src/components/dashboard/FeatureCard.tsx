import { ReactNode } from 'react';

interface FeatureCardProps {
  icon: ReactNode;
  title: string;
  description: string;
}

export default function FeatureCard({ icon, title, description }: FeatureCardProps) {
  return (
    <div className="group rounded-2xl border border-slate-800 bg-slate-900 p-8 transition-all hover:border-indigo-500/30 hover:bg-slate-800/50 hover:shadow-[0_0_30px_rgba(79,70,229,0.1)]">

      <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-xl border border-indigo-800 bg-indigo-950 text-indigo-300 transition-colors group-hover:border-indigo-500 group-hover:bg-indigo-600 group-hover:text-white">
        {icon}
      </div>

      <h3 className="text-xl font-bold text-white transition-colors group-hover:text-indigo-300">
        {title}
      </h3>

      <p className="mt-3 text-sm leading-relaxed text-slate-400 group-hover:text-slate-300">
        {description}
      </p>
    </div>
  );
}