"use client";

import { Heart, HeartHandshake, ShieldCheck, Quote } from "lucide-react";
import AnimatedSection from "../ui/AnimatedSection";

export default function WhyWeStarted() {
  return (
    <section id="about-us" className="scroll-mt-12 py-14 sm:py-20 lg:py-24 bg-white overflow-hidden">
      {/* Fallback anchor for backward compatibility */}
      <div id="why-we-started" className="sr-only" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* Left Column: Narrative Storytelling */}
          <div className="lg:col-span-7 space-y-4 sm:space-y-6">
            <AnimatedSection direction="left">
              <h2 className="text-brand font-semibold tracking-wide uppercase text-xs sm:text-sm mb-2 sm:mb-3">
                About Us
              </h2>
              <h3 className="text-3xl sm:text-4xl md:text-5xl font-bold text-ink leading-tight mb-4 sm:mb-6">
                Why we started RemoteWard.
              </h3>
            </AnimatedSection>

            <AnimatedSection direction="left" delay={0.1} className="space-y-3 sm:space-y-4 text-base sm:text-lg text-ink-muted leading-relaxed">
              <p>
                We build RemoteWard with purpose and precision, guided by one simple belief: healthcare shouldn&apos;t feel like a black box. People should be able to understand their healthcare, find their way through it, and know where to turn when they need care.
              </p>
              <p>
                Our journey began through BIRAC&apos;s Social Innovation Immersion Programme (SIIP) under the SPARSH (Social Innovation Programme for Products: Affordable &amp; Relevant to Societal Health) initiative. What began as a social innovation focused on real-world healthcare challenges grew into RemoteWard&mdash;a healthcare technology spin-off built around a simple purpose: making healthcare easier for people to navigate.
              </p>
            </AnimatedSection>

            {/* Taglines Grid: What We Believe */}
            <AnimatedSection direction="left" delay={0.2} className="pt-2 sm:pt-4">
              <span className="text-xs font-bold text-brand uppercase tracking-wider block mb-3">
                What We Believe
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-6">
                {/* 1. Patient First */}
                <div className="flex items-start space-x-3 bg-surface-50 sm:bg-transparent p-3.5 sm:p-0 rounded-2xl sm:rounded-none">
                  <Heart className="w-5 h-5 text-brand flex-shrink-0 mt-0.5" />
                  <div>
                    <h5 className="font-bold text-ink text-sm sm:text-base">Patient First</h5>
                    <p className="text-xs text-ink-muted mt-1 leading-snug">
                      Technology should simplify healthcare, not make it harder to navigate.
                    </p>
                  </div>
                </div>

                {/* 2. Built With Empathy */}
                <div className="flex items-start space-x-3 bg-surface-50 sm:bg-transparent p-3.5 sm:p-0 rounded-2xl sm:rounded-none">
                  <HeartHandshake className="w-5 h-5 text-accent-alt flex-shrink-0 mt-0.5" />
                  <div>
                    <h5 className="font-bold text-ink text-sm sm:text-base">Built With Empathy</h5>
                    <p className="text-xs text-ink-muted mt-1 leading-snug">
                      Healthcare is deeply personal. Every experience should reflect the needs of patients and families.
                    </p>
                  </div>
                </div>

                {/* 3. Trust Matters */}
                <div className="flex items-start space-x-3 bg-surface-50 sm:bg-transparent p-3.5 sm:p-0 rounded-2xl sm:rounded-none">
                  <ShieldCheck className="w-5 h-5 text-support-blue flex-shrink-0 mt-0.5" />
                  <div>
                    <h5 className="font-bold text-ink text-sm sm:text-base">Trust Matters</h5>
                    <p className="text-xs text-ink-muted mt-1 leading-snug">
                      Healthcare technology must be built with privacy, security, transparency, and responsibility at its core.
                    </p>
                  </div>
                </div>
              </div>
            </AnimatedSection>
          </div>

          {/* Right Column: Mission & Vision Card */}
          <div className="lg:col-span-5 mt-4 lg:mt-0">
            <AnimatedSection direction="right" delay={0.2}>
              <div className="bg-surface-50 rounded-3xl p-6 sm:p-8 md:p-10 border-l-8 border-brand shadow-sm relative overflow-hidden space-y-6">
                <Quote className="absolute -top-4 -right-4 w-28 sm:w-32 h-28 sm:h-32 text-brand/5 pointer-events-none" />

                {/* Our Mission */}
                <div>
                  <span className="text-xs font-bold text-brand uppercase tracking-wider block mb-1.5">
                    Our Mission
                  </span>
                  <h4 className="text-xl sm:text-2xl font-bold text-ink mb-2">
                    Your Way Through Healthcare
                  </h4>
                  <p className="text-base sm:text-lg text-ink-muted leading-relaxed">
                    We&apos;re here to help people find their way through a healthcare system that can often feel difficult to understand and navigate.
                  </p>
                </div>

                {/* Our Vision */}
                <div className="border-t border-surface-200/60 pt-5">
                  <span className="text-xs font-bold text-brand uppercase tracking-wider block mb-1.5">
                    Our Vision
                  </span>
                  <h4 className="text-xl sm:text-2xl font-bold text-ink mb-2">
                    Distance shouldn&apos;t decide the quality of care
                  </h4>
                  <p className="text-base sm:text-lg text-ink-muted leading-relaxed">
                    We see a future where access to care is not limited by where a person lives, where they are, or how difficult the healthcare journey feels.
                  </p>
                </div>
              </div>
            </AnimatedSection>
          </div>

        </div>
      </div>
    </section>
  );
}
