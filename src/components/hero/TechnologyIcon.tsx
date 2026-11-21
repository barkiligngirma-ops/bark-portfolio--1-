import React from 'react';

export type TechnologyId =
  | 'html5'
  | 'css3'
  | 'javascript'
  | 'react'
  | 'typescript'
  | 'nodejs'
  | 'python'
  | 'php'
  | 'tailwindcss';

export interface TechnologyItem {
  id: TechnologyId;
  name: string;
  accent: string;
}

interface TechnologyIconProps {
  technology: TechnologyItem;
  angleDeg: number;
  isSelected?: boolean;
  onSelect?: (tech: TechnologyItem) => void;
  registerIconRef: (id: TechnologyId, el: HTMLDivElement | null) => void;
  registerCounterRef: (id: TechnologyId, el: HTMLDivElement | null) => void;
}

function renderTechnologyLogo(id: TechnologyId): React.ReactNode {
  switch (id) {
    case 'html5':
      return (
        <svg viewBox="0 0 32 32" className="w-7 h-7 sm:w-8 sm:h-8" aria-hidden="true">
          <path fill="#E34F26" d="M5 3h22l-2 22.5L16 29l-9-3.5L5 3z" />
          <path fill="#EF652A" d="M16 5v21.8l7.3-2.8L25 5H16z" />
          <path
            fill="#FFFFFF"
            d="M16 11.2h-4.7l-.3-3.1H16V5H7.8l.9 9.3H16v-3.1zm0 8.2l-3.8-1-.2-2.6H8.9l.4 5.1 6.7 1.9v-3.4z"
          />
          <path
            fill="#EBEBEB"
            d="M16 11.2v3.1h4.1l-.4 4.1-3.7 1v3.4l6.7-1.9.8-9.7H16zm0-6.2v3.1h7.9l.3-3.1H16z"
          />
        </svg>
      );

    case 'css3':
      return (
        <svg viewBox="0 0 32 32" className="w-7 h-7 sm:w-8 sm:h-8" aria-hidden="true">
          <path fill="#1572B6" d="M5 3h22l-2 22.5L16 29l-9-3.5L5 3z" />
          <path fill="#33A9DC" d="M16 5v21.8l7.3-2.8L25 5H16z" />
          <path
            fill="#FFFFFF"
            d="M16 11.2H8.4l.3 3.1H16v-3.1zm0-6.2H7.8l.3 3.1H16V5zm0 14.4l-3.8-1-.2-2.6H8.9l.4 5.1 6.7 1.9v-3.4z"
          />
          <path
            fill="#EBEBEB"
            d="M16 11.2v3.1h4.1l-.4 4.1-3.7 1v3.4l6.7-1.9.8-9.7H16zm0-6.2v3.1h7.9l.3-3.1H16z"
          />
        </svg>
      );

    case 'javascript':
      return (
        <svg viewBox="0 0 32 32" className="w-7 h-7 sm:w-8 sm:h-8" aria-hidden="true">
          <rect x="4" y="4" width="24" height="24" rx="4" fill="#F7DF1E" />
          <path
            fill="#111827"
            d="M16.9 22.2c.5.9 1.1 1.6 2.3 1.6 1 0 1.7-.5 1.7-1.2 0-.9-.7-1.2-1.8-1.7l-.6-.3c-1.8-.8-3-1.7-3-3.7 0-1.9 1.4-3.3 3.6-3.3 1.6 0 2.7.5 3.5 2l-1.9 1.2c-.4-.8-.9-1.1-1.6-1.1-.7 0-1.2.5-1.2 1.1 0 .8.5 1.1 1.6 1.6l.6.3c2.1.9 3.3 1.8 3.3 3.9 0 2.2-1.8 3.5-4.1 3.5-2.3 0-3.8-1.1-4.5-2.5l2.1-1.4zm-6.8.2c.4.7.8 1.3 1.6 1.3.8 0 1.3-.3 1.3-1.6v-8.4h2.5v8.5c0 2.6-1.5 3.8-3.7 3.8-2 0-3.2-1-3.8-2.3l2.1-1.3z"
          />
        </svg>
      );

    case 'react':
      return (
        <svg viewBox="0 0 32 32" className="w-7 h-7 sm:w-8 sm:h-8" aria-hidden="true">
          <circle cx="16" cy="16" r="2.4" fill="#61DAFB" />
          <g fill="none" stroke="#61DAFB" strokeWidth="1.6">
            <ellipse cx="16" cy="16" rx="11.5" ry="4.4" />
            <ellipse cx="16" cy="16" rx="11.5" ry="4.4" transform="rotate(60 16 16)" />
            <ellipse cx="16" cy="16" rx="11.5" ry="4.4" transform="rotate(120 16 16)" />
          </g>
        </svg>
      );

    case 'typescript':
      return (
        <svg viewBox="0 0 32 32" className="w-7 h-7 sm:w-8 sm:h-8" aria-hidden="true">
          <rect x="4" y="4" width="24" height="24" rx="4" fill="#3178C6" />
          <path
            fill="#FFFFFF"
            d="M14.8 16h-3.1v9.5H9.2V16H6.1v-2.1h8.7V16zm2.4 7c.6.4 1.5.7 2.4.7 1.1 0 1.7-.4 1.7-1.1 0-.6-.5-1-1.7-1.4-1.8-.6-2.9-1.6-2.9-3.2 0-1.9 1.5-3.3 3.9-3.3 1.2 0 2.1.3 2.7.6l-.6 2c-.4-.2-1.2-.5-2.1-.5-1 0-1.5.4-1.5 1 0 .6.6 1 1.9 1.4 1.9.7 2.8 1.6 2.8 3.2 0 1.9-1.4 3.4-4.2 3.4-1.2 0-2.4-.3-3-.7l.6-2.1z"
          />
        </svg>
      );

    case 'nodejs':
      return (
        <svg viewBox="0 0 32 32" className="w-7 h-7 sm:w-8 sm:h-8" aria-hidden="true">
          <path
            fill="#5FA04E"
            d="M16 3.5L26.8 9.8v12.4L16 28.5 5.2 22.2V9.8L16 3.5z"
          />
          <path
            fill="#143218"
            fillOpacity="0.25"
            d="M16 3.5v25l10.8-6.3V9.8L16 3.5z"
          />
          <text
            x="16"
            y="19"
            textAnchor="middle"
            fill="#FFFFFF"
            fontSize="8.5"
            fontWeight="700"
            fontFamily="sans-serif"
          >
            JS
          </text>
        </svg>
      );

    case 'python':
      return (
        <svg viewBox="0 0 32 32" className="w-7 h-7 sm:w-8 sm:h-8" aria-hidden="true">
          <path
            fill="#3776AB"
            d="M15.9 4.5c-5.4 0-5.1 2.3-5.1 2.3v2.4h5.2v.8H8.8S5.5 9.6 5.5 15s2.9 5.2 2.9 5.2h1.7v-2.6s-.1-2.9 2.9-2.9h5s2.8 0 2.8-2.7V7.3s.4-2.8-4.9-2.8zm-2.8 1.6a1 1 0 110 2 1 1 0 010-2z"
          />
          <path
            fill="#FFD43B"
            d="M16.1 27.5c5.4 0 5.1-2.3 5.1-2.3v-2.4H16V22h7.2s3.3.4 3.3-5-2.9-5.2-2.9-5.2h-1.7v2.6s.1 2.9-2.9 2.9h-5s-2.8 0-2.8 2.7v4.7s-.4 2.8 4.9 2.8zm2.8-1.6a1 1 0 110-2 1 1 0 010 2z"
          />
        </svg>
      );

    case 'php':
      return (
        <svg viewBox="0 0 32 32" className="w-7 h-7 sm:w-8 sm:h-8" aria-hidden="true">
          <ellipse cx="16" cy="16" rx="13" ry="7.6" fill="#777BB4" />
          <text
            x="16"
            y="18.6"
            textAnchor="middle"
            fill="#FFFFFF"
            fontSize="8.8"
            fontWeight="700"
            fontStyle="italic"
            fontFamily="sans-serif"
          >
            php
          </text>
        </svg>
      );

    case 'tailwindcss':
      return (
        <svg viewBox="0 0 32 32" className="w-7 h-7 sm:w-8 sm:h-8" aria-hidden="true">
          <path
            fill="#38BDF8"
            d="M16 9.5c-3.5 0-5.7 1.7-6.6 5.2 1.3-1.7 2.8-2.4 4.6-1.9 1 .2 1.7 1 2.5 1.8 1.3 1.3 2.8 2.8 6.1 2.8 3.5 0 5.7-1.7 6.6-5.2-1.3 1.7-2.8 2.4-4.6 1.9-1-.2-1.7-1-2.5-1.8-1.3-1.3-2.8-2.8-6.1-2.8zM9.4 17.5c-3.5 0-5.7 1.7-6.6 5.2 1.3-1.7 2.8-2.4 4.6-1.9 1 .2 1.7 1 2.5 1.8 1.3 1.3 2.8 2.8 6.1 2.8 3.5 0 5.7-1.7 6.6-5.2-1.3 1.7-2.8 2.4-4.6 1.9-1-.2-1.7-1-2.5-1.8-1.3-1.3-2.8-2.8-6.1-2.8z"
          />
        </svg>
      );
  }
}

