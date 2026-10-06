import type { Metadata } from "next";
import { Inter } from "next/font/google";
import ClickSpark from "@/components/ui/ClickSpark";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://remoteward.com/"),
  title: "No One Should Have to, Navigate Healthcare Alone.",
  description:
    "No One Should Have to, Navigate Healthcare Alone.",
  keywords: [
    "RemoteWard",
    "healthcare",
    "caregiver app",
    "chronic care coordination",
    "ABHA",
    "health vitals tracking",
    "family care circle",
  ],
  authors: [{ name: "RemoteWard Care Pvt. Ltd." }],
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "No One Should Have to, Navigate Healthcare Alone.",
    description:
      "No One Should Have to, Navigate Healthcare Alone.",
    url: "https://www.remoteward.com",
    siteName: "RemoteWard",
    images: [
      {
        url: "/logo.svg",
        width: 512,
        height: 512,
        alt: "RemoteWard Logo",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "No One Should Have to, Navigate Healthcare Alone.",
    description:
      "Stay connected to your care team and family. RemoteWard brings peace of mind, routine management, and instant support right to your fingertips.",
    images: ["/logo.svg"],
  },
  icons: {
    icon: "/favicon.ico",
    apple: "/logo.svg",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} h-full`}
    >
      <body className="font-sans antialiased text-ink text-lg leading-relaxed selection:bg-brand selection:text-white min-h-full flex flex-col">
        <ClickSpark
          sparkColor="#03A1AC"
          sparkSize={10}
          sparkRadius={15}
          sparkCount={8}
          duration={400}
        >
          {children}
        </ClickSpark>
      </body>
    </html>
  );
}
