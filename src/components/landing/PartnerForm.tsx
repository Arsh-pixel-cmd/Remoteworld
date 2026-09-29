"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Building2, MapPin, User, Mail, Phone, MessageSquare, Send, CheckCircle2, Loader2, Hospital, X, Handshake, Briefcase } from "lucide-react";
import AnimatedSection from "../ui/AnimatedSection";
import Image from "next/image";

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: { type: "spring" as const, stiffness: 120, damping: 15 } },
};

export default function PartnerForm() {
  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState({
    orgName: "",
    facilityType: "Hospital",
    location: "",
    contactName: "",
    email: "",
    designation: "",
    phone: "",
    message: "",
    _rw_hp: "",
  });

  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const scrollPosRef = useRef(0);
  const hasOpenedRef = useRef(false);

  // Manage Lenis and preserve page scroll position accurately
  useEffect(() => {
    if (isOpen) {
      hasOpenedRef.current = true;
      // Capture the exact scroll position before opening
      scrollPosRef.current = window.__lenis?.scroll ?? window.scrollY;
      window.__lenis?.stop();
    } else if (hasOpenedRef.current) {
      // Resume Lenis and restore exact scroll position
      window.__lenis?.start();
      const targetY = scrollPosRef.current;
      if (window.__lenis) {
        window.__lenis.scrollTo(targetY, { immediate: true });
      }
      window.scrollTo(0, targetY);
      requestAnimationFrame(() => {
        if (window.__lenis) {
          window.__lenis.scrollTo(targetY, { immediate: true });
        }
        window.scrollTo(0, targetY);
      });
    }
    return () => {
      window.__lenis?.start();
    };
  }, [isOpen]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("submitting");
    setErrorMessage("");

    try {
      const response = await fetch("/api/join-network", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (response.ok) {
        setStatus("success");
        setFormData({
          orgName: "",
          facilityType: "Hospital",
          location: "",
          contactName: "",
          email: "",
          designation: "",
          phone: "",
          message: "",
          _rw_hp: "",
        });
        // Auto-close modal after success animation
        setTimeout(() => {
          setIsOpen(false);
          // Reset status after close animation completes
          setTimeout(() => setStatus("idle"), 500);
        }, 2500);
      } else {
        setStatus("error");
        setErrorMessage(result.error || "Something went wrong. Please try again.");
      }
    } catch {
      setStatus("error");
      setErrorMessage("Network error. Please check your connection.");
    }
  };

  const handleClose = () => {
    setIsOpen(false);
    // Reset after animation
    setTimeout(() => {
      setStatus("idle");
      setErrorMessage("");
    }, 500);
  };

  return (
    <>
      {/* ─── Section with Title + Description + CTA Button ─── */}
      <section id="partners" className="scroll-mt-12 py-14 sm:py-20 lg:py-24 relative overflow-hidden bg-surface-50/50">
        {/* Fallback anchor for backward compatibility */}
        <div id="partner-with-us" className="sr-only" />
        {/* Decorative blurry backgrounds */}
        <div className="absolute top-1/4 -left-1/4 w-96 h-96 bg-brand/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-1/4 -right-1/4 w-96 h-96 bg-accent/10 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <AnimatedSection className="text-center mb-8 sm:mb-12">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-ink mb-3 sm:mb-4 tracking-tight">
              For Healthcare <span className="text-brand">Organizations</span>
            </h2>
            <p className="text-lg sm:text-xl font-semibold text-brand mb-4">
              Bring Your Healthcare Closer to Patients.
            </p>
            <div className="flex items-center justify-center my-6 sm:my-8 px-2">
              <Image
                src="/partnerBg.svg"
                alt="Healthcare Organizations"
                width={400}
                height={400}
                loading="lazy"
                className="w-full max-w-[300px] xs:max-w-[340px] sm:max-w-md md:max-w-lg lg:max-w-xl h-auto object-contain"
                sizes="(max-width: 640px) 90vw, (max-width: 1024px) 500px, 600px"
              />
            </div>
            <p className="text-base sm:text-lg text-ink-muted max-w-2xl mx-auto mb-8 sm:mb-10 leading-relaxed">
              Whether you are a hospital, clinic, diagnostic centre, or other healthcare organization, let&apos;s explore how RemoteWard can help you build a stronger digital connection with the people you serve.
            </p>

            {/* ── Partner With Us Button ── */}
            <motion.button
              onClick={() => setIsOpen(true)}
              className="inline-flex items-center gap-3 bg-brand hover:bg-brand-dark text-white font-bold text-base sm:text-lg px-8 sm:px-10 py-4 sm:py-5 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 cursor-pointer group"
              whileHover={{ scale: 1.04, y: -2 }}
              whileTap={{ scale: 0.97 }}
            >
              <Handshake className="w-5 h-5 sm:w-6 sm:h-6 transition-transform duration-300 group-hover:rotate-12" />
              Partner With Us
              <motion.span
                className="inline-block"
                animate={{ x: [0, 4, 0] }}
                transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
              >
                →
              </motion.span>
            </motion.button>
          </AnimatedSection>
        </div>
      </section>

      {/* ─── Modal Overlay ─── */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="fixed inset-0 z-[100] overflow-y-auto"
            data-lenis-prevent
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35 }}
            style={{ WebkitOverflowScrolling: "touch" }}
          >
            {/* Blurred backdrop */}
            <div
              className="fixed inset-0 bg-black/40 backdrop-blur-md"
              onClick={handleClose}
            />

            {/* Close Button - Sticky in the viewport top-right */}
            <button
              onClick={handleClose}
              className="fixed top-4 right-4 z-[110] w-10 h-10 rounded-full bg-white/90 border border-surface-200 shadow-lg flex items-center justify-center text-ink-muted hover:text-ink transition-colors cursor-pointer pointer-events-auto"
              aria-label="Close form"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Centering scroll wrapper */}
            <div
              className="min-h-full flex items-center justify-center p-3 sm:p-6 relative z-10 cursor-pointer"
              onClick={handleClose}
            >
              {/* Modal Card */}
              <motion.div
                className="relative w-full max-w-3xl bg-white/95 backdrop-blur-xl border border-surface-200 shadow-2xl rounded-3xl p-6 sm:p-8 md:p-10 my-6 sm:my-8 cursor-default"
                initial={{ opacity: 0, scale: 0.85, y: 50 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.85, y: 50 }}
                transition={{ type: "spring", stiffness: 300, damping: 25 }}
                onClick={(e) => e.stopPropagation()}
              >
                {/* Modal Header */}
                <div className="text-center mb-6 sm:mb-8">
                  <div className="w-12 h-12 mx-auto mb-3 rounded-2xl bg-brand/10 flex items-center justify-center p-2.5 border border-brand/20">
                    <Image
                      src="/logos/doctor.jpg"
                      alt="Doctor & Hospital Network"
                      width={36}
                      height={36}
                      className="w-full h-full object-contain rounded-lg"
                      draggable={false}
                      loading="lazy"
                    />
                  </div>
                  <h3 className="text-2xl sm:text-3xl font-bold text-ink">
                    Partner <span className="text-brand">With Us</span>
                  </h3>
                  <p className="text-ink-muted text-sm sm:text-base mt-2">
                    Fill in your details and we&apos;ll get back within 24–48 hours.
                  </p>
                </div>

                <AnimatePresence mode="wait">
                  {status === "success" ? (
                    <motion.div
                      key="success"
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.8, y: -30 }}
                      transition={{ duration: 0.5 }}
                      className="text-center py-12 space-y-6"
                    >
                      <motion.div
                        initial={{ scale: 0, rotate: -180 }}
                        animate={{ scale: 1, rotate: 0 }}
                        transition={{ type: "spring", stiffness: 200, damping: 12, delay: 0.15 }}
                        className="w-24 h-24 bg-accent/20 text-accent-alt rounded-full flex items-center justify-center mx-auto"
                      >
                        <CheckCircle2 className="w-14 h-14" />
                      </motion.div>
                      <motion.h3
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.35 }}
                        className="text-3xl font-bold text-ink"
                      >
                        Application Submitted!
                      </motion.h3>
                      <motion.p
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.5 }}
                        className="text-lg text-ink-muted max-w-md mx-auto"
                      >
                        Thank you for applying to partner with RemoteWard. Our team will review your organization details and reach out within 24-48 hours.
                      </motion.p>

                      {[...Array(8)].map((_, i) => (
                        <motion.div
                          key={i}
                          className="absolute w-2.5 h-2.5 rounded-full"
                          style={{
                            backgroundColor: i % 2 === 0 ? "#03A1AC" : "#08E93C",
                            top: "40%",
                            left: "50%",
                          }}
                          initial={{ x: 0, y: 0, opacity: 1, scale: 1 }}
                          animate={{
                            x: Math.cos((i * Math.PI * 2) / 8) * 120,
                            y: Math.sin((i * Math.PI * 2) / 8) * 120,
                            opacity: 0,
                            scale: 0,
                          }}
                          transition={{ duration: 1.2, delay: 0.2, ease: "easeOut" }}
                        />
                      ))}
                    </motion.div>
                  ) : (
                    <motion.form
                      key="form"
                      onSubmit={handleSubmit}
                      variants={containerVariants}
                      initial="hidden"
                      animate="show"
                      exit={{ opacity: 0, y: 30, transition: { duration: 0.3 } }}
                      className="space-y-5"
                    >
                      {/* Honeypot field to block automated bots */}
                      <input
                        type="text"
                        name="_rw_hp"
                        value={formData._rw_hp}
                        onChange={handleChange}
                        style={{ display: "none", position: "absolute", opacity: 0 }}
                        tabIndex={-1}
                        autoComplete="off"
                        aria-hidden="true"
                      />

                      {/* Section Label: Tell Us About Your Organization */}
                      <motion.div variants={itemVariants} className="pb-1 border-b border-surface-200/80">
                        <h4 className="text-base sm:text-lg font-bold text-ink flex items-center gap-2">
                          <Building2 className="w-5 h-5 text-brand" />
                          Tell Us About Your Organization
                        </h4>
                      </motion.div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                        {/* 1. Organization Name */}
                        <motion.div variants={itemVariants} className="space-y-1.5">
                          <label className="block text-sm font-semibold text-ink">
                            Organization Name <span className="text-brand">*</span>
                          </label>
                          <div className="relative flex items-center">
                            <Building2 className="absolute left-4 w-5 h-5 text-ink-muted/60" />
                            <input
                              type="text"
                              name="orgName"
                              value={formData.orgName}
                              onChange={handleChange}
                              required
                              placeholder="e.g. City Hospital or Care Clinic"
                              className="w-full bg-surface-50 border border-surface-200 focus:border-brand focus:ring-1 focus:ring-brand rounded-xl py-3 pl-12 pr-4 text-ink placeholder-ink-muted/50 outline-none transition-all text-sm"
                            />
                          </div>
                        </motion.div>

                        {/* 2. Organization Type */}
                        <motion.div variants={itemVariants} className="space-y-1.5">
                          <label className="block text-sm font-semibold text-ink">
                            Organization Type <span className="text-brand">*</span>
                          </label>
                          <div className="relative flex items-center">
                            <Hospital className="absolute left-4 w-5 h-5 text-ink-muted/60" />
                            <select
                              name="facilityType"
                              value={formData.facilityType}
                              onChange={handleChange}
                              className="w-full bg-surface-50 border border-surface-200 focus:border-brand focus:ring-1 focus:ring-brand rounded-xl py-3 pl-12 pr-10 text-ink outline-none transition-all appearance-none cursor-pointer text-sm"
                            >
                              <option value="Hospital">Hospital</option>
                              <option value="Clinic">Clinic</option>
                              <option value="Diagnostic Center">Diagnostic Center</option>
                              <option value="Other">Other</option>
                            </select>
                            <span className="absolute right-4 pointer-events-none text-ink-muted text-xs">▼</span>
                          </div>
                        </motion.div>

                        {/* 3. City / Location */}
                        <motion.div variants={itemVariants} className="space-y-1.5">
                          <label className="block text-sm font-semibold text-ink">
                            City / Location <span className="text-brand">*</span>
                          </label>
                          <div className="relative flex items-center">
                            <MapPin className="absolute left-4 w-5 h-5 text-ink-muted/60" />
                            <input
                              type="text"
                              name="location"
                              value={formData.location}
                              onChange={handleChange}
                              required
                              placeholder="e.g. Mumbai, New Delhi, Bengaluru"
                              className="w-full bg-surface-50 border border-surface-200 focus:border-brand focus:ring-1 focus:ring-brand rounded-xl py-3 pl-12 pr-4 text-ink placeholder-ink-muted/50 outline-none transition-all text-sm"
                            />
                          </div>
                        </motion.div>

                        {/* 4. Contact Person */}
                        <motion.div variants={itemVariants} className="space-y-1.5">
                          <label className="block text-sm font-semibold text-ink">
                            Contact Person <span className="text-brand">*</span>
                          </label>
                          <div className="relative flex items-center">
                            <User className="absolute left-4 w-5 h-5 text-ink-muted/60" />
                            <input
                              type="text"
                              name="contactName"
                              value={formData.contactName}
                              onChange={handleChange}
                              required
                              placeholder="e.g. Dr. Rajesh Kumar"
                              className="w-full bg-surface-50 border border-surface-200 focus:border-brand focus:ring-1 focus:ring-brand rounded-xl py-3 pl-12 pr-4 text-ink placeholder-ink-muted/50 outline-none transition-all text-sm"
                            />
                          </div>
                        </motion.div>

                        {/* 5. Official Email Address */}
                        <motion.div variants={itemVariants} className="space-y-1.5">
                          <label className="block text-sm font-semibold text-ink">
                            Official Email Address <span className="text-brand">*</span>
                          </label>
                          <div className="relative flex items-center">
                            <Mail className="absolute left-4 w-5 h-5 text-ink-muted/60" />
                            <input
                              type="email"
                              name="email"
                              value={formData.email}
                              onChange={handleChange}
                              required
                              placeholder="e.g. partnerships@organization.com"
                              className="w-full bg-surface-50 border border-surface-200 focus:border-brand focus:ring-1 focus:ring-brand rounded-xl py-3 pl-12 pr-4 text-ink placeholder-ink-muted/50 outline-none transition-all text-sm"
                            />
                          </div>
                        </motion.div>

                        {/* 6. Designation */}
                        <motion.div variants={itemVariants} className="space-y-1.5">
                          <label className="block text-sm font-semibold text-ink">
                            Designation <span className="text-brand">*</span>
                          </label>
                          <div className="relative flex items-center">
                            <Briefcase className="absolute left-4 w-5 h-5 text-ink-muted/60" />
                            <input
                              type="text"
                              name="designation"
                              value={formData.designation}
                              onChange={handleChange}
                              required
                              placeholder="e.g. Medical Director, Administrator"
                              className="w-full bg-surface-50 border border-surface-200 focus:border-brand focus:ring-1 focus:ring-brand rounded-xl py-3 pl-12 pr-4 text-ink placeholder-ink-muted/50 outline-none transition-all text-sm"
                            />
                          </div>
                        </motion.div>

                        {/* 7. Mobile Number (spanning full width or grid) */}
                        <motion.div variants={itemVariants} className="space-y-1.5 md:col-span-2">
                          <label className="block text-sm font-semibold text-ink">
                            Mobile Number <span className="text-brand">*</span>
                          </label>
                          <div className="relative flex items-center">
                            <Phone className="absolute left-4 w-5 h-5 text-ink-muted/60" />
                            <input
                              type="tel"
                              name="phone"
                              value={formData.phone}
                              onChange={handleChange}
                              required
                              placeholder="e.g. +91 98765 43210"
                              className="w-full bg-surface-50 border border-surface-200 focus:border-brand focus:ring-1 focus:ring-brand rounded-xl py-3 pl-12 pr-4 text-ink placeholder-ink-muted/50 outline-none transition-all text-sm"
                            />
                          </div>
                        </motion.div>
                      </div>

                      {/* 8. Additional Info or Requirements (Optional)? */}
                      <motion.div variants={itemVariants} className="space-y-1.5">
                        <label className="block text-sm font-semibold text-ink">
                          Additional Info or Requirements (Optional)?
                        </label>
                        <div className="relative flex items-start">
                          <MessageSquare className="absolute left-4 top-3.5 w-5 h-5 text-ink-muted/60" />
                          <textarea
                            name="message"
                            value={formData.message}
                            onChange={handleChange}
                            rows={3}
                            placeholder="Tell us about your facility, patient volume, or specific requirements..."
                            className="w-full bg-surface-50 border border-surface-200 focus:border-brand focus:ring-1 focus:ring-brand rounded-xl py-3 pl-12 pr-4 text-ink placeholder-ink-muted/50 outline-none transition-all resize-none text-sm"
                          />
                        </div>
                      </motion.div>

                      {/* Submit Button */}
                      <motion.div variants={itemVariants} className="pt-2 flex flex-col items-center">
                        <button
                          type="submit"
                          disabled={status === "submitting"}
                          className="w-full sm:w-auto min-w-[200px] bg-brand hover:bg-brand-dark disabled:bg-brand/60 text-white font-bold text-base sm:text-lg px-10 py-3.5 sm:py-4 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-0.5 active:translate-y-0 flex items-center justify-center gap-2 cursor-pointer"
                        >
                          {status === "submitting" ? (
                            <>
                              <Loader2 className="w-5 h-5 animate-spin" />
                              Submitting...
                            </>
                          ) : (
                            <>
                              <Send className="w-5 h-5" />
                              Submit
                            </>
                          )}
                        </button>

                        {status === "error" && (
                          <motion.p
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="text-red-500 text-sm font-medium mt-3 text-center"
                          >
                            {errorMessage}
                          </motion.p>
                        )}
                      </motion.div>
                    </motion.form>
                  )}
                </AnimatePresence>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
