import { useEffect, type RefObject } from 'react';
import Lenis from 'lenis';

interface UseLenisScrollOptions {
  enabled?: boolean;
  lerp?: number;
  wheelMultiplier?: number;
  touchMultiplier?: number;
}

/**
 * Attaches a smooth Lenis scroll instance to any scrollable container (wrapper + inner content).
 * Automatically runs its own rAF loop and cleans up cleanly on unmount or disable.
 */
export function useLenisScroll(
  wrapperRef: RefObject<HTMLElement | null>,
  contentRef?: RefObject<HTMLElement | null>,
  options: UseLenisScrollOptions = {}
) {
  const {
    enabled = true,
    lerp = 0.085,
    wheelMultiplier = 0.9,
    touchMultiplier = 1.4,
  } = options;

  useEffect(() => {
    if (!enabled) return;
    const wrapper = wrapperRef.current;
    if (!wrapper) return;

    const content =
      contentRef?.current || (wrapper.firstElementChild as HTMLElement | null);
    if (!content) return;

    const lenis = new Lenis({
      wrapper,
      content,
      lerp,
      wheelMultiplier,
      touchMultiplier,
      smoothWheel: true,
    });

    let rafId = 0;
    const raf = (time: number) => {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    };
    rafId = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
    };
  }, [wrapperRef, contentRef, enabled, lerp, wheelMultiplier, touchMultiplier]);
}
