"use client";

import { useState, useMemo, useEffect, useRef } from "react";
import { Plus, Search, ChevronDown, ChevronUp, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface FAQModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface FAQItem {
  id: number;
  category: "general" | "abha" | "services" | "security";
  question: string;
  answer: string;
}

const CATEGORIES = [
  { id: "all", label: "All Questions" },
  { id: "general", label: "General & Family" },
  { id: "abha", label: "ABDM & ABHA" },
  { id: "services", label: "Services & Emergency" },
  { id: "security", label: "Privacy & Consent" },
];

const FAQ_ITEMS: FAQItem[] = [
  {
    id: 1,
    category: "general",
    question: "What is RemoteWard?",
    answer: "RemoteWard is a digital healthcare platform that helps you manage your and your family's health in one place.",
  },
  {
    id: 2,
    category: "general",
    question: "Is RemoteWard App free?",
    answer: 'Yes. "RemoteWard App" is free to download and use, with access to its core healthcare features.',
  },
  {
    id: 3,
    category: "general",
    question: "How can I manage my parents' healthcare if I live in another city?",
    answer: "RemoteWard App helps you coordinate your parents' healthcare remotely by keeping their health records, healthcare services, and emergency support connected with you.",
  },
  {
    id: 4,
    category: "general",
    question: "How can I add my parents health account on RemoteWard App?",
    answer: "Use the same number to add your family members and manage their healthcare information, health records, and services.",
  },
  {
    id: 5,
    category: "abha",
    question: "What are the full forms of ABDM, ABHA and PHR?",
    answer: "ABDM – Ayushman Bharat Digital Mission, ABHA – Ayushman Bharat Health Account, PHR – Personal Health Record.",
  },
  {
    id: 6,
    category: "abha",
    question: "Is ABHA Address and PHR Address same?",
    answer: "ABDM now uses ABHA Address for the unique, easy-to-remember address such as name@abdm. Yes. ABHA Address and PHR Address refer to the same address. PHR Address was the earlier term.",
  },
  {
    id: 7,
    category: "abha",
    question: "How can I create an ABHA Card online?",
    answer: 'You can generate both "ABHA ID" (ABHA Number) and "ABHA Address" (PHR Address) through "RemoteWard App" and download your ABHA Card.',
  },
  {
    id: 8,
    category: "abha",
    question: "What is the difference between ABHA ID and the Ayushman Card?",
    answer: '"ABHA ID" or "ABHA Number" is your unique 14-digit digital health ID while the Ayushman (PM-JAY) Card is used by eligible beneficiaries to access healthcare coverage of up to ₹5 lakh per family per year.',
  },
  {
    id: 9,
    category: "services",
    question: "What is Digital OPD / Scan & Register?",
    answer: "Digital OPD allows you to register for an OPD digitally by scanning the hospital's ABDM QR code using RemoteWard, making registration faster and easier.",
  },
  {
    id: 10,
    category: "abha",
    question: "How can I link my ABHA Number with my ABHA address?",
    answer: "Yes. You can link your ABHA Number with your ABHA Address on RemoteWard app to access and manage your digital health records.",
  },
  {
    id: 11,
    category: "security",
    question: "Is it safe to upload documents on RemoteWard App?",
    answer: "Yes. RemoteWard app is ABDM-compliant and certified, with security measures in place to protect your health information and documents.",
  },
  {
    id: 12,
    category: "general",
    question: "My parents are not very tech-savvy. Can they use RemoteWard App?",
    answer: "Yes. RemoteWard App is designed specifically for elderly users but even if your parents cannot use the app themselves, family members can help coordinate and manage their healthcare.",
  },
  {
    id: 13,
    category: "general",
    question: "Can people with colour blindness use RemoteWard App?",
    answer: "Yes. RemoteWard App can be used by people with colour blindness, with important information supported by clear text, icons, and contrast.",
  },
  {
    id: 14,
    category: "services",
    question: "How can I fetch my health data from another hospital?",
    answer: 'If the hospital is connected to ABDM, you can link and fetch your available health records through RemoteWard App using "Link Health Facility".',
  },
  {
    id: 15,
    category: "services",
    question: "How can I check my PM-JAY balance?",
    answer: 'Go to the "Insurance" section in RemoteWard App to view your PM-JAY available balance and related scheme details.',
  },
  {
    id: 16,
    category: "security",
    question: "What is the difference between Subscriptions and Consent?",
    answer: "Subscriptions manage your health-information requests or connections, while Consent controls your permission to access or share your health information.",
  },
  {
    id: 17,
    category: "security",
    question: "How can I manage my subscriptions and consents in RemoteWard App?",
    answer: "Go to Health Records. Select Subscriptions to view your Requested, Approved, and Inactive subscriptions, or select Consent to view and revoke your Requested, Approved, and Inactive consents.",
  },
  {
    id: 18,
    category: "services",
    question: "How can I find my Health Locker?",
    answer: "Go to Health Locker in RemoteWard App to view and manage your health records and documents from connected health lockers, including DigiLocker.",
  },
  {
    id: 19,
    category: "services",
    question: "Can I find Blood through RemoteWard App?",
    answer: "Yes, RemoteWard App helps you find nearby blood banks and check blood availability when you need it.",
  },
  {
    id: 20,
    category: "services",
    question: "How can I find and book an Ambulance online through RemoteWard App?",
    answer: 'Use the "Emergency" button, select "Hospital Emergency", choose location, and find and book an available Ambulance in that area.',
  },
  {
    id: 21,
    category: "general",
    question: "What if I have more questions about RemoteWard App?",
    answer: "Download the RemoteWard app to explore its features, and email info@remoteward.com us for any further enquiries.",
  },
];

export default function FAQModal({ isOpen, onClose }: FAQModalProps) {
  const [activeCategory, setActiveCategory] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const [showAll, setShowAll] = useState(false);

  const scrollPosRef = useRef(0);
  const hasOpenedRef = useRef(false);

  // Manage Lenis and preserve page scroll position accurately
  useEffect(() => {
    if (isOpen) {
      hasOpenedRef.current = true;
      // Capture the exact scroll position before opening
      const currentScroll = window.__lenis?.scroll ?? window.scrollY;
      scrollPosRef.current = currentScroll;

      // Pause Lenis smooth scrolling for background
      window.__lenis?.stop();
    } else if (hasOpenedRef.current) {
      // Resume Lenis smooth scroll
      window.__lenis?.start();

      // Immediately restore exact scroll position without resetting to top
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

  // Handle ESC key to close
  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  // Reset internal filter state when modal closes
  useEffect(() => {
    if (!isOpen) {
      setActiveCategory("all");
      setSearchQuery("");
      setOpenIndex(null);
      setShowAll(false);
    }
  }, [isOpen]);

  // Filter items based on category and search query
  const filteredItems = useMemo(() => {
    return FAQ_ITEMS.filter((item) => {
      const matchesCategory = activeCategory === "all" || item.category === activeCategory;
      const matchesSearch =
        searchQuery.trim() === "" ||
        item.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.answer.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [activeCategory, searchQuery]);

  // Limit displayed items initially when viewing all without search
  const isDefaultView = activeCategory === "all" && searchQuery.trim() === "";
  const displayedItems = isDefaultView && !showAll ? filteredItems.slice(0, 6) : filteredItems;

  const handleToggle = (id: number) => {
    setOpenIndex(openIndex === id ? null : id);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-[100] overflow-y-auto overscroll-contain"
          data-lenis-prevent
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          style={{ WebkitOverflowScrolling: "touch" }}
        >
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-ink/60 backdrop-blur-sm"
            onClick={onClose}
          />

          {/* Centering scroll wrapper */}
          <div
            className="min-h-full flex items-center justify-center p-3 sm:p-6 relative z-10 cursor-pointer"
            onClick={onClose}
          >
            {/* Modal Card */}
            <motion.div
              className="relative w-full max-w-3xl bg-white rounded-3xl shadow-2xl p-6 sm:p-8 md:p-10 my-6 sm:my-8 cursor-default"
              data-lenis-prevent
              initial={{ scale: 0.92, opacity: 0, y: 30 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.92, opacity: 0, y: 30 }}
              transition={{ type: "spring", stiffness: 280, damping: 25 }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close Button */}
              <button
                type="button"
                onClick={onClose}
                className="absolute top-4 right-4 sm:top-6 sm:right-6 z-20 w-10 h-10 rounded-full bg-surface-100 hover:bg-surface-200 flex items-center justify-center transition-colors cursor-pointer text-ink shadow-xs"
                aria-label="Close FAQ"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Header */}
              <div className="text-center mb-6 sm:mb-8 pr-8 sm:pr-0">
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-ink mb-2 sm:mb-3 tracking-tight">
                  Frequently Asked <span className="text-brand">Questions</span>
                </h2>
                <p className="text-sm sm:text-base md:text-lg text-ink-muted max-w-2xl mx-auto">
                  Clear answers to help you navigate RemoteWard, ABHA, and family healthcare.
                </p>
              </div>

              {/* Search Bar & Category Filters */}
              <div className="space-y-3 mb-6">
                {/* Quick Search */}
                <div className="relative max-w-lg mx-auto">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-ink-muted/60" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => {
                      setSearchQuery(e.target.value);
                      setShowAll(true);
                    }}
                    placeholder="Search questions (e.g. ABHA, blood, ambulance)..."
                    className="w-full bg-surface-50 border border-surface-200 focus:border-brand focus:ring-1 focus:ring-brand rounded-2xl py-2.5 sm:py-3 pl-11 pr-4 text-sm text-ink placeholder-ink-muted/50 outline-none transition-all shadow-xs"
                  />
                  {searchQuery && (
                    <button
                      type="button"
                      onClick={() => setSearchQuery("")}
                      className="absolute right-3.5 top-1/2 -translate-y-1/2 text-xs text-ink-muted hover:text-ink font-semibold"
                    >
                      Clear
                    </button>
                  )}
                </div>

                {/* Category Tabs */}
                <div className="flex items-center justify-start sm:justify-center gap-2 overflow-x-auto pb-1 scrollbar-none text-xs sm:text-sm">
                  {CATEGORIES.map((cat) => {
                    const isActive = activeCategory === cat.id;
                    return (
                      <button
                        key={cat.id}
                        type="button"
                        onClick={() => {
                          setActiveCategory(cat.id);
                          setOpenIndex(null);
                        }}
                        className={`px-3.5 py-1.5 rounded-full font-semibold whitespace-nowrap transition-all cursor-pointer ${
                          isActive
                            ? "bg-brand text-white shadow-xs"
                            : "bg-surface-100 text-ink-muted hover:text-ink hover:bg-surface-200/70"
                        }`}
                      >
                        {cat.label}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Accordion List */}
              <div className="space-y-3">
                {displayedItems.length === 0 ? (
                  <div className="text-center py-10 bg-surface-50 rounded-2xl border border-surface-200">
                    <p className="text-ink-muted text-sm sm:text-base">No questions match your search.</p>
                    <button
                      type="button"
                      onClick={() => {
                        setSearchQuery("");
                        setActiveCategory("all");
                      }}
                      className="mt-2 text-brand font-semibold text-sm hover:underline"
                    >
                      Reset filters
                    </button>
                  </div>
                ) : (
                  displayedItems.map((item) => {
                    const isItemOpen = openIndex === item.id;
                    return (
                      <div
                        key={item.id}
                        className="border border-surface-200/80 rounded-2xl overflow-hidden bg-surface-50 transition-all duration-200 hover:border-brand/40"
                      >
                        <button
                          type="button"
                          onClick={() => handleToggle(item.id)}
                          className="w-full px-5 py-4 sm:px-6 text-left flex justify-between items-center gap-4 focus:outline-none cursor-pointer"
                          aria-expanded={isItemOpen}
                        >
                          <span className="text-sm sm:text-base font-semibold text-ink leading-snug">
                            {item.question}
                          </span>
                          <motion.div
                            animate={{ rotate: isItemOpen ? 45 : 0 }}
                            transition={{ type: "spring", stiffness: 260, damping: 18 }}
                            className="text-brand flex-shrink-0"
                          >
                            <Plus className="w-5 h-5" />
                          </motion.div>
                        </button>

                        <AnimatePresence initial={false}>
                          {isItemOpen && (
                            <motion.div
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: "auto", opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              transition={{ duration: 0.28, ease: "easeOut" }}
                            >
                              <div className="bg-white px-5 sm:px-6 pb-4 pt-2 border-t border-surface-100">
                                <p className="text-sm sm:text-base text-ink-muted leading-relaxed">
                                  {item.answer.includes("info@remoteward.com") ? (
                                    <>
                                      {item.answer.split("info@remoteward.com")[0]}
                                      <a
                                        href="https://mail.google.com/mail/?view=cm&fs=1&to=info@remoteward.com"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-brand font-semibold hover:underline"
                                      >
                                        info@remoteward.com
                                      </a>
                                      {item.answer.split("info@remoteward.com")[1]}
                                    </>
                                  ) : (
                                    item.answer
                                  )}
                                </p>
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    );
                  })
                )}
              </div>

              {/* Expand / Collapse Toggle */}
              {isDefaultView && filteredItems.length > 6 && (
                <div className="text-center pt-5">
                  <button
                    type="button"
                    onClick={() => setShowAll(!showAll)}
                    className="inline-flex items-center gap-2 bg-surface-100 hover:bg-surface-200 text-ink font-semibold text-sm px-6 py-2.5 rounded-full border border-surface-200 transition-all cursor-pointer shadow-xs hover:shadow-sm"
                  >
                    {showAll ? (
                      <>
                        <span>Show Fewer Questions</span>
                        <ChevronUp className="w-4 h-4 text-brand" />
                      </>
                    ) : (
                      <>
                        <span>View All Questions</span>
                        <ChevronDown className="w-4 h-4 text-brand" />
                      </>
                    )}
                  </button>
                </div>
              )}
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
