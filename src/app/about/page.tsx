import type { Metadata } from "next";
import Image from "next/image";
import { CheckCircle2, Award, Users, MapPin, Clock } from "lucide-react";
import SectionHeading from "@/components/ui/SectionHeading";
import FadeIn from "@/components/motion/FadeIn";
import Card from "@/components/ui/Card";
import { siteConfig } from "@/data/site";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "Get to know Darrin Miller and the team behind Miller Engines & Mechanical — Toowoomba's trusted independent mechanic.",
};

const features = [
  "Years of experience in the industry",
  "Friendly and professional advice",
  "Conveniently located in Toowoomba QLD",
  "Stress-free service guaranteed",
  "Quick repairs and servicing",
];

const stats = [
  { icon: Award, label: "Years Experience", value: "20+" },
  { icon: Users, label: "Happy Customers", value: "1000+" },
  { icon: MapPin, label: "Location", value: "Toowoomba" },
  { icon: Clock, label: "Response Time", value: "Same Day" },
];

export default function AboutPage() {
  return (
    <div>
      {/* Page header */}
      <section className="bg-brand-black text-white py-20 md:py-28">
        <div className="container mx-auto px-4 text-center">
          <FadeIn>
            <p className="text-primary font-bold text-sm uppercase tracking-widest mb-4">
              About Us
            </p>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
              Miller Engines &amp; Mechanical
            </h1>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto leading-relaxed">
              Get to know the team behind Toowoomba&apos;s trusted independent
              mechanic.
            </p>
          </FadeIn>
        </div>
      </section>

      {/* Stats strip */}
      <section className="bg-white border-b border-border">
        <div className="container mx-auto px-4 py-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {stats.map((stat, i) => (
              <FadeIn key={stat.label} delay={i * 0.1}>
                <div className="text-center">
                  <stat.icon
                    className="text-primary mx-auto mb-2"
                    size={28}
                    aria-hidden="true"
                  />
                  <p className="text-2xl md:text-3xl font-bold text-brand-black">
                    {stat.value}
                  </p>
                  <p className="text-sm text-text-secondary">{stat.label}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* Main content */}
      <section className="py-section bg-white">
        <div className="container mx-auto px-4 grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          <FadeIn direction="left">
            <div>
              <SectionHeading
                title="About Miller Engines and Mechanical"
                align="left"
              />
              <div className="space-y-6 text-text-secondary text-lg leading-relaxed">
                <p>
                  It&apos;s not easy to find a mechanic today who still delivers
                  good old-fashioned customer service along with honest,
                  reliable repairs. If you need routine servicing, an air
                  conditioning regas, or help getting your vehicle running at
                  its best, you&apos;ve come to the right place.
                </p>
                <p>
                  We also specialise in accurately diagnosing mechanical issues
                  and carrying out repairs for brakes, clutches, and more all
                  backed by our guaranteed workmanship.
                </p>
              </div>

              <ul className="space-y-4 mt-8">
                {features.map((feature, i) => (
                  <FadeIn
                    key={feature}
                    delay={0.1 + i * 0.08}
                    direction="left"
                  >
                    <li className="flex items-center gap-4 font-semibold text-brand-dark text-lg">
                      <CheckCircle2
                        className="text-primary flex-shrink-0"
                        size={24}
                        aria-hidden="true"
                      />
                      {feature}
                    </li>
                  </FadeIn>
                ))}
              </ul>
            </div>
          </FadeIn>

          <FadeIn direction="right" delay={0.2}>
            <div className="relative h-[500px] lg:h-[600px] rounded-2xl overflow-hidden shadow-2xl">
              <Image
                src="/assets/team-photo.jpg"
                alt="The Miller Engines workshop and team in Toowoomba"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />
              <div className="absolute bottom-6 left-6 bg-white/95 backdrop-blur-sm rounded-xl px-5 py-4 shadow-lg">
                <p className="text-sm text-text-secondary font-medium">
                  Owner & Head Mechanic
                </p>
                <p className="text-xl font-bold text-brand-black">
                  {siteConfig.owner}
                </p>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Commitment section */}
      <section className="py-section bg-surface">
        <div className="container mx-auto px-4 max-w-4xl">
          <FadeIn>
            <SectionHeading
              title="Our Commitment"
              subtitle="Fast, Reliable and Affordable"
            />
          </FadeIn>
          <FadeIn delay={0.15}>
            <Card className="text-center p-8 md:p-12">
              <p className="text-text-secondary text-lg leading-relaxed mb-6">
                Miller Engines and Mechanical provides a high level of
                experience dealing with all issues related to breakdowns,
                repairs, maintenance and more. We provide the latest diagnostic
                tools and technology to ensure only the best possible outcome.
              </p>
              <p className="text-xl font-bold text-brand-black">
                One of the most affordable and trusted mechanics in Toowoomba.
              </p>
            </Card>
          </FadeIn>
        </div>
      </section>
    </div>
  );
}
