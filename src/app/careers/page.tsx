"use client";

import { useState } from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import SmoothScroll from "@/components/providers/SmoothScroll";
import { User, Mail, Phone, FileText, MessageSquare, Send, CheckCircle2, Loader2, Briefcase, Sparkles, ArrowLeft } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import AnimatedSection from "@/components/ui/AnimatedSection";

export default function CareersPage() {
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
      } else {
        setStatus("error");
        setErrorMessage(result.error || "Something went wrong. Please try again.");
      }
    } catch {
      setStatus("error");
      setErrorMessage("Network error. Please check your connection.");
    }
  };

  return (
    <SmoothScroll>
      <Navbar />

      <main className="min-h-screen pt-28 sm:pt-32 pb-20 bg-surface-50/40 relative overflow-hidden">
        {/* Background glow accents */}
        <div className="absolute top-1/4 -left-1/4 w-96 h-96 bg-brand/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute top-1/3 -right-1/4 w-96 h-96 bg-accent/10 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          {/* Back link */}
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm font-semibold text-ink-muted hover:text-brand transition-colors mb-6 group"
          >
            <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
            <span>Back to Home</span>
          </Link>

          {/* Section Header */}
          <AnimatedSection direction="up" className="text-center mb-10 sm:mb-14">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-brand/10 border border-brand/20 text-brand text-xs sm:text-sm font-semibold mb-4 sm:mb-6">
              <Briefcase className="w-4 h-4" />
              <span>Careers</span>
            </div>

            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-ink mb-3 sm:mb-4 tracking-tight">
              Build What <span className="text-brand">Matters.</span>
            </h1>

            <div className="text-base sm:text-lg md:text-xl text-ink-muted max-w-2xl mx-auto space-y-3 leading-relaxed">
              <p>
                Healthcare affects every person, every family, and every community. At RemoteWard, we&apos;re building technology to make that experience simpler and more connected.
              </p>
              <p className="font-semibold text-ink">
                If you want to work on meaningful problems and build something that matters, come build with us.
              </p>
            </div>
          </AnimatedSection>

          {/* Application Form Card */}
          <AnimatedSection direction="up" delay={0.15}>
            <div className="bg-white/95 backdrop-blur-xl border border-surface-200 shadow-xl rounded-3xl p-6 sm:p-10 md:p-12 relative overflow-hidden">
              <AnimatePresence mode="wait">
                {status === "success" ? (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    transition={{ duration: 0.4 }}
                    className="text-center py-12 space-y-6"
                  >
                    <div className="w-24 h-24 bg-accent/20 text-accent-alt rounded-full flex items-center justify-center mx-auto">
                      <CheckCircle2 className="w-14 h-14" />
                    </div>
                    <h3 className="text-3xl font-bold text-ink">
                      Application Submitted!
                    </h3>
                    <p className="text-lg text-ink-muted max-w-md mx-auto">
                      Thank you for applying to RemoteWard. Our team will review your details and reach out if there&apos;s a fit.
                    </p>
                    <button
                      onClick={() => setStatus("idle")}
                      className="inline-flex items-center gap-2 bg-brand text-white font-bold px-6 py-3 rounded-xl hover:bg-brand-dark transition-all text-sm"
                    >
                      Submit Another Application
                    </button>
                  </motion.div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-6">
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

                    {/* Section title inside form */}
                    <div className="pb-2 border-b border-surface-200">
                      <h2 className="text-xl sm:text-2xl font-bold text-ink flex items-center gap-2.5">
                        <Sparkles className="w-5 h-5 text-brand" />
                        Apply to RemoteWard
                      </h2>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {/* Name — Required */}
                      <div className="space-y-2">
                        <label className="block text-sm font-semibold text-ink">
                          Name <span className="text-brand">*</span>
                        </label>
                        <div className="relative flex items-center">
                          <User className="absolute left-4 w-5 h-5 text-ink-muted/60" />
                          <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            required
                            placeholder="Your Full Name"
                            className="w-full bg-surface-50 border border-surface-200 focus:border-brand focus:ring-1 focus:ring-brand rounded-xl py-3.5 pl-12 pr-4 text-ink placeholder-ink-muted/50 outline-none transition-all"
                          />
                        </div>
                      </div>

                      {/* Email Address — Required */}
                      <div className="space-y-2">
                        <label className="block text-sm font-semibold text-ink">
                          Email Address <span className="text-brand">*</span>
                        </label>
                        <div className="relative flex items-center">
                          <Mail className="absolute left-4 w-5 h-5 text-ink-muted/60" />
                          <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                            placeholder="your.email@example.com"
                            className="w-full bg-surface-50 border border-surface-200 focus:border-brand focus:ring-1 focus:ring-brand rounded-xl py-3.5 pl-12 pr-4 text-ink placeholder-ink-muted/50 outline-none transition-all"
                          />
                        </div>
                      </div>

                      {/* Mobile Number — Required */}
                      <div className="space-y-2">
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
                            className="w-full bg-surface-50 border border-surface-200 focus:border-brand focus:ring-1 focus:ring-brand rounded-xl py-3.5 pl-12 pr-4 text-ink placeholder-ink-muted/50 outline-none transition-all"
                          />
                        </div>
                      </div>

                      {/* Resume / CV — Required */}
                      <div className="space-y-2">
                        <label className="block text-sm font-semibold text-ink">
                          Resume / CV <span className="text-brand">*</span>
                        </label>
                        <div className="relative flex items-center">
                          <FileText className="absolute left-4 w-5 h-5 text-ink-muted/60" />
                          <input
                            type="text"
                            name="resume"
                            value={formData.resume}
                            onChange={handleChange}
                            required
                            placeholder="Link to Google Drive / LinkedIn / PDF"
                            className="w-full bg-surface-50 border border-surface-200 focus:border-brand focus:ring-1 focus:ring-brand rounded-xl py-3.5 pl-12 pr-4 text-ink placeholder-ink-muted/50 outline-none transition-all"
                          />
                        </div>
                      </div>
                    </div>

                    {/* Why do you want to join RemoteWard? — Optional */}
                    <div className="space-y-2">
                      <label className="block text-sm font-semibold text-ink">
                        Why do you want to join RemoteWard? <span className="text-ink-muted text-xs font-normal">(Optional)</span>
                      </label>
                      <div className="relative flex items-start">
                        <MessageSquare className="absolute left-4 top-4 w-5 h-5 text-ink-muted/60" />
                        <textarea
                          name="whyJoin"
                          value={formData.whyJoin}
                          onChange={handleChange}
                          rows={4}
                          placeholder="Tell us what drives you and how you'd like to contribute..."
                          className="w-full bg-surface-50 border border-surface-200 focus:border-brand focus:ring-1 focus:ring-brand rounded-xl py-3.5 pl-12 pr-4 text-ink placeholder-ink-muted/50 outline-none transition-all resize-none"
                        />
                      </div>
                    </div>

                    {/* Submit Button */}
                    <div className="pt-3 flex flex-col items-center">
                      <button
                        type="submit"
                        disabled={status === "submitting"}
                        className="w-full sm:w-auto min-w-[220px] bg-brand hover:bg-brand-dark disabled:bg-brand/60 text-white font-bold text-base sm:text-lg px-10 py-4 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-0.5 active:translate-y-0 flex items-center justify-center gap-2 cursor-pointer"
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
                        <p className="text-red-500 text-sm font-medium mt-4 text-center">
                          {errorMessage}
                        </p>
                      )}
                    </div>
                  </form>
                )}
              </AnimatePresence>
            </div>
          </AnimatedSection>
        </div>
      </main>

      <Footer />
    </SmoothScroll>
  );
}
