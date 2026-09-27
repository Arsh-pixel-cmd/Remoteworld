"use client";

import { useState, useEffect, useRef } from "react";
import { Handshake, Info, type LucideIcon } from "lucide-react";
import { motion } from "framer-motion";
import { usePathname, useRouter } from "next/navigation";

/* ── Custom Home SVG Icon matching /logos/HOME LOGO.svg ── */
function HomeNavIcon({ active }: { active: boolean }) {
  return (
    <svg
      width={24}
      height={24}
      viewBox="0 0 30 29"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="relative z-20 transition-all duration-300 group-hover:scale-110"
      style={{
        width: active ? 26 : 23,
        height: active ? 26 : 23,
      }}
    >
      <path
        d="M21.7247 28.6748C22.5849 28.65 23.3689 28.38 24.0789 27.9067C25.2242 27.1434 25.8956 26.072 26.1401 24.7163C26.3864 23.3513 26.6622 21.9917 26.9233 20.6294C27.1956 19.2086 27.4672 17.7877 27.7357 16.3662C27.8232 15.9032 27.9135 15.44 27.9787 14.9736C28.1328 13.8716 27.8323 12.8813 27.2092 11.9759C26.8124 11.3991 26.2613 10.9889 25.7098 10.5779C22.8411 8.43975 19.9719 6.3023 17.1061 4.16038C15.8301 3.2067 14.1446 3.22951 12.843 4.20461C10.4647 5.98626 8.07645 7.7546 5.69424 9.531C4.98379 10.0608 4.25917 10.5743 3.5771 11.1388C2.46232 12.0615 1.90017 13.268 1.98562 14.718C2.0248 15.3828 2.19848 16.0403 2.32088 16.6994C2.54741 17.9191 2.77881 19.1379 3.01235 20.3563C3.31717 21.9466 3.59636 23.5426 3.941 25.1242C4.33788 26.9456 5.88198 28.3516 7.71167 28.6362C7.856 28.6586 8.00268 28.6659 8.17847 28.6669C8.26146 28.6494 8.31426 28.6416 8.36706 28.6416C12.756 28.6411 17.1449 28.641 21.5338 28.6425C21.5975 28.6426 21.6611 28.6636 21.7247 28.6748ZM7.9457 26.8434C6.82476 26.6055 6.06562 25.9429 5.6783 24.8707C5.57568 24.5866 5.54467 24.2761 5.48738 23.9764C5.20943 22.5224 4.93176 21.0683 4.65776 19.6136C4.36773 18.0737 4.07046 16.5351 3.79831 14.992C3.61633 13.9602 3.95163 13.0857 4.76484 12.4383C5.69283 11.6994 6.65719 11.0061 7.6083 10.2965C9.74012 8.70588 11.87 7.11259 14.0119 5.53566C14.221 5.38166 14.5008 5.29296 14.761 5.24509C15.3266 5.141 15.7858 5.39602 16.2288 5.72858C18.9583 7.7773 21.6978 9.81268 24.429 11.859C24.8754 12.1935 25.3608 12.4867 25.6958 12.9529C26.155 13.5921 26.3721 14.2812 26.1893 15.0743C26.0731 15.5784 25.9909 16.0904 25.8943 16.5991C25.6604 17.8314 25.4281 19.064 25.1931 20.2961C24.9332 21.659 24.6568 23.019 24.4137 24.3849C24.1637 25.7896 23.1195 26.7781 21.7172 26.916C21.6424 26.93 21.5676 26.9561 21.4928 26.9562C18.6708 26.9583 15.8488 26.958 13.0269 26.958C11.5392 26.958 10.0515 26.959 8.56381 26.9549C8.48988 26.9547 8.41607 26.9098 8.32118 26.8806C8.31412 26.8821 8.30706 26.8836 8.27609 26.9051C8.17187 26.8918 8.06765 26.8785 7.9457 26.8434Z"
        className="transition-colors duration-300 group-hover:fill-[#01B2BD]"
        fill={active ? "#01B2BD" : "#FFFFFF"}
      />
      <path
        d="M17.2783 0.394744C17.2783 0.394744 17.2635 0.388128 17.2381 0.388209C17.1411 0.3772 17.0692 0.367725 16.9979 0.354763C16.477 0.260055 15.9596 0.117623 15.4347 0.0797034C14.4787 0.0106492 13.5364 0.124434 12.6356 0.483877C12.6006 0.497821 12.5524 0.478519 12.5104 0.474709C11.7454 0.737971 11.091 1.19016 10.4503 1.66931C7.89442 3.5805 5.33597 5.48818 2.77801 7.39653C1.98757 7.98624 1.1952 8.57335 0.404565 9.16278C0.0880007 9.39879 -0.0657699 9.71251 0.0264034 10.1033C0.119624 10.4986 0.390207 10.7295 0.791847 10.7908C1.04315 10.8292 1.25966 10.7349 1.45948 10.5856C3.02377 9.41724 4.58972 8.25111 6.15461 7.08357C8.10418 5.62902 10.0484 4.16731 12.0044 2.72144C13.0597 1.94135 14.2605 1.69254 15.554 1.82329C16.7056 1.9397 17.6683 2.45996 18.578 3.14597C21.5095 5.3566 24.4571 7.54577 27.3985 9.74318C27.7829 10.0304 28.1641 10.3219 28.5529 10.6032C28.9768 10.9099 29.5045 10.8455 29.801 10.4612C30.1116 10.0585 30.0599 9.53323 29.6365 9.20309C28.9325 8.65415 28.21 8.12876 27.4942 7.59493C24.7807 5.57119 22.0666 3.54832 19.3531 1.52443C18.8396 1.1414 18.3001 0.803233 17.6849 0.562439C17.5339 0.512452 17.4061 0.453598 17.2783 0.394744Z"
        className="transition-colors duration-300 group-hover:fill-[#01B2BD]"
        fill={active ? "#01B2BD" : "#FFFFFF"}
      />
      <path
        d="M12.5232 0.46756C12.5524 0.478262 12.6006 0.497564 12.6355 0.483619C13.5364 0.124176 14.4787 0.0103917 15.4346 0.0794458C15.9596 0.117365 16.4769 0.259798 16.9978 0.354506C17.0691 0.367467 17.141 0.376943 17.23 0.387043C16.727 0.268284 16.2122 0.102397 15.6853 0.0428199C14.6076 -0.0790459 13.5509 0.0581965 12.5232 0.46756Z"
        className="transition-colors duration-300 group-hover:fill-[#14AAB7]"
        fill={active ? "#14AAB7" : "#FFFFFF"}
      />
      <path
        d="M15.136 16.2192C14.4503 16.149 13.9415 16.6755 13.9489 17.3774C13.9643 18.8397 13.9517 20.3023 13.9546 21.7648C13.9557 22.3323 14.3272 22.7672 14.8562 22.8353C15.4743 22.9148 16.0264 22.4697 16.0315 21.8461C16.044 20.3102 16.0417 18.7742 16.0314 17.2383C16.0282 16.7691 15.7137 16.3255 15.136 16.2192Z"
        className="transition-colors duration-300 group-hover:fill-[#01B2BD]"
        fill={active ? "#01B2BD" : "#FFFFFF"}
      />
    </svg>
  );
}

