import { useState } from 'react';
import { Menu, X, Mail, Play } from 'lucide-react';
import { authorData } from '../data/engineeringData.ts';

interface HeaderNavProps {
  onOpenDemo?: () => void;
}

export function HeaderNav({ onOpenDemo }: HeaderNavProps) {
  const [mobileMenu, setMobileMenu] = useState(false);

  return (
    <nav className="sticky top-0 z-40 w-full border-b border-slate-800/80 bg-[#0b0f19]/90 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6">
        {/* Brand identity */}
        <a href="#" className="flex items-center gap-3 text-slate-100 hover:text-white transition-colors">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-blue-600/20 border border-blue-500/30 text-blue-400 font-mono font-bold text-sm">
            АН
          </div>
          <div>
            <div className="font-semibold text-sm sm:text-base leading-tight">
              {authorData.name}
            </div>
            <div className="text-[11px] font-mono text-slate-400">
              Инженерные инструменты УЭЦН
            </div>
          </div>
        </a>

        {/* Desktop Navigation Links */}
        <div className="hidden lg:flex items-center gap-6 text-xs font-medium uppercase tracking-wider text-slate-300">
          <a href="#products" className="hover:text-blue-400 transition-colors">
            Продукты
          </a>
          <a href="#interactive-demo" className="hover:text-blue-400 transition-colors flex items-center gap-1.5">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
            </span>
            Экспресс-демо
          </a>
          <a href="#esp-ai-analyzer" className="hover:text-blue-400 transition-colors">
            ESP AI ANALYZER
          </a>
          <a href="#gallery" className="hover:text-blue-400 transition-colors">
            Интерфейсы
          </a>
          <a href="#about" className="hover:text-blue-400 transition-colors">
            Об авторе
          </a>
        </div>

        {/* Action button & Direct Mail */}
        <div className="hidden sm:flex items-center gap-2.5">
          <button
            type="button"
            onClick={onOpenDemo}
            className="inline-flex items-center gap-1.5 rounded-lg border border-emerald-500/50 bg-emerald-950/50 px-3 py-1.5 text-xs font-semibold text-emerald-300 hover:bg-emerald-900/70 hover:text-emerald-200 transition-colors shadow-sm"
            title="Запустить интерактивный калькулятор v4.0 PRO"
          >
            <Play className="h-3 w-3 text-emerald-400 fill-emerald-400/20" />
            <span>Демо v4.0 PRO</span>
          </button>

          <a
            href={`mailto:${authorData.email}`}
            className="flex items-center gap-1.5 rounded-lg border border-slate-700/80 bg-slate-900/80 px-3 py-1.5 text-xs font-mono text-slate-300 hover:border-slate-600 hover:text-blue-300 transition-colors"
            title="Написать на электронную почту"
          >
            <Mail className="h-3.5 w-3.5 text-blue-400" />
            <span>{authorData.email}</span>
          </a>
        </div>

        {/* Mobile menu button */}
        <div className="flex sm:hidden items-center gap-2">
          <button
            type="button"
            onClick={onOpenDemo}
            className="flex items-center gap-1 rounded-md border border-emerald-500/50 bg-emerald-950/60 px-2 py-1 text-xs font-mono text-emerald-300 font-semibold"
            title="Открыть демо"
          >
            <Play className="h-3 w-3 text-emerald-400" />
            <span>Демо</span>
          </button>
          <button
            type="button"
            onClick={() => setMobileMenu(!mobileMenu)}
            className="rounded-lg p-2 text-slate-400 hover:bg-slate-800 hover:text-white"
            aria-label="Toggle menu"
          >
            {mobileMenu ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Mobile dropdown */}
      {mobileMenu && (
        <div className="border-b border-slate-800 bg-[#0c101c] px-4 py-4 sm:hidden">
          {/* Email Quick Box on Mobile */}
          <div className="mb-4 rounded-xl border border-slate-800 bg-slate-900/90 p-3">
            <div className="text-[11px] font-mono uppercase text-slate-400 font-semibold mb-1">
              Электронная почта
            </div>
            <a
              href={`mailto:${authorData.email}`}
              className="flex items-center gap-2 text-xs font-mono font-medium text-blue-400 hover:underline truncate"
            >
              <Mail className="h-3.5 w-3.5 flex-shrink-0" />
              <span className="truncate">{authorData.email}</span>
            </a>
          </div>

          <div className="flex flex-col gap-3 text-sm font-medium text-slate-300">
            <a
              href="#products"
              onClick={() => setMobileMenu(false)}
              className="py-1 hover:text-white"
            >
              Инженерные продукты
            </a>
            <a
              href="#interactive-demo"
              onClick={() => setMobileMenu(false)}
              className="py-1 text-blue-400 font-semibold flex items-center gap-2 hover:text-blue-300"
            >
              <span className="h-2 w-2 rounded-full bg-blue-400"></span>
              Экспресс-калькулятор & Симулятор AI
            </a>
            <a
              href="#esp-ai-analyzer"
              onClick={() => setMobileMenu(false)}
              className="py-1 hover:text-white"
            >
              ESP AI ANALYZER
            </a>
            <a
              href="#gallery"
              onClick={() => setMobileMenu(false)}
              className="py-1 hover:text-white"
            >
              Интерфейсы системы
            </a>
            <a
              href="#about"
              onClick={() => setMobileMenu(false)}
              className="py-1 hover:text-white"
            >
              Контакты автора
            </a>
            <button
              type="button"
              onClick={() => {
                setMobileMenu(false);
                onOpenDemo?.();
              }}
              className="flex items-center justify-center gap-2 rounded-lg bg-emerald-600 px-4 py-2.5 text-xs font-semibold text-white shadow-md mt-2"
            >
              <Play className="h-4 w-4 fill-white/20" />
              <span>Запустить Демо v4.0 PRO</span>
            </button>
          </div>
        </div>
      )}
    </nav>
  );
}
