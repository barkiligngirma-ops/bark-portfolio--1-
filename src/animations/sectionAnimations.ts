import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export interface SectionRevealOptions {
  container: HTMLElement;
  targets: HTMLElement[];
}

export interface SectionAnimationCleanup {
  revert: () => void;
}

export function runSectionReveal({
  container,
  targets,
}: SectionRevealOptions): SectionAnimationCleanup {
  const ctx = gsap.context(() => {
    if (targets.length === 0) return;

    gsap.set(targets, { opacity: 0, y: 36 });

    gsap.to(targets, {
      opacity: 1,
      y: 0,
      duration: 0.72,
      stagger: 0.08,
      ease: 'power3.out',
      clearProps: 'transform',
      scrollTrigger: {
        trigger: container,
        start: 'top 80%',
        once: true,
      },
    });
  }, container);

  return {
    revert: () => {
      ctx.revert();
    },
  };
}
