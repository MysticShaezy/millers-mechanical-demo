import Image from "next/image";
import { CheckCircle2 } from "lucide-react";
import SectionHeading from "@/components/ui/SectionHeading";
import FadeIn from "@/components/motion/FadeIn";

const features = [
  "Years of experience in the industry",
  "Friendly and professional advice",
  "Conveniently located in Toowoomba QLD",
  "Stress-free service guaranteed",
  "Quick repairs and servicing",
];

export default function FeaturesSection() {
  return (
    <section className="py-section bg-surface">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          <FadeIn direction="left">
            <div>
              <SectionHeading
                title="What Makes Us Different"
                subtitle="Our Commitment"
                align="left"
              />
              <p className="text-text-secondary text-lg leading-relaxed mb-8">
                Miller Engines and Mechanical provides a high level of
                experience dealing with all issues related to breakdowns,
                repairs, maintenance and more. We provide the latest diagnostic
                tools and technology to ensure only the best possible outcome.
              </p>

              <div className="space-y-4" role="list">
                {features.map((feature, i) => (
                  <FadeIn key={feature} delay={0.1 + i * 0.08} direction="left">
                    <div className="flex items-center gap-4 font-semibold text-brand-dark text-lg" role="listitem">
                      <CheckCircle2
                        className="text-primary flex-shrink-0"
                        size={24}
                        aria-hidden="true"
                      />
                      {feature}
                    </div>
                  </FadeIn>
                ))}
              </div>

              <div className="mt-10 p-6 bg-white rounded-xl border border-border shadow-sm">
                <p className="text-lg font-semibold text-brand-black mb-1">
                  Fast, Reliable and Affordable
                </p>
                <p className="text-text-secondary">
                  One of the most affordable and trusted mechanics in Toowoomba.
                </p>
              </div>
            </div>
          </FadeIn>

          <FadeIn direction="right" delay={0.2}>
            <div className="relative h-[500px] lg:h-[600px] rounded-2xl overflow-hidden shadow-2xl">
              <Image
                src="/assets/team-photo.jpg"
                alt="The Miller Engines and Mechanical workshop team in Toowoomba"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
              {/* Gradient overlay at bottom for visual polish */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />

              {/* Experience badge */}
              <div className="absolute bottom-6 left-6 bg-white/95 backdrop-blur-sm rounded-xl px-5 py-4 shadow-lg">
                <p className="text-sm text-text-secondary font-medium">
                  Trusted Workshop
                </p>
                <p className="text-2xl font-bold text-brand-black">
                  Toowoomba, QLD
                </p>
              </div>
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}
