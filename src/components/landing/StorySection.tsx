"use client";

import { useRef, useState } from "react";
import { motion, useScroll, useTransform, useSpring, AnimatePresence } from "framer-motion";
import { ShieldCheck, Siren, Smartphone, FileText, Droplets, Building2, ChevronRight, ChevronLeft, Sparkles } from "lucide-react";
import AnimatedSection from "../ui/AnimatedSection";
import Image from "next/image";

export default function StorySection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeMobileStep, setActiveMobileStep] = useState(0);
  const [touchStart, setTouchStart] = useState<number | null>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  const backgroundColor = useTransform(
    smoothProgress,
    [0.1, 0.5, 0.9],
    ["#FCFCFC", "#F0F5FE", "#F4FAF9"]
  );

  const steps = [
    {
      timeLabel: "01",
      badge: "PMJAY Balance",
      time: "01 — Check Your PMJAY (Ayushman Card) Balance",
      title: "01 — Check Your PMJAY (Ayushman Card) Balance",
      description:
        "Know what healthcare benefits are available to you. Check your PMJAY balance directly through RemoteWard.",
      stepIcon: ShieldCheck,
      logoSrc: "/storySectionlogo/wallet.svg",
      stepIconColor: "text-brand",
      stepBg: "bg-brand/10",
      accentBorder: "border-brand/30",
      pillBg: "bg-brand/10 text-brand border-brand/30",
      visual: (
        <div className="bg-white rounded-3xl p-5 sm:p-6 shadow-xl border border-surface-100 max-w-sm w-full mx-auto">
          <div className="flex items-center space-x-4 mb-4 sm:mb-5">
            <div className="w-12 h-12 flex-shrink-0 rounded-2xl bg-brand/15 flex items-center justify-center">
              <Image
                src="/storySectionlogo/wallet.svg"
                alt="Blood Bank"
                width={32}
                height={32}
                className="w-7 h-7 object-contain rounded-md"
                draggable={false}
                loading="lazy"
              />
            </div>
            <div>
              <p className="text-xs text-ink-muted">PMJAY / Ayushman Card</p>
              <h5 className="font-bold text-base sm:text-lg text-ink leading-tight">Healthcare Benefits</h5>
            </div>
          </div>
          <div className="bg-surface-50 p-3.5 sm:p-4 rounded-2xl flex items-center justify-between border border-surface-100">
            <div>
              <span className="text-2xl sm:text-3xl font-black text-ink">₹5,00,000</span>
              <span className="text-[10px] sm:text-xs text-ink-muted block mt-0.5">PMJAY Balance Available</span>
            </div>
            <span className="text-xs bg-brand/10 text-brand px-3 py-1.5 rounded-lg font-bold flex items-center gap-1">
              <Sparkles className="w-3 h-3" />
              Active
            </span>
          </div>
        </div>
      ),
    },
    {
      timeLabel: "02",
      badge: "Ambulance",
      time: "02 — Find an Ambulance Near You",
      title: "02 — Find an Ambulance Near You",
      description:
        "When urgent medical transportation is needed, find nearby ambulance services through RemoteWard.",
      stepIcon: Siren,
      logoSrc: "/storySectionlogo/Ambulance.svg",
      stepIconColor: "text-alert",
      stepBg: "bg-alert/10",
      accentBorder: "border-alert/30",
      pillBg: "bg-red-500/10 text-red-700 border-red-300",
      visual: (
        <div className="bg-white rounded-3xl p-5 sm:p-6 shadow-xl border border-surface-100 max-w-sm w-full mx-auto">
          <div className="flex items-center space-x-4 mb-4 sm:mb-5">
            <div className="w-12 h-12 flex-shrink-0 rounded-2xl bg-alert/15 flex items-center justify-center">
              <Image
                src="/storySectionlogo/Ambulance.svg"
                alt="Blood Bank"
                width={32}
                height={32}
                className="w-7 h-7 object-contain rounded-md"
                draggable={false}
                loading="lazy"
              />
            </div>
            <div>
              <p className="text-xs text-ink-muted">Urgent Medical Transport</p>
              <h5 className="font-bold text-base sm:text-lg text-ink leading-tight">Ambulance Services</h5>
            </div>
          </div>
          <div className="space-y-2.5">
            <div className="bg-alert/5 p-3 rounded-xl border border-alert/10 flex items-center justify-between">
              <div>
                <span className="text-sm font-semibold text-ink block">Emergency Ambulance</span>
                <span className="text-[11px] text-ink-muted">Nearby Services Available</span>
              </div>
              <span className="text-xs bg-alert text-white px-2.5 py-1 rounded-lg font-bold">108</span>
            </div>
            <div className="bg-surface-50 p-3 rounded-xl border border-surface-100 flex items-center justify-between">
              <span className="text-xs text-ink-muted">Estimated Arrival</span>
              <span className="text-xs bg-brand/10 text-brand px-2.5 py-1 rounded-lg font-bold">~8 mins</span>
            </div>
          </div>
        </div>
      ),
    },
    {
      timeLabel: "03",
      badge: "Blood Bank",
      time: "03 — Find Blood When It Matters",
      title: "03 — Find Blood When It Matters",
      description:
        "Access Blood Bank services to help find blood support for you or your family when you need it.",
      stepIcon: Droplets,
      logoSrc: "/storySectionlogo/Blood%20bank.svg",
      stepIconColor: "text-alert",
      stepBg: "bg-alert/10",
      accentBorder: "border-alert/20",
      pillBg: "bg-red-500/10 text-red-700 border-red-300",
      visual: (
        <div className="bg-white rounded-3xl p-5 sm:p-6 shadow-xl border border-surface-100 max-w-sm w-full mx-auto">
          <div className="flex items-center space-x-4 mb-4 sm:mb-5">
            <div className="w-12 h-12 flex-shrink-0 rounded-2xl bg-alert/15 flex items-center justify-center overflow-hidden p-2">
              <Image
                src="/storySectionlogo/Blood%20bank.svg"
                alt="Blood Bank"
                width={32}
                height={32}
                className="w-7 h-7 object-contain rounded-md"
                draggable={false}
                loading="lazy"
              />
            </div>
            <div>
              <p className="text-xs text-ink-muted">Blood Support</p>
              <h5 className="font-bold text-base sm:text-lg text-ink leading-tight">Blood Bank Services</h5>
            </div>
          </div>
          <div className="flex items-center justify-between bg-surface-50 p-3.5 sm:p-4 rounded-xl border border-surface-100">
            <div>
              <span className="text-2xl sm:text-3xl font-black text-alert">A+</span>
              <span className="text-[10px] sm:text-xs text-ink-muted block mt-0.5">Compatible Units</span>
            </div>
            <span className="text-xs bg-brand/10 text-brand px-3 py-1.5 rounded-lg font-bold flex items-center gap-1">
              <Sparkles className="w-3 h-3" />
              3 Banks Nearby
            </span>
          </div>
        </div>
      ),
    },
    {
      timeLabel: "04",
      badge: "Digital OPD",
      time: "04 — Connect Through Digital OPD",
      title: "04 — Connect Through Digital OPD",
      description:
        "Get medical guidance by connecting with healthcare professionals through Digital OPD.",
      stepIcon: Smartphone,
      stepIconColor: "text-support-blue",
      stepBg: "bg-support-blue/15",
      accentBorder: "border-support-blue/30",
      pillBg: "bg-blue-500/10 text-blue-700 border-blue-300",
      visual: (
        <div className="bg-white rounded-3xl p-5 sm:p-6 shadow-xl border border-surface-100 max-w-sm w-full mx-auto">
          <div className="flex items-center justify-between border-b border-surface-100 pb-3.5 sm:pb-4 mb-4">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 flex-shrink-0 rounded-xl bg-support-blue/10 flex items-center justify-center">
                <Smartphone className="w-4 h-4 text-support-blue" />
              </div>
              <span className="font-bold text-sm sm:text-base text-ink">Digital OPD</span>
            </div>
            <span className="text-[10px] bg-brand/15 text-brand px-2.5 py-0.5 rounded-full font-bold flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-brand animate-ping" />
              Connected
            </span>
          </div>
          <div className="space-y-3">
            <div className="flex items-center justify-between text-xs sm:text-sm">
              <span className="text-ink-muted">Healthcare Professionals</span>
              <span className="font-semibold text-brand">Available Now</span>
            </div>
            <div className="bg-support-blue/5 p-3 rounded-xl border border-support-blue/10 text-xs text-support-blue font-medium text-center">
              Connect directly with doctors for medical guidance.
            </div>
          </div>
        </div>
      ),
    },
    {
      timeLabel: "05",
      badge: "Health Records",
      time: "05 — Link Your Records Connected",
      title: "05 — Link Your Records Connected",
      description:
        "Link and access your health records from participating healthcare facilities and programmes in one place.",
      stepIcon: FileText,
      stepIconColor: "text-highlight-dark",
      stepBg: "bg-highlight/15",
      accentBorder: "border-highlight/30",
      pillBg: "bg-amber-500/10 text-amber-700 border-amber-300",
      visual: (
        <div className="bg-white rounded-3xl p-5 sm:p-6 shadow-xl border border-surface-100 max-w-sm w-full mx-auto">
          <div className="flex items-center space-x-4 mb-4 sm:mb-5">
            <div className="w-12 h-12 flex-shrink-0 rounded-2xl bg-highlight/20 flex items-center justify-center overflow-hidden p-2">
              <Image
                src="/logos/calender.jpg"
                alt="Health Records"
                width={32}
                height={32}
                className="w-7 h-7 object-contain rounded-md"
                draggable={false}
                loading="lazy"
              />
            </div>
            <div>
              <p className="text-xs text-ink-muted">Connected Records</p>
              <h5 className="font-bold text-base sm:text-lg text-ink leading-tight">All in One Place</h5>
            </div>
          </div>
          <div className="space-y-2">
            <div className="bg-surface-50 p-3 rounded-xl border border-surface-100 flex items-center justify-between text-sm">
              <span className="text-ink-muted">Participating Facilities</span>
              <span className="font-bold text-brand">Linked</span>
            </div>
            <div className="bg-surface-50 p-3 rounded-xl border border-surface-100 flex items-center justify-between text-sm">
              <span className="text-ink-muted">Reports & Prescriptions</span>
              <span className="font-bold text-ink">Synced</span>
            </div>
          </div>
        </div>
      ),
    },
    {
      timeLabel: "06",
      badge: "Connected Facilities",
      time: "06 — Connect With Your Healthcare Facilities",
      title: "06 — Connect With Your Healthcare Facilities",
      description:
        "Subscribe to participating healthcare facilities and access their available digital healthcare services and updates.",
      stepIcon: Building2,
      logoSrc: "/storySectionlogo/CONNECT%20FACILITY.svg",
      stepIconColor: "text-brand",
      stepBg: "bg-brand/10",
      accentBorder: "border-brand/30",
      pillBg: "bg-brand/10 text-brand border-brand/30",
      visual: (
        <div className="bg-white rounded-3xl p-5 sm:p-6 shadow-xl border border-surface-100 max-w-sm w-full mx-auto">
          <div className="flex items-center justify-between border-b border-surface-100 pb-3.5 sm:pb-4 mb-4">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 flex-shrink-0 rounded-xl bg-brand/10 flex items-center justify-center">
                <Image
                  src="/storySectionlogo/CONNECT%20FACILITY.svg"
                  alt="Blood Bank"
                  width={32}
                  height={32}
                  className="w-7 h-7 object-contain rounded-md"
                  draggable={false}
                  loading="lazy"
                />
              </div>
              <span className="font-bold text-sm sm:text-base text-ink">Healthcare Facilities</span>
            </div>
            <span className="text-[10px] bg-brand/15 text-brand px-2.5 py-0.5 rounded-full font-bold flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-brand animate-ping" />
              Live
            </span>
          </div>
          <div className="space-y-3">
            <div className="flex items-center justify-between text-xs sm:text-sm">
              <span className="text-ink-muted">Subscribed Facilities</span>
              <span className="font-semibold text-brand">Active Updates</span>
            </div>
            <div className="bg-brand/5 p-3 rounded-xl border border-brand/15 text-xs text-brand font-medium text-center">
              Access digital services from your subscribed facilities.
            </div>
          </div>
        </div>
      ),
    },
  ];

  const currentStep = steps[activeMobileStep];

  // Mobile swipe gestures
  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStart === null) return;
    const touchEnd = e.changedTouches[0].clientX;
    const diff = touchStart - touchEnd;
    if (diff > 45 && activeMobileStep < steps.length - 1) {
      setActiveMobileStep((prev) => prev + 1);
    } else if (diff < -45 && activeMobileStep > 0) {
      setActiveMobileStep((prev) => prev - 1);
    }
    setTouchStart(null);
  };

  return (
    <motion.section
      ref={containerRef}
      style={{ backgroundColor }}
      className="py-14 sm:py-20 lg:py-28 relative overflow-hidden transition-colors duration-500"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Story Title Header */}
        <AnimatedSection direction="up" className="text-center max-w-3xl mx-auto mb-10 sm:mb-14 lg:mb-20">
          <h2 className="text-brand font-semibold tracking-wide uppercase text-xs sm:text-sm mb-2 sm:mb-3">
            Essential services, connected in one place.
          </h2>
          <h3 className="text-3xl sm:text-4xl md:text-5xl font-bold text-ink mb-4 sm:mb-6">
            RemoteWard &mdash; Care That&apos;s With You
            Wherever You Need It.
          </h3>
          <p className="text-base sm:text-lg md:text-xl text-ink-muted">
            From Insurance benefits and emergency support to digital care, health records, and connected facilities—RemoteWard brings essential healthcare closer to you and your family, when it matters.
          </p>

        </AnimatedSection>

        {/* ═══════════════════════════════════════════════════════
            MOBILE-ONLY CREATIVE DAY-DIAL & INTERACTIVE STAGE (< lg)
            Replaces long vertical scroll with an interactive, compact
            day-cycle story glider.
            ═══════════════════════════════════════════════════════ */}
        <div className="block lg:hidden max-w-lg mx-auto">

          {/* Interactive Time Dial Selector */}
          <div className="bg-white/80 backdrop-blur-md p-1.5 rounded-2xl border border-surface-200 shadow-sm flex items-center justify-between mb-6 relative overflow-x-auto">
            {steps.map((step, idx) => {
              const StepIcon = step.stepIcon;
              const isActive = activeMobileStep === idx;
              return (
                <button
                  key={idx}
                  onClick={() => setActiveMobileStep(idx)}
                  className={`flex-1 py-2.5 px-2 rounded-xl flex items-center justify-center gap-1.5 text-xs font-bold transition-all relative z-10 cursor-pointer ${isActive ? "text-ink" : "text-ink-muted hover:text-ink"
                    }`}
                >
                  {isActive && (
                    <motion.div
                      layoutId="activeMobileDayDial"
                      className="absolute inset-0 bg-surface-100 border border-surface-200/80 rounded-xl shadow-xs -z-10"
                      transition={{ type: "spring", stiffness: 350, damping: 30 }}
                    />
                  )}
                  {step.logoSrc ? (
                    <Image
                      src={step.logoSrc}
                      alt={step.badge || step.timeLabel}
                      width={14}
                      height={14}
                      className="w-3.5 h-3.5 object-contain"
                      draggable={false}
                    />
                  ) : (
                    <StepIcon className={`w-3.5 h-3.5 ${isActive ? step.stepIconColor : "text-ink-muted"}`} />
                  )}
                  <span className="truncate">{step.timeLabel}</span>
                </button>
              );
            })}
          </div>

          {/* Interactive Day Story Stage */}
          <div
            className="bg-white/95 rounded-3xl p-5 sm:p-7 border border-surface-200/80 shadow-xl relative overflow-hidden"
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={activeMobileStep}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.28, ease: "easeOut" }}
                className="flex flex-col space-y-5"
              >
                {/* Top Badge Row */}
                <div className="flex items-center justify-between">
                  <div
                    className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold border ${currentStep.stepBg} ${currentStep.stepIconColor} ${currentStep.accentBorder}`}
                  >
                    {currentStep.logoSrc ? (
                      <Image
                        src={currentStep.logoSrc}
                        alt={currentStep.badge || currentStep.timeLabel}
                        width={14}
                        height={14}
                        className="w-3.5 h-3.5 object-contain"
                        draggable={false}
                      />
                    ) : (
                      <currentStep.stepIcon className="w-3.5 h-3.5" />
                    )}
                    <span>{currentStep.badge || currentStep.time}</span>
                  </div>
                  <span className="text-[11px] font-bold text-ink-muted uppercase tracking-wider">
                    {activeMobileStep + 1} of {steps.length}
                  </span>
                </div>

                {/* Narrative Header */}
                <div>
                  <h4 className="text-2xl font-bold text-ink mb-2">{currentStep.title}</h4>
                  <p className="text-sm text-ink-muted leading-relaxed">
                    {currentStep.description}
                  </p>
                </div>

                {/* Live Interactive Visual Card */}
                <div className="pt-2">
                  {currentStep.visual}
                </div>

                {/* Interactive Navigation Controls */}
                <div className="flex items-center justify-between pt-3 border-t border-surface-100">
                  <button
                    onClick={() => setActiveMobileStep((prev) => Math.max(0, prev - 1))}
                    disabled={activeMobileStep === 0}
                    className={`p-2 rounded-xl border border-surface-200 flex items-center justify-center text-ink transition-opacity ${activeMobileStep === 0 ? "opacity-30 cursor-not-allowed" : "hover:bg-surface-50 cursor-pointer"
                      }`}
                    aria-label="Previous service"
                  >
                    <ChevronLeft className="w-5 h-5" />
                  </button>

                  {/* Step progress dots */}
                  <div className="flex items-center gap-1.5">
                    {steps.map((_, i) => (
                      <button
                        key={i}
                        onClick={() => setActiveMobileStep(i)}
                        className={`h-2 rounded-full transition-all duration-300 ${activeMobileStep === i ? "w-6 bg-brand" : "w-2 bg-surface-300"
                          }`}
                        aria-label={`Go to service ${i + 1}`}
                      />
                    ))}
                  </div>

                  <button
                    onClick={() => setActiveMobileStep((prev) => Math.min(steps.length - 1, prev + 1))}
                    disabled={activeMobileStep === steps.length - 1}
                    className={`p-2 rounded-xl border border-surface-200 flex items-center justify-center text-ink transition-opacity ${activeMobileStep === steps.length - 1 ? "opacity-30 cursor-not-allowed" : "hover:bg-surface-50 cursor-pointer"
                      }`}
                    aria-label="Next service"
                  >
                    <ChevronRight className="w-5 h-5" />
                  </button>
                </div>

              </motion.div>
            </AnimatePresence>
          </div>

          <p className="text-center text-xs text-ink-muted/70 mt-3 flex items-center justify-center gap-1">
            <span>← Swipe or tap tabs to explore services →</span>
          </p>

        </div>


        {/* ═══════════════════════════════════════════════════════
            DESKTOP / TABLET TIMELINE LAYOUT (lg+)
            ═══════════════════════════════════════════════════════ */}
        <div className="hidden lg:block relative">
          {/* Vertical center line — desktop only */}
          <div className="absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-0.5 bg-surface-200" />

          <div className="space-y-16 lg:space-y-24">
            {steps.map((step, idx) => {
              const isEven = idx % 2 === 0;
              const StepIcon = step.stepIcon;

              return (
                <div key={idx} className="relative z-10">

                  {/* Timeline node icon */}
                  <div className="absolute left-1/2 -translate-x-1/2 top-4 w-10 h-10 rounded-full bg-white border-2 border-surface-200 flex items-center justify-center shadow-md">
                    {step.logoSrc ? (
                      <Image
                        src={step.logoSrc}
                        alt={step.badge || step.timeLabel}
                        width={20}
                        height={20}
                        className="w-5 h-5 object-contain"
                        draggable={false}
                      />
                    ) : (
                      <StepIcon className={`w-5 h-5 ${step.stepIconColor}`} />
                    )}
                  </div>

                  <div className="grid grid-cols-2 gap-16 items-center">

                    {/* Story text */}
                    <div className={isEven ? "text-right pr-12" : "order-2 pl-12"}>
                      <AnimatedSection direction={isEven ? "left" : "right"}>
                        <div
                          className={`inline-flex items-center space-x-2 px-3 py-1 rounded-full text-xs font-bold border ${step.stepBg} ${step.stepIconColor} ${step.accentBorder} mb-4`}
                        >
                          {step.logoSrc ? (
                            <Image
                              src={step.logoSrc}
                              alt={step.badge || step.timeLabel}
                              width={14}
                              height={14}
                              className="w-3.5 h-3.5 object-contain"
                              draggable={false}
                            />
                          ) : (
                            <StepIcon className="w-3.5 h-3.5" />
                          )}
                          <span>{step.badge || step.time}</span>
                        </div>
                        <h4 className="text-3xl font-bold text-ink mb-4">{step.title}</h4>
                        <p className="text-lg text-ink-muted leading-relaxed max-w-xl mx-0">
                          {step.description}
                        </p>
                      </AnimatedSection>
                    </div>

                    {/* Visual card */}
                    <div className={isEven ? "pl-12" : "order-1 pr-12"}>
                      <AnimatedSection direction="up" delay={0.2}>
                        <motion.div
                          className="p-4"
                          whileHover={{ scale: 1.03, rotate: isEven ? -1 : 1 }}
                          transition={{ type: "spring", stiffness: 300, damping: 15 }}
                        >
                          {step.visual}
                        </motion.div>
                      </AnimatedSection>
                    </div>

                  </div>
                </div>
              );
            })}
          </div>
        </div>

      </div>
    </motion.section>
  );
}
