import type { Metadata } from "next";
import { MapPin, Phone, Clock, Mail } from "lucide-react";
import { siteConfig } from "@/data/site";
import ContactFormSection from "@/components/sections/ContactFormSection";
import MapSection from "@/components/sections/MapSection";
import Card from "@/components/ui/Card";
import FadeIn from "@/components/motion/FadeIn";

export const metadata: Metadata = {
  alternates: { canonical: "/contact" },
  title: "Contact Us",
  description: `Contact Miller Engines & Mechanical in Toowoomba. Call ${siteConfig.phoneFormatted} or send us a message. ${siteConfig.address.full}.`,
};

const contactCards = [
  {
    icon: MapPin,
    title: "Our Location",
    content: siteConfig.address.full,
    action: `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(siteConfig.address.full)}`,
    actionLabel: "Get Directions",
  },
  {
    icon: Phone,
    title: "Phone",
    content: siteConfig.phoneFormatted,
    action: `tel:${siteConfig.phone}`,
    actionLabel: "Call Now",
  },
  {
    icon: Clock,
    title: "Business Hours",
    content: siteConfig.hours.formatted,
    action: null,
    actionLabel: null,
  },
  {
    icon: Mail,
    title: "Email",
    content: siteConfig.email,
    action: `mailto:${siteConfig.email}`,
    actionLabel: "Send Email",
  },
];

export default function ContactPage() {
  return (
    <div>
      {/* Page header */}
      <section className="bg-brand-black text-white py-20 md:py-28">
        <div className="container mx-auto px-4 text-center">
          <FadeIn>
            <p className="text-primary font-bold text-sm uppercase tracking-widest mb-4">
              Get In Touch
            </p>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
              Contact Us
            </h1>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto leading-relaxed">
              We&apos;re here to help. Reach out for quotes, bookings, or any
              questions about your vehicle.
            </p>
          </FadeIn>
        </div>
      </section>

      {/* Contact info cards */}
      <section className="bg-surface py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {contactCards.map((card, i) => (
              <FadeIn key={card.title} delay={i * 0.08}>
                <Card className="text-center h-full">
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <card.icon
                      size={22}
                      className="text-primary"
                      aria-hidden="true"
                    />
                  </div>
                  <h2 className="text-lg font-bold text-brand-black mb-2">
                    {card.title}
                  </h2>
                  <p className="text-text-secondary text-sm mb-3">
                    {card.content}
                  </p>
                  {card.action && (
                    <a
                      href={card.action}
                      className="text-primary font-semibold text-sm hover:text-primary-hover transition-colors inline-block"
                      target={card.action.startsWith("http") ? "_blank" : undefined}
                      rel={card.action.startsWith("http") ? "noopener noreferrer" : undefined}
                    >
                      {card.actionLabel} →
                    </a>
                  )}
                </Card>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* Map */}
      <MapSection />

      {/* Contact form */}
      <ContactFormSection />
    </div>
  );
}