export const TechnologyIcon: React.FC<TechnologyIconProps> = ({
  technology,
  angleDeg,
  isSelected = false,
  onSelect,
  registerIconRef,
  registerCounterRef,
}) => {
  const angleRad = (angleDeg * Math.PI) / 180;
  const cos = Math.cos(angleRad).toFixed(5);
  const sin = Math.sin(angleRad).toFixed(5);

  return (
    <div
      className="orbit-icon-anchor pointer-events-auto absolute z-20"
      style={{
        left: `calc(50% + ${cos} * var(--orbit-radius))`,
        top: `calc(50% + ${sin} * var(--orbit-radius))`,
        transform: 'translate(-50%, -50%)',
      }}
    >
      <div
        ref={(el) => registerCounterRef(technology.id, el)}
        className="relative flex items-center justify-center will-change-transform"
      >
        <div ref={(el) => registerIconRef(technology.id, el)}>
          <button
            type="button"
            onClick={() => onSelect?.(technology)}
            aria-label={technology.name}
            aria-describedby={`tech-tooltip-${technology.id}`}
            className={`orbit-icon-button group relative flex items-center justify-center w-12 h-12 sm:w-14 sm:h-14 lg:w-[62px] lg:h-[62px] rounded-full border backdrop-blur-md cursor-pointer ${
              isSelected
                ? 'bg-blue-50/95 dark:bg-[#0b2354]/95 border-blue-600/80 dark:border-sky-400/80 shadow-[0_0_24px_rgba(37,99,235,0.3)] dark:shadow-[0_0_24px_rgba(56,189,248,0.45)]'
                : 'bg-white/90 dark:bg-[#06132f]/88 border-blue-500/25 dark:border-sky-400/25 shadow-[0_8px_24px_rgba(15,23,42,0.12)] dark:shadow-[0_8px_24px_rgba(2,8,23,0.65)] hover:border-blue-600/70 dark:hover:border-sky-300/75 hover:bg-white dark:hover:bg-[#0a1d47]/95 hover:shadow-[0_0_22px_rgba(37,99,235,0.22)] dark:hover:shadow-[0_0_22px_rgba(56,189,248,0.35)]'
            }`}
          >
            {renderTechnologyLogo(technology.id)}
          </button>
        </div>

        <div
          id={`tech-tooltip-${technology.id}`}
          role="tooltip"
          className="orbit-tooltip absolute -top-10 left-1/2 z-30 whitespace-nowrap rounded-lg border border-slate-200 dark:border-sky-400/30 bg-white/95 dark:bg-[#041029]/95 px-2.5 py-1 text-xs font-medium tracking-wide text-slate-900 dark:text-slate-100 shadow-lg backdrop-blur-md"
        >
          {technology.name}
        </div>
      </div>
    </div>
  );
};
