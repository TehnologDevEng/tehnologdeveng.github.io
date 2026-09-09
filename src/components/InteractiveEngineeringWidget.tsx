import { useState, useMemo } from 'react';
import { Calculator, Cpu, AlertTriangle, CheckCircle2, AlertOctagon, RotateCcw, ArrowRight, Gauge, Activity, Flame, Zap } from 'lucide-react';
import { telemetryPresets } from '../data/engineeringData.ts';
import { TelemetrySample } from '../types.ts';

export function InteractiveEngineeringWidget() {
  const [activeTab, setActiveTab] = useState<'calc' | 'telemetry'>('calc');

  // Calculator states
  const [flowRate, setFlowRate] = useState<number>(85); // m3/day
  const [dynLevel, setDynLevel] = useState<number>(1420); // m
  const [bufPressure, setBufPressure] = useState<number>(16); // atm
  const [density, setDensity] = useState<number>(930); // kg/m3
  const [frequency, setFrequency] = useState<number>(50); // Hz

  // Telemetry simulation state
  const [selectedPresetId, setSelectedPresetId] = useState<string>('well-214');

  const selectedWell: TelemetrySample = useMemo(() => {
    return telemetryPresets.find((p) => p.id === selectedPresetId) || telemetryPresets[0];
  }, [selectedPresetId]);

  // Hydraulic calculations
  const calcResults = useMemo(() => {
    // Friction loss estimate in tubing 73mm (~0.0003 * Q^1.8 * L / 100)
    const frictionHead = Math.round(0.00028 * Math.pow(flowRate, 1.85) * (dynLevel / 100));
    // Pressure head: 1 atm = 101325 Pa. Head = P / (rho * g)
    const bufferHead = Math.round((bufPressure * 100000) / (density * 9.81));
    // Total required head at current frequency
    const baseHead = dynLevel + bufferHead + frictionHead;
    
    // Affine frequency scaling (H ~ (f / 50)^2, Q ~ f / 50)
    const freqFactorH = Math.pow(frequency / 50, 2);
    const scaledHead = Math.round(baseHead * freqFactorH);
    const scaledFlow = Math.round(flowRate * (frequency / 50));

    // Hydraulic power: N_hyd = (rho * g * Q * H) / (3600 * 1000) [kW]
    const q_m3_s = scaledFlow / 86400;
    const hydPowerKw = ((density * 9.81 * q_m3_s * scaledHead) / 1000);
    // Pump efficiency ~62%
    const pumpEff = 0.62;
    const shaftPowerKw = hydPowerKw / pumpEff;
    // Motor sizing with safety margin 1.25
    const recommendedMotorKw = Math.ceil((shaftPowerKw * 1.25) / 5) * 5; // round to standard 5kW step

    // Recommended pump series
    let pumpSeries = '5 габарит (насос ЭЦНД5)';
    if (scaledFlow > 125) {
      pumpSeries = '5А габарит (насос ЭЦН5А)';
    } else if (scaledFlow < 40) {
      pumpSeries = '5 габарит малодебитный';
    }

    return {
      totalHead: scaledHead,
      scaledFlow,
      frictionHead,
      bufferHead,
      hydPowerKw: hydPowerKw.toFixed(1),
      shaftPowerKw: shaftPowerKw.toFixed(1),
      motorRatingKw: recommendedMotorKw,
      pumpSeries,
    };
  }, [flowRate, dynLevel, bufPressure, density, frequency]);

  return (
    <section id="interactive-demo" className="py-12 sm:py-16 border-b border-slate-800/80 bg-[#0d1220]/60">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
          <div>
            <div className="inline-flex items-center gap-2 font-mono text-xs font-semibold uppercase tracking-wider text-blue-400 mb-2">
              <span className="h-1.5 w-1.5 rounded-full bg-blue-400" />
              ИНТЕРАКТИВНЫЕ МОДУЛИ
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              Экспресс-расчёт & Симулятор телеметрии
            </h2>
            <p className="text-sm text-slate-300 mt-1 max-w-2xl">
              Протестируйте физико-гидравлические алгоритмы подбора или просмотрите работу алгоритмов
              диагностики аномалий на базе реальных режимов фонда скважин.
            </p>
          </div>

          {/* Tab Selector */}
          <div className="inline-flex rounded-lg bg-slate-900/90 border border-slate-800 p-1 self-start md:self-auto">
            <button
              type="button"
              onClick={() => setActiveTab('calc')}
              className={`flex items-center gap-2 rounded-md px-3.5 py-2 text-xs font-semibold transition-all ${
                activeTab === 'calc'
                  ? 'bg-blue-600 text-white shadow-sm'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Calculator className="h-3.5 w-3.5" />
              <span>Экспресс-калькулятор</span>
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('telemetry')}
              className={`flex items-center gap-2 rounded-md px-3.5 py-2 text-xs font-semibold transition-all ${
                activeTab === 'telemetry'
                  ? 'bg-blue-600 text-white shadow-sm'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Cpu className="h-3.5 w-3.5" />
              <span>AI Телеметрия-симулятор</span>
            </button>
          </div>
        </div>

        {/* Tab 1: Hydraulic Calculator */}
        {activeTab === 'calc' && (
          <div className="rounded-2xl border border-slate-800 bg-[#101626] p-5 sm:p-7 shadow-xl">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
              {/* Inputs column */}
              <div className="lg:col-span-7 space-y-5">
                <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                  <span className="text-xs font-mono font-semibold uppercase text-slate-400">
                    Входные параметры скважины
                  </span>
                  <button
                    type="button"
                    onClick={() => {
                      setFlowRate(85);
                      setDynLevel(1420);
                      setBufPressure(16);
                      setDensity(930);
                      setFrequency(50);
                    }}
                    className="flex items-center gap-1 text-[11px] font-mono text-slate-400 hover:text-blue-400"
                  >
                    <RotateCcw className="h-3 w-3" />
                    <span>Сбросить значения</span>
                  </button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Q */}
                  <div className="bg-[#0b0f19] border border-slate-800 rounded-xl p-3.5">
                    <div className="flex justify-between items-center text-xs font-medium text-slate-300 mb-1">
                      <span>Целевой дебит (Q)</span>
                      <span className="font-mono text-blue-400 font-bold">{flowRate} м³/сут</span>
                    </div>
                    <input
                      type="range"
                      min={15}
                      max={250}
                      step={5}
                      value={flowRate}
                      onChange={(e) => setFlowRate(Number(e.target.value))}
                      className="w-full accent-blue-500 cursor-pointer"
                    />
                    <div className="flex justify-between text-[10px] font-mono text-slate-500 mt-1">
                      <span>15 м³</span>
                      <span>250 м³</span>
                    </div>
                  </div>

                  {/* Dyn Level */}
                  <div className="bg-[#0b0f19] border border-slate-800 rounded-xl p-3.5">
                    <div className="flex justify-between items-center text-xs font-medium text-slate-300 mb-1">
                      <span>Динамический уровень (Hдин)</span>
                      <span className="font-mono text-blue-400 font-bold">{dynLevel} м</span>
                    </div>
                    <input
                      type="range"
                      min={400}
                      max={2800}
                      step={20}
                      value={dynLevel}
                      onChange={(e) => setDynLevel(Number(e.target.value))}
                      className="w-full accent-blue-500 cursor-pointer"
                    />
                    <div className="flex justify-between text-[10px] font-mono text-slate-500 mt-1">
                      <span>400 м</span>
                      <span>2800 м</span>
                    </div>
                  </div>

                  {/* Pbuf */}
                  <div className="bg-[#0b0f19] border border-slate-800 rounded-xl p-3.5">
                    <div className="flex justify-between items-center text-xs font-medium text-slate-300 mb-1">
                      <span>Буферное давление (Pбуф)</span>
                      <span className="font-mono text-blue-400 font-bold">{bufPressure} атм</span>
                    </div>
                    <input
                      type="range"
                      min={5}
                      max={45}
                      step={1}
                      value={bufPressure}
                      onChange={(e) => setBufPressure(Number(e.target.value))}
                      className="w-full accent-blue-500 cursor-pointer"
                    />
                    <div className="flex justify-between text-[10px] font-mono text-slate-500 mt-1">
                      <span>5 атм</span>
                      <span>45 атм</span>
                    </div>
                  </div>

                  {/* Density */}
                  <div className="bg-[#0b0f19] border border-slate-800 rounded-xl p-3.5">
                    <div className="flex justify-between items-center text-xs font-medium text-slate-300 mb-1">
                      <span>Плотность эмульсии (ρ)</span>
                      <span className="font-mono text-blue-400 font-bold">{density} кг/м³</span>
                    </div>
                    <input
                      type="range"
                      min={820}
                      max={1150}
                      step={10}
                      value={density}
                      onChange={(e) => setDensity(Number(e.target.value))}
                      className="w-full accent-blue-500 cursor-pointer"
                    />
                    <div className="flex justify-between text-[10px] font-mono text-slate-500 mt-1">
                      <span>820 (нефть)</span>
                      <span>1150 (рассол)</span>
                    </div>
                  </div>
                </div>

                {/* Frequency slider */}
                <div className="bg-[#0b0f19] border border-slate-800 rounded-xl p-3.5">
                  <div className="flex justify-between items-center text-xs font-medium text-slate-300 mb-1">
                    <div className="flex items-center gap-1.5">
                      <Zap className="h-3.5 w-3.5 text-amber-400" />
                      <span>Частота станции управления (ЧРП)</span>
                    </div>
                    <span className="font-mono text-amber-400 font-bold">{frequency} Гц</span>
                  </div>
                  <input
                    type="range"
                    min={35}
                    max={65}
                    step={0.5}
                    value={frequency}
                    onChange={(e) => setFrequency(Number(e.target.value))}
                    className="w-full accent-amber-500 cursor-pointer"
                  />
                  <div className="flex justify-between text-[10px] font-mono text-slate-500 mt-1">
                    <span>35 Гц (снижение)</span>
                    <span>50 Гц (номинал)</span>
                    <span>65 Гц (разгон)</span>
                  </div>
                </div>
              </div>

              {/* Output calculation column */}
              <div className="lg:col-span-5 flex flex-col justify-between rounded-xl bg-[#0b0f19] border border-blue-500/20 p-5">
                <div>
                  <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                    <span className="text-xs font-mono font-semibold uppercase text-blue-400">
                      Результаты гидравлического подбора
                    </span>
                    <span className="inline-flex items-center gap-1 text-[10px] font-mono rounded bg-blue-950/80 text-blue-300 px-2 py-0.5 border border-blue-800/40">
                      Законы подобия
                    </span>
                  </div>

                  <div className="mt-4 space-y-3.5">
                    {/* Head */}
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-slate-400">Требуемый напор насоса (H)</span>
                      <span className="font-mono text-lg font-bold text-white">
                        {calcResults.totalHead} <span className="text-xs text-slate-400 font-normal">м</span>
                      </span>
                    </div>

                    {/* Effective flow */}
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-slate-400">Подача на частоте {frequency} Гц</span>
                      <span className="font-mono text-base font-semibold text-slate-200">
                        {calcResults.scaledFlow} <span className="text-xs text-slate-400 font-normal">м³/сут</span>
                      </span>
                    </div>

                    {/* Shaft power */}
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-slate-400">Мощность на валу насоса</span>
                      <span className="font-mono text-base font-semibold text-slate-200">
                        {calcResults.shaftPowerKw} <span className="text-xs text-slate-400 font-normal">кВт</span>
                      </span>
                    </div>

                    {/* Recommended Motor */}
                    <div className="flex items-center justify-between pt-2 border-t border-slate-800/80">
                      <div>
                        <div className="text-xs font-medium text-slate-200">Рекомендуемый ПЭД</div>
                        <div className="text-[11px] text-slate-400">С запасом по мощности ~25%</div>
                      </div>
                      <span className="font-mono text-base font-bold text-amber-400">
                        ≥ {calcResults.motorRatingKw} кВт
                      </span>
                    </div>

                    {/* Pump series */}
                    <div className="rounded-lg bg-slate-900/90 border border-slate-800 p-3 mt-3">
                      <div className="text-[11px] text-slate-400 font-mono">РЕКОМЕНДУЕМЫЙ ГАБАРИТ</div>
                      <div className="text-xs font-semibold text-slate-100 mt-0.5">
                        {calcResults.pumpSeries}
                      </div>
                      <div className="text-[11px] text-slate-400 mt-1">
                        Потери на трение в НКТ: ~{calcResults.frictionHead} м | Гидростатика Pбуф: ~{calcResults.bufferHead} м
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-5 pt-3 border-t border-slate-800 flex items-center justify-between">
                  <a
                    href="https://tehnologdeveng.github.io/ESP/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-xs font-semibold text-blue-400 hover:text-blue-300 transition-colors"
                  >
                    <span>Открыть ESP EXPERT v10.4 PRO (векторная схема скважины, кривые ступеней и техкарта)</span>
                    <ArrowRight className="h-3.5 w-3.5" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Tab 2: AI Telemetry Simulator */}
        {activeTab === 'telemetry' && (
          <div className="rounded-2xl border border-slate-800 bg-[#101626] p-5 sm:p-7 shadow-xl">
            {/* Well Selector presets */}
            <div className="mb-6">
              <label className="block text-xs font-mono font-semibold uppercase text-slate-400 mb-2.5">
                Выберите режим телеметрии скважины для анализа:
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2.5">
                {telemetryPresets.map((preset) => {
                  const isSelected = preset.id === selectedPresetId;
                  const statusColors = {
                    normal: 'border-emerald-500/40 text-emerald-400 bg-emerald-950/30',
                    warning: 'border-amber-500/40 text-amber-400 bg-amber-950/30',
                    danger: 'border-rose-500/40 text-rose-400 bg-rose-950/30',
                  }[preset.status];

                  return (
                    <button
                      key={preset.id}
                      type="button"
                      onClick={() => setSelectedPresetId(preset.id)}
                      className={`text-left rounded-xl p-3 border transition-all ${
                        isSelected
                          ? 'border-blue-500 bg-[#141d33] ring-1 ring-blue-500'
                          : 'border-slate-800 bg-[#0b0f19] hover:border-slate-700'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-1.5">
                        <span className="text-xs font-bold text-white">{preset.wellName.split('(')[0]}</span>
                        <span className={`text-[10px] font-mono px-1.5 py-0.5 rounded border ${statusColors}`}>
                          {preset.status === 'normal' ? 'НОРМА' : preset.status === 'warning' ? 'ОТКЛОНЕНИЕ' : 'АВАРИЯ'}
                        </span>
                      </div>
                      <div className="text-[11px] text-slate-400 truncate">
                        {preset.wellName.split('(')[1]?.replace(')', '') || 'Телеметрия'}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Telemetry Sensor Dashboard */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              {/* Left: Gauges & metrics */}
              <div className="lg:col-span-7 space-y-4">
                <div className="flex items-center justify-between pb-2 border-b border-slate-800">
                  <div className="flex items-center gap-2">
                    <Activity className="h-4 w-4 text-blue-400" />
                    <span className="text-xs font-mono font-semibold uppercase text-slate-300">
                      Телеметрический поток СУ :: {selectedWell.wellName}
                    </span>
                  </div>
                  <span className="text-[10px] font-mono text-emerald-400 flex items-center gap-1">
                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
                    ONLINE STREAM
                  </span>
                </div>

                {/* 6 telemetry metrics */}
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  <div className="rounded-xl border border-slate-800 bg-[#0b0f19] p-3">
                    <div className="text-[11px] text-slate-400">Частота ЧРП</div>
                    <div className="text-lg font-mono font-bold text-white mt-0.5">
                      {selectedWell.frequency} <span className="text-xs text-slate-400 font-normal">Гц</span>
                    </div>
                  </div>

                  <div className="rounded-xl border border-slate-800 bg-[#0b0f19] p-3">
                    <div className="text-[11px] text-slate-400">Ток фазы (Iфаз)</div>
                    <div className={`text-lg font-mono font-bold mt-0.5 ${
                      selectedWell.current > 55 ? 'text-rose-400' : selectedWell.current < 32 ? 'text-amber-400' : 'text-white'
                    }`}>
                      {selectedWell.current} <span className="text-xs text-slate-400 font-normal">А</span>
                    </div>
                  </div>

                  <div className="rounded-xl border border-slate-800 bg-[#0b0f19] p-3">
                    <div className="text-[11px] text-slate-400">Давление приема (Pпр)</div>
                    <div className={`text-lg font-mono font-bold mt-0.5 ${
                      selectedWell.intakePressure < 20 ? 'text-rose-400' : 'text-white'
                    }`}>
                      {selectedWell.intakePressure} <span className="text-xs text-slate-400 font-normal">атм</span>
                    </div>
                  </div>

                  <div className="rounded-xl border border-slate-800 bg-[#0b0f19] p-3">
                    <div className="text-[11px] text-slate-400 flex items-center gap-1">
                      <Flame className="h-3 w-3 text-rose-400" />
                      <span>Температура ПЭД</span>
                    </div>
                    <div className={`text-lg font-mono font-bold mt-0.5 ${
                      selectedWell.motorTemp > 105 ? 'text-rose-400' : selectedWell.motorTemp > 90 ? 'text-amber-400' : 'text-white'
                    }`}>
                      {selectedWell.motorTemp} <span className="text-xs text-slate-400 font-normal">°C</span>
                    </div>
                  </div>

                  <div className="rounded-xl border border-slate-800 bg-[#0b0f19] p-3">
                    <div className="text-[11px] text-slate-400">Фактический дебит</div>
                    <div className="text-lg font-mono font-bold text-white mt-0.5">
                      {selectedWell.flowRate} <span className="text-xs text-slate-400 font-normal">м³/сут</span>
                    </div>
                  </div>

                  <div className="rounded-xl border border-slate-800 bg-[#0b0f19] p-3">
                    <div className="text-[11px] text-slate-400">Вибрация агрегата</div>
                    <div className={`text-lg font-mono font-bold mt-0.5 ${
                      selectedWell.vibration > 6 ? 'text-rose-400' : selectedWell.vibration > 3.5 ? 'text-amber-400' : 'text-white'
                    }`}>
                      {selectedWell.vibration} <span className="text-xs text-slate-400 font-normal">мм/с</span>
                    </div>
                  </div>
                </div>

                {/* Status summary pill */}
                <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-800 flex items-center gap-3">
                  <Gauge className="h-5 w-5 text-blue-400 flex-shrink-0" />
                  <div className="text-xs text-slate-300">
                    Телеметрия считывается с контроллера СУ (Modbus RTU / TCP). Автоматический расчет трендов
                    производится с интервалом дискретизации 60 секунд.
                  </div>
                </div>
              </div>

              {/* Right: AI Diagnosis & Recommendation */}
              <div className="lg:col-span-5 rounded-xl border border-blue-500/30 bg-[#0b0f19] p-5 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                    <div className="flex items-center gap-2">
                      <Cpu className="h-4 w-4 text-blue-400" />
                      <span className="text-xs font-mono font-bold text-white">
                        ESP AI ANALYZER VERDICT
                      </span>
                    </div>
                    <span className="text-xs font-mono font-semibold text-blue-400">
                      Доверие: {selectedWell.aiConfidence}%
                    </span>
                  </div>

                  {/* Status Banner */}
                  <div className="mt-4">
                    {selectedWell.status === 'normal' && (
                      <div className="flex items-start gap-2.5 rounded-lg bg-emerald-950/40 border border-emerald-500/30 p-3 text-emerald-300">
                        <CheckCircle2 className="h-5 w-5 text-emerald-400 flex-shrink-0 mt-0.5" />
                        <div>
                          <div className="text-xs font-bold">Штатная эксплуатация</div>
                          <div className="text-xs text-emerald-300/80 mt-0.5">{selectedWell.diagnosis}</div>
                        </div>
                      </div>
                    )}
                    {selectedWell.status === 'warning' && (
                      <div className="flex items-start gap-2.5 rounded-lg bg-amber-950/40 border border-amber-500/30 p-3 text-amber-300">
                        <AlertTriangle className="h-5 w-5 text-amber-400 flex-shrink-0 mt-0.5" />
                        <div>
                          <div className="text-xs font-bold">Внимание: Технологическое отклонение</div>
                          <div className="text-xs text-amber-300/80 mt-0.5">{selectedWell.diagnosis}</div>
                        </div>
                      </div>
                    )}
                    {selectedWell.status === 'danger' && (
                      <div className="flex items-start gap-2.5 rounded-lg bg-rose-950/40 border border-rose-500/30 p-3 text-rose-300">
                        <AlertOctagon className="h-5 w-5 text-rose-400 flex-shrink-0 mt-0.5" />
                        <div>
                          <div className="text-xs font-bold">КРИТИЧЕСКИЙ РИСК ОТКАЗА</div>
                          <div className="text-xs text-rose-300/80 mt-0.5">{selectedWell.diagnosis}</div>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Action recommendation */}
                  <div className="mt-4">
                    <div className="text-xs font-mono font-semibold text-slate-300 uppercase mb-1.5">
                      Инженерное предписание технологу:
                    </div>
                    <p className="text-xs text-slate-300 leading-relaxed bg-[#101625] p-3 rounded-lg border border-slate-800">
                      {selectedWell.recommendation}
                    </p>
                  </div>
                </div>

                <div className="mt-5 pt-3 border-t border-slate-800 flex items-center justify-between">
                  <a
                    href="#esp-ai-analyzer"
                    className="inline-flex items-center gap-1.5 text-xs font-semibold text-blue-400 hover:text-blue-300"
                  >
                    <span>Смотреть архитектуру модуля ESP AI</span>
                    <ArrowRight className="h-3.5 w-3.5" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
