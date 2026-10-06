"use client";

import { useState, useEffect } from "react";

/**
 * Hook to detect scroll direction.
 * Returns "up" or "down" based on the user's scroll direction.
 * Useful for hiding/showing the navbar on scroll.
 */
export function useScrollDirection(): "up" | "down" {
  const [scrollDirection, setScrollDirection] = useState<"up" | "down">("up");

  useEffect(() => {
    let lastScrollY = window.scrollY;
    const threshold = 10;

    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      if (Math.abs(currentScrollY - lastScrollY) < threshold) return;

      setScrollDirection(currentScrollY > lastScrollY ? "down" : "up");
      lastScrollY = currentScrollY;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return scrollDirection;
}
