import React, { useCallback, useEffect, useRef, useState } from 'react';
import { ArrowUpRight, Layers, X } from 'lucide-react';
import {
  runProjectTimeline,
  type ProjectTimelineItemElements,
} from '../../animations/projectAnimations';

type ProjectCategory = 'all' | 'web-apps' | 'creative-ui' | 'full-stack';

interface ProjectItem {
  id: string;
  index: string;
  shortNum: string;
  title: string;
  category: Exclude<ProjectCategory, 'all'>;
  categoryLabel: string;
  year: string;
  summary: string;
  details: string;
  stack: string[];
  highlights: string[];
}

const PROJECTS: ProjectItem[] = [
  {
    id: 'orbital-portfolio',
    index: '01.',
    shortNum: '01',
    title: 'Interactive Motion Portfolio',
    category: 'creative-ui',
    categoryLabel: 'Creative UI',
    year: '2026',
    summary:
      'Continuous viewport video canvas paired with GSAP timeline choreography and a counter-rotating technology orbit.',
    details:
      'Built to deliver fluid 60fps motion without interrupting background media playback. Features ordered entrance sequencing, dual light/dark theming, and GPU-composited orbital icons.',
    stack: ['React', 'TypeScript', 'GSAP', 'Tailwind CSS'],
    highlights: [
      'Application-level continuous video loop across sections',
      'Synchronized GSAP orbit rotation and upright icon counter-rotation',
      'Full light and dark mode contrast pairing',
    ],
  },
  {
    id: 'pulse-analytics',
    index: '02.',
    shortNum: '02',
    title: 'Commerce Operations Suite',
    category: 'web-apps',
    categoryLabel: 'Web App',
    year: '2025',
    summary:
      'Real-time inventory, fulfillment tracking, and order filtering workspace engineered with strict TypeScript contracts.',
    details:
      'A responsive operational dashboard streamlining multi-warehouse SKU tracking, keyboard-first search filtering, and clean tabular financial summaries.',
    stack: ['React', 'TypeScript', 'Tailwind CSS', 'Node.js'],
    highlights: [
      'Zero-latency client-side multi-attribute filtering',
      'Accessible keyboard navigation and modal workflows',
      'Tabular numeric alignment across reporting views',
    ],
  },
  {
    id: 'nexus-api-gateway',
    index: '03.',
    shortNum: '03',
    title: 'Modular API & Auth Portal',
    category: 'full-stack',
    categoryLabel: 'Full-Stack',
    year: '2025',
    summary:
      'Role-based developer portal and service directory backed by Express, Python worker tasks, and structured validation.',
    details:
      'Designed clean onboarding flows, token lifecycle controls, and automated background processing workers with resilient error handling.',
    stack: ['TypeScript', 'Node.js', 'Python', 'PHP'],
    highlights: [
      'Structured REST endpoints with input validation',
      'Responsive dashboard UI across mobile and desktop',
      'Automated background job scheduling and retry handling',
    ],
  },
  {
    id: 'motion-studio-kit',
    index: '04.',
    shortNum: '04',
    title: 'UI Interaction Component Kit',
    category: 'creative-ui',
    categoryLabel: 'Creative UI',
    year: '2024',
    summary:
      'Reusable set of scroll-driven reveals, accessible dialogs, and smooth layout transitions built for modern React apps.',
    details:
      'Engineered to bridge design systems and expressive motion without heavy runtime overhead, enforcing clean lifecycle cleanup on every component.',
    stack: ['React', 'GSAP', 'CSS3', 'HTML5'],
    highlights: [
      'Scoped GSAP context cleanup on component unmount',
      'Compositor-only transform and opacity animations',
      'WCAG AA contrast and keyboard focus management',
    ],
  },
];

const PROJECT_TABS: { id: ProjectCategory; label: string }[] = [
  { id: 'all', label: 'All Projects' },
  { id: 'creative-ui', label: 'Creative UI' },
  { id: 'web-apps', label: 'Web Apps' },
  { id: 'full-stack', label: 'Full-Stack' },
];

