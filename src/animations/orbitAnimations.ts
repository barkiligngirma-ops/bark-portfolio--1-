import gsap from 'gsap';

export interface OrbitAnimationController {
  start: () => void;
  pause: () => void;
  resume: () => void;
  destroy: () => void;
}

interface CreateOrbitRotationOptions {
  ringElement: HTMLElement;
  counterElements: HTMLElement[];
  durationSeconds?: number;
}

export function createOrbitRotation({
  ringElement,
  counterElements,
  durationSeconds = 16,
}: CreateOrbitRotationOptions): OrbitAnimationController {
  let ringTween: gsap.core.Tween | null = null;
  let counterTween: gsap.core.Tween | null = null;
  let speedTween: gsap.core.Tween | null = null;
  let hasStarted = false;

  const start = () => {
    if (hasStarted) return;
    hasStarted = true;

    gsap.set(ringElement, { rotation: 0, transformOrigin: '50% 50%' });
    ringTween = gsap.to(ringElement, {
      rotation: 360,
      duration: durationSeconds,
      repeat: -1,
      ease: 'none',
      transformOrigin: '50% 50%',
    });

    if (counterElements.length > 0) {
      gsap.set(counterElements, { rotation: 0, transformOrigin: '50% 50%' });
      counterTween = gsap.to(counterElements, {
        rotation: -360,
        duration: durationSeconds,
        repeat: -1,
        ease: 'none',
        transformOrigin: '50% 50%',
      });
    }
  };

  const pause = () => {
    if (!hasStarted) return;
    speedTween?.kill();
    const targets = [ringTween, counterTween].filter(
      (t): t is gsap.core.Tween => t !== null
    );
    if (targets.length === 0) return;

    speedTween = gsap.to(targets, {
      timeScale: 0,
      duration: 0.2,
      ease: 'power2.out',
      overwrite: true,
    });
  };

  const resume = () => {
    if (!hasStarted) return;
    speedTween?.kill();
    const targets = [ringTween, counterTween].filter(
      (t): t is gsap.core.Tween => t !== null
    );
    if (targets.length === 0) return;

    speedTween = gsap.to(targets, {
      timeScale: 1,
      duration: 0.3,
      ease: 'power2.inOut',
      overwrite: true,
    });
  };

  const destroy = () => {
    speedTween?.kill();
    ringTween?.kill();
    counterTween?.kill();
    ringTween = null;
    counterTween = null;
    hasStarted = false;
  };

  return {
    start,
    pause,
    resume,
    destroy,
  };
}
