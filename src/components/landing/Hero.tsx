"use client";

import { useState, useEffect } from "react";
import { ArrowRight, ShieldCheck, HeartHandshake, UserCheck, Activity } from "lucide-react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import Logo from "../ui/Logo";
import TopBanner from "./TopBanner";

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 40 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.7, delay, ease: [0.25, 0.4, 0.25, 1] as const } },
});

const scaleIn = (delay = 0) => ({
  initial: { opacity: 0, scale: 0.85, rotate: 6 },
  animate: { opacity: 1, scale: 1, rotate: 0, transition: { duration: 0.9, delay, ease: [0.25, 0.4, 0.25, 1] as const } },
});

export default function Hero() {
  // Authentic application flow illustrations (hospital building photo removed completely)
  const heroImages = [
    "/homepageScreens/flow1.jpg",
    "/homepageScreens/flow2.jpg",
    "/homepageScreens/flow3.png",
    "/homepageScreens/flow4.jpg",
    "/homepageScreens/flow4.png",
    "/homepageScreens/flow6.png",
  ];

  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroImages.length);
    }, 4500);
    return () => clearInterval(timer);
  }, [heroImages.length]);

  return (
    <section id="home" className="hero-gradient min-h-[88vh] lg:min-h-[92vh] flex flex-col justify-start relative overflow-hidden">
      {/* Top Marquee Announcement Banner (Desktop & Tablet only) */}
      <TopBanner />

      {/* Prominent RemoteWard Brand Logo in Top-Left */}
      <motion.div
        initial={{ opacity: 0, y: -16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.25, 0.4, 0.25, 1] }}
        className="absolute top-2 left-3 sm:top-4 sm:left-4 md:top-5 md:left-5 lg:top-6 lg:left-5 xl:top-7 xl:left-2 2xl:left-3 z-30 pointer-events-auto"
      >
        <Logo imgClassName="h-12 sm:h-12 md:h-14 lg:h-20 xl:h-24 w-auto" />
      </motion.div>

      {/* Ambient top radiant glow behind banner */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[240px] bg-gradient-to-b from-[#47C2CB]/25 to-transparent blur-3xl pointer-events-none" />
      <div className="absolute top-20 left-10 w-48 h-48 bg-support-purple opacity-20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-20 right-10 w-80 h-80 bg-brand opacity-15 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 sm:pt-24 lg:pt-28 pb-14 sm:pb-20 lg:pb-24 relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center flex-1 my-auto">
        {/* Hero Text */}
        <div className="space-y-4 sm:space-y-5 max-w-2xl mt-4 lg:mt-0">
          {/* Title */}
          <motion.h1
            className="text-2xl sm:text-3xl md:text-4xl xl:text-[2.75rem] font-bold leading-tight text-ink"
            {...fadeUp(0.1)}
          >
            No One Should Have to, <br />
            <motion.span
              className="text-transparent bg-clip-text bg-gradient-to-r from-brand to-brand-dark inline-block"
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 300, damping: 10 }}
            >
              Navigate Healthcare Alone.
            </motion.span>
          </motion.h1>

          {/* Description */}
          <motion.p
            className="text-sm sm:text-base md:text-lg text-ink-muted leading-relaxed max-w-xl"
            {...fadeUp(0.3)}
          >
            RemoteWard brings patients, families, and healthcare teams closer together—helping patients access the care they need, enabling families to stay involved, and keeping healthcare teams connected beyond the hospital, so the right people can come together to support patients at every step of their care journey.
          </motion.p>

          {/* Trust Signals */}
          <motion.div
            className="flex flex-wrap items-center gap-x-5 gap-y-2 text-xs sm:text-sm text-ink-muted font-medium pt-1"
            {...fadeUp(0.5)}
          >
            <div className="flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-emerald-500 shrink-0" />
              <span>Secure &amp; Private</span>
            </div>
            <div className="flex items-center gap-1.5">
              <HeartHandshake className="w-4 h-4 text-brand shrink-0" />
              <span>Patient-Centered</span>
            </div>
            <div className="flex items-center gap-1.5">
              <UserCheck className="w-4 h-4 text-accent-alt shrink-0" />
              <span>Older-Adult Friendly</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Activity className="w-4 h-4 text-brand-dark shrink-0" />
              <span>Connected Care</span>
            </div>
          </motion.div>

          {/* CTA Buttons */}
          <motion.div
            className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4 pt-1 w-full sm:w-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6, ease: [0.25, 0.4, 0.25, 1] }}
          >
            <motion.a
              href="https://play.google.com/store/apps/details?id=com.application.remoteward"
              target="_blank"
              rel="noopener noreferrer"
              className="group bg-gradient-to-r from-brand to-brand-dark hover:brightness-105 text-white font-semibold text-sm sm:text-base px-5 py-3 sm:px-6 sm:py-3.5 rounded-xl text-center shadow-md shadow-brand/20 hover:shadow-lg hover:shadow-brand/30 flex items-center justify-center cursor-pointer transition-all"
              whileHover={{ scale: 1.03, y: -2 }}
              whileTap={{ scale: 0.97 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
            >
              Download the RemoteWard App
              <ArrowRight className="w-4.5 h-4.5 ml-2 transition-transform duration-200 group-hover:translate-x-1" />
            </motion.a>
            <motion.a
              href="#partners"
              className="bg-white/90 backdrop-blur-sm border-2 border-brand text-brand hover:bg-brand hover:text-white font-semibold text-sm sm:text-base px-5 py-3 sm:px-6 sm:py-3.5 rounded-xl text-center transition-all flex items-center justify-center cursor-pointer shadow-sm hover:shadow-md"
              whileHover={{ scale: 1.03, y: -2 }}
              whileTap={{ scale: 0.97 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
            >
              Partner With Us
            </motion.a>
          </motion.div>
        </div>

        {/* Hero Imagery */}
        <motion.div
          className="relative w-full h-[320px] sm:h-[420px] lg:h-[480px] xl:h-[500px] mt-8 lg:mt-0 animate-float max-w-lg mx-auto"
          {...scaleIn(0.3)}
        >

          <div className="absolute inset-0 bg-brand/5 rounded-[2.5rem] transform rotate-3 scale-105" />
          <div className="relative z-10 w-full h-full rounded-[2.5rem] shadow-2xl border-4 sm:border-8 border-white overflow-hidden bg-white">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentSlide}
                initial={{ opacity: 0, scale: 1.02 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.98 }}
                transition={{ duration: 0.5, ease: "easeInOut" }}
                className="w-full h-full relative"
              >
                <Image
                  src={heroImages[currentSlide]}
                  alt="Hero illustration slider"
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 500px"
                  className="object-cover"
                  priority
                  loading="eager"
                />
              </motion.div>
            </AnimatePresence>

            {/* Navigation Dots matching Image 2 */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center space-x-2 z-30 bg-black/40 backdrop-blur-md px-3.5 py-2 rounded-full border border-white/10">
              {heroImages.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentSlide(idx)}
                  className={`h-2.5 rounded-full transition-all duration-300 cursor-pointer ${currentSlide === idx ? "bg-[#01B2BD] w-7" : "bg-white/60 hover:bg-white w-2.5"
                    }`}
                  aria-label={`Go to slide ${idx + 1}`}
                />
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
