import React from 'react';

export interface DeveloperCharacterProps {
  characterSrc?: string | null;
  characterAlt?: string;
  characterRef?: React.RefObject<HTMLDivElement | null>;
}

/**
 * Future character integration slot.
 * Renders an empty layout-preserving stage container until the real
 * Bark developer character PNG is provided. Never renders placeholder
 * portraits, silhouettes, or stock imagery.
 */
export const DeveloperCharacter: React.FC<DeveloperCharacterProps> = ({
  characterSrc = null,
  characterAlt = 'Bark — Frontend & Creative Developer',
  characterRef,
}) => {
  const hasRealCharacter = Boolean(characterSrc && characterSrc.trim().length > 0);

  return (
    <div
      ref={characterRef}
      data-character-slot={hasRealCharacter ? 'loaded' : 'empty'}
      aria-hidden={!hasRealCharacter}
      className="pointer-events-none absolute inset-0 z-10 flex items-center justify-center"
    >
      <div className="relative -translate-y-4 sm:-translate-y-5 lg:-translate-y-7 flex items-end justify-center w-[265px] h-[275px] sm:w-[345px] sm:h-[360px] lg:w-[420px] lg:h-[435px] xl:w-[468px] xl:h-[485px]">
        {hasRealCharacter && characterSrc ? (
          <img
            src={characterSrc}
            alt={characterAlt}
            referrerPolicy="no-referrer"
            className="h-full w-full object-contain object-bottom select-none drop-shadow-[0_24px_48px_rgba(37,99,235,0.34)] [mask-image:linear-gradient(to_bottom,black_85%,transparent_100%)]"
          />
        ) : null}
      </div>
    </div>
  );
};
