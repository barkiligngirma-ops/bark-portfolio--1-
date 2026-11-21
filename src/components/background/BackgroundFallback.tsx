import React from 'react';

interface BackgroundFallbackProps {
  visible?: boolean;
}

export const BackgroundFallback: React.FC<BackgroundFallbackProps> = React.memo(
  ({ visible = true }) => {
    return (
      <div
        aria-hidden="true"
        className={`background-fallback-layer ${visible ? 'opacity-100' : 'opacity-0'}`}
      />
    );
  }
);

BackgroundFallback.displayName = 'BackgroundFallback';
