"use client";

import { Car, Layers, ClipboardX, Split, Stethoscope, AlertCircle } from "lucide-react";
import { motion } from "framer-motion";
import AnimatedSection from "../ui/AnimatedSection";
import { staggerParent, staggerChild } from "../ui/StaggerContainer";
import { useMobileCarousel, MobileCarouselDots } from "../ui/MobileCarousel";

export default function ProblemSection() {
  const { scrollRef, activeIndex } = useMobileCarousel();

  const problems = [
    {
      title: "Travelling for Care Can Be Difficult",
      desc: "Taking a patient to a hospital or clinic isn't always easy, especially when age, mobility, recovery, distance, or health conditions make travelling difficult.",
      Icon: Car,
      bgClass: "bg-alert/10",
      iconColor: "text-alert",
      badgeText: "Travel Barriers",
    },
    {
      title: "Care at Home Becomes a Burden",
      desc: "Medicines, symptoms, health measurements, routines, and follow-ups can become difficult to manage over time, especially when someone is dealing with multiple health needs.",
      Icon: Layers,
      bgClass: "bg-highlight/15",
      iconColor: "text-highlight-dark",
      badgeText: "Routine Overload",
    },
    {
      title: "Fragmented Health Information",
      desc: "Reports, prescriptions, test results, previous consultations, and health updates can end up in different places. Over time, it becomes harder for patients and families to remember what happened, what changed, and what needs attention next.",
      Icon: ClipboardX,
      bgClass: "bg-support-blue/15",
      iconColor: "text-support-blue",
      badgeText: "Data Silos",
    },
    {
      title: "Caring Together Isn't Always Easy",
      desc: "When a family is caring for someone, everyone wants to help. But when each person is managing their part separately, keeping everyone on the same page can be difficult.",
      Icon: Split,
      bgClass: "bg-support-purple/25",
      iconColor: "text-purple-600",
      badgeText: "Communication Gap",
    },
    {
      title: "Getting the Right Support, On Time",
      desc: "When you need care, having the right healthcare professional to turn to when it matters can make all the difference.",
      Icon: Stethoscope,
      bgClass: "bg-brand/10",
      iconColor: "text-brand",
      badgeText: "Timely Access",
    },
  ];

  return (
    <section id="problems" className="py-14 sm:py-20 lg:py-24 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Section Title */}
        <AnimatedSection direction="up" className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          <h2 className="text-brand font-semibold tracking-wide uppercase text-xs sm:text-sm mb-2 sm:mb-3">
            The Challenges We Face
          </h2>
          <h3 className="text-3xl sm:text-4xl md:text-5xl font-bold text-ink mb-4 sm:mb-6">
            Healthcare shouldn&apos;t become harder when life gets harder.
          </h3>
          <p className="text-base sm:text-lg md:text-xl text-ink-muted">
            When one person needs care, the whole family feels it. For older adults, people recovering at home, and those managing ongoing health needs, staying informed, being there, and knowing everything is okay can be a daily challenge.
          </p>
        </AnimatedSection>

        {/* Problem Cards — horizontal carousel on mobile, grid on md+ */}
        <motion.div
          ref={scrollRef}
          variants={staggerParent()}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-60px" }}
          className="mobile-carousel md:grid md:grid-cols-2 lg:grid-cols-6 gap-6 sm:gap-8"
        >
          {problems.map((prob, idx) => {
            const Icon = prob.Icon;
            return (
              <motion.div
                key={idx}
                variants={staggerChild}
                className={`bg-surface-50 rounded-3xl p-6 sm:p-8 border border-surface-200/60 shadow-sm hover:shadow-md hover:bg-white transition-all duration-300 flex flex-col justify-between ${
                  idx >= 3 ? "md:col-span-1 lg:col-span-3" : "md:col-span-1 lg:col-span-2"
                } ${idx === 4 ? "md:col-span-2 lg:col-span-3" : ""}`}
                whileHover={{ y: -6, scale: 1.01 }}
              >
                <div>
                  {/* Badge */}
                  <div className="flex items-center justify-between mb-5 sm:mb-6">
                    <span className="text-xs font-bold uppercase tracking-wider text-ink-muted bg-surface-200/50 px-3 py-1 rounded-full">
                      {prob.badgeText}
                    </span>
                    <AlertCircle className="w-4 h-4 sm:w-5 sm:h-5 text-ink-muted/40" />
                  </div>

                  {/* Icon Badge */}
                  <div className={`w-12 h-12 sm:w-14 sm:h-14 rounded-2xl ${prob.bgClass} flex items-center justify-center mb-5 sm:mb-6`}>
                    <Icon className={`w-5 h-5 sm:w-6 sm:h-6 ${prob.iconColor}`} />
                  </div>

                  <h4 className="text-xl sm:text-2xl font-bold text-ink mb-2 sm:mb-3">{prob.title}</h4>
                  <p className="text-ink-muted text-sm sm:text-base leading-relaxed">{prob.desc}</p>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
        <MobileCarouselDots count={problems.length} activeIndex={activeIndex} />
      </div>
    </section>
  );
}

