import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import {
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  Phone,
  ChevronDown,
} from "lucide-react";
import { services, getServiceBySlug, getAllServiceSlugs } from "@/data/services";
import { siteConfig } from "@/data/site";
import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";
import FadeIn from "@/components/motion/FadeIn";

interface ServicePageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return getAllServiceSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: ServicePageProps): Promise<Metadata> {
  const { slug } = await params;
  const service = getServiceBySlug(slug);
  if (!service) return {};

  return {
    title: service.metaTitle,
    description: service.metaDescription,
    alternates: { canonical: `/services/${slug}` },
  };
}

export default async function ServiceDetailPage({ params }: ServicePageProps) {
  const { slug } = await params;
  const service = getServiceBySlug(slug);

  if (!service) {
    notFound();
  }

  // Get related services (exclude current, take 3)
  const relatedServices = services
    .filter((s) => s.slug !== service.slug)
    .slice(0, 3);

  return (
    <div>
      {/* Page header */}
      <section className="bg-brand-black text-white py-20 md:py-28">
        <div className="container mx-auto px-4">
          <FadeIn>
            <Link
              href="/services"
              className="inline-flex items-center gap-2 text-gray-400 hover:text-white transition-colors text-sm mb-8 group"
            >
              <ArrowLeft
                size={16}
                className="group-hover:-translate-x-1 transition-transform"
              />
              Back to All Services
            </Link>
            <div className="flex items-start gap-6">
              <div className="w-16 h-16 bg-primary/20 rounded-2xl flex items-center justify-center text-primary flex-shrink-0">
                <service.icon size={32} />
              </div>
              <div>
                <h1 className="text-4xl md:text-5xl font-bold mb-4">
                  {service.title}
                </h1>
                <p className="text-gray-400 text-lg max-w-2xl leading-relaxed">
                  {service.shortDescription}
                </p>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      <div className="py-section bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Main content */}
            <div className="lg:col-span-2">
              <FadeIn>
                <div className="prose prose-lg max-w-none">
                  {service.longDescription.split("\n\n").map((paragraph, i) => {
                    if (paragraph.startsWith("**") && paragraph.endsWith("**")) {
                      return (
                        <h2
                          key={i}
                          className="text-2xl font-bold text-brand-black mt-8 mb-4"
                        >
                          {paragraph.replace(/\*\*/g, "")}
                        </h2>
                      );
                    }
                    return (
                      <p
                        key={i}
                        className="text-text-secondary leading-relaxed mb-4"
                      >
                        {paragraph}
                      </p>
                    );
                  })}
                </div>
              </FadeIn>

              {/* Features list */}
              <FadeIn delay={0.15}>
                <div className="mt-10 p-8 bg-surface rounded-2xl border border-border">
                  <h3 className="text-xl font-bold text-brand-black mb-6">
                    What&apos;s Included
                  </h3>
                  <ul className="space-y-3">
                    {service.features.map((feature) => (
                      <li
                        key={feature}
                        className="flex items-start gap-3 text-text-secondary"
                      >
                        <CheckCircle2
                          size={20}
                          className="text-primary flex-shrink-0 mt-0.5"
                          aria-hidden="true"
                        />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
              </FadeIn>

              {/* FAQ */}
              {service.faq.length > 0 && (
                <FadeIn delay={0.25}>
                  <div className="mt-10">
                    <h3 className="text-2xl font-bold text-brand-black mb-6">
                      Frequently Asked Questions
                    </h3>
                    <div className="space-y-4">
                      {service.faq.map((item) => (
                        <details
                          key={item.question}
                          className="group bg-surface rounded-xl border border-border p-6 cursor-pointer"
                        >
                          <summary className="flex items-center justify-between font-semibold text-brand-black list-none">
                            {item.question}
                            <ChevronDown
                              size={18}
                              className="text-text-muted group-open:rotate-180 transition-transform flex-shrink-0 ml-4"
                            />
                          </summary>
                          <p className="text-text-secondary mt-4 leading-relaxed">
                            {item.answer}
                          </p>
                        </details>
                      ))}
                    </div>
                  </div>
                </FadeIn>
              )}
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1">
              <div className="sticky top-28 space-y-6">
                {/* CTA card */}
                <FadeIn delay={0.1}>
                  <Card className="bg-brand-black border-brand-gray text-center">
                    <h3 className="text-xl font-bold text-white mb-3">
                      Need {service.title}?
                    </h3>
                    <p className="text-gray-400 mb-6 text-sm">
                      Contact us today for expert advice and competitive
                      pricing.
                    </p>
                    <a href={`tel:${siteConfig.phone}`}>
                      <Button
                        variant="primary"
                        fullWidth
                        glow
                        icon={<Phone size={18} />}
                      >
                        Call {siteConfig.phoneFormatted}
                      </Button>
                    </a>
                    <Link href="/contact" className="block mt-3">
                      <Button variant="outline" fullWidth>
                        Send Enquiry
                      </Button>
                    </Link>
                  </Card>
                </FadeIn>

                {/* Related services */}
                <FadeIn delay={0.2}>
                  <div>
                    <h4 className="text-lg font-bold text-brand-black mb-4">
                      Other Services
                    </h4>
                    <div className="space-y-3">
                      {relatedServices.map((related) => (
                        <Link
                          key={related.slug}
                          href={`/services/${related.slug}`}
                          className="flex items-center gap-3 p-4 rounded-xl border border-border bg-white hover:shadow-md hover:border-primary/30 transition-all group"
                        >
                          <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center text-primary flex-shrink-0 group-hover:bg-primary group-hover:text-white transition-all">
                            <related.icon size={18} />
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="font-semibold text-brand-black text-sm truncate">
                              {related.title}
                            </p>
                          </div>
                          <ArrowRight
                            size={16}
                            className="text-text-muted group-hover:text-primary transition-colors flex-shrink-0"
                          />
                        </Link>
                      ))}
                    </div>
                  </div>
                </FadeIn>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
