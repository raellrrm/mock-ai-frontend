export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full border-t border-slate-800 bg-slate-950 py-8">
      <div className="container mx-auto flex flex-col items-center justify-between gap-4 px-4 sm:flex-row sm:px-6 lg:px-8">
  
        <div className="flex items-center gap-2">
          <div className="flex h-6 w-6 items-center justify-center rounded bg-slate-800 text-[10px] font-bold text-white">
            M
          </div>
          <span className="text-sm font-semibold text-slate-400">MockAI</span>
        </div>

        <p className="text-sm text-slate-500">
          © {currentYear} MockAI. Todos os direitos reservados.
        </p>

        <div className="flex gap-4 text-xs text-slate-500">
          <a href="#" className="hover:underline">Privacidade</a>
          <a href="#" className="hover:underline">Termos</a>
        </div>
      </div>
    </footer>
  );
}