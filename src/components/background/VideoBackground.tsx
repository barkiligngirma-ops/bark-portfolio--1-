import React, { useEffect, useRef, useState } from 'react';
import { BackgroundFallback } from './BackgroundFallback';

export const VideoBackground: React.FC = React.memo(() => {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [hasError, setHasError] = useState(false);
  const [isVideoReady, setIsVideoReady] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    video.muted = true;
    video.defaultMuted = true;
    video.playsInline = true;
    video.loop = true;

    let isDisposed = false;
    let unlockListenerAttached = false;

    const removeUnlockListeners = () => {
      if (!unlockListenerAttached) return;
      unlockListenerAttached = false;
      window.removeEventListener('pointerdown', handleFirstInteraction);
      window.removeEventListener('keydown', handleFirstInteraction);
    };

    const safePlay = () => {
      if (isDisposed || !video) return;

      video.muted = true;
      const playPromise = video.play();

      if (playPromise !== undefined) {
        playPromise
          .then(() => {
            if (!isDisposed) {
              setIsVideoReady(true);
              removeUnlockListeners();
            }
          })
          .catch((error: unknown) => {
            if (isDisposed) return;

            const isAutoplayBlocked =
              error instanceof DOMException &&
              (error.name === 'NotAllowedError' || error.name === 'AbortError');

            if (isAutoplayBlocked && !unlockListenerAttached) {
              unlockListenerAttached = true;
              window.addEventListener('pointerdown', handleFirstInteraction, { once: true, passive: true });
              window.addEventListener('keydown', handleFirstInteraction, { once: true });
            }
          });
      }
    };

    const handleFirstInteraction = () => {
      safePlay();
    };

    const handleCanPlay = () => {
      if (isDisposed) return;
      setIsVideoReady(true);
      if (video.paused) {
        safePlay();
      }
    };

    const handleEnded = () => {
      if (isDisposed) return;
      video.currentTime = 0;
      safePlay();
    };

    const handleSourceError = () => {
      if (isDisposed) return;
      setHasError(true);
    };

    video.addEventListener('canplay', handleCanPlay);
    video.addEventListener('ended', handleEnded);
    video.addEventListener('error', handleSourceError);

    safePlay();

    return () => {
      isDisposed = true;
      removeUnlockListeners();
      video.removeEventListener('canplay', handleCanPlay);
      video.removeEventListener('ended', handleEnded);
      video.removeEventListener('error', handleSourceError);
    };
  }, []);

  return (
    <>
      <BackgroundFallback visible={hasError || !isVideoReady} />
      {!hasError && (
        <div className="video-background-layer" aria-hidden="true">
          <video
            ref={videoRef}
            id="website-background-video"
            className="video-background-element"
            autoPlay
            muted
            loop
            playsInline
            preload="auto"
            controls={false}
            disablePictureInPicture
            disableRemotePlayback
            poster="/assets/aistudio/background-poster_dc663a4e.jpg"
            tabIndex={-1}
            aria-hidden="true"
          >
            <source src="/videos/website-background.mp4" type="video/mp4" />
            <source src="/assets/aistudio/website-background_16ae8db8.mp4" type="video/mp4" />
          </video>
        </div>
      )}
    </>
  );
});

VideoBackground.displayName = 'VideoBackground';
