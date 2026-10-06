"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { motion, AnimatePresence, type PanInfo } from "framer-motion";
import Image from "next/image";

const screens = [
  { src: "/screens/flow-3.jpg", alt: "Home Dashboard" },
  { src: "/screens/flow-4.jpg", alt: "Link Health Records" },
  { src: "/screens/flow-5.jpg", alt: "ABHA Profile" },
  { src: "/screens/flow-7.jpg", alt: "Medications Tracker" },
  { src: "/screens/flow-8.jpg", alt: "Meditation & Wellness" },
];

const AUTOPLAY_INTERVAL = 4000; // 4 seconds
const SWIPE_THRESHOLD = 50; // minimum px for a swipe to register
const SWIPE_PAUSE_DURATION = 8000; // pause autoplay 8s after manual swipe

// Slide direction variants
const slideVariants = {
  enter: (direction: number) => ({
    x: direction > 0 ? "100%" : "-100%",
    opacity: 0.5,
  }),
  center: {
    x: 0,
    opacity: 1,
  },
  exit: (direction: number) => ({
    x: direction > 0 ? "-100%" : "100%",
    opacity: 0.5,
  }),
};

export default function PhoneMockup() {
  const [[currentIndex, direction], setPage] = useState([0, 0]);
  const [isPaused, setIsPaused] = useState(false);
  const pauseTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const autoplayRef = useRef<NodeJS.Timeout | null>(null);

  // Navigate to a specific slide
  const paginate = useCallback(
    (newDirection: number) => {
      setPage(([prev]) => {
        const next = (prev + newDirection + screens.length) % screens.length;
        return [next, newDirection];
      });
    },
    []
  );

  // Go to specific dot
  const goToSlide = useCallback((index: number) => {
    setPage(([prev]) => {
      const dir = index > prev ? 1 : -1;
      return [index, dir];
    });
    // Pause autoplay briefly on manual navigation
    setIsPaused(true);
    if (pauseTimeoutRef.current) clearTimeout(pauseTimeoutRef.current);
    pauseTimeoutRef.current = setTimeout(() => setIsPaused(false), SWIPE_PAUSE_DURATION);
  }, []);

  // Auto-scroll
  useEffect(() => {
    if (isPaused) return;

    autoplayRef.current = setInterval(() => {
      paginate(1);
    }, AUTOPLAY_INTERVAL);

    return () => {
      if (autoplayRef.current) clearInterval(autoplayRef.current);
    };
  }, [isPaused, paginate]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (pauseTimeoutRef.current) clearTimeout(pauseTimeoutRef.current);
      if (autoplayRef.current) clearInterval(autoplayRef.current);
    };
  }, []);

  // Handle swipe gestures
  const handleDragEnd = (_: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
    const { offset, velocity } = info;
    const swipePower = Math.abs(offset.x) * velocity.x;

    if (offset.x < -SWIPE_THRESHOLD || swipePower < -5000) {
      paginate(1); // swipe left → next
    } else if (offset.x > SWIPE_THRESHOLD || swipePower > 5000) {
      paginate(-1); // swipe right → prev
    }

    // Pause autoplay after manual swipe
    setIsPaused(true);
    if (pauseTimeoutRef.current) clearTimeout(pauseTimeoutRef.current);
    pauseTimeoutRef.current = setTimeout(() => setIsPaused(false), SWIPE_PAUSE_DURATION);
  };

  return (
    <div className="phone-mockup w-[280px] h-[580px] sm:w-[300px] sm:h-[620px] bg-white flex flex-col relative text-ink select-none">
      {/* Phone Screen Area */}
      <div className="w-full h-full overflow-hidden relative bg-surface-50">
        <AnimatePresence initial={false} custom={direction} mode="popLayout">
          <motion.div
            key={currentIndex}
            custom={direction}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{
              x: { type: "spring", stiffness: 350, damping: 35 },
              opacity: { duration: 0.25 },
            }}
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={0.15}
            onDragEnd={handleDragEnd}
            className="absolute inset-0 w-full h-full cursor-grab active:cursor-grabbing phone-carousel-slide"
          >
            <Image
              src={screens[currentIndex].src}
              alt={screens[currentIndex].alt}
              fill
              className="object-cover object-top"
              sizes="300px"
              draggable={false}
              priority={currentIndex === 0}
              loading={currentIndex === 0 ? "eager" : "lazy"}
            />
          </motion.div>
        </AnimatePresence>

        {/* Dot indicators */}
        <div className="absolute bottom-3 left-1/2 -translate-x-1/2 z-20 flex items-center gap-1.5">
          {screens.map((_, idx) => (
            <button
              key={idx}
              onClick={() => goToSlide(idx)}
              aria-label={`Go to screen ${idx + 1}`}
              className={`rounded-full transition-all duration-300 ${idx === currentIndex
                  ? "w-5 h-2 bg-brand shadow-md"
                  : "w-2 h-2 bg-white/70 hover:bg-white backdrop-blur-sm"
                }`}
            />
          ))}
        </div>

        {/* Subtle gradient overlay at bottom for dot visibility */}
        <div className="absolute bottom-0 left-0 right-0 h-12 bg-gradient-to-t from-black/20 to-transparent pointer-events-none z-10" />
      </div>
    </div>
  );
}
