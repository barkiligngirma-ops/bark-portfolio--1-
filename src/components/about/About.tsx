import React, { useCallback, useEffect, useRef, useState } from 'react';
import { runAboutSequence } from '../../animations/aboutAnimations';
import { AboutContent } from './AboutContent';
import { AboutVisual, type AboutPillar } from './AboutVisual';

interface AboutProps {
  onOpenContact: () => void;
  onBackToHero: () => void;
}

export const About: React.FC<AboutProps> = ({ onOpenContact, onBackToHero }) => {
  const sectionRef = useRef<HTMLElement | null>(null);
  const visualRef = useRef<HTMLDivElement | null>(null);
  const ringRef = useRef<HTMLDivElement | null>(null);
  const counterRefs = useRef<(HTMLDivElement | null)[]>([]);
  const contentRefs = useRef<(HTMLElement | null)[]>([]);

  const [activePillarId, setActivePillarId] = useState<AboutPillar['id']>('frontend');

  const registerCounterRef = useCallback(
    (index: number) => (el: HTMLDivElement | null) => {
      counterRefs.current[index] = el;
    },
    []
  );

  const registerContentRef = useCallback(
    (index: number) => (el: HTMLElement | null) => {
      contentRefs.current[index] = el;
    },
    []
  );

  useEffect(() => {
    const container = sectionRef.current;
    if (!container) return;

    const validCounters = counterRefs.current.filter(
      (el): el is HTMLDivElement => el !== null
    );
    const validContent = contentRefs.current.filter(
      (el): el is HTMLElement => el !== null
    );

    const cleanup = runAboutSequence({
      container,
      visualElement: visualRef.current,
      ringElement: ringRef.current,
      counterElements: validCounters,
      contentTargets: validContent,
    });

    return () => {
      cleanup.revert();
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      id="about"
      aria-label="About Barkilign"
      className="relative z-10 min-h-screen w-full overflow-x-clip flex items-center py-20 sm:py-24 lg:py-28 px-6 sm:px-10 lg:px-14"
    >
      <div className="mx-auto w-full max-w-7xl grid grid-cols-1 lg:grid-cols-12 items-center gap-14 lg:gap-12">
        {/* Left side: Orbital focus visual matching Home section effect */}
        <div className="lg:col-span-6 order-2 lg:order-1 flex items-center justify-center">
          <AboutVisual
            visualRef={visualRef}
            ringRef={ringRef}
            registerCounterRef={registerCounterRef}
            activePillarId={activePillarId}
            onSelectPillar={setActivePillarId}
          />
        </div>

        {/* Right side: About Barkilign narrative & interactive pillars */}
        <div className="lg:col-span-6 order-1 lg:order-2 flex flex-col justify-center">
          <AboutContent
            activePillarId={activePillarId}
            onSelectPillar={setActivePillarId}
            onContactMe={onOpenContact}
            onBackToHero={onBackToHero}
            registerContentRef={registerContentRef}
          />
        </div>
      </div>
    </section>
  );
};
