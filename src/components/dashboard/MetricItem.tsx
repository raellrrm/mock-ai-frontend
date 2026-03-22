interface MetricItemProps {
  value: string;
  label: string;
}

export default function MetricItem({ value, label }: MetricItemProps) {
  return (
    <div className="flex flex-col items-center justify-center text-center p-6">
     
      <span className="text-4xl font-black tracking-tighter text-indigo-500 sm:text-5xl">
        {value}
      </span>

      <span className="mt-2 text-sm font-medium uppercase tracking-widest text-slate-500">
        {label}
      </span>
    </div>
  );
}