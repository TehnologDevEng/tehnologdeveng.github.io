import { ExternalLink, Info, Check, Mail, Sparkles, Play, Copy, Calculator, Cog } from 'lucide-react';
import { productsList, authorData } from '../data/engineeringData.ts';

interface ProductsAndSidebarProps {
  onOpenModal: (modalId: string) => void;
  onOpenDemo?: () => void;
  onCopyEmail: () => void;
  copiedEmail: boolean;
}

export function ProductsAndSidebar({
  onOpenModal,
  onOpenDemo,
  onCopyEmail,
  copiedEmail,
}: ProductsAndSidebarProps) {
  return (
    <section id="products" className="py-12 sm:py-16 border-b border-slate-800/80">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Main Products List (8 cols) */}
          <div className="lg:col-span-8">
            <div className="mb-6">
              <div className="inline-flex items-center gap-2 font-mono text-xs font-semibold uppercase tracking-wider text-blue-400 mb-1.5">
                <span className="h-1.5 w-1.5 rounded-full bg-blue-400" />
                ИНЖЕНЕРНЫЙ СОФТ
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
                Инженерные продукты
              </h2>
              <p className="text-sm text-slate-400 mt-1">
                Локальные инструменты, которые закрывают ежедневные аналитические и расчетные задачи технолога УЭЦН
              </p>
            </div>

            {/* Bento-style Product cards without large fake screenshots */}
            <div className="grid grid-cols-1 gap-5">
              {productsList.map((product) => (
                <article
                  key={product.id}
                  className="group relative rounded-2xl border border-slate-800 bg-[#101625] p-6 transition-all duration-200 hover:border-blue-500/40 hover:bg-[#12192b] shadow-lg shadow-black/20"
                >
                  <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/5 rounded-full blur-3xl -z-10 group-hover:bg-blue-500/10 transition-colors" />
                  
                  {/* Card Header */}
                  <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 mb-4">
                    <div className="flex gap-4 items-start">
                      <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl bg-slate-800/50 border border-slate-700/50 text-blue-400 shadow-inner">
                        {product.id === 'calc-module' ? <Calculator className="h-6 w-6" /> : <Cog className="h-6 w-6" />}
                      </div>
                      <div>
                        <div className="flex flex-wrap items-center gap-2.5">
                          <h3 className="text-lg sm:text-xl font-bold text-white group-hover:text-blue-400 transition-colors">
                            {product.title}
                          </h3>
                          {product.badge && (
                            <span className="rounded-full bg-blue-950/80 border border-blue-800/40 px-2 py-0.5 text-[10px] font-mono text-blue-300">
                              {product.badge}
                            </span>
                          )}
                        </div>
                        <div className="text-sm font-medium text-slate-400 mt-0.5">
                          {product.subtitle}
                        </div>
                      </div>
                    </div>
                    
                    <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-950/60 border border-emerald-800/40 px-2.5 py-0.5 text-xs font-medium text-emerald-400 font-mono flex-shrink-0">
                      <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
                      {product.status}
                    </span>
                  </div>

                  {/* Description */}
                  <p className="text-sm text-slate-300 leading-relaxed mb-5">
                    {product.description}
                  </p>

                  {/* Features grid */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-2 mb-6 bg-slate-900/30 rounded-xl p-4 border border-slate-800/50">
                    {product.features.map((feat, fIdx) => (
                      <div key={fIdx} className="flex items-start gap-2.5 text-xs text-slate-300">
                        <Check className="h-3.5 w-3.5 text-blue-500 mt-0.5 flex-shrink-0" />
                        <span className="leading-snug">{feat}</span>
                      </div>
                    ))}
                  </div>

                  {/* Card Footer Actions */}
                  <div className="pt-5 border-t border-slate-800/80 flex flex-wrap items-center justify-between gap-4">
                    <div className="flex flex-wrap items-center gap-3">
                      <a
                        href={product.externalUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white shadow-md hover:bg-blue-500 transition-colors"
                      >
                        <span>Открыть приложение</span>
                        <ExternalLink className="h-3.5 w-3.5 opacity-80" />
                      </a>

                      {product.id === 'calc-module' && (
                        <button
                          type="button"
                          onClick={() =>
                            onOpenDemo
                              ? onOpenDemo()
                              : window.open('https://tehnologdeveng.github.io/engineering-calculator/', '_blank')
                          }
                          className="inline-flex items-center gap-1.5 rounded-lg border border-emerald-500/40 bg-emerald-950/40 px-4 py-2 text-sm font-semibold text-emerald-300 hover:bg-emerald-900/60 hover:text-emerald-200 transition-colors shadow-sm"
                          title="Запустить модульный калькулятор v4.0 PRO"
                        >
                          <Play className="h-3.5 w-3.5 text-emerald-400 fill-emerald-400/20" />
                          <span>Лайв Демо</span>
                        </button>
                      )}

                      <button
                        type="button"
                        onClick={() => onOpenModal(product.modalId)}
                        className="inline-flex items-center gap-1.5 rounded-lg border border-slate-700 hover:border-slate-600 bg-slate-800/50 px-3 py-2 text-sm font-medium text-slate-300 hover:bg-slate-700 hover:text-white transition-all"
                      >
                        <Info className="h-4 w-4 text-blue-400" />
                        <span className="hidden sm:inline">Спецификация</span>
                      </button>
                    </div>

                    <div className="flex flex-wrap gap-1.5">
                      {product.tags.map((tag, tIdx) => (
                        <span
                          key={tIdx}
                          className="rounded-md bg-slate-900 border border-slate-800 px-2 py-0.5 text-[10px] font-mono text-slate-400"
                        >
                          #{tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>

          {/* Sidebar: About author, expertise, contacts (4 cols) */}
          <aside id="about" className="lg:col-span-4 space-y-5">
            {/* Author Profile Card */}
            <div className="rounded-2xl border border-slate-800 bg-[#101625] p-5 sm:p-6 shadow-lg relative overflow-hidden">
              <div className="absolute top-0 right-0 p-3 opacity-20 pointer-events-none">
                <Cog className="w-24 h-24 text-blue-500 -rotate-12" />
              </div>
              
              <div className="flex items-center gap-4 mb-5 relative z-10">
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-600 to-indigo-700 text-white font-mono font-bold text-xl shadow-md shadow-blue-900/40 border border-blue-400/20">
                  АН
                </div>
                <div>
                  <h3 className="text-lg font-bold text-white leading-tight">
                    {authorData.name}
                  </h3>
                  <p className="text-sm font-mono text-blue-400 mt-0.5">
                    {authorData.role}
                  </p>
                </div>
              </div>

              {/* Author motto quote */}
              <blockquote className="rounded-xl bg-slate-900/50 border border-slate-800/80 p-4 text-sm text-slate-300 italic leading-relaxed mb-6 relative z-10">
                "{authorData.bio}"
              </blockquote>

              {/* Expertise */}
              <div className="mb-6 relative z-10">
                <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-slate-400 mb-3">
                  Инженерная экспертиза
                </h4>
                <ul className="space-y-2 text-sm text-slate-300">
                  {authorData.expertise.map((exp, eIdx) => (
                    <li key={eIdx} className="flex items-start gap-2.5">
                      <div className="h-1.5 w-1.5 rounded-full bg-blue-500 mt-2 flex-shrink-0" />
                      <span className="leading-snug">{exp}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Technologies */}
              <div className="mb-6 relative z-10">
                <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-slate-400 mb-3">
                  Стек технологий
                </h4>
                <div className="flex flex-wrap gap-2">
                  {authorData.technologies.map((tech, tIdx) => (
                    <span
                      key={tIdx}
                      className="rounded-lg bg-slate-900/80 border border-slate-700/80 px-2.5 py-1 text-[11px] font-mono font-medium text-blue-200"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              {/* Contact actions */}
              <div className="pt-5 border-t border-slate-800/80 space-y-3 relative z-10">
                <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-slate-400">
                  Прямой контакт
                </h4>

                {/* Email contact bar with integrated copy */}
                <div className="flex items-center justify-between gap-2 rounded-xl border border-slate-700 bg-slate-900/80 p-1.5 pl-3">
                  <a
                    href={`mailto:${authorData.email}`}
                    className="flex items-center gap-2 font-mono text-xs sm:text-sm text-blue-400 hover:text-blue-300 transition-colors truncate"
                    title="Написать на электронную почту"
                  >
                    <Mail className="h-4 w-4 flex-shrink-0 text-blue-400" />
                    <span className="truncate">{authorData.email}</span>
                  </a>
                  <button
                    type="button"
                    onClick={onCopyEmail}
                    className="flex items-center gap-1.5 rounded-lg border border-slate-700 bg-slate-800 px-3 py-1.5 text-xs font-mono font-medium text-slate-200 hover:bg-slate-700 hover:text-white transition-colors flex-shrink-0 shadow-sm"
                    title="Скопировать адрес"
                  >
                    {copiedEmail ? (
                      <>
                        <Check className="h-3.5 w-3.5 text-emerald-400" />
                        <span className="text-emerald-300 hidden sm:inline">Скопировано</span>
                      </>
                    ) : (
                      <>
                        <Copy className="h-3.5 w-3.5 text-slate-400" />
                        <span className="hidden sm:inline">Скопировать</span>
                      </>
                    )}
                  </button>
                </div>
                <p className="text-[11px] text-slate-400 leading-relaxed pt-1">
                  Сотрудничество, внедрение расчетов на скважинном фонде или кастомизация модулей.
                </p>
              </div>
            </div>

            {/* Industrial deployment notice card */}
            <div className="rounded-2xl border border-blue-500/20 bg-gradient-to-br from-[#10182c] to-[#0c111e] p-6 shadow-xl relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/10 rounded-full blur-2xl -z-10" />
              <div className="flex items-center gap-2.5 text-blue-400 mb-3 relative z-10">
                <Sparkles className="h-5 w-5" />
                <h4 className="text-sm font-bold uppercase tracking-wider font-mono">
                  Автономность решений
                </h4>
              </div>
              <p className="text-sm text-slate-300 leading-relaxed relative z-10">
                Все модули скомпилированы в чистый статический веб-код и работают
                в любом браузере. Они функционируют даже при обрывах связи на кусте
                и не требуют скрытых серверных вычислений.
              </p>
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
}
