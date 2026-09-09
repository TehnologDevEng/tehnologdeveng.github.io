import { Activity, Layers, Mail, Play } from 'lucide-react';
import { authorData } from '../data/engineeringData.ts';

interface HeroSectionProps {
  onOpenDemo?: () => void;
}

export function HeroSection({ onOpenDemo }: HeroSectionProps) {
  return (
    <section className="relative pt-8 pb-12 sm:pt-12 sm:pb-16 border-b border-slate-800/80">
      {/* Background ambient lighting */}
      <div className="absolute top-0 left-1/4 -z-10 h-72 w-96 rounded-full bg-blue-600/10 blur-3xl pointer-events-none" />
      <div className="absolute top-10 right-1/4 -z-10 h-64 w-80 rounded-full bg-cyan-600/10 blur-3xl pointer-events-none" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        {/* Header grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          <div className="lg:col-span-8">
            {/* Tagline pill */}
            <div className="inline-flex items-center gap-2 rounded-full border border-blue-500/20 bg-blue-950/40 px-3.5 py-1 text-xs font-mono font-medium text-blue-400 mb-4">
              <span className="h-1.5 w-1.5 rounded-full bg-blue-400 animate-pulse" />
              <span>{authorData.name} · ИНЖЕНЕРНЫЕ РАЗРАБОТКИ</span>
            </div>

            {/* Main title */}
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-white leading-[1.15] mb-4">
              Инструменты для технолога <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-300">УЭЦН</span>
            </h1>

            {/* Subtitle */}
            <p className="text-base sm:text-lg text-slate-300 max-w-2xl leading-relaxed mb-6">
              Веб-приложения для подбора оборудования, гидродинамического моделирования,
              расчёта электрических режимов и автоматизации рутинных технологических операций.
              Работают непосредственно в браузере, без установки и зависимостей.
            </p>

            {/* Meta chips */}
            <div className="flex flex-wrap items-center gap-3 text-xs sm:text-sm text-slate-400">
              <span className="inline-flex items-center gap-1.5 rounded-md bg-slate-900/90 border border-slate-800 px-2.5 py-1">
                📍 {authorData.location}
              </span>
              <span className="inline-flex items-center gap-1.5 rounded-md bg-slate-900/90 border border-slate-800 px-2.5 py-1">
                ⚡ {authorData.role}
              </span>
              <span className="inline-flex items-center gap-1.5 rounded-md bg-slate-900/90 border border-slate-800 px-2.5 py-1 font-mono text-slate-300">
                <Mail className="h-3 w-3 text-blue-400" />
                <a href={`mailto:${authorData.email}`} className="hover:text-blue-300 transition-colors">
                  {authorData.email}
                </a>
              </span>
              <span className="inline-flex items-center gap-1.5 rounded-md bg-blue-950/40 border border-blue-800/40 text-blue-300 px-2.5 py-1 font-mono">
                ⚡ 100% Web & Offline
              </span>
            </div>
          </div>

          {/* Status Badge & CTA Area */}
          <div className="lg:col-span-4 flex flex-col lg:items-end justify-between self-stretch pt-2">
            <div className="inline-flex items-center gap-2 rounded-full border border-blue-500/30 bg-blue-950/60 px-4 py-1.5 text-xs font-semibold text-blue-300 shadow-inner">
              <span className="h-2 w-2 rounded-full bg-blue-400 animate-ping" />
              <span>Промышленный софт</span>
            </div>

            <div className="mt-4 lg:text-right">
              <div className="text-sm font-semibold text-slate-200">
                Автоматизация расчётов & AI-телеметрия
              </div>
              <div className="text-xs text-slate-400 mt-1">
                Для промысловых инженеров, технологов и сервисных центров
              </div>
            </div>

            {/* Fast Action Buttons */}
            <div className="mt-6 flex flex-wrap lg:justify-end gap-2.5 w-full">
              <a
                href="#products"
                className="inline-flex items-center justify-center gap-2 rounded-lg bg-blue-600 px-4 py-2.5 text-xs font-semibold text-white shadow-lg shadow-blue-950 hover:bg-blue-500 transition-all"
              >
                <Layers className="h-4 w-4" />
                <span>Каталог разработок</span>
              </a>
              <button
                type="button"
                onClick={() => onOpenDemo?.()}
                className="inline-flex items-center justify-center gap-2 rounded-lg border border-emerald-500/60 bg-emerald-950/60 px-4 py-2.5 text-xs font-semibold text-emerald-300 hover:bg-emerald-900/80 hover:text-emerald-200 transition-all shadow-md"
                title="Запустить интерактивное демо калькулятора v4.0 PRO"
              >
                <Play className="h-4 w-4 text-emerald-400 fill-emerald-400/20" />
                <span>Демо v4.0 PRO</span>
              </button>
              <a
                href="#interactive-demo"
                className="inline-flex items-center justify-center gap-2 rounded-lg border border-slate-700 bg-slate-900 px-4 py-2.5 text-xs font-semibold text-slate-200 hover:bg-slate-800 hover:text-white transition-all"
              >
                <Activity className="h-4 w-4 text-blue-400" />
                <span>Телеметрия скважины</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
