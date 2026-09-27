"use client";

import Link from "next/link";
import { ShieldCheck } from "lucide-react";
import { motion } from "framer-motion";
import StaggerContainer, { staggerChild } from "../ui/StaggerContainer";
import AnimatedSection from "../ui/AnimatedSection";

import Logo from "../ui/Logo";

export default function Footer() {
  const socialVariants = {
    hidden: { scale: 0, opacity: 0 },
    show: { scale: 1, opacity: 1, transition: { type: "spring" as const, stiffness: 260, damping: 20 } },
  };

  return (
    <footer className="bg-ink text-white py-16 border-t-8 border-brand overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        
        {/* Footer grid: 2 columns on mobile, 4 columns on desktop */}
        <StaggerContainer className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12 mb-12" staggerDelay={0.1}>
          
          {/* Brand Info (Full-width centered on mobile, 2 columns left-aligned on desktop) */}
          <motion.div 
            variants={staggerChild} 
            className="col-span-2 md:col-span-2 flex flex-col items-center md:items-start text-center md:text-left"
          >
            <div className="mb-4 inline-block transition-transform duration-300 hover:scale-95">
              <Logo textClass="text-2xl sm:text-3xl" />
            </div>
            <p className="text-surface-300 text-base sm:text-lg mb-8 max-w-sm">
              Healthcare, held together. Empowering independence and peace of mind for families everywhere.
            </p>
            
            {/* Animated Social Icon Buttons */}
            <div className="flex space-x-4 mb-8 md:mb-0">
              <motion.a
                variants={socialVariants}
                whileHover={{ scale: 1.15, rotate: -8 }}
                whileTap={{ scale: 0.9 }}
                href="https://www.instagram.com/remoteward?igsh=MTdvYXRuZjZ6NWFwag=="
                target="_blank"
                rel="noopener noreferrer"
                className="w-11 h-11 bg-surface-400/10 border border-surface-400/20 rounded-full flex items-center justify-center hover:bg-brand hover:border-brand transition-all duration-300"
                aria-label="Instagram"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="w-5 h-5 text-surface-200"
                >
                  <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                  <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
                </svg>
              </motion.a>

              <motion.a
                variants={socialVariants}
                whileHover={{ scale: 1.15, rotate: 8 }}
                whileTap={{ scale: 0.9 }}
                href="https://www.linkedin.com/company/remoteward/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-11 h-11 bg-surface-400/10 border border-surface-400/20 rounded-full flex items-center justify-center hover:bg-brand hover:border-brand transition-all duration-300"
                aria-label="LinkedIn"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="w-5 h-5 text-surface-200"
                >
                  <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
                  <rect width="4" height="12" x="2" y="9" />
                  <circle cx="4" cy="4" r="2" />
                </svg>
              </motion.a>

              <motion.a
                variants={socialVariants}
                whileHover={{ scale: 1.15, rotate: -8 }}
                whileTap={{ scale: 0.9 }}
                href="https://x.com/remoteward"
                target="_blank"
                rel="noopener noreferrer"
                className="w-11 h-11 bg-surface-400/10 border border-surface-400/20 rounded-full flex items-center justify-center hover:bg-brand hover:border-brand transition-all duration-300"
                aria-label="Twitter / X"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="w-5 h-5 text-surface-200"
                >
                  <path d="M4 4l11.733 16h4.267l-11.733 -16z" />
                  <path d="M4 20l6.768 -6.768m2.46 -2.46l6.772 -6.772" />
                </svg>
              </motion.a>

              <motion.a
                variants={socialVariants}
                whileHover={{ scale: 1.15, rotate: 8 }}
                whileTap={{ scale: 0.9 }}
                href="https://play.google.com/store/apps/details?id=com.application.remoteward"
                target="_blank"
                rel="noopener noreferrer"
                className="w-11 h-11 bg-surface-400/10 border border-surface-400/20 rounded-full flex items-center justify-center hover:bg-brand hover:border-brand transition-all duration-300"
                aria-label="Google Play Store"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="w-5 h-5 text-surface-200"
                >
                  <polygon points="5 3 19 12 5 21 5 3" />
                </svg>
              </motion.a>
            </div>
          </motion.div>
          
          {/* Quick Links (1 column on mobile) */}
          <motion.div variants={staggerChild} className="col-span-1 text-left">
            <h4 className="font-bold text-lg mb-5 text-surface-50">Quick Links</h4>
            <ul className="space-y-3.5">
              <li>
                <Link href="/#about-us" className="text-surface-300 hover:text-brand hover:translate-x-1 transition-all duration-300 inline-block">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/#how-it-works" className="text-surface-300 hover:text-brand hover:translate-x-1 transition-all duration-300 inline-block">
                  How It Works
                </Link>
              </li>
              <li>
                <Link href="/#faq" className="text-surface-300 hover:text-brand hover:translate-x-1 transition-all duration-300 inline-block">
                  Help Center
                </Link>
              </li>
              <li>
                <Link href="/#partners" className="text-surface-300 hover:text-brand hover:translate-x-1 transition-all duration-300 inline-block">
                  Partners
                </Link>
              </li>
              <li>
                <Link href="/#contact" className="text-surface-300 hover:text-brand hover:translate-x-1 transition-all duration-300 inline-block">
                  Contact Us
                </Link>
              </li>
            </ul>
          </motion.div>
          
          {/* Legal Links (1 column on mobile) */}
          <motion.div variants={staggerChild} className="col-span-1 text-left">
            <h4 className="font-bold text-lg mb-5 text-surface-50">Legal</h4>
            <ul className="space-y-3.5">
              <li>
                <Link href="/privacy-policy" className="text-surface-300 hover:text-brand hover:translate-x-1 transition-all duration-300 inline-block">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/privacy-policy" className="text-surface-300 hover:text-brand hover:translate-x-1 transition-all duration-300 inline-block">
                  HIPAA Compliance
                </Link>
              </li>
            </ul>
          </motion.div>

        </StaggerContainer>

        {/* Bottom copyright declaration */}
        <AnimatedSection direction="up" delay={0.2}>
          <div className="border-t border-surface-400/20 pt-8 flex flex-col md:flex-row justify-between items-center text-surface-300 text-sm gap-4 text-center md:text-left">
            <p>&copy; {new Date().getFullYear()} RemoteWard Inc. All rights reserved.</p>
            <div className="flex items-center space-x-2 bg-surface-400/10 px-4 py-2 rounded-full border border-surface-400/10">
              <ShieldCheck className="w-4 h-4 text-accent-alt" />
              <span>Securely Encrypted</span>
            </div>
          </div>
        </AnimatedSection>
        
      </div>
    </footer>
  );
}
