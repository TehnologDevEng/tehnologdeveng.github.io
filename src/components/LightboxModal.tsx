import { useEffect } from 'react';
import { X, ChevronLeft, ChevronRight, Maximize2 } from 'lucide-react';
import { screenshotGallery } from '../data/engineeringData.ts';

interface LightboxModalProps {
  currentSrc: string | null;
  currentTitle: string;
  currentDesc: string;
  onClose: () => void;
  onNavigate: (direction: 'prev' | 'next') => void;
}

export function LightboxModal({
  currentSrc,
  currentTitle,
  currentDesc,
  onClose,
  onNavigate,
}: LightboxModalProps) {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowLeft') onNavigate('prev');
      if (e.key === 'ArrowRight') onNavigate('next');
    };
    if (currentSrc) {
      window.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [currentSrc, onClose, onNavigate]);

  if (!currentSrc) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-black/90 backdrop-blur-md"
      role="dialog"
      aria-modal="true"
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div className="relative flex flex-col w-full max-w-5xl max-h-[95vh] rounded-2xl border border-slate-800 bg-[#0b0f19] text-white shadow-2xl overflow-hidden">
        {/* Top bar */}
        <div className="flex items-center justify-between border-b border-slate-800 bg-[#0f1523] px-4 py-3">
          <div className="flex items-center gap-3">
            <span className="font-mono text-xs font-semibold text-blue-400">
              ESP AI ANALYZER · SCREENSHOT
            </span>
            <span className="text-slate-600">|</span>
            <h4 className="text-xs sm:text-sm font-bold text-white truncate max-w-md">
              {currentTitle}
            </h4>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={onClose}
              className="rounded-lg p-1.5 text-slate-400 hover:bg-slate-800 hover:text-white transition-colors"
              aria-label="Закрыть"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
        </div>

        {/* Image viewport with next/prev buttons */}
        <div className="relative flex-1 min-h-[300px] sm:min-h-[480px] flex items-center justify-center bg-black/60 overflow-hidden p-2">
          <img
            src={currentSrc}
            alt={currentTitle}
            referrerPolicy="no-referrer"
            className="max-h-[70vh] w-auto max-w-full object-contain rounded-lg shadow-2xl"
          />

          {/* Navigation Arrows */}
          <button
            type="button"
            onClick={() => onNavigate('prev')}
            className="absolute left-3 top-1/2 -translate-y-1/2 rounded-full bg-slate-900/80 border border-slate-700 p-2 text-slate-300 hover:bg-blue-600 hover:text-white transition-colors"
            title="Предыдущий скриншот (Стрелка влево)"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
          <button
            type="button"
            onClick={() => onNavigate('next')}
            className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full bg-slate-900/80 border border-slate-700 p-2 text-slate-300 hover:bg-blue-600 hover:text-white transition-colors"
            title="Следующий скриншот (Стрелка вправо)"
          >
            <ChevronRight className="h-5 w-5" />
          </button>
        </div>

        {/* Description bottom bar */}
        <div className="border-t border-slate-800 bg-[#0f1523] p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs">
          <div className="text-slate-300 leading-relaxed max-w-3xl">
            {currentDesc}
          </div>
          <div className="flex items-center gap-2 text-slate-500 font-mono text-[11px] self-end sm:self-auto">
            <span>← / → навигация</span>
            <span>•</span>
            <span>Esc закрыть</span>
          </div>
        </div>
      </div>
    </div>
  );
}
