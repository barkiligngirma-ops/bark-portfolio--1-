import React, { useCallback, useEffect, useRef, useState } from 'react';
import { runSectionReveal } from '../../animations/sectionAnimations';

type SkillCategory = 'all' | 'frontend' | 'motion' | 'backend';

interface SkillItem {
  id: string;
  name: string;
  category: Exclude<SkillCategory, 'all'>;
  categoryLabel: string;
  summary: string;
  accent: string;
}

const SKILL_ITEMS: SkillItem[] = [
  {
    id: 'react',
    name: 'React',
    category: 'frontend',
    categoryLabel: 'Frontend · UI Systems',
    summary:
      'Modular component architecture, custom hooks, and state-driven interactive interfaces.',
    accent: '#61DAFB',
  },
  {
    id: 'typescript',
    name: 'TypeScript',
    category: 'frontend',
    categoryLabel: 'Frontend · Type Safety',
    summary:
      'Strict domain modeling, predictable component contracts, and maintainable codebases.',
    accent: '#3178C6',
  },
  {
    id: 'javascript',
    name: 'JavaScript',
    category: 'frontend',
    categoryLabel: 'Frontend · Core Language',
    summary:
      'Modern ES2022+ async flows, browser APIs, and responsive client-side logic.',
    accent: '#F7DF1E',
  },
  {
    id: 'html5',
    name: 'HTML5',
    category: 'frontend',
    categoryLabel: 'Frontend · Semantics',
    summary:
      'Accessible landmarks, semantic document structure, and standards-compliant markup.',
    accent: '#E34F26',
  },
  {
    id: 'css3',
    name: 'CSS3',
    category: 'motion',
    categoryLabel: 'Styling · Layout',
    summary:
      'Responsive Grid/Flexbox architectures, custom properties, and layered visual depth.',
    accent: '#33A9DC',
  },
  {
    id: 'tailwindcss',
    name: 'Tailwind CSS',
    category: 'motion',
    categoryLabel: 'Styling · Design System',
    summary:
      'Rapid utility-first styling, dual light/dark theming, and cohesive spacing tokens.',
    accent: '#38BDF8',
  },
  {
    id: 'gsap',
    name: 'GSAP',
    category: 'motion',
    categoryLabel: 'Motion · Choreography',
    summary:
      'Ordered entrance timelines, ScrollTrigger storytelling, and hardware-accelerated motion.',
    accent: '#88CE02',
  },
  {
    id: 'nodejs',
    name: 'Node.js',
    category: 'backend',
    categoryLabel: 'Backend · Runtime',
    summary:
      'REST APIs, Express services, and fast tooling connecting frontends to live data.',
    accent: '#5FA04E',
  },
  {
    id: 'python',
    name: 'Python',
    category: 'backend',
    categoryLabel: 'Backend · Scripting',
    summary:
      'Clean backend automation, data processing pipelines, and API integrations.',
    accent: '#3776AB',
  },
  {
    id: 'php',
    name: 'PHP',
    category: 'backend',
    categoryLabel: 'Backend · Web Server',
    summary:
      'Dynamic server-rendered applications, database-backed endpoints, and CMS integrations.',
    accent: '#777BB4',
  },
];

const FILTER_TABS: { id: SkillCategory; label: string }[] = [
  { id: 'all', label: 'All Skills' },
  { id: 'frontend', label: 'Frontend' },
  { id: 'motion', label: 'Styling & Motion' },
  { id: 'backend', label: 'Backend' },
];

