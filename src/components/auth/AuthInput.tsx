import { forwardRef, InputHTMLAttributes, ReactNode } from 'react';

interface AuthInputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  icon: ReactNode;
  rightElement?: ReactNode;
  error?: string; 
}

const AuthInput = forwardRef<HTMLInputElement, AuthInputProps>(
  ({ label, icon, rightElement, error, ...props }, ref) => {
    return (
      <div className="flex w-full flex-col gap-1">
        <label className="text-xs font-bold uppercase tracking-wide text-slate-600">
          {label}
        </label>
        <div className="relative flex items-center">
          <div className="absolute left-3 text-slate-400">{icon}</div>
          <input
            ref={ref}
            {...props}
            className={`w-full rounded-lg border bg-white py-2.5 pl-10 pr-10 text-sm text-slate-900 outline-none transition-all placeholder:text-slate-400 focus:ring-4 ${
              error
                ? 'border-red-500 focus:border-red-500 focus:ring-red-500/10'
                : 'border-slate-200 focus:border-indigo-500 focus:ring-indigo-500/5'
            }`}
          />
          {rightElement && (
            <div className="absolute right-3 cursor-pointer text-slate-400 hover:text-slate-600">
              {rightElement}
            </div>
          )}
        </div>
        {error && <span className="mt-1 text-xs font-medium text-red-500">{error}</span>}
      </div>
    );
  }
);

AuthInput.displayName = 'AuthInput';
export default AuthInput;