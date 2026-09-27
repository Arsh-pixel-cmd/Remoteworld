"use client";

import { useEffect, useRef } from "react";
import Lenis from "lenis";

export default function SmoothScroll({ children }: { children: React.ReactNode }) {
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    const lenis = new Lenis({
      lerp: 0.08,
      smoothWheel: true,
      syncTouch: false, // Prevents mobile touch jitter/inertia conflicts
    });

    lenisRef.current = lenis;
    window.__lenis = lenis;
    let rafId: number;

    function raf(time: number) {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    }

    rafId = requestAnimationFrame(raf);

    // Allow programmatic scrollTo to work with Lenis safely
    const handleAnchorClick = (e: Event) => {
      const target = e.target as HTMLElement;
      const anchor = target.closest("a[href^='#'], button[data-scroll-to]");
      if (!anchor) return;

      const href = anchor.getAttribute("href") || anchor.getAttribute("data-scroll-to");
      // Guard against bare '#' or invalid CSS selectors
      if (!href || href === "#" || !href.startsWith("#") || href.length <= 1) return;

      try {
        const el = document.querySelector(href);
        if (el) {
          e.preventDefault();
          lenis.scrollTo(el as HTMLElement, { offset: -80 });
        }
      } catch {
        // Silently ignore non-standard selectors
      }
    };

    document.addEventListener("click", handleAnchorClick);

    return () => {
      document.removeEventListener("click", handleAnchorClick);
      cancelAnimationFrame(rafId);
      delete window.__lenis;
      lenis.destroy();
    };
  }, []);

  return <>{children}</>;
}
