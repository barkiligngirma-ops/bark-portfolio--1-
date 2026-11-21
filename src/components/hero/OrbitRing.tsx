import React from 'react';

interface OrbitRingProps {
  trackRef?: React.RefObject<HTMLDivElement | null>;
}

export const OrbitRing: React.FC<OrbitRingProps> = React.memo(({ trackRef }) => {
  return (
    <div
      ref={trackRef}
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 flex items-center justify-center"
    >
      {/* Primary circular track aligned to --orbit-radius */}
      <div
        className="rounded-full border border-blue-600/35 dark:border-sky-400/35 shadow-[0_0_50px_rgba(37,99,235,0.16),inset_0_0_40px_rgba(56,189,248,0.1)] dark:shadow-[0_0_50px_rgba(37,99,235,0.2),inset_0_0_40px_rgba(56,189,248,0.08)]"
        style={{
          width: 'calc(var(--orbit-radius) * 2)',
          height: 'calc(var(--orbit-radius) * 2)',
        }}
      />

      {/* Subtle inner concentric guide ring */}
      <div
        className="absolute rounded-full border border-blue-500/18 dark:border-blue-400/12"
        style={{
          width: 'calc(var(--orbit-radius) * 1.38)',
          height: 'calc(var(--orbit-radius) * 1.38)',
        }}
      />

      {/* Soft central electric-blue atmospheric halo */}
      <div
        className="absolute rounded-full"
        style={{
          width: 'calc(var(--orbit-radius) * 1.15)',
          height: 'calc(var(--orbit-radius) * 1.15)',
          background:
            'radial-gradient(circle, rgba(37, 99, 235, 0.16) 0%, rgba(56, 189, 248, 0.05) 45%, transparent 72%)',
        }}
      />
    </div>
  );
});

OrbitRing.displayName = 'OrbitRing';
