"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { User, Mail, Phone, FileText, MessageSquare, Send, CheckCircle2, Loader2, X, Briefcase, Sparkles } from "lucide-react";

interface CareerModalProps {
  isOpen: boolean;
  onClose: () => void;
}

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

export default function CareerModal({ isOpen, onClose }: CareerModalProps) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    resume: "",
    whyJoin: "",
    _rw_hp: "",
  });

  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  // Lock body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      const scrollY = window.scrollY;
      document.documentElement.style.overflow = "hidden";
      document.body.style.overflow = "hidden";
      document.body.style.position = "fixed";
      document.body.style.top = `-${scrollY}px`;
      document.body.style.left = "0";
      document.body.style.right = "0";
    } else {
      const scrollY = document.body.style.top;
      document.documentElement.style.overflow = "";
      document.body.style.overflow = "";
      document.body.style.position = "";
      document.body.style.top = "";
      document.body.style.left = "";
      document.body.style.right = "";
      if (scrollY) {
        window.scrollTo(0, parseInt(scrollY || "0") * -1);
      }
    }
    return () => {
      document.documentElement.style.overflow = "";
      document.body.style.overflow = "";
      document.body.style.position = "";
      document.body.style.top = "";
      document.body.style.left = "";
      document.body.style.right = "";
    };
  }, [isOpen]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("submitting");
    setErrorMessage("");

    try {
      const response = await fetch("/api/apply-career", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (response.ok) {
        setStatus("success");
        setFormData({
          name: "",
          email: "",
          phone: "",
          resume: "",
          whyJoin: "",
          _rw_hp: "",
        });
        setTimeout(() => {
          onClose();
          setTimeout(() => setStatus("idle"), 500);
        }, 2800);
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
    onClose();
    setTimeout(() => {
      setStatus("idle");
      setErrorMessage("");
    }, 500);
  };

  return (
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

          {/* Close Button */}
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
              className="relative w-full max-w-2xl bg-white/95 backdrop-blur-xl border border-surface-200 shadow-2xl rounded-3xl p-6 sm:p-8 md:p-10 my-6 sm:my-8 cursor-default"
              initial={{ opacity: 0, scale: 0.85, y: 50 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.85, y: 50 }}
              transition={{ type: "spring", stiffness: 300, damping: 25 }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Modal Header */}
              <div className="text-center mb-6 sm:mb-8">
                <div className="w-12 h-12 mx-auto mb-3 rounded-2xl bg-brand/10 flex items-center justify-center p-2.5 border border-brand/20">
                  <Briefcase className="w-6 h-6 text-brand" />
                </div>
                <h3 className="text-2xl sm:text-3xl font-bold text-ink">
                  Careers
                </h3>
                <p className="text-brand font-semibold text-base sm:text-lg mt-1">
                  Build What Matters.
                </p>
                <div className="text-ink-muted text-xs sm:text-sm mt-3 space-y-2 max-w-xl mx-auto leading-relaxed">
                  <p>
                    Healthcare affects every person, every family, and every community. At RemoteWard, we&apos;re building technology to make that experience simpler and more connected.
                  </p>
                  <p className="font-medium text-ink">
                    If you want to work on meaningful problems and build something that matters, come build with us.
                  </p>
                </div>
              </div>

              <AnimatePresence mode="wait">
                {status === "success" ? (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8, y: -30 }}
                    transition={{ duration: 0.5 }}
                    className="text-center py-10 space-y-5"
                  >
                    <motion.div
                      initial={{ scale: 0, rotate: -180 }}
                      animate={{ scale: 1, rotate: 0 }}
                      transition={{ type: "spring", stiffness: 200, damping: 12, delay: 0.15 }}
                      className="w-20 h-20 bg-accent/20 text-accent-alt rounded-full flex items-center justify-center mx-auto"
                    >
                      <CheckCircle2 className="w-12 h-12" />
                    </motion.div>
                    <motion.h4
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.35 }}
                      className="text-2xl sm:text-3xl font-bold text-ink"
                    >
                      Application Submitted!
                    </motion.h4>
                    <motion.p
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.5 }}
                      className="text-sm sm:text-base text-ink-muted max-w-md mx-auto"
                    >
                      Thank you for applying to RemoteWard. Our team will review your details and reach out if there&apos;s a fit.
                    </motion.p>
                  </motion.div>
                ) : (
                  <motion.form
                    key="form"
                    onSubmit={handleSubmit}
                    variants={containerVariants}
                    initial="hidden"
                    animate="show"
                    exit={{ opacity: 0, y: 30, transition: { duration: 0.3 } }}
                    className="space-y-4"
                  >
                    {/* Honeypot field */}
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

                    {/* Section Label: Apply to RemoteWard */}
                    <motion.div variants={itemVariants} className="pb-1.5 border-b border-surface-200/80 mb-2">
                      <h4 className="text-base sm:text-lg font-bold text-ink flex items-center gap-2">
                        <Sparkles className="w-4 h-4 text-brand" />
                        Apply to RemoteWard
                      </h4>
                    </motion.div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {/* Name — Required */}
                      <motion.div variants={itemVariants} className="space-y-1.5">
                        <label className="block text-sm font-semibold text-ink">
                          Name <span className="text-brand">*</span>
                        </label>
                        <div className="relative flex items-center">
                          <User className="absolute left-4 w-4 h-4 text-ink-muted/60" />
                          <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            required
                            placeholder="Your Full Name"
                            className="w-full bg-surface-50 border border-surface-200 focus:border-brand focus:ring-1 focus:ring-brand rounded-xl py-3 pl-11 pr-4 text-ink placeholder-ink-muted/50 outline-none transition-all text-sm"
                          />
                        </div>
                      </motion.div>

                      {/* Email Address — Required */}
                      <motion.div variants={itemVariants} className="space-y-1.5">
                        <label className="block text-sm font-semibold text-ink">
                          Email Address <span className="text-brand">*</span>
                        </label>
                        <div className="relative flex items-center">
                          <Mail className="absolute left-4 w-4 h-4 text-ink-muted/60" />
                          <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                            placeholder="your.email@example.com"
                            className="w-full bg-surface-50 border border-surface-200 focus:border-brand focus:ring-1 focus:ring-brand rounded-xl py-3 pl-11 pr-4 text-ink placeholder-ink-muted/50 outline-none transition-all text-sm"
                          />
                        </div>
                      </motion.div>

                      {/* Mobile Number — Required */}
                      <motion.div variants={itemVariants} className="space-y-1.5">
                        <label className="block text-sm font-semibold text-ink">
                          Mobile Number <span className="text-brand">*</span>
                        </label>
                        <div className="relative flex items-center">
                          <Phone className="absolute left-4 w-4 h-4 text-ink-muted/60" />
                          <input
                            type="tel"
                            name="phone"
                            value={formData.phone}
                            onChange={handleChange}
                            required
                            placeholder="e.g. +91 98765 43210"
                            className="w-full bg-surface-50 border border-surface-200 focus:border-brand focus:ring-1 focus:ring-brand rounded-xl py-3 pl-11 pr-4 text-ink placeholder-ink-muted/50 outline-none transition-all text-sm"
                          />
                        </div>
                      </motion.div>

                      {/* Resume / CV — Required */}
                      <motion.div variants={itemVariants} className="space-y-1.5">
                        <label className="block text-sm font-semibold text-ink">
                          Resume / CV <span className="text-brand">*</span>
                        </label>
                        <div className="relative flex items-center">
                          <FileText className="absolute left-4 w-4 h-4 text-ink-muted/60" />
                          <input
                            type="text"
                            name="resume"
                            value={formData.resume}
                            onChange={handleChange}
                            required
                            placeholder="Link to Google Drive / LinkedIn / PDF"
                            className="w-full bg-surface-50 border border-surface-200 focus:border-brand focus:ring-1 focus:ring-brand rounded-xl py-3 pl-11 pr-4 text-ink placeholder-ink-muted/50 outline-none transition-all text-sm"
                          />
                        </div>
                      </motion.div>
                    </div>

                    {/* Why do you want to join RemoteWard? — Optional */}
                    <motion.div variants={itemVariants} className="space-y-1.5">
                      <label className="block text-sm font-semibold text-ink">
                        Why do you want to join RemoteWard? <span className="text-ink-muted text-xs font-normal">(Optional)</span>
                      </label>
                      <div className="relative flex items-start">
                        <MessageSquare className="absolute left-4 top-3.5 w-4 h-4 text-ink-muted/60" />
                        <textarea
                          name="whyJoin"
                          value={formData.whyJoin}
                          onChange={handleChange}
                          rows={3}
                          placeholder="Tell us what drives you and how you'd like to contribute..."
                          className="w-full bg-surface-50 border border-surface-200 focus:border-brand focus:ring-1 focus:ring-brand rounded-xl py-3 pl-11 pr-4 text-ink placeholder-ink-muted/50 outline-none transition-all resize-none text-sm"
                        />
                      </div>
                    </motion.div>

                    {/* Submit Button */}
                    <motion.div variants={itemVariants} className="pt-2 flex flex-col items-center">
                      <button
                        type="submit"
                        disabled={status === "submitting"}
                        className="w-full sm:w-auto min-w-[200px] bg-brand hover:bg-brand-dark disabled:bg-brand/60 text-white font-bold text-base sm:text-lg px-10 py-3.5 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-0.5 active:translate-y-0 flex items-center justify-center gap-2 cursor-pointer"
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
  );
}
