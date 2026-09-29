"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { CheckCircle2, Play, X, QrCode, Maximize2 } from "lucide-react";
import PhoneMockup from "../ui/PhoneMockup";
import { motion, AnimatePresence } from "framer-motion";
import AnimatedSection from "../ui/AnimatedSection";
import StaggerContainer, { staggerChildLeft } from "../ui/StaggerContainer";

export default function Download() {
  const [isQRPopupOpen, setIsQRPopupOpen] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setIsQRPopupOpen(false);
      }
    };
    if (isQRPopupOpen) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isQRPopupOpen]);

  return (
    <section id="download" className="py-14 sm:py-20 lg:py-24 bg-brand relative overflow-hidden text-white">
      {/* Background patterns */}
      <div className="absolute top-0 right-0 w-full h-full overflow-hidden opacity-10 pointer-events-none">
        <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="circles" width="100" height="100" patternUnits="userSpaceOnUse">
              <circle
                cx="50"
                cy="50"
                r="40"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#circles)" />
        </svg>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 flex flex-col lg:flex-row items-center justify-between gap-10 lg:gap-16">

        {/* Left Content column */}
        <div className="lg:w-1/2 space-y-6 sm:space-y-8 text-center lg:text-left">
          <AnimatedSection direction="left" delay={0.1}>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold leading-tight">
              Take Control of Your Healthcare.
            </h2>
          </AnimatedSection>

          <AnimatedSection direction="left" delay={0.25}>
            <p className="text-base sm:text-lg md:text-xl text-surface-100 opacity-90 leading-relaxed">
              Download RemoteWard Now: The right information, service, or support can matter when time is not on your side.
            </p>
          </AnimatedSection>

          {/* Staggered Bullet List */}
          <StaggerContainer className="space-y-3 sm:space-y-4 text-base sm:text-lg text-left max-w-md mx-auto lg:mx-0">
            <motion.li variants={staggerChildLeft} className="flex items-center">
              <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg  flex items-center justify-center mr-3 flex-shrink-0">
                <CheckCircle2 className="w-4 h-4 sm:w-5 sm:h-5 text-[#FBDB9F]" />
              </div>
              National Health Authority Approved — Built for India&apos;s digital healthcare ecosystem.
            </motion.li>
            <motion.li variants={staggerChildLeft} className="flex items-center">
              <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg bg-[#fff]/20 flex items-center justify-center mr-3 flex-shrink-0">
                <CheckCircle2 className="w-4 h-4 sm:w-5 sm:h-5 text-[#0B6A33]" />
              </div>
              ABDM Compliant — Designed to support secure, connected digital health services.
            </motion.li>
            <motion.li variants={staggerChildLeft} className="flex items-center">
              <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg bg-[#087F5B]/20 flex items-center justify-center mr-3 flex-shrink-0">
                <CheckCircle2 className="w-4 h-4 sm:w-5 sm:h-5 text-[#0B6A33]" />
              </div>
              Security Audited & FT Approved — Built and tested for a safe, reliable healthcare experience.
            </motion.li>
          </StaggerContainer>

          {/* Download Buttons with spring scale hover triggers */}
          <motion.div
            className="flex flex-col sm:flex-row items-center gap-4 sm:gap-6 justify-center lg:justify-start pt-4 sm:pt-6"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5 }}
          >
            {/* Google Play Button */}
            <motion.a
              href="https://play.google.com/store/apps/details?id=com.application.remoteward"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-ink hover:bg-black text-white px-6 py-3.5 rounded-xl flex items-center justify-center space-x-3 border border-surface-400/30 cursor-pointer h-14 sm:h-16 w-full sm:w-auto"
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.98 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
            >
              <Play className="w-6 h-6 sm:w-7 sm:h-7" />
              <div className="text-left">
                <div className="text-[10px] sm:text-xs">GET IT ON</div>
                <div className="text-base sm:text-lg font-bold leading-none">Google Play</div>
              </div>
            </motion.a>

            {/* QR Code Container / Pop Trigger */}
            <motion.button
              type="button"
              onClick={() => setIsQRPopupOpen(true)}
              className="flex items-center bg-white/10 hover:bg-white/20 border border-white/20 hover:border-white/40 p-2.5 rounded-xl space-x-3 w-full sm:w-auto sm:max-w-xs h-14 sm:h-16 cursor-pointer transition-all duration-200 group text-left shadow-sm"
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.98 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
              aria-label="Scan to download - Click to enlarge QR code"
            >
              <div className="w-10 h-10 sm:w-11 sm:h-11 bg-white p-1 rounded-lg flex-shrink-0 flex items-center justify-center overflow-hidden shadow-sm group-hover:scale-105 transition-transform">
                <Image
                  src="/Scanner.jpg"
                  alt="Scanner"
                  width={44}
                  height={44}
                  className="w-full h-full object-contain"
                  unoptimized
                />
              </div>
              <div className="text-left leading-none pr-1">
                <div className="flex items-center space-x-1.5">
                  <p className="text-xs font-bold text-white">Scan to download</p>
                  <Maximize2 className="w-3 h-3 text-white/70 group-hover:text-white transition-colors" />
                </div>
                <p className="text-[10px] text-surface-200 mt-1">Click to pop & scale</p>
              </div>
            </motion.button>
          </motion.div>
        </div>

        {/* Phone Mockup with 3D animation */}
        <div className="lg:w-1/2 flex justify-center perspective-1000 w-full">
          <AnimatedSection direction="right" delay={0.2} className="w-full flex justify-center">
            <motion.div
              className="mockup-3d"
              whileHover={{ rotateY: 0, rotateX: 0 }}
              transition={{ duration: 0.5 }}
            >
              <PhoneMockup />
            </motion.div>
          </AnimatedSection>
        </div>

      </div>

      {/* Pop Style QR Code Modal */}
      <AnimatePresence>
        {isQRPopupOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 select-none">
            {/* Backdrop with smooth blur */}
            <motion.div
              className="fixed inset-0 bg-black/65 backdrop-blur-md cursor-pointer"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsQRPopupOpen(false)}
            />

            {/* Pop & Scale Modal Container */}
            <motion.div
              className="relative z-10 w-full max-w-sm sm:max-w-md bg-white rounded-[2.25rem] p-6 sm:p-8 shadow-2xl border border-surface-200 text-ink flex flex-col items-center text-center overflow-hidden"
              initial={{ opacity: 0, scale: 0.65, y: 30 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.75, y: 20 }}
              transition={{ type: "spring", damping: 24, stiffness: 320 }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Subtle ambient decorative gradient orbs */}
              <div className="absolute -top-24 -right-24 w-52 h-52 bg-brand/10 rounded-full blur-3xl pointer-events-none" />
              <div className="absolute -bottom-24 -left-24 w-52 h-52 bg-highlight/15 rounded-full blur-3xl pointer-events-none" />

              {/* Close Button */}
              <button
                type="button"
                onClick={() => setIsQRPopupOpen(false)}
                className="absolute top-4 right-4 sm:top-5 sm:right-5 w-9 h-9 rounded-full bg-surface-100 hover:bg-surface-200 text-ink-muted hover:text-ink flex items-center justify-center transition-colors cursor-pointer"
                aria-label="Close QR popup"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Badge */}
              <div className="inline-flex items-center space-x-1.5 bg-brand/10 text-brand px-3.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider mb-3">
                <QrCode className="w-3.5 h-3.5" />
                <span>Instant Scan</span>
              </div>

              {/* Modal Heading */}
              <h3 className="text-2xl sm:text-3xl font-black text-ink tracking-tight mb-2">
                Scan to Download
              </h3>
              <p className="text-xs sm:text-sm text-ink-muted leading-relaxed max-w-xs mb-5">
                Point your smartphone camera at the QR code to install RemoteWard from Google Play.
              </p>

              {/* Big Scanner Frame with Pop Scanner Corners */}
              <div className="relative p-3.5 sm:p-4 bg-gradient-to-b from-surface-50 to-white rounded-2xl border-2 border-surface-200 shadow-inner mb-6">
                {/* Tech / Pop corner marks */}
                <div className="absolute -top-1 -left-1 w-5 h-5 border-t-3 border-l-3 border-brand rounded-tl-lg" />
                <div className="absolute -top-1 -right-1 w-5 h-5 border-t-3 border-r-3 border-brand rounded-tr-lg" />
                <div className="absolute -bottom-1 -left-1 w-5 h-5 border-b-3 border-l-3 border-brand rounded-bl-lg" />
                <div className="absolute -bottom-1 -right-1 w-5 h-5 border-b-3 border-r-3 border-brand rounded-br-lg" />

                {/* QR Image */}
                <div className="w-60 h-60 sm:w-68 sm:h-68 bg-white rounded-xl overflow-hidden flex items-center justify-center p-2 shadow-sm">
                  <Image
                    src="/Scanner.jpg"
                    alt="Scan to download RemoteWard QR code"
                    width={320}
                    height={320}
                    className="w-full h-full object-contain"
                    priority
                    unoptimized
                  />
                </div>
              </div>

              {/* Direct Play Store Link */}
              <a
                href="https://play.google.com/store/apps/details?id=com.application.remoteward"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full bg-[#323C3E] hover:bg-black text-white font-bold text-sm py-3.5 px-5 rounded-xl flex items-center justify-center space-x-2.5 shadow-md hover:shadow-lg transition-all active:scale-98 cursor-pointer"
              >
                <Play className="w-4 h-4 text-brand" />
                <span>Open in Google Play Store</span>
              </a>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
