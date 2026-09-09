import { useEffect, useState } from 'react';
import { X, ExternalLink, Check, BookOpen, Layers, ArrowRight, Play } from 'lucide-react';
import { modalsData } from '../data/engineeringData.ts';

interface ModalDetailProps {
  modalId: string | null;
  onClose: () => void;
  onOpenDemo?: () => void;
}

export function ModalDetail({ modalId, onClose, onOpenDemo }: ModalDetailProps) {
  const [activeTab, setActiveTab] = useState<'overview' | 'instruction'>('overview');

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (modalId) {
      window.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [modalId, onClose]);

  if (!modalId) return null;
  const data = modalsData[modalId];
  if (!data) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/80 backdrop-blur-sm"
      role="dialog"
      aria-modal="true"
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div className="relative flex flex-col w-full max-w-2xl max-h-[90vh] rounded-2xl border border-slate-700 bg-[#0f1523] text-slate-100 shadow-2xl overflow-hidden animate-in fade-in duration-200">
        {/* Modal Header */}
        <div className="flex items-start justify-between border-b border-slate-800 p-5 sm:p-6 pb-4">
          <div>
            <span className="text-[11px] font-mono font-semibold uppercase tracking-wider text-blue-400">
              СПЕЦИФИКАЦИЯ МОДУЛЯ
            </span>
            <h3 className="text-xl sm:text-2xl font-bold text-white mt-1">
              {data.title}
            </h3>
            {data.subtitle && (
              <p className="text-xs text-slate-400 mt-0.5">{data.subtitle}</p>
            )}
          </div>
          <button
            type="button"
            onClick={onClose}
            className="rounded-lg p-1.5 text-slate-400 hover:bg-slate-800 hover:text-white transition-colors"
            aria-label="Закрыть окно"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Tab switch if instruction exists */}
        {data.instruction && (
          <div className="flex border-b border-slate-800 px-6 bg-[#0c101c]">
            <button
              type="button"
              onClick={() => setActiveTab('overview')}
              className={`flex items-center gap-2 py-3 px-3 text-xs font-semibold border-b-2 transition-all ${
                activeTab === 'overview'
                  ? 'border-blue-500 text-white'
                  : 'border-transparent text-slate-400 hover:text-slate-200'
              }`}
            >
              <Layers className="h-3.5 w-3.5" />
              <span>Обзор возможностей</span>
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('instruction')}
              className={`flex items-center gap-2 py-3 px-3 text-xs font-semibold border-b-2 transition-all ${
                activeTab === 'instruction'
                  ? 'border-blue-500 text-white'
                  : 'border-transparent text-slate-400 hover:text-slate-200'
              }`}
            >
              <BookOpen className="h-3.5 w-3.5" />
              <span>Руководство & Методика расчёта</span>
            </button>
          </div>
        )}

        {/* Modal Body */}
        <div className="overflow-y-auto p-5 sm:p-6 space-y-6 text-sm">
          {activeTab === 'overview' || !data.instruction ? (
            <>
              {/* Product Screenshot */}
              {data.imageSrc && (
                <div className="overflow-hidden rounded-xl border border-slate-700/80 bg-slate-950 shadow-md">
                  <div className="relative aspect-[16/9] overflow-hidden bg-slate-900">
                    <img
                      src={data.imageSrc}
                      alt={data.title}
                      referrerPolicy="no-referrer"
                      className="h-full w-full object-cover object-top"
                    />
                  </div>
                  {data.imageCaption && (
                    <div className="bg-slate-900/90 px-3 py-1.5 border-t border-slate-800 text-[11px] font-mono text-slate-300">
                      {data.imageCaption}
                    </div>
                  )}
                </div>
              )}

              {/* Description */}
              <div>
                <h4 className="text-xs font-mono font-semibold uppercase text-slate-400 mb-2">
                  Описание назначения
                </h4>
                <p className="text-sm text-slate-300 leading-relaxed bg-[#0b0f19] p-4 rounded-xl border border-slate-800/80">
                  {data.description}
                </p>
              </div>

              {/* Features list */}
              <div>
                <h4 className="text-xs font-mono font-semibold uppercase text-slate-400 mb-3">
                  Ключевые функциональные возможности
                </h4>
                <div className="space-y-2.5">
                  {data.features.map((feat, idx) => (
                    <div key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-300">
                      <div className="h-5 w-5 rounded-full bg-blue-500/10 border border-blue-500/30 flex items-center justify-center flex-shrink-0 mt-0.5 text-blue-400">
                        <Check className="h-3 w-3" />
                      </div>
                      <span className="leading-snug">{feat}</span>
                    </div>
                  ))}
                </div>
              </div>
            </>
          ) : (
            /* Instruction / Formula Tab */
            <div className="space-y-5">
              <div className="flex items-center justify-between pb-2 border-b border-slate-800">
                <span className="text-xs font-mono text-blue-400 font-semibold">
                  {data.instruction.version}
                </span>
                <span className="text-[11px] font-mono text-slate-500">
                  Методические указания технологу
                </span>
              </div>

              <div>
                <h4 className="text-xs font-bold text-white uppercase mb-1">
                  1. Назначение программы
                </h4>
                <p className="text-xs text-slate-300 leading-relaxed">
                  {data.instruction.purpose}
                </p>
              </div>

              <div>
                <h4 className="text-xs font-bold text-white uppercase mb-2">
                  2. Входные технологические параметры
                </h4>
                <div className="divide-y divide-slate-800 border border-slate-800 rounded-xl overflow-hidden text-xs bg-[#0b0f19]">
                  {data.instruction.inputs.map((inp, idx) => (
                    <div key={idx} className="p-3 flex justify-between gap-4">
                      <div>
                        <span className="font-semibold text-white">{inp.name}</span>
                        <p className="text-slate-400 text-[11px] mt-0.5">{inp.desc}</p>
                      </div>
                      {inp.unit && (
                        <span className="font-mono text-blue-400 text-xs flex-shrink-0 self-center">
                          {inp.unit}
                        </span>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h4 className="text-xs font-bold text-white uppercase mb-2">
                  3. Алгоритм гидравлического расчета
                </h4>
                <ol className="space-y-2 text-xs text-slate-300 list-decimal list-inside bg-[#0b0f19] p-4 rounded-xl border border-slate-800">
                  {data.instruction.calculationSteps.map((step, idx) => (
                    <li key={idx} className="leading-relaxed">
                      <span>{step}</span>
                    </li>
                  ))}
                </ol>
              </div>

              <div>
                <h4 className="text-xs font-bold text-white uppercase mb-2">
                  4. Инженерные рекомендации
                </h4>
                <ul className="space-y-1.5 text-xs text-slate-300">
                  {data.instruction.recommendations.map((rec, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <div className="h-1.5 w-1.5 rounded-full bg-amber-400 mt-1.5 flex-shrink-0" />
                      <span>{rec}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="flex flex-wrap items-center justify-between gap-3 border-t border-slate-800 bg-[#0c101c] p-4 sm:p-5">
          <div className="flex flex-wrap items-center gap-2">
            {data.id === 'modal-calc' && (
              <button
                type="button"
                onClick={() => {
                  onClose();
                  onOpenDemo?.();
                }}
                className="inline-flex items-center gap-1.5 rounded-lg border border-emerald-500/50 bg-emerald-950/60 px-3.5 py-2 text-xs font-semibold text-emerald-300 hover:bg-emerald-900/80 transition-colors shadow-sm"
              >
                <Play className="h-3.5 w-3.5 text-emerald-400 fill-emerald-400/20" />
                <span>Запустить Демо v4.0 PRO</span>
              </button>
            )}

            {data.externalUrl && (
              <a
                href={data.externalUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-xs font-semibold text-white hover:bg-blue-500 transition-colors shadow-md shadow-blue-900/40"
              >
                <span>{data.externalUrlText || 'Открыть инструмент в новом окне'}</span>
                <ExternalLink className="h-3.5 w-3.5" />
              </a>
            )}
          </div>

          <button
            type="button"
            onClick={onClose}
            className="rounded-lg border border-slate-700 bg-slate-800 px-4 py-2 text-xs font-medium text-slate-300 hover:bg-slate-700 hover:text-white transition-colors"
          >
            Закрыть
          </button>
        </div>
      </div>
    </div>
  );
}
