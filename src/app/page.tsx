import type { Metadata } from "next";
import CinematicHero from "@/components/sections/CinematicHero";
import HeroBannerTransition from "@/components/sections/HeroBannerTransition";
import ServiceGrid from "@/components/sections/ServiceGrid";
import FeaturesSection from "@/components/sections/FeaturesSection";
import Testimonials from "@/components/sections/Testimonials";
import QuoteWizard from "@/components/conversion/QuoteWizard";
import ContactFormSection from "@/components/sections/ContactFormSection";
import StickyConversionDock from "@/components/conversion/StickyConversionDock";

export const metadata: Metadata = {
  title: "Trusted Mechanic Toowoomba | Miller Engines & Mechanical",
  description:
    "Professional vehicle diagnosis, servicing and repairs in Toowoomba QLD. Honest, reliable automotive care with guaranteed workmanship. Call +61 7 4633 2417.",
};

export default function Home() {
  return (
    <>
      {/* Fixed hero — stays locked behind everything */}
      <CinematicHero />

      {/* ── Scrollable content — scrolls OVER the fixed hero ──────────── */}
      {/* ── Scrollable content — scrolls OVER the fixed hero ──────────── */}
      <div className="relative z-10 overflow-x-hidden">
        {/* Red banner is the first piece of scrolling content */}
        <HeroBannerTransition />

        {/* Page sections follow naturally — solid white bg so hero never peeks */}
        <div className="bg-white pb-[90px] md:pb-0">
          <ServiceGrid />
          <FeaturesSection />
          <Testimonials />
          <QuoteWizard />
          <ContactFormSection />
        </div>
      </div>

      <StickyConversionDock />
    </>
  );
}
