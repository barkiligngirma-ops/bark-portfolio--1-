import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Check, Copy, Mail, X } from 'lucide-react';
import { runHeroSequence } from '../../animations/heroAnimations';
import type { OrbitAnimationController } from '../../animations/orbitAnimations';
import type { NavSectionId } from '../layout/Navbar';
import { DeveloperCharacter } from './DeveloperCharacter';
import { HeroContent } from './HeroContent';
import { type TechnologyId, type TechnologyItem } from './TechnologyIcon';
import { ORBIT_TECHNOLOGIES, TechnologyOrbit } from './TechnologyOrbit';

export type HeroDialogKind = Exclude<NavSectionId, 'home'> | null;

export interface HeroProps {
  /**
   * Future character PNG source. Keep null/undefined until the real PNG is uploaded.
   * When provided, triggers the 5-step GSAP entrance & floating sequence automatically.
   */
  characterSrc?: string | null;
  requestedDialog?: HeroDialogKind;
  onDialogClose?: () => void;
  onExploreWork?: () => void;
  onContactMe?: () => void;
}

const CONTACT_EMAIL = 'hello@bark.dev';

export const Hero: React.FC<HeroProps> = ({
  characterSrc = null,
  requestedDialog = null,
  onDialogClose,
  onExploreWork,
  onContactMe,
}) => {
  const heroContainerRef = useRef<HTMLElement | null>(null);
  const characterRef = useRef<HTMLDivElement | null>(null);
  const orbitRingRef = useRef<HTMLDivElement | null>(null);
  const orbitTrackRef = useRef<HTMLDivElement | null>(null);

  const textRefs = useRef<(HTMLElement | null)[]>([]);
  const iconRefs = useRef<Partial<Record<TechnologyId, HTMLDivElement | null>>>({});
  const counterRefs = useRef<Partial<Record<TechnologyId, HTMLDivElement | null>>>({});
  const orbitControllerRef = useRef<OrbitAnimationController | null>(null);

  const [selectedTech, setSelectedTech] = useState<TechnologyItem | null>(null);
  const [localDialog, setLocalDialog] = useState<HeroDialogKind>(null);
  const [copiedEmail, setCopiedEmail] = useState(false);

  const activeDialog = requestedDialog ?? localDialog;

  const closeDialog = useCallback(() => {
    setLocalDialog(null);
    onDialogClose?.();
  }, [onDialogClose]);

  const registerTextRef = useCallback(
    (index: number) => (el: HTMLElement | null) => {
      textRefs.current[index] = el;
    },
    []
  );

  const registerIconRef = useCallback((id: TechnologyId, el: HTMLDivElement | null) => {
    iconRefs.current[id] = el;
  }, []);

  const registerCounterRef = useCallback((id: TechnologyId, el: HTMLDivElement | null) => {
    counterRefs.current[id] = el;
  }, []);

  useEffect(() => {
    const container = heroContainerRef.current;
    if (!container) return;

    const textTargets = textRefs.current.filter((el): el is HTMLElement => el !== null);
    const iconElements = ORBIT_TECHNOLOGIES.map((t) => iconRefs.current[t.id]).filter(
      (el): el is HTMLDivElement => el !== null
    );
    const iconCounterElements = ORBIT_TECHNOLOGIES.map((t) => counterRefs.current[t.id]).filter(
      (el): el is HTMLDivElement => el !== null
    );

    const hasCharacterAsset = Boolean(characterSrc && characterSrc.trim().length > 0);

    const cleanup = runHeroSequence({
      container,
      textTargets,
      characterElement: hasCharacterAsset ? characterRef.current : null,
      hasCharacterAsset,
      orbitRingElement: orbitRingRef.current,
      orbitTrackElement: orbitTrackRef.current,
      iconElements,
      iconCounterElements,
      onOrbitReady: (controller) => {
        orbitControllerRef.current = controller;
      },
    });

    return () => {
      orbitControllerRef.current = null;
      cleanup.revert();
    };
  }, [characterSrc]);

  useEffect(() => {
    if (!activeDialog) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        closeDialog();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activeDialog, closeDialog]);

  const handlePauseOrbit = useCallback(() => {
    orbitControllerRef.current?.pause();
  }, []);

  const handleResumeOrbit = useCallback(() => {
    orbitControllerRef.current?.resume();
  }, []);

  const handleSelectTech = useCallback((tech: TechnologyItem) => {
    setSelectedTech((prev) => (prev?.id === tech.id ? null : tech));
  }, []);

  const handleCopyEmail = useCallback(() => {
    if (navigator.clipboard?.writeText) {
      navigator.clipboard.writeText(CONTACT_EMAIL).catch(() => undefined);
    }
    setCopiedEmail(true);
    window.setTimeout(() => setCopiedEmail(false), 2000);
  }, []);

  return (
    <section
      ref={heroContainerRef}
      id="hero"
      aria-label="Introduction"
      className="relative z-10 min-h-screen w-full overflow-x-clip flex items-center pt-24 sm:pt-28 pb-14 sm:pb-20 lg:pb-24 px-6 sm:px-10 lg:px-14"
    >
      <div className="mx-auto w-full max-w-7xl grid grid-cols-1 lg:grid-cols-12 items-center gap-14 lg:gap-10">
        {/* Left side: Intro typography & primary actions */}
        <div className="lg:col-span-6 flex flex-col justify-center">
          <HeroContent
            onExploreWork={() => {
              if (onExploreWork) {
                onExploreWork();
              } else {
                setLocalDialog('project');
              }
            }}
            onContactMe={() => {
              if (onContactMe) {
                onContactMe();
              } else {
                setLocalDialog('contact');
              }
            }}
            registerTextRef={registerTextRef}
          />
        </div>

        {/* Right side: Developer Character + Independent Technology Orbit */}
        <div className="lg:col-span-6 flex flex-col items-center justify-center">
          <div className="relative flex items-center justify-center">
            <DeveloperCharacter
              characterSrc={characterSrc}
              characterRef={characterRef}
            />

            <TechnologyOrbit
              ringRef={orbitRingRef}
              orbitTrackRef={orbitTrackRef}
              selectedTechId={selectedTech?.id ?? null}
              onSelectTech={handleSelectTech}
              onPauseOrbit={handlePauseOrbit}
              onResumeOrbit={handleResumeOrbit}
              registerIconRef={registerIconRef}
              registerCounterRef={registerCounterRef}
            />
          </div>
        </div>
      </div>

      {/* Interactive Modal triggered by Navbar links or Hero CTA buttons */}
      {activeDialog && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="hero-dialog-title"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-slate-950/55 dark:bg-[#020817]/75 backdrop-blur-sm"
          onClick={closeDialog}
        >
          <div
            className="relative w-full max-w-md rounded-2xl border border-slate-200 dark:border-sky-400/25 bg-white/95 dark:bg-[#05122b]/95 p-6 sm:p-8 text-slate-900 dark:text-slate-100 shadow-2xl dark:shadow-[0_24px_64px_rgba(2,8,23,0.85)]"
            onClick={(event) => event.stopPropagation()}
          >
            <button
              type="button"
              onClick={closeDialog}
              aria-label="Close dialog"
              className="absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-lg border border-slate-200 dark:border-sky-400/20 text-slate-600 dark:text-slate-300 hover:border-blue-500/50 dark:hover:border-sky-300/50 hover:text-slate-950 dark:hover:text-white transition-colors cursor-pointer"
            >
              <X className="h-4 w-4" aria-hidden="true" />
            </button>

            {activeDialog === 'about' && (
              <div>
                <p className="text-xs font-semibold tracking-[0.18em] text-blue-600 dark:text-sky-400 uppercase mb-2">
                  About Bark
                </p>
                <h3
                  id="hero-dialog-title"
                  className="font-display text-2xl font-bold text-slate-950 dark:text-slate-50 mb-3"
                >
                  Frontend &amp; Creative Engineering
                </h3>
                <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 mb-6">
                  I specialize in building responsive interfaces, expressive GSAP motion
                  systems, and scalable modern web applications with clean TypeScript
                  architecture.
                </p>
                <button
                  type="button"
                  onClick={closeDialog}
                  className="w-full min-h-[44px] rounded-xl bg-blue-600 hover:bg-blue-500 text-sm font-semibold text-white transition-colors cursor-pointer"
                >
                  Back to Hero
                </button>
              </div>
            )}

            {activeDialog === 'skills' && (
              <div>
                <p className="text-xs font-semibold tracking-[0.18em] text-blue-600 dark:text-sky-400 uppercase mb-2">
                  Core Stack
                </p>
                <h3
                  id="hero-dialog-title"
                  className="font-display text-2xl font-bold text-slate-950 dark:text-slate-50 mb-3"
                >
                  Skills &amp; Technologies
                </h3>
                <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 mb-5">
                  Hover or select any icon in the orbital ring to inspect the core
                  frontend and backend tools I build with.
                </p>
                <div className="flex flex-wrap gap-x-3 gap-y-1.5 text-xs text-slate-500 dark:text-slate-400 mb-6">
                  {ORBIT_TECHNOLOGIES.map((tech, idx) => (
                    <React.Fragment key={tech.id}>
                      <span className="text-slate-900 dark:text-slate-200 font-medium">
                        {tech.name}
                      </span>
                      {idx < ORBIT_TECHNOLOGIES.length - 1 && (
                        <span aria-hidden="true">·</span>
                      )}
                    </React.Fragment>
                  ))}
                </div>
                <button
                  type="button"
                  onClick={closeDialog}
                  className="w-full min-h-[44px] rounded-xl bg-blue-600 hover:bg-blue-500 text-sm font-semibold text-white transition-colors cursor-pointer"
                >
                  Back to Orbit
                </button>
              </div>
            )}

            {activeDialog === 'project' && (
              <div>
                <p className="text-xs font-semibold tracking-[0.18em] text-blue-600 dark:text-sky-400 uppercase mb-2">
                  Portfolio Roadmap
                </p>
                <h3
                  id="hero-dialog-title"
                  className="font-display text-2xl font-bold text-slate-950 dark:text-slate-50 mb-3"
                >
                  Selected Projects
                </h3>
                <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 mb-5">
                  Interactive case studies and live project showcases will be added in
                  the upcoming phase. Hover or click any icon in the technology orbit
                  to inspect the core stack.
                </p>
                <div className="flex flex-wrap gap-x-3 gap-y-1.5 text-xs text-slate-500 dark:text-slate-400 mb-6">
                  {ORBIT_TECHNOLOGIES.map((tech, idx) => (
                    <React.Fragment key={tech.id}>
                      <span className="text-slate-900 dark:text-slate-200 font-medium">
                        {tech.name}
                      </span>
                      {idx < ORBIT_TECHNOLOGIES.length - 1 && (
                        <span aria-hidden="true">·</span>
                      )}
                    </React.Fragment>
                  ))}
                </div>
                <button
                  type="button"
                  onClick={closeDialog}
                  className="w-full min-h-[44px] rounded-xl bg-blue-600 hover:bg-blue-500 text-sm font-semibold text-white transition-colors cursor-pointer"
                >
                  Back to Hero
                </button>
              </div>
            )}

            {activeDialog === 'services' && (
              <div>
                <p className="text-xs font-semibold tracking-[0.18em] text-blue-600 dark:text-sky-400 uppercase mb-2">
                  Capabilities
                </p>
                <h3
                  id="hero-dialog-title"
                  className="font-display text-2xl font-bold text-slate-950 dark:text-slate-50 mb-3"
                >
                  Services
                </h3>
                <ul className="space-y-2.5 text-sm text-slate-700 dark:text-slate-300 mb-6">
                  <li>01. Interactive Frontend Architecture (React &amp; TypeScript)</li>
                  <li>02. Motion &amp; Micro-Interaction Engineering (GSAP)</li>
                  <li>03. Responsive Design Systems &amp; Full-Stack Web Apps</li>
                </ul>
                <button
                  type="button"
                  onClick={closeDialog}
                  className="w-full min-h-[44px] rounded-xl bg-blue-600 hover:bg-blue-500 text-sm font-semibold text-white transition-colors cursor-pointer"
                >
                  Back to Hero
                </button>
              </div>
            )}

            {activeDialog === 'contact' && (
              <div>
                <p className="text-xs font-semibold tracking-[0.18em] text-blue-600 dark:text-sky-400 uppercase mb-2">
                  Get In Touch
                </p>
                <h3
                  id="hero-dialog-title"
                  className="font-display text-2xl font-bold text-slate-950 dark:text-slate-50 mb-3"
                >
                  Contact Bark
                </h3>
                <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 mb-6">
                  Available for frontend engineering, creative web experiences,
                  and interactive interface builds.
                </p>

                <div className="flex items-center justify-between gap-3 rounded-xl border border-slate-200 dark:border-sky-400/20 bg-slate-100/80 dark:bg-[#030b1d]/80 px-4 py-3 mb-5">
                  <span className="text-sm font-medium text-slate-900 dark:text-slate-100 truncate">
                    {CONTACT_EMAIL}
                  </span>
                  <button
                    type="button"
                    onClick={handleCopyEmail}
                    className="inline-flex items-center gap-1.5 rounded-lg border border-blue-500/30 dark:border-sky-400/30 bg-white dark:bg-[#081b42] px-3 py-1.5 text-xs font-semibold text-blue-600 dark:text-sky-300 hover:border-blue-600/60 dark:hover:border-sky-300/60 hover:text-blue-700 dark:hover:text-white transition-colors whitespace-nowrap shrink-0 cursor-pointer"
                  >
                    {copiedEmail ? (
                      <>
                        <Check className="h-3.5 w-3.5" aria-hidden="true" />
                        <span>Copied</span>
                      </>
                    ) : (
                      <>
                        <Copy className="h-3.5 w-3.5" aria-hidden="true" />
                        <span>Copy</span>
                      </>
                    )}
                  </button>
                </div>

                <a
                  href={`mailto:${CONTACT_EMAIL}`}
                  className="inline-flex w-full items-center justify-center gap-2 min-h-[44px] rounded-xl bg-blue-600 hover:bg-blue-500 text-sm font-semibold text-white transition-colors"
                >
                  <Mail className="h-4 w-4" aria-hidden="true" />
                  <span>Open Email Client</span>
                </a>
              </div>
            )}
          </div>
        </div>
      )}
    </section>
  );
};
