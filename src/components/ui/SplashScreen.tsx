"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function SplashScreen({ children }: { children: React.ReactNode }) {
  const [showSplash, setShowSplash] = useState(true);
  const [isMobile, setIsMobile] = useState(false);
  const [detected, setDetected] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  // Typing animation state
  const [displayedText, setDisplayedText] = useState("");
  const [cursorVisible, setCursorVisible] = useState(true);
  const [typingDone, setTypingDone] = useState(false);
  const fullText = "RemoteWard";

  const dismiss = useCallback(() => {
    setShowSplash(false);
    try {
      sessionStorage.setItem("rw-splash-seen", "1");
    } catch {}
  }, []);

  // Detect mobile vs desktop & check if splash was already shown
  useEffect(() => {
    const isDev = process.env.NODE_ENV === "development";
    try {
      if (!isDev && sessionStorage.getItem("rw-splash-seen") === "1") {
        setTimeout(() => {
          setShowSplash(false);
          setDetected(true);
        }, 0);
        return;
      }
    } catch {}

    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    setTimeout(() => {
      setDetected(true);
    }, 0);

    // Safety timeout — dismiss after 8s no matter what
    const safetyTimer = setTimeout(dismiss, 8000);
    
    return () => {
      window.removeEventListener("resize", handleResize);
      clearTimeout(safetyTimer);
    };
  }, [dismiss]);

  // Mobile video programmatic play for strict autoplay policies
  useEffect(() => {
    if (isMobile && showSplash && videoRef.current) {
      videoRef.current.play().catch((err) => {
        console.warn("Failed to autoplay video:", err);
      });
    }
  }, [isMobile, showSplash]);

  // Desktop typing animation
  useEffect(() => {
    if (!detected || isMobile || !showSplash) return;

    let i = 0;
    const typeInterval = setInterval(() => {
      i++;
      setDisplayedText(fullText.slice(0, i));
      if (i >= fullText.length) {
        clearInterval(typeInterval);
        setTypingDone(true);
        // Hold the completed text for a beat then dismiss
        setTimeout(dismiss, 1200);
      }
    }, 140);

    return () => clearInterval(typeInterval);
  }, [detected, isMobile, showSplash, dismiss]);

  // Cursor blink
  useEffect(() => {
    if (!showSplash || isMobile) return;
    const blink = setInterval(() => setCursorVisible((v) => !v), 530);
    return () => clearInterval(blink);
  }, [showSplash, isMobile]);

  // Mobile video ended handler
  const handleVideoEnd = useCallback(() => {
    setTimeout(dismiss, 400);
  }, [dismiss]);

  // If splash already seen, just render children
  if (!showSplash && !detected) return <>{children}</>;

  // Split displayed text into "Remote" and "Ward" parts
  const remoteEnd = Math.min(displayedText.length, 6); // "Remote" = 6 chars
  const remotePart = displayedText.slice(0, remoteEnd);
  const wardPart = displayedText.slice(6);

  return (
    <>
      <AnimatePresence>
        {showSplash && detected && (
          <motion.div
            key="splash"
            className="splash-overlay"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 1.05 }}
            transition={{ duration: 0.6, ease: [0.25, 0.4, 0.25, 1] }}
          >
            {isMobile ? (
              /* ── MOBILE: Video splash ── */
              <div className="splash-video-container">
                <video
                  ref={videoRef}
                  src="/Mobilesplashscreen.mp4"
                  autoPlay
                  muted
                  playsInline
                  onEnded={handleVideoEnd}
                  className="splash-video"
                />
                <button
                  onClick={dismiss}
                  className="splash-skip-btn"
                  aria-label="Skip splash"
                >
                  Skip →
                </button>
              </div>
            ) : (
              /* ── DESKTOP: Typing animation ── */
              <div className="splash-desktop">
                {/* Animated background particles */}
                <div className="splash-particles">
                  {[...Array(6)].map((_, i) => (
                    <motion.div
                      key={i}
                      className="splash-particle"
                      initial={{
                        opacity: 0,
                        scale: 0,
                        x: (i % 3 - 1) * 200,
                        y: (Math.floor(i / 3) - 0.5) * 200,
                      }}
                      animate={{
                        opacity: [0, 0.3, 0],
                        scale: [0, 1.5, 0],
                        x: (i % 3 - 1) * 300,
                        y: (Math.floor(i / 3) - 0.5) * 300,
                      }}
                      transition={{
                        duration: 3,
                        delay: i * 0.3,
                        repeat: Infinity,
                        ease: "easeInOut",
                      }}
                    />
                  ))}
                </div>

                {/* Logo icon fading in first */}
                <motion.img
                  src="/logo.svg"
                  alt="RemoteWard"
                  className="splash-logo-icon"
                  initial={{ opacity: 0, scale: 0.5, y: 10 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  transition={{ duration: 0.6, ease: "easeOut" }}
                />

                {/* Typing text */}
                <div className="splash-typing-container">
                  <span className="splash-text-remote">
                    {remotePart.split("").map((char, idx) => (
                      <motion.span
                        key={idx}
                        initial={{ opacity: 0, y: 20, filter: "blur(8px)" }}
                        animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                        transition={{ duration: 0.3, ease: "easeOut" }}
                      >
                        {char}
                      </motion.span>
                    ))}
                  </span>
                  {wardPart.length > 0 && (
                    <span className="splash-text-ward">
                      {wardPart.split("").map((char, idx) => (
                        <motion.span
                          key={idx}
                          initial={{ opacity: 0, y: 20, filter: "blur(8px)" }}
                          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                          transition={{ duration: 0.3, ease: "easeOut" }}
                        >
                          {char}
                        </motion.span>
                      ))}
                    </span>
                  )}
                  {/* Blinking cursor */}
                  {!typingDone && (
                    <span
                      className="splash-cursor"
                      style={{ opacity: cursorVisible ? 1 : 0 }}
                    />
                  )}
                </div>

                {/* Tagline fades in after typing */}
                <AnimatePresence>
                  {typingDone && (
                    <motion.p
                      className="splash-tagline"
                      initial={{ opacity: 0, y: 15 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: 0.1 }}
                    >
                      Healthcare, held together.
                    </motion.p>
                  )}
                </AnimatePresence>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main site content — always rendered but hidden behind splash */}
      <div
        style={{
          opacity: showSplash ? 0 : 1,
          transition: "opacity 0.4s ease",
        }}
      >
        {children}
      </div>
    </>
  );
}
