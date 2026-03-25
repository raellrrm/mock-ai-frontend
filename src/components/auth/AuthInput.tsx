import { ReactNode } from 'react';

interface AuthInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  icon: ReactNode;
  rightElement?: ReactNode;
}

export default function AuthInput({ label, icon, rightElement, ...props }: AuthInputProps) {
  return (
    <div className="flex flex-col gap-1 w-full">
      <label className="text-xs font-bold text-slate-600 uppercase tracking-wide">{label}</label>
      <div className="relative flex items-center">
        <div className="absolute left-3 text-slate-400">
          {icon}
        </div>
        <input
          {...props}
          className="w-full rounded-lg border border-slate-200 bg-white py-2.5 pl-10 pr-10 text-sm outline-none transition-all focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/5 placeholder:text-slate-400 text-slate-900"
        />
        {rightElement && (
          <div className="absolute right-3 cursor-pointer text-slate-400 hover:text-slate-600">
            {rightElement}
          </div>
        )}
      </div>
    </div>
  );
}