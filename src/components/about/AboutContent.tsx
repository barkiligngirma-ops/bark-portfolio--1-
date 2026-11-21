import React from 'react';
import { ArrowUp, Mail } from 'lucide-react';
import { ABOUT_PILLARS, type AboutPillar } from './AboutVisual';

interface AboutContentProps {
  activePillarId: AboutPillar['id'];
  onSelectPillar: (id: AboutPillar['id']) => void;
  onContactMe: () => void;
  onBackToHero: () => void;
  registerContentRef: (index: number) => (el: HTMLElement | null) => void;
}

export const AboutContent: React.FC<AboutContentProps> = ({
  activePillarId,
  onSelectPillar,
  onContactMe,
  onBackToHero,
  registerContentRef,
}) => {
  return (
    <div className="flex flex-col items-start text-left max-w-2xl">
      <p
        ref={registerContentRef(0)}
        className="text-xs sm:text-sm font-semibold tracking-[0.22em] text-blue-600 dark:text-sky-400 uppercase mb-4"
      >
        ABOUT ME
      </p>

      <h2
        ref={registerContentRef(1)}
        className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-slate-950 dark:text-slate-50 leading-[1.08] text-balance mb-5"
      >
        Crafting Fluid Interfaces With Precision &amp; Motion
      </h2>

      <p
        ref={registerContentRef(2)}
        className="text-base sm:text-[1.0625rem] leading-relaxed text-slate-700 dark:text-slate-300/95 mb-4"
      >
        I&apos;m Barkilign, a Full stack Developer and UI/UX Developer focused on
        turning complex ideas into fast, tactile web experiences. Every layout
        I build balances clean TypeScript architecture with purposeful motion
        and visual clarity.
      </p>

      <p
        ref={registerContentRef(3)}
        className="text-base sm:text-[1.0625rem] leading-relaxed text-slate-700 dark:text-slate-300/95 mb-7"
      >
        From responsive design systems in React and Tailwind CSS to custom GSAP
        sequences and backend integrations with Node.js, Python, and PHP.
      </p>

      {/* Interactive pillar selector list */}
      <div
        ref={registerContentRef(4)}
        className="w-full grid grid-cols-1 sm:grid-cols-3 gap-3 mb-8"
      >
        {ABOUT_PILLARS.map((pillar) => {
          const isSelected = pillar.id === activePillarId;
          return (
            <button
              key={pillar.id}
              type="button"
              onClick={() => onSelectPillar(pillar.id)}
              className={`text-left rounded-xl border px-4 py-3.5 transition-colors cursor-pointer ${
                isSelected
                  ? 'border-blue-600/55 dark:border-sky-400/55 bg-blue-50/85 dark:bg-[#081c45]/85'
                  : 'border-slate-200/80 dark:border-sky-400/18 bg-white/65 dark:bg-[#05122b]/60 hover:border-blue-500/45 dark:hover:border-sky-400/40'
              }`}
            >
              <span className="block text-xs font-semibold text-blue-600 dark:text-sky-400 mb-1">
                {pillar.index}
              </span>
              <span className="block text-sm font-semibold text-slate-900 dark:text-slate-100 leading-snug">
                {pillar.title}
              </span>
            </button>
          );
        })}
      </div>

      <div
        ref={registerContentRef(5)}
        className="flex flex-wrap items-center gap-4"
      >
        <button
          type="button"
          onClick={onContactMe}
          className="inline-flex items-center justify-center gap-2.5 min-h-[46px] px-7 py-3 rounded-xl bg-blue-600 hover:bg-blue-500 active:bg-blue-700 text-sm sm:text-base font-semibold text-white shadow-[0_10px_28px_rgba(37,99,235,0.34)] hover:shadow-[0_14px_34px_rgba(37,99,235,0.42)] dark:shadow-[0_10px_28px_rgba(37,99,235,0.38)] dark:hover:shadow-[0_14px_34px_rgba(56,189,248,0.36)] transition-all duration-200 whitespace-nowrap shrink-0 cursor-pointer"
        >
          <Mail className="w-4 h-4" aria-hidden="true" />
          <span>Let&apos;s Connect</span>
        </button>

        <button
          type="button"
          onClick={onBackToHero}
          className="inline-flex items-center justify-center gap-2.5 min-h-[46px] px-7 py-3 rounded-xl border border-blue-600/30 dark:border-sky-400/35 bg-white/80 dark:bg-[#061433]/65 hover:bg-white dark:hover:bg-[#0a1d47]/85 hover:border-blue-600/60 dark:hover:border-sky-300/65 text-sm sm:text-base font-semibold text-slate-900 dark:text-slate-100 backdrop-blur-md transition-all duration-200 whitespace-nowrap shrink-0 cursor-pointer"
        >
          <ArrowUp className="w-4 h-4 text-blue-600 dark:text-sky-400" aria-hidden="true" />
          <span>Back to Top</span>
        </button>
      </div>
    </div>
  );
};
