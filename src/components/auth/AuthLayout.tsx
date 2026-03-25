import { ReactNode } from 'react';

interface AuthLayoutProps {
  children: ReactNode;
  sideTitle: string;
  sideSubtitle: string;
}

export default function AuthLayout({ children, sideTitle, sideSubtitle }: AuthLayoutProps) {
  return (
    <div className="flex h-screen w-full bg-white">
      <div className="hidden lg:flex lg:w-1/2 flex-col justify-between bg-slate-950 p-12 text-white">
        <div>
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-indigo-600 font-bold">M</div>
            <span className="text-xl font-bold">MockAI</span>
          </div>

          <div className="mt-12">
            <h1 className="text-3xl font-bold leading-tight tracking-tight">
              {sideTitle}
            </h1>
            <p className="mt-6 text-md text-slate-400">
              {sideSubtitle}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-8 border-t border-slate-900 pt-8">
          <div>
            <div className="text-3xl font-bold text-indigo-500">50k+</div>
            <div className="text-xs text-slate-500 uppercase tracking-wider mt-1">Entrevistas</div>
          </div>
          <div>
            <div className="text-3xl font-bold text-indigo-500">94%</div>
            <div className="text-xs text-slate-500 uppercase tracking-wider mt-1">Aprovação</div>
          </div>
          <div>
            <div className="text-3xl font-bold text-indigo-500">4.9</div>
            <div className="text-xs text-slate-500 uppercase tracking-wider mt-1">Avaliação</div>
          </div>
        </div>
      </div>

      <div className="flex w-full lg:w-1/2 flex-col items-center justify-center bg-slate-50 p-6 sm:p-12">
        <div className="mb-8 flex items-center gap-2 lg:hidden">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-indigo-600 font-bold text-white text-xl">M</div>
          <span className="text-2xl font-bold text-slate-900">MockAI</span>
        </div>
        
        <div className="w-full max-w-md">
          {children}
        </div>
      </div>
    </div>
  );
}