/* ── Custom RemoteWard SVG Icon matching authentic two-tone RemoteWard mark ── */
function RemoteWardNavIcon({ active }: { active: boolean }) {
  return (
    <svg
      width={24}
      height={24}
      viewBox="0 0 23 23"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="relative z-20 transition-all duration-300 group-hover:scale-110"
      style={{
        width: active ? 26 : 23,
        height: active ? 26 : 23,
      }}
    >
      <path
        d="M21.3519 12.1931C20.5346 11.2659 18.8501 9.35086 18.0439 8.43555C18.0512 8.64595 18.0598 8.86586 18.0585 9.07626H18.0573C18.0279 10.5919 17.5594 12.0231 16.7728 13.2261L16.7764 13.2296C16.5171 13.6278 16.1843 14.0308 15.8577 14.3827C14.5866 15.8198 11.9478 18.7999 10.7048 20.205C16.5379 27.3503 27.0675 19.3717 21.3519 12.1931Z"
        className="transition-colors duration-300 group-hover:fill-[#4D9295]"
        fill={active ? "#4D9295" : "#FFFFFF"}
      />
      <path
        d="M14.9887 13.159C14.9312 13.2304 14.8603 13.3088 14.8016 13.379C14.7832 13.3992 14.7685 13.4146 14.7502 13.4325C14.7465 13.436 11.8324 16.7252 11.8324 16.7252C11.392 17.2197 10.1246 18.6533 9.70499 19.1264C9.19117 18.5475 8.54156 17.8105 8.02774 17.2292L7.25212 18.1017C-2.08711 15.5186 -2.39173 3.30462 6.25507 0.0558696C6.2771 0.0463599 6.29912 0.0392262 6.32114 0.0320939C6.39087 0.0106971 6.46427 0 6.54012 0C6.94628 0 7.27537 0.319763 7.27537 0.712038C7.27537 1.00803 7.08941 1.26122 6.82761 1.3694C6.80559 1.38009 6.78357 1.38723 6.7591 1.39436C-0.159076 3.92394 -0.334021 13.8105 6.77256 16.4399C6.77378 16.4399 7.81243 15.2666 7.81243 15.2666C9.15936 13.7463 10.5124 12.2212 11.8594 10.6984C11.8753 10.6806 11.8924 10.6604 11.9095 10.6414C11.9205 10.6283 11.934 10.6164 11.9425 10.6021C13.3311 8.89157 12.0783 6.192 9.76249 6.2241C8.31156 6.2241 7.12122 7.30701 7.00378 8.68711C7.00133 8.68949 7.00133 8.69067 7.00378 8.69305C6.87655 10.0422 7.84668 11.269 9.16181 11.5424L6.38842 14.6747C0.382878 11.2737 2.74032 2.37624 9.76249 2.29065C15.5062 2.24548 18.6968 8.96051 14.9887 13.159Z"
        className="transition-colors duration-300 group-hover:fill-[#47C2CB]"
        fill={active ? "#47C2CB" : "#FFFFFF"}
      />
    </svg>
  );
}

