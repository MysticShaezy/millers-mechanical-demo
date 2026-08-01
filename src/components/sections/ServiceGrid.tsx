import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { services } from "@/data/services";
import Card from "@/components/ui/Card";
import SectionHeading from "@/components/ui/SectionHeading";
import Button from "@/components/ui/Button";
import FadeIn from "@/components/motion/FadeIn";

export default function ServiceGrid() {
  // Show first 4 services on homepage, with first one featured
  const featured = services[0];
  const regular = services.slice(1, 7);

  return (
    <section id="services" className="py-section bg-white">
      <div className="container mx-auto px-4">
        <FadeIn>
          <SectionHeading
            title="Our Service List"
            subtitle="Comprehensive vehicle diagnosis and repair services backed by guaranteed workmanship."
          />
        </FadeIn>

        {/* Bento-style grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Featured service — spans 2 columns on large screens */}
          <FadeIn delay={0.1} className="md:col-span-2 lg:col-span-1 lg:row-span-2">
            <Card className="h-full bg-brand-black border-brand-gray group relative overflow-hidden">
              <div className="absolute top-0 right-0 bg-primary text-white text-xs font-bold px-3 py-1 rounded-bl-lg">
                POPULAR
              </div>
              <div className="w-14 h-14 bg-primary/10 rounded-xl flex items-center justify-center text-primary mb-6 group-hover:scale-110 transition-transform duration-normal">
                <featured.icon size={28} />
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">
                {featured.title}
              </h3>
              <p className="text-gray-400 mb-6 leading-relaxed">
                {featured.shortDescription}
              </p>
              <ul className="space-y-2 mb-8">
                {featured.features.slice(0, 4).map((f) => (
                  <li
                    key={f}
                    className="text-sm text-gray-500 flex items-start gap-2"
                  >
                    <span className="text-primary mt-0.5">✓</span>
                    {f}
                  </li>
                ))}
              </ul>
              <Link
                href={`/services/${featured.slug}`}
                className="inline-flex items-center gap-2 font-bold text-primary hover:text-white transition-colors group/link"
                aria-label={`Learn more about ${featured.title}`}
              >
                Learn More{" "}
                <ArrowRight
                  size={18}
                  className="group-hover/link:translate-x-1 transition-transform"
                />
              </Link>
            </Card>
          </FadeIn>

          {/* Regular service cards */}
          {regular.map((service, i) => (
            <FadeIn key={service.slug} delay={0.1 + i * 0.08}>
              <Card className="h-full group">
                <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center text-primary mb-5 group-hover:scale-110 transition-transform duration-normal">
                  <service.icon size={24} />
                </div>
                <h3 className="text-xl font-bold mb-3 text-brand-black">
                  {service.title}
                </h3>
                <p className="text-text-secondary mb-5 leading-relaxed text-sm">
                  {service.shortDescription}
                </p>
                <Link
                  href={`/services/${service.slug}`}
                  className="inline-flex items-center gap-2 font-bold text-primary hover:text-brand-black transition-colors text-sm group/link"
                  aria-label={`Learn more about ${service.title}`}
                >
                  Learn More{" "}
                  <ArrowRight
                    size={16}
                    className="group-hover/link:translate-x-1 transition-transform"
                  />
                </Link>
              </Card>
            </FadeIn>
          ))}
        </div>

        <FadeIn delay={0.4}>
          <div className="text-center mt-12">
            <Link href="/services">
              <Button
                variant="secondary"
                size="lg"
                icon={<ArrowRight size={20} />}
              >
                View All Services
              </Button>
            </Link>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
