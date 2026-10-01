"use client";

import Image from "next/image";

const SUPPORTER_LOGOS = [
  {
    name: "Alcare",
    src: "/GovernmentSVG/aic.jpeg",
    width: 221,
    height: 247,
  },
  {
    name: "Ayushmanbharat",
    src: "/GovernmentSVG/ayushmanbharat.jpeg",
    width: 221,
    height: 204,
  },
  {
    name: "birac",
    src: "/GovernmentSVG/birac.jpeg",
    width: 226,
    height: 177,
  },
  {
    name: "duns",
    src: "/GovernmentSVG/duns.jpeg",
    width: 263,
    height: 176,
  },
  {
    name: "IISc Bangalore",
    src: "/GovernmentSVG/ISCBanglore.svg",
    width: 245,
    height: 232,
  },
  {
    name: "Startup India",
    src: "/GovernmentSVG/startup.jpeg",
    width: 349,
    height: 110,
  },
  {
    name: "STPI",
    src: "/GovernmentSVG/stpi.jpeg",
    width: 369,
    height: 185,
  },
  {
    name: "TISS",
    src: "/GovernmentSVG/tiss.jpeg",
    width: 260,
    height: 275,
  },
  {
    name: "Wadhwani Foundation",
    src: "/GovernmentSVG/wadhwani.jpeg",
    width: 254,
    height: 142,
  },
  {
    name: "Yenepoya",
    src: "/GovernmentSVG/yenepoya.jpeg",
    width: 311,
    height: 190,
  },
  {
    name: "Yenepoya University",
    src: "/GovernmentSVG/yenepoyauniversity.jpeg",
    width: 180,
    height: 221,
  },
];

// Repeat logos to ensure seamless infinite looping on all screen sizes including 4K
const REPEATED_LOGOS = [
  ...SUPPORTER_LOGOS,
  ...SUPPORTER_LOGOS,
];

export default function SupportersMarquee() {
  return (
    <section
      id="supporters"
      className="bg-surface-50 border-y border-surface-200/60 py-8 sm:py-10 lg:py-12 overflow-hidden select-none"
      aria-label="Our Supporters and Partners"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-5 sm:mb-7 text-center">
        <h2 className="text-base sm:text-lg md:text-xl font-bold text-ink tracking-tight">
          Our Supporters &amp; Partners
        </h2>
      </div>

      <div
        className="group/marquee marquee-container relative w-full overflow-hidden select-none py-1.5"
        style={{
          maskImage:
            "linear-gradient(to right, transparent 0%, black 8%, black 92%, transparent 100%)",
          WebkitMaskImage:
            "linear-gradient(to right, transparent 0%, black 8%, black 92%, transparent 100%)",
        }}
      >
        <div className="flex items-center w-max animate-marquee-slow group-hover/marquee:[animation-play-state:paused]">
          {/* Track 1 */}
          <div className="flex items-center space-x-12 sm:space-x-16 md:space-x-18 pr-12 sm:pr-16 md:pr-18 shrink-0">
            {REPEATED_LOGOS.map((logo, idx) => (
              <div
                key={`supporter-1-${idx}`}
                className="shrink-0 flex items-center justify-center h-14 sm:h-16 md:h-18 relative z-10 hover:z-20"
              >
                <Image
                  src={logo.src}
                  alt={logo.name}
                  title={logo.name}
                  width={logo.width}
                  height={logo.height}
                  unoptimized
                  className="h-10 sm:h-11 md:h-12 w-auto max-w-[150px] sm:max-w-[170px] object-contain shrink-0 cursor-pointer
                             grayscale-0 opacity-100
                             sm:grayscale sm:opacity-60
                             sm:hover:grayscale-0 sm:hover:opacity-100 sm:hover:scale-110
                             transition-all duration-300 ease-out"
                />
              </div>
            ))}
          </div>

          {/* Track 2 (Duplicate for seamless infinite loop) */}
          <div
            className="flex items-center space-x-12 sm:space-x-16 md:space-x-18 pr-12 sm:pr-16 md:pr-18 shrink-0"
            aria-hidden="true"
          >
            {REPEATED_LOGOS.map((logo, idx) => (
              <div
                key={`supporter-2-${idx}`}
                className="shrink-0 flex items-center justify-center h-14 sm:h-16 md:h-18 relative z-10 hover:z-20"
              >
                <Image
                  src={logo.src}
                  alt={logo.name}
                  title={logo.name}
                  width={logo.width}
                  height={logo.height}
                  unoptimized
                  className="h-10 sm:h-11 md:h-12 w-auto max-w-[150px] sm:max-w-[170px] object-contain shrink-0 cursor-pointer
                             grayscale-0 opacity-100
                             sm:grayscale sm:opacity-60
                             sm:hover:grayscale-0 sm:hover:opacity-100 sm:hover:scale-110
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
