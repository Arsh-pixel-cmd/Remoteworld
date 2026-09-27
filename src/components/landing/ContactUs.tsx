"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Mail, ExternalLink, Copy, Check, MessageCircleHeart } from "lucide-react";
import AnimatedSection from "../ui/AnimatedSection";

export default function ContactUs() {
  const [copied, setCopied] = useState(false);
  const email = "info@remoteward.com";
  const gmailUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(email)}`;

  const handleCopy = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    navigator.clipboard.writeText(email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section id="contact" className="scroll-mt-12 py-14 sm:py-20 lg:py-24 relative overflow-hidden bg-white">
      {/* Fallback anchor for backward compatibility */}
      <div id="contact-us" className="sr-only" />

      {/* Decorative background glows */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-brand/5 rounded-full blur-3xl pointer-events-none -z-10" />
      <div className="absolute -bottom-10 right-10 w-72 h-72 bg-accent/5 rounded-full blur-2xl pointer-events-none -z-10" />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <AnimatedSection direction="up" className="text-center">

          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-brand/10 border border-brand/20 text-brand text-xs sm:text-sm font-semibold mb-4 sm:mb-6">
            <MessageCircleHeart className="w-4 h-4" />
            <span>Contact Us</span>
          </div>

          {/* Heading */}
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-ink mb-4 sm:mb-6 tracking-tight">
            We&apos;re Here to <span className="text-brand">Hear You.</span>
          </h2>

          {/* Description */}
          <p className="text-base sm:text-lg md:text-xl text-ink-muted max-w-2xl mx-auto mb-8 sm:mb-10 leading-relaxed">
            Whether you&apos;re reaching out with a question, feedback, a suggestion, or something we haven&apos;t thought of yet, our inbox is open.
          </p>

          {/* Interactive Email Card / Button */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 max-w-md mx-auto mb-8 sm:mb-10">
            <motion.a
              href={gmailUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto flex-1 inline-flex items-center justify-center gap-3 bg-surface-50 hover:bg-brand/5 border-2 border-brand/30 hover:border-brand text-brand hover:text-brand-dark px-6 py-4 rounded-2xl shadow-sm hover:shadow-md transition-all duration-300 font-bold text-lg sm:text-xl group"
              whileHover={{ scale: 1.02, y: -2 }}
              whileTap={{ scale: 0.98 }}
              title="Click to open in Gmail"
            >
              <Mail className="w-5 h-5 sm:w-6 sm:h-6 text-brand transition-transform duration-300 group-hover:scale-110" />
              <span>{email}</span>
              <ExternalLink className="w-4 h-4 text-brand/70 group-hover:text-brand group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </motion.a>

            {/* Quick Copy Button */}
            <motion.button
              type="button"
              onClick={handleCopy}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-surface-100 hover:bg-surface-200 text-ink-muted hover:text-ink px-4 py-4 rounded-2xl border border-surface-200 text-sm font-semibold transition-all duration-200 cursor-pointer"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.96 }}
              aria-label="Copy email address"
              title="Copy email address"
            >
              {copied ? (
                <>
                  <Check className="w-4 h-4 text-accent-alt" />
                  <span className="text-accent-alt">Copied!</span>
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4" />
                  <span>Copy</span>
                </>
              )}
            </motion.button>
          </div>

          {/* Bottom message */}
          <div className="space-y-1.5 sm:space-y-2">
            <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-ink">
              Drop us a message whenever you need to.
            </h3>
            <p className="text-sm sm:text-base text-ink-muted">
              Your voice helps us build better.
            </p>
          </div>

        </AnimatedSection>
      </div>
    </section>
  );
}
