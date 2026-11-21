import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export interface ProjectTimelineItemElements {
  row: HTMLElement;
  card: HTMLElement;
  node: HTMLElement;
  connector: HTMLElement | null;
}

export interface ProjectTimelineOptions {
  container: HTMLElement;
  headerTargets: HTMLElement[];
  progressLine: HTMLElement | null;
  listWrapper: HTMLElement | null;
  items: ProjectTimelineItemElements[];
  animateHeader?: boolean;
}

export interface ProjectAnimationCleanup {
  revert: () => void;
}

export function runProjectTimeline({
  container,
  headerTargets,
  progressLine,
  listWrapper,
  items,
  animateHeader = true,
}: ProjectTimelineOptions): ProjectAnimationCleanup {
  const ctx = gsap.context(() => {
    if (animateHeader && headerTargets.length > 0) {
      gsap.set(headerTargets, { opacity: 0, y: 28 });
      gsap.to(headerTargets, {
        opacity: 1,
        y: 0,
        duration: 0.65,
        stagger: 0.08,
        ease: 'power3.out',
        clearProps: 'transform',
        scrollTrigger: {
          trigger: container,
          start: 'top 82%',
          once: true,
        },
      });
    } else if (headerTargets.length > 0) {
      gsap.set(headerTargets, { opacity: 1, y: 0 });
    }

    if (progressLine && listWrapper) {
      gsap.set(progressLine, { scaleY: 0, transformOrigin: 'top center' });
      gsap.to(progressLine, {
        scaleY: 1,
        ease: 'none',
        scrollTrigger: {
          trigger: listWrapper,
          start: 'top 72%',
          end: 'bottom 78%',
          scrub: 0.5,
        },
      });
    }

    const isDesktop = typeof window !== 'undefined' && window.innerWidth >= 768;

    items.forEach(({ row, card, node, connector }, idx) => {
      const fromLeft = isDesktop && idx % 2 === 0;

      gsap.set(node, { scale: 0.55, opacity: 0 });
      gsap.set(card, {
        opacity: 0,
        y: 42,
        x: fromLeft ? -22 : 22,
      });
      if (connector) {
        gsap.set(connector, {
          scaleX: 0,
          transformOrigin: fromLeft ? 'right center' : 'left center',
        });
      }

      const itemTl = gsap.timeline({
        scrollTrigger: {
          trigger: row,
          start: 'top 84%',
          once: true,
        },
      });

      itemTl.to(
        node,
        {
          scale: 1,
          opacity: 1,
          duration: 0.36,
          ease: 'back.out(1.7)',
        },
        0
      );

      if (connector) {
        itemTl.to(
          connector,
          {
            scaleX: 1,
            duration: 0.34,
            ease: 'power2.out',
          },
          0.1
        );
      }

      itemTl.to(
        card,
        {
          opacity: 1,
          y: 0,
          x: 0,
          duration: 0.68,
          ease: 'power3.out',
          clearProps: 'transform',
        },
        0.16
      );
    });

    ScrollTrigger.refresh();
  }, container);

  return {
    revert: () => {
      ctx.revert();
    },
  };
}
