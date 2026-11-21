import React from 'react';

export const BackgroundOverlay: React.FC = React.memo(() => {
  return (
    <div aria-hidden="true" className="background-overlay-layer">
      <div className="background-overlay-scrim" />
      <div className="background-overlay-glow" />
    </div>
  );
});

BackgroundOverlay.displayName = 'BackgroundOverlay';
