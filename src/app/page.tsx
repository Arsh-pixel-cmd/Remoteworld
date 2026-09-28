import dynamic from "next/dynamic";
import Navbar from "@/components/layout/Navbar";
import Hero from "@/components/landing/Hero";
import SupportersMarquee from "@/components/landing/SupportersMarquee";
import SmoothScroll from "@/components/providers/SmoothScroll";
import SplashScreen from "@/components/ui/SplashScreen";

// Lazy load below-the-fold components for optimal initial bundle size and performance
const ProblemSection = dynamic(() => import("@/components/landing/ProblemSection"));
const HowItWorks = dynamic(() => import("@/components/landing/HowItWorks"));
const WhyWeStarted = dynamic(() => import("@/components/landing/WhyWeStarted"));
const StorySection = dynamic(() => import("@/components/landing/StorySection"));
const Download = dynamic(() => import("@/components/landing/Download"));
const PartnerForm = dynamic(() => import("@/components/landing/PartnerForm"));
const ContactUs = dynamic(() => import("@/components/landing/ContactUs"));
const Footer = dynamic(() => import("@/components/layout/Footer"));

export default function Home() {
  return (
    <SplashScreen>
      <SmoothScroll>
        <Navbar />
        <main className="pb-24 sm:pb-28">
          <Hero />
          <SupportersMarquee />
          <ProblemSection />
          <HowItWorks />
          <WhyWeStarted />
          <StorySection />
          <Download />
          <PartnerForm />
          <ContactUs />
        </main>
        <Footer />
      </SmoothScroll>
    </SplashScreen>
  );
}

