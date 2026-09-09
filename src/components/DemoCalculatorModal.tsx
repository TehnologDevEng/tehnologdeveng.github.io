import { useState, useRef, useEffect, useCallback } from 'react';
import {
  X,
  Maximize2,
  Minimize2,
  RotateCcw,
  ExternalLink,
  Cpu,
  CheckCircle2,
  Globe,
  HardDrive,
  RefreshCw,
  AlertTriangle,
} from 'lucide-react';

interface DemoCalculatorModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const GITHUB_ONLINE_URL = 'https://tehnologdeveng.github.io/engineering-calculator/';

export function DemoCalculatorModal({ isOpen, onClose }: DemoCalculatorModalProps) {
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [sourceType, setSourceType] = useState<'local' | 'online'>('online');
  const [currentUrl, setCurrentUrl] = useState<string>(GITHUB_ONLINE_URL);
  const [isErrorDetected, setIsErrorDetected] = useState(false);
  const iframeRef = useRef<HTMLIFrameElement>(null);

  // Compute normalized relative path based on Vite's base path
  const getLocalUrl = useCallback(() => {
    const base = import.meta.env.BASE_URL || './';
    const cleanBase = base.endsWith('/') ? base : `${base}/`;
    return `${cleanBase}engineering-calculator.html`;
  }, []);

  // Determine initial URL on open
  useEffect(() => {
    if (!isOpen) return;

    setIsLoading(true);
    setIsErrorDetected(false);

    const isGithubHost =
      typeof window !== 'undefined' && window.location.hostname.includes('github.io');
    const localUrl = getLocalUrl();

    // If already hosted on GitHub Pages, test if the local relative file is reachable.
    // If not (e.g. 404 because of subpath routing), immediately fall back to the live GitHub Pages URL
    fetch(localUrl, { method: 'HEAD' })
      .then((res) => {
        if (res.ok) {
          // If we are on GitHub and local file is available, we can use local or online
          setCurrentUrl(localUrl);
          setSourceType('local');
        } else {
          // Local file returned 404 or not ok -> use live GitHub Pages deployment
          setCurrentUrl(GITHUB_ONLINE_URL);
          setSourceType('online');
        }
      })
      .catch(() => {
        // Network error or fetch blocked -> fallback to GitHub Pages URL if on GitHub, else local
        if (isGithubHost) {
          setCurrentUrl(GITHUB_ONLINE_URL);
          setSourceType('online');
        } else {
          setCurrentUrl(localUrl);
          setSourceType('local');
        }
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [isOpen, getLocalUrl]);

  // Handle ESC key to close
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleReload = () => {
    if (iframeRef.current && currentUrl) {
      setIsLoading(true);
      setIsErrorDetected(false);
      iframeRef.current.src = currentUrl;
    }
  };

  const handleSwitchSource = (type: 'local' | 'online') => {
    setIsLoading(true);
    setIsErrorDetected(false);
    if (type === 'online') {
      setCurrentUrl(GITHUB_ONLINE_URL);
      setSourceType('online');
    } else {
      const localUrl = getLocalUrl();
      setCurrentUrl(localUrl);
      setSourceType('local');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 p-2 sm:p-4 backdrop-blur-md animate-in fade-in duration-200">
      <div
        className={`relative flex flex-col rounded-2xl border border-slate-700/80 bg-[#090d16] shadow-2xl transition-all duration-300 ${
          isFullscreen
            ? 'h-[98vh] w-[99vw] max-w-none rounded-lg'
            : 'h-[92vh] w-full max-w-7xl'
        }`}
      >
        {/* Modal Top Bar */}
        <div className="flex flex-wrap items-center justify-between border-b border-slate-800/90 bg-[#0d1322] px-4 py-2.5 gap-2 flex-shrink-0">
          <div className="flex items-center gap-2.5 min-w-0">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 flex-shrink-0">
              <Cpu className="h-4 w-4" />
            </div>
            <div className="min-w-0">
              <div className="flex items-center gap-2">
                <h3 className="text-sm sm:text-base font-bold text-white truncate">
                  Инженерный калькулятор технолога УЭЦН v4.0 PRO
                </h3>
                <span className="hidden md:inline-flex items-center gap-1 rounded bg-emerald-950/80 border border-emerald-700/60 px-2 py-0.5 text-[10px] font-mono text-emerald-300 font-semibold">
                  <CheckCircle2 className="h-3 w-3" /> Live Demo
                </span>
              </div>
              <p className="text-[11px] text-slate-400 truncate hidden sm:block">
                ПВ/ПКВ · Колонна НКТ · Гидравлика & Кпр · Электрокомплекс СУ/ТМПН · Охлаждение ПЭД
              </p>
            </div>
          </div>

          {/* Action Toolbar */}
          <div className="flex flex-wrap items-center gap-1.5 sm:gap-2">
            {/* Source switcher pills */}
            <div className="hidden sm:inline-flex items-center rounded-lg border border-slate-700 bg-slate-900/90 p-0.5 text-[11px] font-mono">
              <button
                type="button"
                onClick={() => handleSwitchSource('online')}
                className={`flex items-center gap-1 rounded-md px-2 py-1 transition-colors ${
                  sourceType === 'online'
                    ? 'bg-emerald-600 text-white font-semibold'
                    : 'text-slate-400 hover:text-white'
                }`}
                title="Использовать онлайн-версию с GitHub Pages (рекомендуется для стабильности)"
              >
                <Globe className="h-3 w-3" />
                <span>GitHub Online</span>
              </button>
              <button
                type="button"
                onClick={() => handleSwitchSource('local')}
                className={`flex items-center gap-1 rounded-md px-2 py-1 transition-colors ${
                  sourceType === 'local'
                    ? 'bg-emerald-600 text-white font-semibold'
                    : 'text-slate-400 hover:text-white'
                }`}
                title="Использовать локальный встроенный файл"
              >
                <HardDrive className="h-3 w-3" />
                <span>Локально</span>
              </button>
            </div>

            <button
              type="button"
              onClick={handleReload}
              className="inline-flex items-center gap-1.5 rounded-lg border border-slate-700 bg-slate-800/80 px-2.5 py-1.5 text-xs text-slate-300 hover:bg-slate-700 hover:text-white transition-colors"
              title="Перезагрузить калькулятор"
            >
              <RotateCcw className="h-3.5 w-3.5" />
              <span className="hidden sm:inline">Сбросить</span>
            </button>

            <a
              href={currentUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 rounded-lg border border-slate-700 bg-slate-800/80 px-2.5 py-1.5 text-xs text-slate-300 hover:bg-slate-700 hover:text-white transition-colors"
              title="Открыть во вкладке браузера без фрейма"
            >
              <ExternalLink className="h-3.5 w-3.5" />
              <span className="hidden sm:inline">Новая вкладка</span>
            </a>

            <button
              type="button"
              onClick={() => setIsFullscreen(!isFullscreen)}
              className="inline-flex items-center justify-center rounded-lg border border-slate-700 bg-slate-800/80 p-1.5 text-slate-300 hover:bg-slate-700 hover:text-white transition-colors"
              title={isFullscreen ? 'Уменьшить окно' : 'На весь экран'}
            >
              {isFullscreen ? <Minimize2 className="h-4 w-4" /> : <Maximize2 className="h-4 w-4" />}
            </button>

            <button
              type="button"
              onClick={onClose}
              className="inline-flex items-center justify-center rounded-lg border border-slate-700 bg-rose-950/30 text-rose-300 hover:bg-rose-900/50 hover:text-white p-1.5 transition-colors ml-1"
              title="Закрыть окно (Esc)"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        </div>

        {/* Fallback alert if user is seeing issues with local mode */}
        {isErrorDetected && sourceType === 'local' && (
          <div className="flex items-center justify-between gap-3 bg-amber-950/80 border-b border-amber-600/40 px-4 py-2 text-xs text-amber-200">
            <div className="flex items-center gap-2">
              <AlertTriangle className="h-4 w-4 text-amber-400 flex-shrink-0" />
              <span>
                Локальный файл не найден на текущем пути GitHub. Переключитесь на онлайн-версию GitHub Pages:
              </span>
            </div>
            <button
              type="button"
              onClick={() => handleSwitchSource('online')}
              className="rounded bg-emerald-600 px-2.5 py-1 font-semibold text-white hover:bg-emerald-500 transition-colors"
            >
              Включить GitHub Online
            </button>
          </div>
        )}

        {/* Iframe Viewport */}
        <div className="relative flex-1 w-full bg-[#070a12] overflow-hidden">
          {isLoading && (
            <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 bg-[#090d16] text-slate-400 z-10">
              <div className="h-8 w-8 animate-spin rounded-full border-2 border-emerald-500 border-t-transparent" />
              <span className="text-xs font-mono">Загрузка инженерного комплекса v4.0 PRO...</span>
            </div>
          )}

          {currentUrl && (
            <iframe
              ref={iframeRef}
              src={currentUrl}
              title="Инженерный калькулятор технолога v4.0 PRO"
              onLoad={() => setIsLoading(false)}
              onError={() => {
                setIsLoading(false);
                setIsErrorDetected(true);
                handleSwitchSource('online');
              }}
              className="h-full w-full border-0 bg-[#070a12]"
              sandbox="allow-scripts allow-forms allow-same-origin allow-downloads allow-modals"
            />
          )}
        </div>

        {/* Status Bar */}
        <div className="flex flex-wrap items-center justify-between border-t border-slate-800/80 bg-[#090d16] px-4 py-2 text-[11px] text-slate-400 font-mono gap-2">
          <div className="flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="truncate">
              {sourceType === 'online'
                ? 'Режим: GitHub Pages Online (tehnologdeveng.github.io/engineering-calculator)'
                : 'Режим: Автономный локальный модуль (offline)'}
            </span>
          </div>

          <div className="flex items-center gap-3">
            {sourceType === 'local' && (
              <button
                type="button"
                onClick={() => handleSwitchSource('online')}
                className="text-blue-400 hover:text-blue-300 underline transition-colors"
              >
                Если 404 → переключить на GitHub Online
              </button>
            )}
            <button
              type="button"
              onClick={onClose}
              className="text-slate-400 hover:text-slate-200 transition-colors"
            >
              Закрыть [Esc]
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
