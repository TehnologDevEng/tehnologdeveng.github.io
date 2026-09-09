import { Lightbulb, Cpu, Activity, ShieldAlert } from 'lucide-react';

export function AiAnalyzerSection() {
  return (
    <section id="ai-analyzer" className="py-16 sm:py-24 bg-[#080b13] border-t border-slate-800/80">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 text-center">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 rounded-full border border-slate-700/50 bg-slate-800/50 px-3 py-1.5 text-xs font-mono font-medium text-slate-300 mb-6 shadow-sm">
          <Lightbulb className="h-4 w-4 text-amber-400" />
          <span>ПРОТОТИП В РАЗРАБОТКЕ</span>
        </div>

        <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight mb-4">
          ESP <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-400">AI ANALYZER</span>
        </h2>

        <p className="text-slate-400 text-sm sm:text-base max-w-2xl mx-auto leading-relaxed mb-12">
          Концепт интеллектуальной системы предиктивной диагностики. В будущем продукт позволит анализировать сырые потоки телеметрии с контроллеров СУ и с помощью алгоритмов машинного обучения выявлять предаварийные паттерны до отказа оборудования.
        </p>

        {/* Minimalist Grid of Concepts */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-left">
          <div className="rounded-2xl border border-slate-800/60 bg-[#0b0f19] p-6 transition-all hover:border-blue-500/30 hover:bg-[#0d1220] hover:shadow-lg hover:shadow-blue-900/10 group">
            <div className="h-10 w-10 rounded-xl bg-blue-950/50 flex items-center justify-center border border-blue-900/50 mb-5 group-hover:scale-110 transition-transform">
              <Activity className="h-5 w-5 text-blue-400" />
            </div>
            <h3 className="text-sm font-bold text-white mb-2">Потоковый анализ</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Непрерывный мониторинг высокочастотных данных: токи, давление на приеме, температура и вибрация ПЭД.
            </p>
          </div>
          
          <div className="rounded-2xl border border-slate-800/60 bg-[#0b0f19] p-6 transition-all hover:border-emerald-500/30 hover:bg-[#0d1220] hover:shadow-lg hover:shadow-emerald-900/10 group">
            <div className="h-10 w-10 rounded-xl bg-emerald-950/50 flex items-center justify-center border border-emerald-900/50 mb-5 group-hover:scale-110 transition-transform">
              <Cpu className="h-5 w-5 text-emerald-400" />
            </div>
            <h3 className="text-sm font-bold text-white mb-2">Нейросетевая оценка</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Распознавание паттернов срыва подачи, засорения рабочих органов и теплового перегруза двигателя.
            </p>
          </div>
          
          <div className="rounded-2xl border border-slate-800/60 bg-[#0b0f19] p-6 transition-all hover:border-rose-500/30 hover:bg-[#0d1220] hover:shadow-lg hover:shadow-rose-900/10 group">
            <div className="h-10 w-10 rounded-xl bg-rose-950/50 flex items-center justify-center border border-rose-900/50 mb-5 group-hover:scale-110 transition-transform">
              <ShieldAlert className="h-5 w-5 text-rose-400" />
            </div>
            <h3 className="text-sm font-bold text-white mb-2">Предотвращение аварий</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Автоматическая выдача рекомендаций технологу по корректировке частоты или уставок защиты.
            </p>
          </div>
        </div>
        
        {/* Minimalist Visual (Abstract Code / Pulse) */}
        <div className="mt-12 rounded-2xl border border-slate-800/80 bg-[#0b0f19] p-8 overflow-hidden relative flex flex-col items-center justify-center">
           <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAiIGhlaWdodD0iMjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGNpcmNsZSBjeD0iMiIgY3k9IjIiIHI9IjEiIGZpbGw9InJnYmEoMjU1LDI1NSwyNTUsMC4wNSkiLz48L3N2Zz4=')] opacity-50" />
           <div className="relative z-10 flex items-center gap-3 mb-4">
             <span className="h-2 w-2 rounded-full bg-slate-600 animate-pulse" />
             <span className="h-2 w-2 rounded-full bg-slate-600 animate-pulse delay-75" />
             <span className="h-2 w-2 rounded-full bg-blue-500 animate-pulse delay-150 shadow-[0_0_8px_rgba(59,130,246,0.8)]" />
           </div>
           <div className="relative z-10 font-mono text-xs text-slate-500">
             // Обучение предиктивной модели на исторических данных фонда...
           </div>
        </div>
      </div>
    </section>
  );
}