export const Projects: React.FC = () => {
  const sectionRef = useRef<HTMLElement | null>(null);
  const headerRefs = useRef<(HTMLElement | null)[]>([]);
  const listWrapperRef = useRef<HTMLDivElement | null>(null);
  const progressLineRef = useRef<HTMLDivElement | null>(null);

  const rowRefs = useRef<Partial<Record<string, HTMLDivElement | null>>>({});
  const cardRefs = useRef<Partial<Record<string, HTMLElement | null>>>({});
  const nodeRefs = useRef<Partial<Record<string, HTMLDivElement | null>>>({});
  const connectorRefs = useRef<Partial<Record<string, HTMLDivElement | null>>>({});

  const hasAnimatedHeaderRef = useRef(false);

  const [activeCategory, setActiveCategory] = useState<ProjectCategory>('all');
  const [selectedProject, setSelectedProject] = useState<ProjectItem | null>(null);

  const registerHeaderRef = useCallback(
    (index: number) => (el: HTMLElement | null) => {
      headerRefs.current[index] = el;
    },
    []
  );

  const visibleProjects =
    activeCategory === 'all'
      ? PROJECTS
      : PROJECTS.filter((project) => project.category === activeCategory);

  useEffect(() => {
    const container = sectionRef.current;
    if (!container) return;

    const validHeaders = headerRefs.current.filter(
      (el): el is HTMLElement => el !== null
    );

    const itemElements: ProjectTimelineItemElements[] = visibleProjects
      .map((project): ProjectTimelineItemElements | null => {
        const row = rowRefs.current[project.id];
        const card = cardRefs.current[project.id];
        const node = nodeRefs.current[project.id];
        const connector = connectorRefs.current[project.id] ?? null;
        if (!row || !card || !node) return null;
        return { row, card, node, connector };
      })
      .filter((entry): entry is ProjectTimelineItemElements => entry !== null);

    const animateHeader = !hasAnimatedHeaderRef.current;
    hasAnimatedHeaderRef.current = true;

    const cleanup = runProjectTimeline({
      container,
      headerTargets: validHeaders,
      progressLine: progressLineRef.current,
      listWrapper: listWrapperRef.current,
      items: itemElements,
      animateHeader,
    });

    return () => cleanup.revert();
  }, [activeCategory, visibleProjects.length]);

  useEffect(() => {
    if (!selectedProject) return;
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setSelectedProject(null);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedProject]);

  return (
    <section
      ref={sectionRef}
      id="project"
      aria-label="Selected Projects"
      className="relative z-10 w-full overflow-x-clip py-20 sm:py-24 lg:py-28 px-6 sm:px-10 lg:px-14"
    >
      <div className="mx-auto w-full max-w-7xl">
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 mb-14 sm:mb-16">
          <div className="max-w-2xl">
            <p
              ref={registerHeaderRef(0)}
              className="text-xs sm:text-sm font-semibold tracking-[0.22em] text-blue-600 dark:text-sky-400 uppercase mb-3"
            >
              SELECTED PROJECTS
            </p>
            <h2
              ref={registerHeaderRef(1)}
              className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-slate-950 dark:text-slate-50 leading-[1.08] text-balance"
            >
              Crafted Builds &amp; Case Studies
            </h2>
          </div>

          <div
            ref={registerHeaderRef(2)}
            role="tablist"
            aria-label="Filter projects by category"
            className="inline-flex flex-wrap items-center gap-1.5 rounded-xl border border-slate-200/80 dark:border-sky-400/20 bg-white/75 dark:bg-[#05122b]/70 p-1.5 backdrop-blur-md self-start"
          >
            {PROJECT_TABS.map((tab) => {
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

        {/* Sequential Timeline Layout: each project follows the animated line */}
        <div ref={listWrapperRef} className="relative">
          {/* Base timeline guide line */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute left-5 md:left-1/2 md:-translate-x-1/2 top-4 bottom-4 w-[2px] rounded-full bg-slate-300/70 dark:bg-sky-400/15"
          />

          {/* Scroll-scrubbed glowing electric-blue line */}
          <div
            ref={progressLineRef}
            aria-hidden="true"
            className="pointer-events-none absolute left-5 md:left-1/2 md:-translate-x-1/2 top-4 bottom-4 w-[2px] rounded-full bg-gradient-to-b from-blue-600 via-sky-400 to-blue-500 shadow-[0_0_16px_rgba(56,189,248,0.6)]"
          />

          <div className="space-y-12 md:space-y-16">
            {visibleProjects.map((project, idx) => {
              const isLeftColumn = idx % 2 === 0;

              return (
                <div
                  key={project.id}
                  ref={(el) => {
                    rowRefs.current[project.id] = el;
                  }}
                  className="relative grid grid-cols-1 md:grid-cols-12 items-center"
                >
                  {/* Node marker sitting directly on the vertical line */}
                  <div
                    ref={(el) => {
                      nodeRefs.current[project.id] = el;
                    }}
                    aria-hidden="true"
                    className="absolute left-5 md:left-1/2 -translate-x-1/2 z-20 flex h-10 w-10 items-center justify-center rounded-full border-2 border-blue-600 dark:border-sky-400 bg-white dark:bg-[#041028] text-xs font-bold text-blue-600 dark:text-sky-300 shadow-[0_0_20px_rgba(37,99,235,0.28)] dark:shadow-[0_0_24px_rgba(56,189,248,0.4)]"
                  >
                    {project.shortNum}
                  </div>

                  {/* Horizontal branch line connecting node to card */}
                  <div
                    ref={(el) => {
                      connectorRefs.current[project.id] = el;
                    }}
                    aria-hidden="true"
                    className={`absolute top-1/2 -translate-y-1/2 h-[2px] left-10 w-4 md:w-[calc(8.333333%-20px)] bg-gradient-to-r ${
                      isLeftColumn
                        ? 'md:left-auto md:right-1/2 md:mr-[20px] from-sky-400/80 to-blue-500/30 md:from-blue-500/30 md:to-sky-400/80'
                        : 'md:left-1/2 md:ml-[20px] from-sky-400/80 to-blue-500/30'
                    }`}
                  />

                  {/* Project card positioned on alternating left / right side of the line */}
                  <div
                    className={`pl-14 md:pl-0 ${
                      isLeftColumn
                        ? 'md:col-span-5 md:col-start-1'
                        : 'md:col-span-5 md:col-start-8'
                    }`}
                  >
                    <article
                      ref={(el) => {
                        cardRefs.current[project.id] = el;
                      }}
                      className="group flex flex-col justify-between rounded-2xl border border-slate-200/85 dark:border-sky-400/20 bg-white/82 dark:bg-[#05122b]/76 p-6 sm:p-8 backdrop-blur-md transition-colors duration-200 hover:border-blue-500/55 dark:hover:border-sky-300/55 shadow-[0_14px_38px_rgba(15,23,42,0.08)] dark:shadow-[0_18px_46px_rgba(2,8,23,0.65)]"
                    >
                      <div>
                        <div className="flex items-center justify-between gap-4 text-xs font-medium text-slate-500 dark:text-slate-400 mb-4">
                          <div className="flex items-center gap-2">
                            <span className="font-semibold text-blue-600 dark:text-sky-400">
                              {project.index}
                            </span>
                            <span aria-hidden="true">·</span>
                            <span>{project.categoryLabel}</span>
                            <span aria-hidden="true">·</span>
                            <span className="tabular-nums">{project.year}</span>
                          </div>
                          <Layers
                            className="h-4 w-4 text-blue-600/70 dark:text-sky-400/70"
                            aria-hidden="true"
                          />
                        </div>

                        <h3 className="font-display text-2xl font-bold text-slate-950 dark:text-slate-50 mb-3 text-balance">
                          {project.title}
                        </h3>

                        <p className="text-sm sm:text-base leading-relaxed text-slate-700 dark:text-slate-300 mb-6">
                          {project.summary}
                        </p>
                      </div>

                      <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-slate-200/75 dark:border-sky-400/15">
                        <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-xs font-medium text-slate-600 dark:text-slate-300">
                          {project.stack.map((tech, techIdx) => (
                            <React.Fragment key={tech}>
                              <span>{tech}</span>
                              {techIdx < project.stack.length - 1 && (
                                <span aria-hidden="true" className="text-slate-400 dark:text-slate-500">
                                  ·
                                </span>
                              )}
                            </React.Fragment>
                          ))}
                        </div>

                        <button
                          type="button"
                          onClick={() => setSelectedProject(project)}
                          className="inline-flex items-center gap-1.5 text-sm font-semibold text-blue-600 dark:text-sky-400 hover:text-blue-700 dark:hover:text-sky-300 transition-colors whitespace-nowrap shrink-0 cursor-pointer"
                        >
                          <span>View Details</span>
                          <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
                        </button>
                      </div>
                    </article>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Project Case Study Modal */}
      {selectedProject && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="project-modal-title"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-slate-950/55 dark:bg-[#020817]/75 backdrop-blur-sm"
          onClick={() => setSelectedProject(null)}
        >
          <div
            className="relative w-full max-w-lg rounded-2xl border border-slate-200 dark:border-sky-400/25 bg-white/95 dark:bg-[#05122b]/95 p-6 sm:p-8 text-slate-900 dark:text-slate-100 shadow-2xl dark:shadow-[0_24px_64px_rgba(2,8,23,0.85)]"
            onClick={(event) => event.stopPropagation()}
          >
            <button
              type="button"
              onClick={() => setSelectedProject(null)}
              aria-label="Close project details"
              className="absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-lg border border-slate-200 dark:border-sky-400/20 text-slate-600 dark:text-slate-300 hover:border-blue-500/50 dark:hover:border-sky-300/50 hover:text-slate-950 dark:hover:text-white transition-colors cursor-pointer"
            >
              <X className="h-4 w-4" aria-hidden="true" />
            </button>

            <p className="text-xs font-semibold tracking-[0.18em] text-blue-600 dark:text-sky-400 uppercase mb-2">
              {selectedProject.categoryLabel} · {selectedProject.year}
            </p>
            <h3
              id="project-modal-title"
              className="font-display text-2xl font-bold text-slate-950 dark:text-slate-50 mb-3 pr-8"
            >
              {selectedProject.title}
            </h3>
            <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 mb-5">
              {selectedProject.details}
            </p>

            <p className="text-xs font-semibold tracking-wider text-slate-500 dark:text-slate-400 uppercase mb-2.5">
              Engineering Highlights
            </p>
            <ul className="space-y-2 text-sm text-slate-700 dark:text-slate-300 mb-6">
              {selectedProject.highlights.map((item) => (
                <li key={item} className="flex items-start gap-2">
                  <span
                    aria-hidden="true"
                    className="mt-2 h-1.5 w-1.5 rounded-full bg-blue-600 dark:bg-sky-400 shrink-0"
                  />
                  <span>{item}</span>
                </li>
              ))}
            </ul>

            <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-xs font-medium text-blue-700 dark:text-sky-300 mb-6">
              {selectedProject.stack.map((tech, idx) => (
                <React.Fragment key={tech}>
                  <span>{tech}</span>
                  {idx < selectedProject.stack.length - 1 && (
                    <span aria-hidden="true" className="text-slate-400 dark:text-slate-500">
                      ·
                    </span>
                  )}
                </React.Fragment>
              ))}
            </div>

            <button
              type="button"
              onClick={() => setSelectedProject(null)}
              className="w-full min-h-[44px] rounded-xl bg-blue-600 hover:bg-blue-500 text-sm font-semibold text-white transition-colors cursor-pointer"
            >
              Close Preview
            </button>
          </div>
        </div>
      )}
    </section>
  );
};