/* ── Reusable icon circle with layout morph active indicator and unified hover states ── */
function NavCircle({
  id,
  label,
  sublabel,
  scrollTo,
  Icon,
  customIcon,
  active,
  onClick,
}: {
  id: string;
  label: string;
  sublabel?: string;
  scrollTo?: string;
  Icon?: LucideIcon;
  customIcon?: React.ReactNode;
  active: boolean;
  onClick: (id: string) => void;
}) {
  const fullLabel = sublabel ? `${label} (${sublabel})` : label;

  return (
    <motion.button
      onClick={() => onClick(id)}
      data-scroll-to={scrollTo}
      className="relative z-10 rounded-full flex items-center justify-center transition-all duration-300 cursor-pointer group focus:outline-none hover:shadow-[0_0_18px_rgba(3,161,172,0.35)]"
      aria-label={fullLabel}
      title={fullLabel}
      whileHover={{ scale: active ? 1.03 : 1.1 }}
      whileTap={{ scale: 0.94 }}
      transition={{ type: "spring", stiffness: 400, damping: 25 }}
      style={{
        width: active ? 68 : 58,
        height: active ? 68 : 58,
        backgroundColor: "#323C3E",
      }}
    >
      {/* Floating tooltip */}
      <span className="absolute -top-11 left-1/2 -translate-x-1/2 px-2.5 py-1 bg-[#1E2526] text-white text-[11px] font-medium rounded-lg shadow-xl pointer-events-none opacity-0 group-hover:opacity-100 transition-all duration-200 whitespace-nowrap border border-white/10 -translate-y-1 group-hover:translate-y-0 z-30">
        <span>{label}</span>
        {sublabel && <span className="text-[#03A1AC] ml-1">({sublabel})</span>}
      </span>

      {/* Morphing active ring */}
      {active && (
        <motion.div
          layoutId="activeRing"
          className="absolute rounded-full border-4 pointer-events-none"
          style={{
            top: -4,
            left: -4,
            right: -4,
            bottom: -4,
            borderColor: "#03A1AC",
            boxShadow: "0 6px 20px rgba(3,161,172,0.4)",
          }}
          transition={{ type: "spring", stiffness: 350, damping: 28 }}
        />
      )}
      {customIcon ? (
        customIcon
      ) : Icon ? (
        <Icon
          className={`transition-all duration-300 relative z-20 group-hover:scale-110 ${
            active ? "text-[#01B2BD]" : "text-white group-hover:text-[#01B2BD]"
          }`}
          style={{
            width: active ? 26 : 23,
            height: active ? 26 : 23,
          }}
        />
      ) : null}
    </motion.button>
  );
}

