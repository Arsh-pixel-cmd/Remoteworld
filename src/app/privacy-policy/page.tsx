"use client";

import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import SmoothScroll from "@/components/providers/SmoothScroll";
import Link from "next/link";
import { ArrowLeft, Download, Shield, Lock, Eye, FileText, Mail, Globe } from "lucide-react";
import Logo from "@/components/ui/Logo";
import { motion } from "framer-motion";

const policySections = [
  {
    icon: <Eye className="w-6 h-6 text-brand" />,
    title: "1. Information We Collect",
    content: "When you interact with our website, we may collect information that you voluntarily provide, such as your name, email address, phone number, organization, and any details submitted through contact forms, partnership enquiries, career applications, or other communication channels. We may also automatically collect certain technical information, including your IP address, browser type, device information, operating system, pages visited, and website usage data to help us improve the performance, functionality, and security of our website."
  },
  {
    icon: <Shield className="w-6 h-6 text-brand" />,
    title: "2. How We Use Your Information",
    content: "The information collected is used to respond to your enquiries, provide customer support, evaluate partnership and career opportunities, improve our website and services, communicate relevant updates, maintain website security, and comply with applicable legal and regulatory obligations. We process your information only for legitimate business purposes and in accordance with applicable laws."
  },
  {
    icon: <Lock className="w-6 h-6 text-brand" />,
    title: "3. Cookies and Analytics",
    content: "Our website may use cookies and similar technologies to enhance your browsing experience, remember your preferences, and analyze website traffic. These technologies help us understand how visitors interact with our website and enable us to improve its functionality and performance. You may choose to disable cookies through your browser settings; however, doing so may affect certain features of the website."
  },
  {
    icon: <FileText className="w-6 h-6 text-brand" />,
    title: "4. Disclosure of Information",
    content: "RemoteWard Care Pvt. Ltd. does not sell, rent, or trade your personal information. We may share information with trusted service providers who assist us in operating our website or delivering our services, provided they are bound by appropriate confidentiality and security obligations. Information may also be disclosed where required by law, regulatory authorities, or to protect our legal rights and the security of our users and systems."
  },
  {
    icon: <Lock className="w-6 h-6 text-brand" />,
    title: "5. Data Security",
    content: "We implement appropriate administrative, technical, and organizational safeguards to protect the information under our control against unauthorized access, disclosure, alteration, or destruction. While we continuously strive to maintain high standards of security, no method of internet transmission or electronic storage can be guaranteed to be completely secure, and we therefore cannot warrant absolute security."
  },
  {
    icon: <Globe className="w-6 h-6 text-brand" />,
    title: "6. Third-Party Websites",
    content: "Our website may contain links to third-party websites for your convenience and information. These websites operate independently and have their own privacy practices. RemoteWard Care Pvt. Ltd. is not responsible for the content, security, or privacy practices of such external websites, and we encourage you to review their respective privacy policies before providing any personal information."
  },
  {
    icon: <FileText className="w-6 h-6 text-brand" />,
    title: "7. Changes to This Privacy Policy",
    content: "We may revise this Privacy Policy from time to time to reflect changes in our business practices, legal requirements, or technological developments. Any updates will be published on this page along with the revised effective date. Your continued use of the website after any changes constitutes your acceptance of the updated Privacy Policy."
  }
];

