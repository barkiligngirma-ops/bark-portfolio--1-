import React from 'react';
import { ArrowRight, Mail } from 'lucide-react';

interface HeroContentProps {
  onExploreWork: () => void;
  onContactMe: () => void;
  registerTextRef: (index: number) => (el: HTMLElement | null) => void;
}

export const HeroContent: React.FC<HeroContentProps> = ({
  onExploreWork,
  onContactMe,
  registerTextRef,
}) => {
  return (
    <div className="flex flex-col items-start text-left max-w-2xl">
      <p
        ref={registerTextRef(0)}
        className="text-xs sm:text-sm font-semibold tracking-[0.22em] text-blue-600 dark:text-sky-400 uppercase mb-4"
      >
        HELLO, I&apos;M
      </p>

      <h1
        ref={registerTextRef(1)}
        className="font-display text-5xl sm:text-6xl lg:text-7xl xl:text-[5.25rem] font-bold tracking-tight text-slate-950 dark:text-slate-50 leading-[1.02] text-balance mb-4"
      >
        Barkilign
      </h1>

      <h2
        ref={registerTextRef(2)}
        className="text-xl sm:text-2xl lg:text-[1.65rem] font-medium tracking-tight text-blue-700 dark:text-sky-300/95 mb-6 text-balance"
      >
        Full stack developer &amp; UI/UX Designer
      </h2>

      <p
        ref={registerTextRef(3)}
        className="text-base sm:text-[1.0625rem] leading-relaxed text-slate-700 dark:text-slate-300/95 max-w-xl mb-9"
      >
        Full stack developer and UI/UX designer with a passion for solving problems at every layer of the stack. I design and build digital products end to end from wireframes and design systems to scalable APIs. 
      </p>

      <div
        ref={registerTextRef(4)}
        className="flex flex-wrap items-center gap-4"
      >
        <button
          type="button"
          onClick={onExploreWork}
          className="inline-flex items-center justify-center gap-2.5 min-h-[46px] px-7 py-3 rounded-xl bg-blue-600 hover:bg-blue-500 active:bg-blue-700 text-sm sm:text-base font-semibold text-white shadow-[0_10px_28px_rgba(37,99,235,0.34)] hover:shadow-[0_14px_34px_rgba(37,99,235,0.42)] dark:shadow-[0_10px_28px_rgba(37,99,235,0.38)] dark:hover:shadow-[0_14px_34px_rgba(56,189,248,0.36)] transition-all duration-200 whitespace-nowrap shrink-0 cursor-pointer"
        >
          <span>Explore My Work</span>
          <ArrowRight className="w-4 h-4" aria-hidden="true" />
        </button>

        <button
          type="button"
          onClick={onContactMe}
          className="inline-flex items-center justify-center gap-2.5 min-h-[46px] px-7 py-3 rounded-xl border border-blue-600/30 dark:border-sky-400/35 bg-white/80 dark:bg-[#061433]/65 hover:bg-white dark:hover:bg-[#0a1d47]/85 hover:border-blue-600/60 dark:hover:border-sky-300/65 text-sm sm:text-base font-semibold text-slate-900 dark:text-slate-100 backdrop-blur-md transition-all duration-200 whitespace-nowrap shrink-0 cursor-pointer"
        >
          <Mail className="w-4 h-4 text-blue-600 dark:text-sky-400" aria-hidden="true" />
          <span>Contact Me</span>
        </button>
      </div>
    </div>
  );
};
