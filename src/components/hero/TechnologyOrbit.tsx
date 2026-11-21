import React from 'react';
import { OrbitRing } from './OrbitRing';
import {
  TechnologyIcon,
  type TechnologyId,
  type TechnologyItem,
} from './TechnologyIcon';

export const ORBIT_TECHNOLOGIES: TechnologyItem[] = [
  { id: 'html5', name: 'HTML5', accent: '#E34F26' },
  { id: 'css3', name: 'CSS3', accent: '#33A9DC' },
  { id: 'javascript', name: 'JavaScript', accent: '#F7DF1E' },
  { id: 'react', name: 'React', accent: '#61DAFB' },
  { id: 'typescript', name: 'TypeScript', accent: '#3178C6' },
  { id: 'nodejs', name: 'Node.js', accent: '#5FA04E' },
  { id: 'python', name: 'Python', accent: '#3776AB' },
  { id: 'php', name: 'PHP', accent: '#777BB4' },
  { id: 'tailwindcss', name: 'Tailwind CSS', accent: '#38BDF8' },
];

interface TechnologyOrbitProps {
  ringRef: React.RefObject<HTMLDivElement | null>;
  orbitTrackRef: React.RefObject<HTMLDivElement | null>;
  selectedTechId: TechnologyId | null;
  onSelectTech: (tech: TechnologyItem) => void;
  onPauseOrbit: () => void;
  onResumeOrbit: () => void;
  registerIconRef: (id: TechnologyId, el: HTMLDivElement | null) => void;
  registerCounterRef: (id: TechnologyId, el: HTMLDivElement | null) => void;
}

export const TechnologyOrbit: React.FC<TechnologyOrbitProps> = ({
  ringRef,
  orbitTrackRef,
  selectedTechId,
  onSelectTech,
  onPauseOrbit,
  onResumeOrbit,
  registerIconRef,
  registerCounterRef,
}) => {
  const total = ORBIT_TECHNOLOGIES.length;

  return (
    <div
      className="orbit-stage pointer-events-none relative flex items-center justify-center select-none"
      style={{
        width: 'var(--orbit-size)',
        height: 'var(--orbit-size)',
      }}
      aria-label="Technology stack orbit"
    >
      <OrbitRing trackRef={orbitTrackRef} />

      {/* Wrapper with pointer-events-none so only the orbiting icons receive pointer events */}
      <div
        className="pointer-events-none absolute inset-0 flex items-center justify-center"
        onMouseEnter={onPauseOrbit}
        onMouseLeave={onResumeOrbit}
        onFocusCapture={onPauseOrbit}
        onBlurCapture={(event) => {
          if (!event.currentTarget.contains(event.relatedTarget as Node | null)) {
            onResumeOrbit();
          }
        }}
      >
        <div
          ref={ringRef}
          className="pointer-events-none relative w-full h-full will-change-transform"
        >
          {ORBIT_TECHNOLOGIES.map((tech, index) => {
            const angleDeg = (index / total) * 360 - 90;
            return (
              <TechnologyIcon
                key={tech.id}
                technology={tech}
                angleDeg={angleDeg}
                isSelected={selectedTechId === tech.id}
                onSelect={onSelectTech}
                registerIconRef={registerIconRef}
                registerCounterRef={registerCounterRef}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
};
