"use client";

import Image from "next/image";

const SUPPORTER_LOGOS = [
  {
    name: "Government of India",
    src: "/GovernmentSVG/Government.svg",
    width: 41,
    height: 41,
  },
  {
    name: "National Health Authority",
    src: "/GovernmentSVG/NHA.svg",
    width: 55,
    height: 41,
  },
  {
    name: "Indian Oil",
    src: "/GovernmentSVG/Indiaoil.svg",
    width: 55,
    height: 28,
  },
  {
    name: "IISc Bangalore",
    src: "/GovernmentSVG/ISCBanglore.svg",
    width: 29,
    height: 28,
  },
  {
    name: "Sickle Cell Mission",
    src: "/GovernmentSVG/Sicklecell.svg",
    width: 43,
    height: 42,
  },
];

// Repeat logos multiple times to ensure seamless infinite looping on all screen sizes including 4K
const REPEATED_LOGOS = [
  ...SUPPORTER_LOGOS,
  ...SUPPORTER_LOGOS,
  ...SUPPORTER_LOGOS,
  ...SUPPORTER_LOGOS,
  ...SUPPORTER_LOGOS,
  ...SUPPORTER_LOGOS,
];

export default function SupportersMarquee() {
  return (
    <section
      id="supporters"
      className="bg-surface-50 border-y border-surface-200/60 py-7 sm:py-9 lg:py-10 overflow-hidden select-none"
      aria-label="Our Supporters and Partners"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-4 sm:mb-6 text-center">
        <h2 className="text-base sm:text-lg md:text-xl font-bold text-ink tracking-tight">
          Our Supporters &amp; Partners
        </h2>
      </div>

      <div
        className="group/marquee marquee-container relative w-full overflow-hidden select-none py-1"
        style={{
          maskImage:
            "linear-gradient(to right, transparent 0%, black 8%, black 92%, transparent 100%)",
          WebkitMaskImage:
            "linear-gradient(to right, transparent 0%, black 8%, black 92%, transparent 100%)",
        }}
      >
        <div className="flex items-center w-max animate-marquee-slow group-hover/marquee:[animation-play-state:paused]">
          {/* Track 1 */}
          <div className="flex items-center space-x-10 sm:space-x-14 md:space-x-16 pr-10 sm:pr-14 md:pr-16 shrink-0">
            {REPEATED_LOGOS.map((logo, idx) => (
              <div
                key={`supporter-1-${idx}`}
                className="shrink-0 flex items-center justify-center h-12 sm:h-14 relative z-10 hover:z-20"
              >
                <Image
                  src={logo.src}
                  alt={logo.name}
                  title={logo.name}
                  width={logo.width}
                  height={logo.height}
                  unoptimized
                  className="h-8 sm:h-9 md:h-10 w-auto max-w-[130px] object-contain shrink-0 cursor-pointer
                             grayscale-0 opacity-100
                             sm:grayscale sm:opacity-55
                             sm:hover:grayscale-0 sm:hover:opacity-100 sm:hover:scale-115
                             transition-all duration-300 ease-out"
                />
              </div>
            ))}
          </div>

          {/* Track 2 (Duplicate for seamless infinite loop) */}
          <div
            className="flex items-center space-x-10 sm:space-x-14 md:space-x-16 pr-10 sm:pr-14 md:pr-16 shrink-0"
            aria-hidden="true"
          >
            {REPEATED_LOGOS.map((logo, idx) => (
              <div
                key={`supporter-2-${idx}`}
                className="shrink-0 flex items-center justify-center h-12 sm:h-14 relative z-10 hover:z-20"
              >
                <Image
                  src={logo.src}
                  alt={logo.name}
                  title={logo.name}
                  width={logo.width}
                  height={logo.height}
                  unoptimized
                  className="h-8 sm:h-9 md:h-10 w-auto max-w-[130px] object-contain shrink-0 cursor-pointer
                             grayscale-0 opacity-100
                             sm:grayscale sm:opacity-55
                             sm:hover:grayscale-0 sm:hover:opacity-100 sm:hover:scale-115
                             transition-all duration-300 ease-out"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