const containerVariants = {
  hidden: { opacity: 0, scale: 0.96, y: 40 },
  visible: { 
    opacity: 1, 
    scale: 1, 
    y: 0,
    transition: { 
      type: "spring" as const,
      stiffness: 90,
      damping: 15,
      mass: 0.8,
      staggerChildren: 0.07,
      delayChildren: 0.15
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 25 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { type: "spring" as const, stiffness: 100, damping: 16 }
  }
};

export default function PrivacyPolicyPage() {
  return (
    <SmoothScroll>
      <Navbar />

      {/* Top Left Logo to match Hero page */}
      <div className="absolute top-6 left-6 lg:top-8 lg:left-12 z-50">
        <Logo textClass="text-2xl sm:text-3xl" />
      </div>

      <main className="min-h-screen pt-32 pb-24 hero-gradient relative overflow-hidden text-ink">
        {/* Background decorative circles */}
        <div className="absolute top-20 left-10 w-32 h-32 bg-support-purple opacity-20 rounded-full blur-2xl pointer-events-none"></div>
        <div className="absolute bottom-20 right-10 w-64 h-64 bg-brand opacity-10 rounded-full blur-3xl pointer-events-none"></div>

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          
          {/* Breadcrumb & Navigation */}
          <div className="mb-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <Link
              href="/"
              className="flex items-center text-brand hover:text-brand-dark font-bold text-base transition-colors group"
            >
              <ArrowLeft className="w-5 h-5 mr-2 transition-transform group-hover:-translate-x-1" />
              Back to Home
            </Link>
            
            <a
              href="/privacy-policy.pdf"
              download="RemoteWard_Privacy_Policy.pdf"
              className="bg-brand text-white hover:bg-brand-dark px-5 py-2.5 rounded-xl text-sm font-bold flex items-center shadow-lg transition-all duration-300 hover:scale-105"
            >
              <Download className="w-4 h-4 mr-2" />
              Download Policy PDF
            </a>
          </div>

          {/* Premium Animated Popup Modal Card */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="bg-white/90 backdrop-blur-md rounded-[2.5rem] shadow-2xl border border-white/20 p-8 sm:p-12 md:p-16 relative flex flex-col gap-8"
          >
            {/* Header section in card */}
            <motion.div variants={itemVariants} className="border-b border-surface-200 pb-6">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 rounded-2xl bg-brand/10 flex items-center justify-center">
                  <Shield className="w-6 h-6 text-brand" />
                </div>
                <div>
                  <span className="bg-brand-light/20 text-brand-dark text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                    Official Policy
                  </span>
                  <h1 className="text-3xl sm:text-4xl font-extrabold text-ink mt-1">
                    Privacy Policy
                  </h1>
                </div>
              </div>
              <div className="flex flex-wrap justify-between items-center gap-2 text-ink-muted text-sm mt-2">
                <p>RemoteWard Care Pvt. Ltd.</p>
                <p className="font-semibold text-brand">Effective Date: 16 May 2025</p>
              </div>
            </motion.div>

            {/* Intro paragraph */}
            <motion.p variants={itemVariants} className="text-base sm:text-lg text-ink-muted leading-relaxed">
              RemoteWard Care Pvt. Ltd. (&quot;RemoteWard&quot;, &quot;we&quot;, &quot;our&quot;, or &quot;us&quot;) values your privacy and is committed to protecting the information you share with us. This Privacy Policy explains how we collect, use, store, and safeguard information when you visit our website. By accessing or using our website, you acknowledge that you have read and understood this Privacy Policy.
            </motion.p>

            {/* Structured policy sections */}
            <div className="space-y-8">
              {policySections.map((section, idx) => (
                <motion.div
                  key={idx}
                  variants={itemVariants}
                  whileHover={{ x: 4 }}
                  className="group transition-all duration-200 border-l-4 border-surface-100 hover:border-brand pl-4 sm:pl-6 py-1"
                >
                  <div className="flex items-center gap-3 mb-2">
                    <div className="p-1.5 rounded-lg bg-surface-50 group-hover:bg-brand/10 transition-colors">
                      {section.icon}
                    </div>
                    <h2 className="text-lg sm:text-xl font-bold text-ink group-hover:text-brand transition-colors">
                      {section.title}
                    </h2>
                  </div>
                  <p className="text-sm sm:text-base text-ink-muted leading-relaxed">
                    {section.content}
                  </p>
                </motion.div>
              ))}
            </div>

            {/* Contact Us block */}
            <motion.div
              variants={itemVariants}
              className="mt-6 p-6 sm:p-8 bg-surface-50 rounded-3xl border border-surface-100"
            >
              <h3 className="text-lg sm:text-xl font-bold text-ink mb-4 flex items-center gap-2">
                <Mail className="w-5 h-5 text-brand" />
                Contact Us
              </h3>
              <p className="text-sm sm:text-base text-ink-muted leading-relaxed mb-4">
                If you have any questions, concerns, or requests regarding this Privacy Policy or our privacy practices, please contact us at:
              </p>
              <div className="space-y-3">
                <p className="font-bold text-ink">RemoteWard Care Pvt. Ltd.</p>
                <div className="flex items-center gap-2.5 text-sm text-ink-muted">
                  <Mail className="w-4 h-4 text-brand-dark" />
                  <a href="mailto:info@remoteward.com" className="hover:text-brand underline">
                    info@remoteward.com
                  </a>
                </div>
                <div className="flex items-center gap-2.5 text-sm text-ink-muted">
                  <Globe className="w-4 h-4 text-brand-dark" />
                  <a href="https://www.remoteward.com" target="_blank" rel="noopener noreferrer" className="hover:text-brand underline">
                    www.remoteward.com
                  </a>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </main>

      <Footer />
    </SmoothScroll>
  );
}
