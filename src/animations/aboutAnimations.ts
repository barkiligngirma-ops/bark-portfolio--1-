import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export interface AboutSequenceOptions {
  container: HTMLElement;
  visualElement: HTMLElement | null;
  ringElement: HTMLElement | null;
  counterElements: HTMLElement[];
  contentTargets: HTMLElement[];
}

export interface AboutAnimationCleanup {
  revert: () => void;
}

export function runAboutSequence({
  container,
  visualElement,
  ringElement,
  counterElements,
  contentTargets,
}: AboutSequenceOptions): AboutAnimationCleanup {
  const ctx = gsap.context(() => {
    const isDesktop = typeof window !== 'undefined' && window.innerWidth >= 1024;
    const horizontalOffset = isDesktop ? 110 : 64;

    if (visualElement) {
      gsap.set(visualElement, {
        opacity: 0,
        x: -horizontalOffset,
        y: 0,
        scale: 0.96,
      });
    }
    if (contentTargets.length > 0) {
      gsap.set(contentTargets, {
        opacity: 0,
        x: horizontalOffset,
        y: 0,
      });
    }

    let ringTween: gsap.core.Tween | null = null;
    let counterTween: gsap.core.Tween | null = null;
    let floatTween: gsap.core.Tween | null = null;

    const startAmbientMotion = () => {
      if (ringElement && !ringTween) {
        ringTween = gsap.to(ringElement, {
          rotation: 360,
          duration: 24,
          repeat: -1,
          ease: 'none',
          transformOrigin: '50% 50%',
        });
      }

      if (counterElements.length > 0 && !counterTween) {
        counterTween = gsap.to(counterElements, {
          rotation: -360,
          duration: 24,
          repeat: -1,
          ease: 'none',
          transformOrigin: '50% 50%',
        });
      }

      if (visualElement && !floatTween) {
        floatTween = gsap.to(visualElement, {
          y: -8,
          duration: 3.4,
          repeat: -1,
          yoyo: true,
          ease: 'sine.inOut',
        });
      }
    };

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: container,
        start: 'top 80%',
        once: true,
      },
    });

    // 1. Left side visual enters smoothly from the left toward center
    if (visualElement) {
      tl.to(
        visualElement,
        {
          opacity: 1,
          x: 0,
          scale: 1,
          duration: 0.95,
          ease: 'power3.out',
        },
        0
      );
    }

    // 2. Right side content enters smoothly from the right simultaneously, closing together
    if (contentTargets.length > 0) {
      tl.to(
        contentTargets,
        {
          opacity: 1,
          x: 0,
          duration: 0.9,
          stagger: 0.035,
          ease: 'power3.out',
          clearProps: 'transform',
        },
        0
      );
    }

    // 3. Start continuous orbital ring rotation and subtle float
    tl.call(startAmbientMotion, [], '>-0.15');
  }, container);

  return {
    revert: () => {
      ctx.revert();
    },
  };
}