/* ── Tight connector WITHIN a pair (wide bridge) ── */
function PairBridge() {
  return (
    <div
      className="relative z-0"
      style={{
        width: 16,
        height: 42,
        backgroundColor: "#323c3ef5",
        marginLeft: -9,
        marginRight: -9,
        borderRadius: 6,
      }}
    />
  );
}

function PinchBridge() {
  return (
    <div
      className="relative z-0"
      style={{
        width: 18,
        height: 22,
        backgroundColor: "#323c3ef5",
        marginLeft: -6,
        marginRight: -6,
        borderRadius: 5,
      }}
    />
  );
}

export default function Navbar() {
  const [rawActiveSection, setRawActiveSection] = useState("home");
  const isManualNavRef = useRef(false);
  const manualTimerRef = useRef<NodeJS.Timeout | null>(null);
  const pathname = usePathname();
  const router = useRouter();

  const activeSection = pathname === "/" ? rawActiveSection : "";

  useEffect(() => {
    if (pathname !== "/") {
      return;
    }

    const handleScroll = () => {
      // If user recently clicked a nav item, don't overwrite during the scroll animation
      if (isManualNavRef.current) {
        return;
      }

      // If we are at the very top of the page, force highlight the Home tab
      if (window.scrollY < 80) {
        setRawActiveSection("home");
        return;
      }

      const scrollPos = window.scrollY + 280;

      const getElementTop = (primaryId: string, fallbackId?: string) => {
        const el = document.getElementById(primaryId) || (fallbackId ? document.getElementById(fallbackId) : null);
        if (!el) return Infinity;
        const rect = el.getBoundingClientRect();
        return rect.top + window.scrollY;
      };

      const partnersTop = getElementTop("partners", "partner-with-us");
      const aboutTop = getElementTop("about-us", "why-we-started");
      const remotewardTop = getElementTop("how-it-works", "remoteward");

      if (scrollPos >= partnersTop - 60) {
        setRawActiveSection("partners");
      } else if (scrollPos >= aboutTop - 60) {
        setRawActiveSection("about-us");
      } else if (scrollPos >= remotewardTop - 80) {
        setRawActiveSection("remoteward");
      } else {
        setRawActiveSection("home");
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (manualTimerRef.current) clearTimeout(manualTimerRef.current);
    };
  }, [pathname]);

  const handleNav = (id: string) => {
    // Immediately set active state on click
    setRawActiveSection(id);
    isManualNavRef.current = true;
    if (manualTimerRef.current) clearTimeout(manualTimerRef.current);
    manualTimerRef.current = setTimeout(() => {
      isManualNavRef.current = false;
    }, 1200);

    if (pathname !== "/") {
      if (id === "home") {
        router.push("/");
      } else if (id === "remoteward") {
        router.push("/#how-it-works");
      } else {
        router.push(`/#${id}`);
      }
      return;
    }

    if (id === "home") {
      const lenis = window.__lenis;
      if (lenis) {
        lenis.scrollTo(0, { offset: 0, duration: 1.1 });
      } else {
        window.scrollTo({ top: 0, behavior: "smooth" });
      }
    } else {
      const targetId = id === "remoteward" ? "how-it-works" : id;
      const el = document.getElementById(targetId) || document.getElementById(id);
      if (el) {
        const lenis = window.__lenis;
        if (lenis) {
          lenis.scrollTo(el, { offset: -60, duration: 1.1 });
        } else {
          el.scrollIntoView({ behavior: "smooth" });
        }
      }
    }
  };

  return (
    <motion.nav
      className="fixed bottom-5 left-0 right-0 mx-auto z-50 w-fit"
      aria-label="Main navigation"
      style={{ filter: "drop-shadow(0 12px 32px rgba(0,0,0,0.35))" }}
      initial={{ y: 100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 0.8, type: "spring", stiffness: 200, damping: 20 }}
    >
      <div className="flex items-center">

        {/* ═══════ LEFT PAIR: HOME & REMOTEWARD (FOR PATIENT) ═══════ */}
        <NavCircle
          id="home"
          label="Home"
          scrollTo="#home"
          customIcon={<HomeNavIcon active={activeSection === "home"} />}
          active={activeSection === "home"}
          onClick={handleNav}
        />
        <PairBridge />
        <NavCircle
          id="remoteward"
          label="RemoteWard"
          sublabel="For Patient"
          scrollTo="#how-it-works"
          customIcon={<RemoteWardNavIcon active={activeSection === "remoteward"} />}
          active={activeSection === "remoteward"}
          onClick={handleNav}
        />

        {/* ─── pinch → center ─── */}
        <PinchBridge />

        {/* ═══════ CENTER – PLAY STORE ═══════ */}
        <motion.a
          href="https://play.google.com/store/apps/details?id=com.application.remoteward"
          target="_blank"
          rel="noopener noreferrer"
          className="relative z-10 rounded-full cursor-pointer group"
          aria-label="Download on Google Play"
          title="Play Store"
          style={{
            width: 64,
            height: 64,
            background: "linear-gradient(135deg, #4285F4 0%, #EA4335 33%, #FBBC05 66%, #34A853 100%)",
            padding: 3.5,
          }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
        >
          {/* Floating tooltip */}
          <span className="absolute -top-11 left-1/2 -translate-x-1/2 px-2.5 py-1 bg-[#1E2526] text-white text-[11px] font-medium rounded-lg shadow-xl pointer-events-none opacity-0 group-hover:opacity-100 transition-all duration-200 whitespace-nowrap border border-white/10 -translate-y-1 group-hover:translate-y-0 z-30">
            Play Store
          </span>
          <div
            className="w-full h-full rounded-full flex items-center justify-center transition-all duration-300 group-hover:bg-[#283234] group-hover:shadow-[0_0_18px_rgba(66,133,244,0.4)]"
            style={{ backgroundColor: "#323C3E" }}
          >
            {/* Circular white background badge */}
            <div
              className="w-9 h-9 rounded-full bg-white flex items-center justify-center shadow-md transition-transform duration-300 group-hover:scale-110"
            >
              <svg
                viewBox="0 0 466 511.98"
                className="w-5 h-5 ml-0.5"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path fill="#EA4335" d="M199.9 237.8 1.4 470.17c7.22 24.57 30.16 41.81 55.8 41.81 11.16 0 20.93-2.79 29.3-8.37l244.16-139.46L199.9 237.8z" />
                <path fill="#FBBC04" d="m433.91 205.1-104.65-60-111.61 110.22 113.01 108.83 104.64-58.6c18.14-9.77 30.7-29.3 30.7-50.23-1.4-20.93-13.95-40.46-32.09-50.22z" />
                <path fill="#34A853" d="M199.42 273.45 329.27 145.1 87.9 8.37C79.53 2.79 68.36 0 57.2 0 30.7 0 6.98 18.14 1.4 41.86l198.02 231.59z" />
                <path fill="#4285F4" d="M1.39 41.86C0 46.04 0 51.63 0 57.2v397.64c0 5.57 0 9.76 1.4 15.34l216.27-214.86L1.39 41.86z" />
              </svg>
            </div>
          </div>
        </motion.a>

        {/* ─── pinch → right ─── */}
        <PinchBridge />

        {/* ═══════ RIGHT PAIR: PARTNERS (FOR HEALTHCARE ORGANIZATIONS) & ABOUT US ═══════ */}
        <NavCircle
          id="partners"
          label="Partners"
          sublabel="For Healthcare Organizations"
          scrollTo="#partners"
          Icon={Handshake}
          active={activeSection === "partners"}
          onClick={handleNav}
        />
        <PairBridge />
        <NavCircle
          id="about-us"
          label="About Us"
          scrollTo="#about-us"
          Icon={Info}
          active={activeSection === "about-us"}
          onClick={handleNav}
        />

      </div>
    </motion.nav>
  );
}
