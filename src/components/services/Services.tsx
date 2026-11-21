import React, { useCallback, useEffect, useRef } from 'react';
import { ArrowRight, Code2, Cpu, Sparkles } from 'lucide-react';
import { runSectionReveal } from '../../animations/sectionAnimations';

export interface ServiceItem {
  id: string;
  index: string;
  title: string;
  summary: string;
  deliverables: string[];
  Icon: React.ComponentType<{ className?: string }>;
}

const SERVICES: ServiceItem[] = [
  {
    id: 'frontend-architecture',
    index: '01.',
    title: 'Frontend Architecture',
    summary:
      'Production-ready React and TypeScript applications structured for clarity, accessibility, and fast performance across every device.',
    deliverables: [
      'Component design systems & responsive layouts',
      'Strict TypeScript state & data modeling',
      'Cross-browser performance & WCAG AA contrast',
    ],
    Icon: Code2,
  },
  {
    id: 'motion-design',
    index: '02.',
    title: 'Creative Motion & GSAP',
    summary:
      'Expressive choreography, ScrollTrigger storytelling, and fluid micro-interactions engineered smoothly at 60fps.',
    deliverables: [
      'Ordered entrance timelines & scroll reveals',
      'Interactive hero stages & orbital UI animations',
      'Clean lifecycle teardown & reduced-motion care',
    ],
    Icon: Sparkles,
  },
  {
    id: 'fullstack-integration',
    index: '03.',
    title: 'Full-Stack Web Apps',
    summary:
      'End-to-end delivery bridging responsive frontends with Node.js, Python, and PHP backend services and APIs.',
    deliverables: [
      'REST API design & client-server integration',
      'Interactive dashboards & workflow tooling',
      'Deployment-ready Vite & Express builds',
    ],
    Icon: Cpu,
  },
];

interface ServicesProps {
  onSelectService: (serviceTitle: string) => void;
}

export const Services: React.FC<ServicesProps> = ({ onSelectService }) => {
  const sectionRef = useRef<HTMLElement | null>(null);
  const revealRefs = useRef<(HTMLElement | null)[]>([]);

  const registerRevealRef = useCallback(
    (index: number) => (el: HTMLElement | null) => {
      revealRefs.current[index] = el;
    },
    []
  );

  useEffect(() => {
    const container = sectionRef.current;
    if (!container) return;

    const validTargets = revealRefs.current.filter(
      (el): el is HTMLElement => el !== null
    );

    const cleanup = runSectionReveal({
      container,
      targets: validTargets,
    });

    return () => cleanup.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="services"
      aria-label="Services"
      className="relative z-10 w-full overflow-x-clip py-20 sm:py-24 lg:py-28 px-6 sm:px-10 lg:px-14"
    >
      <div className="mx-auto w-full max-w-7xl">
        <div className="max-w-2xl mb-12">
          <p
            ref={registerRevealRef(0)}
            className="text-xs sm:text-sm font-semibold tracking-[0.22em] text-blue-600 dark:text-sky-400 uppercase mb-3"
          >
            SERVICES
          </p>
          <h2
            ref={registerRevealRef(1)}
            className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-slate-950 dark:text-slate-50 leading-[1.08] text-balance"
          >
            How I Help Teams For Better Interfaces
          </h2>
        </div>

        <div
          ref={registerRevealRef(2)}
          className="grid grid-cols-1 lg:grid-cols-3 gap-6"
        >
          {SERVICES.map(({ id, index, title, summary, deliverables, Icon }) => (
            <article
              key={id}
              className="flex flex-col justify-between rounded-2xl border border-slate-200/85 dark:border-sky-400/20 bg-white/80 dark:bg-[#05122b]/72 p-6 sm:p-8 backdrop-blur-md transition-all duration-200 hover:-translate-y-1 hover:border-blue-500/50 dark:hover:border-sky-300/50 hover:shadow-[0_18px_42px_rgba(37,99,235,0.12)] dark:hover:shadow-[0_20px_48px_rgba(2,8,23,0.7)]"
            >
              <div>
                <div className="flex items-center justify-between gap-4 mb-5">
                  <span className="font-display text-sm font-bold text-blue-600 dark:text-sky-400">
                    {index}
                  </span>
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-blue-500/20 dark:border-sky-400/25 bg-blue-50/80 dark:bg-[#081c45]/80 text-blue-600 dark:text-sky-300">
                    <Icon className="h-5 w-5" aria-hidden="true" />
                  </div>
                </div>

                <h3 className="font-display text-2xl font-bold text-slate-950 dark:text-slate-50 mb-3 text-balance">
                  {title}
                </h3>

                <p className="text-sm sm:text-base leading-relaxed text-slate-700 dark:text-slate-300 mb-6">
                  {summary}
                </p>

                <ul className="space-y-2.5 text-sm text-slate-700 dark:text-slate-300 mb-8">
                  {deliverables.map((point) => (
                    <li key={point} className="flex items-start gap-2.5">
                      <span
                        aria-hidden="true"
                        className="mt-2 h-1.5 w-1.5 rounded-full bg-blue-600 dark:bg-sky-400 shrink-0"
                      />
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <button
                type="button"
                onClick={() => onSelectService(title)}
                className="inline-flex items-center justify-center gap-2 min-h-[44px] w-full rounded-xl border border-blue-600/30 dark:border-sky-400/30 bg-white/80 dark:bg-[#061433]/75 hover:bg-blue-600 hover:text-white hover:border-blue-600 dark:hover:bg-blue-600 dark:hover:border-blue-500 text-sm font-semibold text-slate-900 dark:text-slate-100 transition-colors cursor-pointer"
              >
                <span>Discuss {title}</span>
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </button>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};
