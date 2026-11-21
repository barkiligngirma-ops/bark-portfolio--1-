import gsap from 'gsap';
import { createOrbitRotation, type OrbitAnimationController } from './orbitAnimations';

export interface HeroSequenceOptions {
  container: HTMLElement;
  textTargets: HTMLElement[];
  characterElement: HTMLElement | null;
  hasCharacterAsset: boolean;
  orbitRingElement: HTMLElement | null;
  orbitTrackElement?: HTMLElement | null;
  iconElements: HTMLElement[];
  iconCounterElements: HTMLElement[];
  onOrbitReady?: (controller: OrbitAnimationController) => void;
}

export interface HeroAnimationCleanup {
  revert: () => void;
}

export function runHeroSequence({
  container,
  textTargets,
  characterElement,
  hasCharacterAsset,
  orbitRingElement,
  orbitTrackElement = null,
  iconElements,
  iconCounterElements,
  onOrbitReady,
}: HeroSequenceOptions): HeroAnimationCleanup {
  let orbitController: OrbitAnimationController | null = null;

  const ctx = gsap.context(() => {
    if (orbitRingElement) {
      orbitController = createOrbitRotation({
        ringElement: orbitRingElement,
        counterElements: iconCounterElements,
        durationSeconds: 16,
      });
      onOrbitReady?.(orbitController);
    }

    // Initial hidden states so the ordered sequence is clean from frame 0
    if (hasCharacterAsset && characterElement) {
      gsap.set(characterElement, { opacity: 0, y: 120, scale: 0.94 });
    }
    if (orbitTrackElement) {
      gsap.set(orbitTrackElement, { opacity: 0, scale: 0.82 });
    }
    if (iconElements.length > 0) {
      gsap.set(iconElements, { opacity: 0, scale: 0.45 });
    }

    const master = gsap.timeline();

    // Left hero text entrance
    if (textTargets.length > 0) {
      master.fromTo(
        textTargets,
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          stagger: 0.06,
          ease: 'power3.out',
          clearProps: 'transform',
        },
        0
      );
    }

    const startOrbitAndFloat = () => {
      // Step 4: Icons begin rotating continuously around the character PNG on the circle line
      orbitController?.start();

      // Step 5: Character begins gentle floating motion
      if (hasCharacterAsset && characterElement) {
        gsap.to(characterElement, {
          y: -8,
          duration: 3.2,
          repeat: -1,
          yoyo: true,
          ease: 'sine.inOut',
        });
      }
    };

    if (hasCharacterAsset && characterElement) {
      // Step 1: Character PNG smoothly appears from bottom to up
      master.to(
        characterElement,
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.95,
          ease: 'power3.out',
        },
        0.05
      );

      // Step 2: Orbit circle line appears around the character PNG
      if (orbitTrackElement) {
        master.to(
          orbitTrackElement,
          {
            opacity: 1,
            scale: 1,
            duration: 0.45,
            ease: 'power2.out',
            clearProps: 'transform',
          },
          '>'
        );
      }

      // Step 3: Technology icons appear sequentially along the circle line
      if (iconElements.length > 0) {
        master.to(
          iconElements,
          {
            opacity: 1,
            scale: 1,
            duration: 0.34,
            stagger: 0.065,
            ease: 'back.out(1.5)',
            clearProps: 'transform',
          },
          orbitTrackElement ? '>-0.1' : '>'
        );
      }

      // Steps 4 & 5: Orbit rotation + character subtle float
      master.call(startOrbitAndFloat, [], '>');
    } else {
      if (orbitTrackElement) {
        master.to(
          orbitTrackElement,
          {
            opacity: 1,
            scale: 1,
            duration: 0.4,
            ease: 'power2.out',
            clearProps: 'transform',
          },
          0.15
        );
      }

      if (iconElements.length > 0) {
        master.to(
          iconElements,
          {
            opacity: 1,
            scale: 1,
            duration: 0.32,
            stagger: 0.06,
            ease: 'back.out(1.5)',
            clearProps: 'transform',
          },
          '>-0.1'
        );
      }

      master.call(startOrbitAndFloat, [], '>');
    }
  }, container);

  return {
    revert: () => {
      orbitController?.destroy();
      ctx.revert();
    },
  };
}
