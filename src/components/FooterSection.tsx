import { ArrowUp, Mail } from 'lucide-react';
import { authorData, productsList } from '../data/engineeringData.ts';

export function FooterSection() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="border-t border-slate-800/80 bg-[#090d16] py-12 text-slate-400 text-xs">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 mb-8">
          {/* Col 1: Brand & bio */}
          <div className="md:col-span-5 space-y-3">
            <div className="flex items-center gap-2 text-white font-bold text-base">
              <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-blue-600/20 text-blue-400 font-mono text-xs border border-blue-500/30">
                АН
              </span>
              <span>{authorData.name}</span>
            </div>
            <p className="text-slate-400 max-w-md leading-relaxed">
              Инженерные веб-инструменты для технологов нефтегазовой отрасли.
              Расчёт режимов работы скважин УЭЦН, подбор оборудования и интеллектуальная диагностика телеметрии.
            </p>
            <div className="text-slate-500 font-mono text-[11px]">
              Автономный статический режим · Без серверных зависимостей
            </div>
          </div>

          {/* Col 2: Engineering links */}
          <div className="md:col-span-3 space-y-2.5">
            <div className="font-mono font-semibold uppercase text-slate-300 text-xs tracking-wider">
              Модули & Инструменты
            </div>
            <ul className="space-y-1.5">
              {productsList.map((p) => (
                <li key={p.id}>
                  <a
                    href={p.externalUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-blue-400 transition-colors"
                  >
                    {p.title}
                  </a>
                </li>
              ))}
              <li>
                <a href="#esp-ai-analyzer" className="hover:text-blue-400 transition-colors">
                  ESP AI ANALYZER
                </a>
              </li>
            </ul>
          </div>

          {/* Col 3: Contacts */}
          <div className="md:col-span-4 space-y-2.5">
            <div className="font-mono font-semibold uppercase text-slate-300 text-xs tracking-wider">
              Контакты
            </div>
            <ul className="space-y-2.5">
              <li>
                <a
                  href={`mailto:${authorData.email}`}
                  className="inline-flex items-center gap-2 text-slate-300 hover:text-blue-400 transition-colors font-mono text-xs"
                  title="Написать на электронную почту"
                >
                  <Mail className="h-3.5 w-3.5 text-blue-400 flex-shrink-0" />
                  <span>{authorData.email}</span>
                </a>
              </li>

              <li className="text-slate-500 font-mono text-[11px] pt-1 leading-relaxed">
                По вопросам сотрудничества, внедрения в технологический процесс и доработки алгоритмов
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-6 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            © {new Date().getFullYear()} {authorData.name} · Инженерные веб-разработки УЭЦН
          </div>

          <button
            type="button"
            onClick={scrollToTop}
            className="flex items-center gap-1.5 rounded-md border border-slate-800 bg-slate-900 px-3 py-1 text-slate-300 hover:bg-slate-800 hover:text-white transition-colors"
          >
            <span>Наверх</span>
            <ArrowUp className="h-3 w-3" />
          </button>
        </div>
      </div>
    </footer>
  );
}