export const Skills: React.FC = () => {
  const sectionRef = useRef<HTMLElement | null>(null);
  const revealRefs = useRef<(HTMLElement | null)[]>([]);
  const cardRefs = useRef<Partial<Record<string, HTMLElement | null>>>({});
  const rafRef = useRef<number | null>(null);
  const [activeCategory, setActiveCategory] = useState<SkillCategory>('all');

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

    return () => {
      cleanup.revert();
      if (rafRef.current !== null) {
        cancelAnimationFrame(rafRef.current);
      }
    };
  }, []);

  const visibleSkills =
    activeCategory === 'all'
      ? SKILL_ITEMS
      : SKILL_ITEMS.filter((item) => item.category === activeCategory);

  const handleGridMouseMove = useCallback(
    (event: React.MouseEvent<HTMLDivElement>) => {
      const clientX = event.clientX;
      const clientY = event.clientY;

      if (rafRef.current !== null) {
        cancelAnimationFrame(rafRef.current);
      }

      rafRef.current = requestAnimationFrame(() => {
        visibleSkills.forEach((skill) => {
          const card = cardRefs.current[skill.id];
          if (!card) return;
          const rect = card.getBoundingClientRect();
          card.style.setProperty('--mx', `${clientX - rect.left}px`);
          card.style.setProperty('--my', `${clientY - rect.top}px`);
        });
      });
    },
    [visibleSkills]
  );

  const handleGridMouseLeave = useCallback(() => {
    if (rafRef.current !== null) {
      cancelAnimationFrame(rafRef.current);
      rafRef.current = null;
    }
    visibleSkills.forEach((skill) => {
      const card = cardRefs.current[skill.id];
      if (!card) return;
      card.style.setProperty('--mx', '-999px');
      card.style.setProperty('--my', '-999px');
    });
  }, [visibleSkills]);

  const handleCardMouseMove = useCallback(
    (skillId: string) => (event: React.MouseEvent<HTMLElement>) => {
      const card = cardRefs.current[skillId];
      if (!card) return;
      const rect = card.getBoundingClientRect();
      const normX = (event.clientX - rect.left) / rect.width - 0.5;
      const normY = (event.clientY - rect.top) / rect.height - 0.5;
      const rotateY = (normX * 10).toFixed(2);
      const rotateX = (-normY * 10).toFixed(2);

      card.setAttribute('data-active-tilt', 'true');
      card.style.setProperty('--rx', `${rotateX}deg`);
      card.style.setProperty('--ry', `${rotateY}deg`);
      card.style.setProperty('--ty', '-5px');
      card.style.setProperty('--scale', '1.015');
    },
    []
  );

  const handleCardMouseLeave = useCallback(
    (skillId: string) => () => {
      const card = cardRefs.current[skillId];
      if (!card) return;
      card.removeAttribute('data-active-tilt');
      card.style.setProperty('--rx', '0deg');
      card.style.setProperty('--ry', '0deg');
      card.style.setProperty('--ty', '0px');
      card.style.setProperty('--scale', '1');
    },
    []
  );

  return (
    <section
      ref={sectionRef}
      id="skills"
      aria-label="Skills and Technologies"
      className="relative z-10 w-full overflow-x-clip py-20 sm:py-24 lg:py-28 px-6 sm:px-10 lg:px-14"
    >
      <div className="mx-auto w-full max-w-7xl">
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 mb-12">
          <div className="max-w-2xl">
            <p
              ref={registerRevealRef(0)}
              className="text-xs sm:text-sm font-semibold tracking-[0.22em] text-blue-600 dark:text-sky-400 uppercase mb-3"
            >
              SKILLS &amp; STACK
            </p>
            <h2
              ref={registerRevealRef(1)}
              className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-slate-950 dark:text-slate-50 leading-[1.08] text-balance"
            >
              Technologies Powering Every Build
            </h2>
          </div>

          <div
            ref={registerRevealRef(2)}
            role="tablist"
            aria-label="Filter skills by discipline"
            className="inline-flex flex-wrap items-center gap-1.5 rounded-xl border border-slate-200/80 dark:border-sky-400/20 bg-white/75 dark:bg-[#05122b]/70 p-1.5 backdrop-blur-md self-start"
          >
            {FILTER_TABS.map((tab) => {
              const isActive = activeCategory === tab.id;
              return (
                <button
                  key={tab.id}
                  type="button"
                  role="tab"
                  aria-selected={isActive}
                  onClick={() => setActiveCategory(tab.id)}
                  className={`px-3.5 py-2 rounded-lg text-xs sm:text-sm font-semibold transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                    isActive
                      ? 'bg-blue-600 text-white shadow-sm'
                      : 'text-slate-700 dark:text-slate-300 hover:bg-blue-50 dark:hover:bg-sky-400/10'
                  }`}
                >
                  {tab.label}
                </button>
              );
            })}
          </div>
        </div>

        <div
          ref={registerRevealRef(3)}
          onMouseMove={handleGridMouseMove}
          onMouseLeave={handleGridMouseLeave}
          className="skills-grid grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4 sm:gap-5"
        >
          {visibleSkills.map((skill) => (
            <article
              key={skill.id}
              ref={(el) => {
                cardRefs.current[skill.id] = el;
              }}
              onMouseMove={handleCardMouseMove(skill.id)}
              onMouseLeave={handleCardMouseLeave(skill.id)}
              style={{ '--skill-accent': skill.accent } as React.CSSProperties}
              className="skill-card group relative overflow-hidden rounded-2xl border border-slate-200/85 dark:border-sky-400/20 bg-white/80 dark:bg-[#05122b]/72 p-5 sm:p-6 backdrop-blur-md will-change-transform hover:border-blue-500/40 dark:hover:border-sky-300/45 hover:shadow-[0_18px_42px_rgba(37,99,235,0.16)] dark:hover:shadow-[0_20px_46px_rgba(2,8,23,0.75)]"
            >
              {/* Cursor-tracking proximity border glow */}
              <div
                aria-hidden="true"
                className="skill-card-border-glow pointer-events-none absolute inset-0 rounded-2xl z-20"
              />

              {/* Cursor-following inner radial spotlight */}
              <div
                aria-hidden="true"
                className="skill-card-spotlight pointer-events-none absolute inset-0 rounded-2xl z-0"
              />

              <div className="relative z-10">
                <div className="flex items-center justify-between gap-2 mb-3">
                  <span className="text-xs font-medium text-blue-700 dark:text-sky-300/90 transition-colors duration-200 group-hover:text-blue-600 dark:group-hover:text-sky-200">
                    {skill.categoryLabel}
                  </span>
                  <span
                    aria-hidden="true"
                    className="h-2.5 w-2.5 rounded-full shrink-0 transition-transform duration-200 group-hover:scale-125"
                    style={{
                      backgroundColor: skill.accent,
                      boxShadow: `0 0 10px ${skill.accent}66`,
                    }}
                  />
                </div>

                <h3 className="font-display text-xl font-bold text-slate-950 dark:text-slate-50 mb-2 transition-transform duration-200 group-hover:translate-x-0.5">
                  {skill.name}
                </h3>

                <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300">
                  {skill.summary}
                </p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};
