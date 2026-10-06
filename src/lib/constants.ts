// ─── Site Metadata ───────────────────────────────────────────────────
export const SITE_CONFIG = {
  name: "RemoteWard",
  tagline: "Healthcare, held together.",
  url: "https://www.remoteward.com",
  description:
    "Stay connected to your care team and family. RemoteWard brings peace of mind, routine management, and instant support right to your fingertips.",
} as const;

// ─── Navigation Links ───────────────────────────────────────────────
export const NAV_LINKS = [
  { label: "Home", href: "/" },
  { label: "Careers", href: "/careers" },
  { label: "Privacy Policy", href: "/privacy-policy" },
] as const;

// ─── Social Links ───────────────────────────────────────────────────
export const SOCIAL_LINKS = {
  playStore: "#",
  appStore: "#",
  linkedin: "#",
  twitter: "#",
  instagram: "#",
} as const;

// ─── Brand Colors ───────────────────────────────────────────────────
export const BRAND_COLORS = {
  primary: "#03A1AC",
  primaryDark: "#028a94",
  accent: "#f0fdfa",
} as const;
