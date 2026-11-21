import React from 'react';
import { Code2, Layers, Sparkles } from 'lucide-react';

export interface AboutPillar {
  id: 'frontend' | 'motion' | 'fullstack';
  index: string;
  title: string;
  summary: string;
  highlights: string[];
}

export const ABOUT_PILLARS: AboutPillar[] = [
  {
    id: 'frontend',
    index: '01.',
    title: 'Interactive UI Architecture',
    summary:
      'Building modular React and TypeScript interfaces with clean component boundaries, predictable state, and accessible keyboard navigation.',
    highlights: ['React 19', 'TypeScript', 'Tailwind CSS'],
  },
  {
    id: 'motion',
    index: '02.',
    title: 'Motion & GSAP Choreography',
    summary:
      'Designing hardware-accelerated entrance timelines, scroll-driven reveals, and continuous orbital interactions that stay responsive at 60fps.',
    highlights: ['GSAP Timelines', 'ScrollTrigger', 'Micro-Interactions'],
  },
  {
    id: 'fullstack',
    index: '03.',
    title: 'Full-Stack Versatility',
    summary:
      'Connecting sleek client experiences to reliable server APIs and structured data workflows across Node.js, Python, and PHP.',
    highlights: ['Node.js', 'Python', 'PHP'],
  },
];

interface AboutVisualProps {
  visualRef: React.RefObject<HTMLDivElement | null>;
  ringRef: React.RefObject<HTMLDivElement | null>;
  registerCounterRef: (index: number) => (el: HTMLDivElement | null) => void;
  activePillarId: AboutPillar['id'];
  onSelectPillar: (id: AboutPillar['id']) => void;
}

const ORBIT_BADGES = [
  { label: 'UI', angle: -45, Icon: Layers },
  { label: 'Motion', angle: 75, Icon: Sparkles },
  { label: 'Code', angle: 195, Icon: Code2 },
];

export const AboutVisual: React.FC<AboutVisualProps> = ({
  visualRef,
  ringRef,
  registerCounterRef,
}) => {
  return (
    <div className="relative flex items-center justify-center py-6">
      <div
        ref={visualRef}
        className="orbit-stage relative flex items-center justify-center"
        style={{
          width: 'var(--orbit-size)',
          height: 'var(--orbit-size)',
        }}
      >
        {/* Outer & inner concentric orbital rings matching Home visual language */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 flex items-center justify-center"
        >
          <div
            className="rounded-full border border-blue-600/30 dark:border-sky-400/30 shadow-[0_0_50px_rgba(37,99,235,0.14),inset_0_0_40px_rgba(56,189,248,0.08)] dark:shadow-[0_0_50px_rgba(37,99,235,0.18),inset_0_0_40px_rgba(56,189,248,0.06)]"
            style={{
              width: 'calc(var(--orbit-radius) * 2)',
              height: 'calc(var(--orbit-radius) * 2)',
            }}
          />
          <div
            className="absolute rounded-full border border-blue-500/18 dark:border-blue-400/15"
            style={{
              width: 'calc(var(--orbit-radius) * 1.48)',
              height: 'calc(var(--orbit-radius) * 1.48)',
            }}
          />
          <div
            className="absolute rounded-full"
            style={{
              width: 'calc(var(--orbit-radius) * 1.3)',
              height: 'calc(var(--orbit-radius) * 1.3)',
              background:
                'radial-gradient(circle, rgba(37, 99, 235, 0.16) 0%, rgba(56, 189, 248, 0.05) 48%, transparent 74%)',
            }}
          />
        </div>

        {/* Rotating orbital nodes around the character */}
        <div
          ref={ringRef}
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 will-change-transform"
        >
          {ORBIT_BADGES.map(({ label, angle, Icon }, idx) => {
            const rad = (angle * Math.PI) / 180;
            const cos = Math.cos(rad).toFixed(5);
            const sin = Math.sin(rad).toFixed(5);

            return (
              <div
                key={label}
                className="absolute z-20"
                style={{
                  left: `calc(50% + ${cos} * var(--orbit-radius))`,
                  top: `calc(50% + ${sin} * var(--orbit-radius))`,
                  transform: 'translate(-50%, -50%)',
                }}
              >
                <div
                  ref={registerCounterRef(idx)}
                  className="flex h-11 w-11 sm:h-12 sm:w-12 items-center justify-center rounded-full border border-blue-500/25 dark:border-sky-400/30 bg-white/90 dark:bg-[#06132f]/90 text-blue-600 dark:text-sky-300 shadow-[0_8px_24px_rgba(15,23,42,0.12)] dark:shadow-[0_8px_24px_rgba(2,8,23,0.65)] backdrop-blur-md will-change-transform"
                >
                  <Icon className="h-5 w-5" aria-hidden="true" />
                </div>
              </div>
            );
          })}
        </div>

        {/* Center developer portrait PNG inside the orbital ring */}
        <div className="pointer-events-none relative z-10 -translate-y-3 sm:-translate-y-4 lg:-translate-y-5 flex items-end justify-center w-[260px] h-[266px] sm:w-[335px] sm:h-[342px] lg:w-[400px] lg:h-[408px] xl:w-[445px] xl:h-[455px]">
          <img
            src="/images/about-character.png"
            alt="Barkilign — Frontend & Creative Developer"
            className="h-full w-full object-contain object-bottom select-none drop-shadow-[0_24px_48px_rgba(37,99,235,0.34)] [mask-image:linear-gradient(to_bottom,black_85%,transparent_100%)]"
          />
        </div>
      </div>
    </div>
  );
};
