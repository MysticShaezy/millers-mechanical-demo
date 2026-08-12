import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { services } from "@/data/services";
import Card from "@/components/ui/Card";
import SectionHeading from "@/components/ui/SectionHeading";
import FadeIn from "@/components/motion/FadeIn";

export const metadata: Metadata = {
  title: "Our Services",
  description:
    "Comprehensive vehicle diagnosis, brake repairs, logbook servicing, air conditioning, clutch replacements, and more in Toowoomba.",
};

export default function ServicesPage() {
  return (
    <div>
      {/* Page header */}
      <section className="bg-brand-black text-white py-20 md:py-28">
        <div className="container mx-auto px-4 text-center">
          <FadeIn>
            <p className="text-primary font-bold text-sm uppercase tracking-widest mb-4">
              What We Do
            </p>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
              Our Services
            </h1>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto leading-relaxed">
              Comprehensive vehicle diagnosis and repair services in
              Toowoomba backed by guaranteed workmanship.
            </p>
          </FadeIn>
        </div>
      </section>

      {/* Full service grid */}
      <section className="py-section bg-white">
        <div className="container mx-auto px-4">
          <FadeIn>
            <SectionHeading
              title="Complete Automotive Care"
              subtitle="From routine servicing to complex diagnostics we've got you covered."
            />
          </FadeIn>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {services.map((service, i) => (
              <FadeIn key={service.slug} delay={0.05 + i * 0.06}>
                <Link href={`/services/${service.slug}`} className="block h-full">
                  <Card className="h-full group cursor-pointer">
                    <div className="w-14 h-14 bg-primary/10 rounded-xl flex items-center justify-center text-primary mb-5 group-hover:scale-110 group-hover:bg-primary group-hover:text-white transition-all duration-normal">
                      <service.icon size={28} />
                    </div>
                    <h2 className="text-xl font-bold mb-3 text-brand-black group-hover:text-primary transition-colors">
                      {service.title}
                    </h2>
                    <p className="text-text-secondary mb-5 leading-relaxed text-sm flex-1">
                      {service.shortDescription}
                    </p>
                    <span className="inline-flex items-center gap-2 font-bold text-primary text-sm group-hover:gap-3 transition-all">
                      Learn More{" "}
                      <ArrowRight
                        size={16}
                        className="group-hover:translate-x-1 transition-transform"
                      />
                    </span>
                  </Card>
                </Link>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
