"use client";

import React from "react";
import { motion } from "framer-motion";

interface TopBannerProps {
  announcements?: string[];
  className?: string;
}

export default function TopBanner({
  announcements = [
    "NHA Approved",
    "ABDM-Integrated Digital Health for Families & Elderly Care",
  ],
  className = "",
}: TopBannerProps) {
  // Ensure enough items so half of the track is wide enough for a smooth infinite marquee
  const items = [...announcements];
  while (items.length < 6) {
    items.push(...announcements);
  }

  return (
    <>
      {/* =========================================================================
          MOBILE TOP BAR (Visible only on mobile: < md)
          Matches Figma: W 231px, H 25.68px, pinned top-right
          Gradient stops: 0% #ACE4E8, 36% #03A1AC, 58% #0EA5AF, 100% #B3E5EA
          Left edge angled cut: polygon(0 0, 100% 0, 100% 100%, 14px 100%)
         ========================================================================= */}
      <div
        className={`flex md:hidden absolute top-0 right-0 z-40 items-center justify-end pointer-events-auto ${className}`}
        style={{
          width: "231px",
          maxWidth: "calc(100vw - 115px)",
          height: "25.68px",
          filter:
            "drop-shadow(0 4px 12px rgba(3, 161, 172, 0.4)) drop-shadow(0 2px 4px rgba(0, 0, 0, 0.1))",
        }}
      >
        <div
          className="relative w-full h-full flex items-center justify-center overflow-hidden"
          style={{
            background:
              "linear-gradient(180deg, rgba(255, 255, 255, 0.28) 0%, rgba(255, 255, 255, 0.05) 50%, rgba(0, 50, 56, 0.08) 100%), linear-gradient(90deg, #ACE4E8 0%, #03A1AC 36%, #0EA5AF 58%, #B3E5EA 100%)",
            clipPath: "polygon(0 0, 100% 0, 100% 100%, 14px 100%)",
          }}
        >
          {/* Subtle top gloss highlight */}
          <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-white/60 to-transparent pointer-events-none" />

          {/* Ambient subtle light sheen */}
          <div className="absolute inset-0 bg-gradient-to-b from-white/15 to-transparent pointer-events-none" />

          {/* Marquee viewport with gradient mask on left and right edges */}
          <div
            className="relative w-full h-full flex items-center overflow-hidden pl-4 pr-2"
            style={{
              maskImage:
                "linear-gradient(to right, transparent 0%, rgba(0,0,0,1) 8%, rgba(0,0,0,1) 92%, transparent 100%)",
              WebkitMaskImage:
                "linear-gradient(to right, transparent 0%, rgba(0,0,0,1) 8%, rgba(0,0,0,1) 92%, transparent 100%)",
            }}
          >
            <motion.div
              className="flex items-center shrink-0 whitespace-nowrap text-white font-medium text-[10.5px] tracking-wide select-none leading-none"
              animate={{ x: ["0%", "-50%"] }}
              transition={{
                repeat: Infinity,
                ease: "linear",
                duration: Math.max(18, items.length * 4.5),
              }}
            >
              {/* Primary block */}
              <div className="flex items-center space-x-6 pr-6 shrink-0">
                {items.map((text, idx) => (
                  <span key={idx} className="flex items-center space-x-6">
                    <span>{text}</span>
                    <span className="opacity-60 text-[9px]">|</span>
                  </span>
                ))}
              </div>

              {/* Duplicated block for seamless loop */}
              <div className="flex items-center space-x-6 pr-6 shrink-0" aria-hidden="true">
                {items.map((text, idx) => (
                  <span key={`mob-dup-${idx}`} className="flex items-center space-x-6">
                    <span>{text}</span>
                    <span className="opacity-60 text-[9px]">|</span>
                  </span>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Bottom edge subtle border */}
          <div className="absolute bottom-0 left-3 right-0 h-[1px] bg-gradient-to-r from-transparent via-white/20 to-transparent pointer-events-none" />
        </div>
      </div>

      {/* =========================================================================
          DESKTOP & TABLET TOP BANNER (Visible only on md: and above)
          Untouched & preserving existing desktop layout, dimensions, styling
         ========================================================================= */}
      <div
        className={`hidden md:flex absolute top-0 left-[calc(50%+50px)] lg:left-[calc(50%+75px)] -translate-x-1/2 z-40 items-center justify-center pointer-events-auto ${className}`}
        style={{
          width: "944px",
          maxWidth: "calc(100vw - 32px)",
          height: "46px",
          filter:
            "drop-shadow(0 10px 24px rgba(3, 161, 172, 0.45)) drop-shadow(0 4px 10px rgba(0, 0, 0, 0.12))",
        }}
      >
        {/* Outer stylized trapezoid container matching Figma dimensions W: 944, H: 46 */}
        <div
          className="relative w-full h-full flex items-center justify-center overflow-hidden"
          style={{
            background:
              "linear-gradient(180deg, rgba(255, 255, 255, 0.28) 0%, rgba(255, 255, 255, 0.05) 50%, rgba(0, 50, 56, 0.12) 100%), linear-gradient(90deg, #8FE0E5 0%, #38BDC9 10%, #03A1AC 32%, #0197A2 70%, #0AA6B1 84%, #28B4C0 93%, #68D2DA 100%)",
            clipPath:
              "polygon(0 0, 100% 0, calc(100% - 24px) 100%, 24px 100%)",
          }}
        >
          {/* Subtle top gloss highlight */}
          <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-white/50 to-transparent pointer-events-none" />

          {/* Ambient subtle light sheen */}
          <div className="absolute inset-0 bg-gradient-to-b from-white/15 to-transparent pointer-events-none" />

          {/* Marquee viewport with gradient mask on left and right edges for fade-in / fade-out */}
          <div
            className="relative w-full h-full flex items-center overflow-hidden px-8"
            style={{
              maskImage:
                "linear-gradient(to right, transparent 0%, rgba(0,0,0,1) 12%, rgba(0,0,0,1) 88%, transparent 100%)",
              WebkitMaskImage:
                "linear-gradient(to right, transparent 0%, rgba(0,0,0,1) 12%, rgba(0,0,0,1) 88%, transparent 100%)",
            }}
          >
            {/* Marquee Track scrolling from right to left smoothly */}
            <motion.div
              className="flex items-center shrink-0 whitespace-nowrap text-white font-medium text-xs md:text-sm lg:text-[14px] tracking-wide select-none"
              animate={{ x: ["0%", "-50%"] }}
              transition={{
                repeat: Infinity,
                ease: "linear",
                duration: Math.max(30, items.length * 6),
              }}
            >
              {/* Primary block */}
              <div className="flex items-center space-x-10 pr-10 shrink-0">
                {items.map((text, idx) => (
                  <span key={idx} className="flex items-center space-x-10">
                    <span>{text}</span>
                    <span className="opacity-60 text-xs">|</span>
                  </span>
                ))}
              </div>

              {/* Duplicated block for seamless loop */}
              <div className="flex items-center space-x-10 pr-10 shrink-0" aria-hidden="true">
                {items.map((text, idx) => (
                  <span key={`dup-${idx}`} className="flex items-center space-x-10">
                    <span>{text}</span>
                    <span className="opacity-60 text-xs">|</span>
                  </span>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Bottom edge subtle border */}
          <div className="absolute bottom-0 left-6 right-6 h-[1px] bg-gradient-to-r from-transparent via-white/25 to-transparent pointer-events-none" />
        </div>
      </div>
    </>
  );
}
