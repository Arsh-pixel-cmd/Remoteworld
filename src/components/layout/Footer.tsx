"use client";

import { useState } from "react";
import Link from "next/link";
import { ShieldCheck } from "lucide-react";
import { motion } from "framer-motion";
import StaggerContainer, { staggerChild } from "../ui/StaggerContainer";
import AnimatedSection from "../ui/AnimatedSection";
import Logo from "../ui/Logo";
import CareerModal from "../ui/CareerModal";
import FAQModal from "../ui/FAQModal";

export default function Footer() {
  const [isCareerOpen, setIsCareerOpen] = useState(false);
  const [isFAQOpen, setIsFAQOpen] = useState(false);
  return (
    <footer className="bg-ink text-white py-14 sm:py-16 border-t-8 border-brand overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">

        {/* Footer grid: 2 columns on mobile/tablet, 12 cols on desktop */}
        <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-12 mb-12" staggerDelay={0.1}>

          {/* Column 1: Logo & Company Address Details (Full width on mobile, 6 cols on lg) */}
          <motion.div
            variants={staggerChild}
            className="md:col-span-2 lg:col-span-6 flex flex-col items-start text-left"
          >
            <div className="mb-4 inline-block transition-transform duration-300 hover:scale-95">
              <Logo textClass="text-2xl sm:text-3xl" />
            </div>

            <div className="space-y-3.5 text-surface-300 text-sm sm:text-base max-w-lg">
              <div>
                <h5 className="font-bold text-surface-100 text-sm uppercase tracking-wider mb-1.5">
                  Regd Office :
                </h5>
                <p className="leading-relaxed text-surface-200">
                  Yenepoya (Deemed to be University) Deralakatte,<br />
                  Mangalore, Dakshina Kannada, Karnataka &ndash; 575018
                </p>
              </div>

              {/* Contact metadata row */}
              <div className="flex flex-wrap items-center gap-x-3 gap-y-1.5 text-sm text-surface-300 pt-1">
                <span>India</span>
                <span className="text-surface-500 font-bold">|</span>
                <a
                  href="https://mail.google.com/mail/?view=cm&fs=1&to=info@remoteward.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-brand hover:underline font-medium"
                >
                  info@remoteward.com
                </a>
                <span className="text-surface-500 font-bold">|</span>
                <a href="tel:+918277829222" className="text-surface-200 hover:text-white transition-colors">
                  +91-8277829222
                </a>
              </div>

              {/* CIN and GST details */}
              <div className="pt-3 border-t border-surface-400/20 text-xs sm:text-sm text-surface-300 leading-relaxed font-mono">
                <span>CIN: U86909KA2023PTC173707</span>
                <span className="mx-2 text-surface-500">|</span>
                <span>GST: 29AAMCR7013D1ZC</span>
              </div>
            </div>
          </motion.div>

          {/* Column 2: Follow Us (1 col on tablet, 3 cols on lg) */}
          <motion.div variants={staggerChild} className="col-span-1 lg:col-span-3 text-left">
            <h4 className="font-bold text-lg mb-5 text-surface-50">Follow Us</h4>
            <ul className="space-y-3.5">
              <li>
                <a
                  href="https://www.linkedin.com/company/remoteward/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-surface-300 hover:text-brand flex items-center gap-3 transition-all duration-300 group"
                >
                  <span className="w-8 h-8 rounded-full bg-surface-400/10 border border-surface-400/20 flex items-center justify-center group-hover:bg-brand group-hover:border-brand transition-all">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="w-4 h-4 text-surface-200 group-hover:text-white"
                    >
                      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
                      <rect width="4" height="12" x="2" y="9" />
                      <circle cx="4" cy="4" r="2" />
                    </svg>
                  </span>
                  <span className="font-medium text-sm sm:text-base">LinkedIn</span>
                </a>
              </li>

              <li>
                <a
                  href="https://www.instagram.com/remoteward?igsh=MTdvYXRuZjZ6NWFwag=="
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-surface-300 hover:text-brand flex items-center gap-3 transition-all duration-300 group"
                >
                  <span className="w-8 h-8 rounded-full bg-surface-400/10 border border-surface-400/20 flex items-center justify-center group-hover:bg-brand group-hover:border-brand transition-all">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="w-4 h-4 text-surface-200 group-hover:text-white"
                    >
                      <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
                      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
                    </svg>
                  </span>
                  <span className="font-medium text-sm sm:text-base">Instagram</span>
                </a>
              </li>

              <li>
                <a
                  href="https://x.com/remoteward"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-surface-300 hover:text-brand flex items-center gap-3 transition-all duration-300 group"
                >
                  <span className="w-8 h-8 rounded-full bg-surface-400/10 border border-surface-400/20 flex items-center justify-center group-hover:bg-brand group-hover:border-brand transition-all">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="w-4 h-4 text-surface-200 group-hover:text-white"
                    >
                      <path d="M4 4l11.733 16h4.267l-11.733 -16z" />
                      <path d="M4 20l6.768 -6.768m2.46 -2.46l6.772 -6.772" />
                    </svg>
                  </span>
                  <span className="font-medium text-sm sm:text-base">X</span>
                </a>
              </li>

              <li>
                <a
                  href="https://play.google.com/store/apps/details?id=com.application.remoteward"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-surface-300 hover:text-brand flex items-center gap-3 transition-all duration-300 group"
                >
                  <span className="w-8 h-8 rounded-full bg-surface-400/10 border border-surface-400/20 flex items-center justify-center group-hover:bg-brand group-hover:border-brand transition-all">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="w-4 h-4 text-surface-200 group-hover:text-white"
                    >
                      <polygon points="5 3 19 12 5 21 5 3" />
                    </svg>
                  </span>
                  <span className="font-medium text-sm sm:text-base">Play store</span>
                </a>
              </li>
            </ul>
          </motion.div>

          {/* Column 3: Explore (1 col on tablet, 3 cols on lg) */}
          <motion.div variants={staggerChild} className="col-span-1 lg:col-span-3 text-left">
            <h4 className="font-bold text-lg mb-5 text-surface-50">Explore</h4>
            <ul className="space-y-3.5">
              <li>
                <Link href="/#how-it-works" className="text-surface-300 hover:text-brand hover:translate-x-1 transition-all duration-300 inline-block text-sm sm:text-base">
                  For Patients
                </Link>
              </li>
              <li>
                <Link href="/#partners" className="text-surface-300 hover:text-brand hover:translate-x-1 transition-all duration-300 inline-block text-sm sm:text-base">
                  For Healthcare Organizations
                </Link>
              </li>
              <li>
                <Link href="/#about-us" className="text-surface-300 hover:text-brand hover:translate-x-1 transition-all duration-300 inline-block text-sm sm:text-base">
                  About Us
                </Link>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => setIsCareerOpen(true)}
                  className="text-surface-300 hover:text-brand hover:translate-x-1 transition-all duration-300 inline-block text-sm sm:text-base cursor-pointer text-left"
                >
                  Career
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => setIsFAQOpen(true)}
                  className="text-surface-300 hover:text-brand hover:translate-x-1 transition-all duration-300 inline-block text-sm sm:text-base cursor-pointer text-left"
                >
                  FAQ
                </button>
              </li>
              <li>
                <Link href="/privacy-policy" className="text-surface-300 hover:text-brand hover:translate-x-1 transition-all duration-300 inline-block text-sm sm:text-base">
                  Privacy Policy
                </Link>
              </li>
            </ul>
          </motion.div>

        </StaggerContainer>

        {/* Bottom copyright declaration */}
        <AnimatedSection direction="up" delay={0.2}>
          <div className="border-t border-surface-400/20 pt-8 flex flex-col md:flex-row justify-between items-center text-surface-300 text-sm gap-4 text-center md:text-left">
            <p>&copy; 2026 RemoteWard. All rights reserved</p>
            <div className="flex items-center space-x-2 bg-surface-400/10 px-4 py-2 rounded-full border border-surface-400/10">
              <ShieldCheck className="w-4 h-4 text-accent-alt" />
              <span>Securely Encrypted</span>
            </div>
          </div>
        </AnimatedSection>

      </div>

      {/* Careers Application Modal */}
      <CareerModal isOpen={isCareerOpen} onClose={() => setIsCareerOpen(false)} />
      <FAQModal isOpen={isFAQOpen} onClose={() => setIsFAQOpen(false)} />
    </footer>
  );
}
