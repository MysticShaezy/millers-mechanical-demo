import type { Metadata } from "next";
import { features } from "@/data/enabled-features";
import { BeforeAfterSlider } from "@/components/sections/BeforeAfter";
import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";
import SectionHeading from "@/components/ui/SectionHeading";
import MarqueeStrip from "@/components/motion/MarqueeStrip";
import FadeIn from "@/components/motion/FadeIn";
import SlideUp from "@/components/motion/SlideUp";
import {
  CheckCircle,
  XCircle,
  Sparkles,
  Phone,
  ArrowRight,
  Star,
  Zap,
  Shield,
  Clock,
} from "lucide-react";

export const metadata: Metadata = {
  alternates: { canonical: "/design-lab" },
  title: "Design Lab",
  description: "Private component catalogue and feature demonstrations.",
  robots: { index: false, follow: false },
};

export default function DesignLabPage() {
  const enabledFeatures = features.filter((f) => f.enabled);
  const disabledFeatures = features.filter((f) => !f.enabled);

  return (
    <div>
      {/* Header */}
      <section className="bg-brand-black text-white py-16 md:py-24">
        <div className="container mx-auto px-4 text-center">
          <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-bold mb-6">
            <Sparkles size={16} />
            Private Route — Not Linked in Navigation
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Design Lab</h1>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Component catalogue and feature demonstrations for the Miller
            Engines &amp; Mechanical website.
          </p>
        </div>
      </section>

      {/* ─── Feature Flags ─────────────────────────────────────────────── */}
      <section className="py-section bg-white">
        <div className="container mx-auto px-4">
          <SectionHeading
            title="Feature Configuration"
            subtitle="Toggle features on and off. Enabled features are loaded on the live site."
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-12">
            {enabledFeatures.map((f) => (
              <div
                key={f.id}
                className="flex items-start gap-4 p-5 rounded-xl border border-green-200 bg-green-50"
              >
                <CheckCircle
                  size={20}
                  className="text-success flex-shrink-0 mt-0.5"
                />
                <div>
                  <p className="font-bold text-brand-black text-sm">
                    {f.name}
                  </p>
                  <p className="text-text-secondary text-xs mt-1">
                    {f.description}
                  </p>
                  <span className="inline-block mt-2 text-[10px] font-bold uppercase tracking-wider text-success bg-success/10 px-2 py-0.5 rounded-full">
                    {f.category}
                  </span>
                </div>
              </div>
            ))}
          </div>

          <h3 className="text-lg font-bold text-brand-black mb-4">
            Available (Not Enabled)
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
            {disabledFeatures.map((f) => (
              <div
                key={f.id}
                className="flex items-start gap-3 p-4 rounded-lg border border-border bg-surface"
              >
                <XCircle
                  size={16}
                  className="text-text-muted flex-shrink-0 mt-0.5"
                />
                <div>
                  <p className="font-semibold text-text-secondary text-sm">
                    {f.name}
                  </p>
                  <p className="text-text-muted text-xs mt-0.5">
                    {f.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Button Variants ───────────────────────────────────────────── */}
      <section className="py-section bg-surface">
        <div className="container mx-auto px-4">
          <SectionHeading title="Button Component" subtitle="Variants, sizes, and states" />

          <div className="space-y-8">
            <div>
              <h3 className="text-sm font-bold uppercase tracking-wider text-text-muted mb-4">
                Variants
              </h3>
              <div className="flex flex-wrap gap-4">
                <Button variant="primary">Primary</Button>
                <Button variant="secondary">Secondary</Button>
                <Button variant="outline">Outline</Button>
                <Button variant="ghost">Ghost</Button>
              </div>
            </div>

            <div>
              <h3 className="text-sm font-bold uppercase tracking-wider text-text-muted mb-4">
                Sizes
              </h3>
              <div className="flex flex-wrap items-center gap-4">
                <Button size="sm">Small</Button>
                <Button size="md">Medium</Button>
                <Button size="lg">Large</Button>
              </div>
            </div>

            <div>
              <h3 className="text-sm font-bold uppercase tracking-wider text-text-muted mb-4">
                With Icons &amp; Glow
              </h3>
              <div className="flex flex-wrap gap-4">
                <Button icon={<Phone size={18} />}>Call Now</Button>
                <Button variant="secondary" icon={<ArrowRight size={18} />}>
                  Learn More
                </Button>
                <Button glow icon={<Zap size={18} />}>
                  Glow Effect
                </Button>
                <Button disabled>Disabled</Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── Card Variants ─────────────────────────────────────────────── */}
      <section className="py-section bg-white">
        <div className="container mx-auto px-4">
          <SectionHeading title="Card Component" subtitle="Light and dark variants with hover effects" />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card>
              <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center text-primary mb-4">
                <Star size={24} />
              </div>
              <h3 className="text-xl font-bold mb-2">Light Card</h3>
              <p className="text-text-secondary text-sm">
                Default card with hover lift and border glow.
              </p>
            </Card>
            <Card dark>
              <div className="w-12 h-12 bg-primary/20 rounded-xl flex items-center justify-center text-primary mb-4">
                <Shield size={24} />
              </div>
              <h3 className="text-xl font-bold text-white mb-2">Dark Card</h3>
              <p className="text-gray-400 text-sm">
                Dark variant for use on light backgrounds.
              </p>
            </Card>
            <Card hover={false} className="bg-primary border-primary text-white">
              <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center mb-4">
                <Clock size={24} />
              </div>
              <h3 className="text-xl font-bold mb-2">Accent Card</h3>
              <p className="text-white/80 text-sm">
                Custom styled card with primary background.
              </p>
            </Card>
          </div>
        </div>
      </section>

      {/* ─── Motion Primitives ─────────────────────────────────────────── */}
      <section className="py-section bg-surface">
        <div className="container mx-auto px-4">
          <SectionHeading
            title="Motion Primitives"
            subtitle="Scroll-triggered animation wrappers"
          />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <FadeIn direction="up" delay={0}>
              <Card>
                <p className="font-bold text-sm">FadeIn — Up</p>
                <p className="text-text-muted text-xs mt-1">Default direction</p>
              </Card>
            </FadeIn>
            <FadeIn direction="down" delay={0.1}>
              <Card>
                <p className="font-bold text-sm">FadeIn — Down</p>
                <p className="text-text-muted text-xs mt-1">From above</p>
              </Card>
            </FadeIn>
            <FadeIn direction="left" delay={0.2}>
              <Card>
                <p className="font-bold text-sm">FadeIn — Left</p>
                <p className="text-text-muted text-xs mt-1">From the left</p>
              </Card>
            </FadeIn>
            <FadeIn direction="right" delay={0.3}>
              <Card>
                <p className="font-bold text-sm">FadeIn — Right</p>
                <p className="text-text-muted text-xs mt-1">From the right</p>
              </Card>
            </FadeIn>
          </div>

          <div className="mt-8">
            <SlideUp delay={0.2}>
              <Card>
                <p className="font-bold text-sm text-center">
                  SlideUp — Larger travel distance for dramatic reveals
                </p>
              </Card>
            </SlideUp>
          </div>
        </div>
      </section>

      {/* ─── Marquee Strip ─────────────────────────────────────────────── */}
      <section className="py-section bg-white">
        <div className="container mx-auto px-4 mb-8">
          <SectionHeading
            title="Marquee Strip"
            subtitle="Infinite scrolling CSS animation with configurable speed"
          />
        </div>
        <div className="space-y-4">
          <div className="bg-primary text-white py-4">
            <MarqueeStrip speed="normal">
              {["Fast", "Reliable", "Affordable", "Trusted", "Professional", "Experienced", "Guaranteed"].map(
                (word) => (
                  <span
                    key={word}
                    className="mx-8 font-bold text-xl tracking-wider whitespace-nowrap"
                  >
                    {word} <span className="text-white/40 mx-4">✦</span>
                  </span>
                )
              )}
            </MarqueeStrip>
          </div>
          <div className="bg-brand-black text-white py-3">
            <MarqueeStrip speed="slow">
              {["Miller Engines", "Toowoomba QLD", "Since Day One", "Guaranteed Workmanship"].map(
                (word) => (
                  <span
                    key={word}
                    className="mx-10 font-medium text-sm uppercase tracking-[0.2em] text-gray-400 whitespace-nowrap"
                  >
                    {word} <span className="text-gray-700 mx-4">—</span>
                  </span>
                )
              )}
            </MarqueeStrip>
          </div>
        </div>
      </section>

      {/* ─── Before/After Slider ───────────────────────────────────────── */}
      <section className="py-section bg-surface">
        <div className="container mx-auto px-4 max-w-3xl">
          <SectionHeading
            title="Before/After Slider"
            subtitle="Draggable comparison component — supports mouse, touch, and keyboard"
          />
          <BeforeAfterSlider
            beforeSrc="/assets/hero-car.jpg"
            afterSrc="/assets/team-photo.jpg"
            beforeAlt="Before repair"
            afterAlt="After repair"
          />
        </div>
      </section>

      {/* ─── Section Heading Variants ──────────────────────────────────── */}
      <section className="py-section bg-white">
        <div className="container mx-auto px-4">
          <SectionHeading title="Section Heading" subtitle="Consistent heading component" />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mt-8">
            <div className="bg-surface rounded-xl p-8">
              <SectionHeading
                title="Left Aligned"
                subtitle="With subtitle text"
                align="left"
              />
            </div>
            <div className="bg-brand-black rounded-xl p-8">
              <SectionHeading
                title="Dark Variant"
                subtitle="For dark backgrounds"
                dark
              />
            </div>
          </div>
        </div>
      </section>

      {/* ─── Design Tokens ─────────────────────────────────────────────── */}
      <section className="py-section bg-surface">
        <div className="container mx-auto px-4">
          <SectionHeading
            title="Design Tokens"
            subtitle="Colour palette and system tokens"
          />

          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {[
              { name: "Primary", color: "bg-primary", hex: "#dc2626" },
              { name: "Primary Hover", color: "bg-primary-hover", hex: "#b91c1c" },
              { name: "Brand Black", color: "bg-brand-black", hex: "#0a0a0a" },
              { name: "Brand Dark", color: "bg-brand-dark", hex: "#171717" },
              { name: "Surface", color: "bg-surface", hex: "#f9fafb" },
              { name: "Border", color: "bg-border", hex: "#e5e7eb" },
              { name: "Success", color: "bg-success", hex: "#16a34a" },
              { name: "Warning", color: "bg-warning", hex: "#d97706" },
              { name: "Error", color: "bg-error", hex: "#dc2626" },
              { name: "Text Primary", color: "bg-text-primary", hex: "#0a0a0a" },
              { name: "Text Secondary", color: "bg-text-secondary", hex: "#6b7280" },
              { name: "Text Muted", color: "bg-text-muted", hex: "#9ca3af" },
            ].map((token) => (
              <div key={token.name} className="text-center">
                <div
                  className={`${token.color} w-full h-16 rounded-lg border border-border shadow-sm`}
                />
                <p className="text-xs font-bold mt-2 text-brand-black">
                  {token.name}
                </p>
                <p className="text-[10px] text-text-muted">{token.hex}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
