import { Star } from "lucide-react";
import { reviews, reviewStats } from "@/data/reviews";
import Card from "@/components/ui/Card";
import SectionHeading from "@/components/ui/SectionHeading";
import FadeIn from "@/components/motion/FadeIn";

export default function Testimonials() {
  return (
    <section className="py-section bg-brand-black">
      <div className="container mx-auto px-4">
        <FadeIn>
          <SectionHeading
            title="What Our Customers Say"
            subtitle={`Rated ${reviewStats.averageRating} out of 5 stars`}
            dark
          />
        </FadeIn>

        <div className="flex overflow-x-auto snap-x snap-mandatory md:grid md:grid-cols-3 gap-6 pb-8 md:pb-0 -mx-4 px-4 md:mx-0 md:px-0">
          {reviews.map((review, i) => (
            <FadeIn key={review.id} delay={0.1 + i * 0.1} className="min-w-[85vw] sm:min-w-[60vw] md:min-w-0 snap-center flex-shrink-0 md:flex-shrink">
              <Card dark className="h-full">
                {/* Stars */}
                <div className="flex gap-1 mb-4" role="img" aria-label={`${review.rating} out of 5 stars`}>
                  {Array.from({ length: review.rating }).map((_, idx) => (
                    <Star
                      key={idx}
                      size={18}
                      className="text-yellow-400"
                      fill="currentColor"
                      aria-hidden="true"
                    />
                  ))}
                </div>

                {/* Review text */}
                <blockquote className="text-gray-300 mb-6 leading-relaxed italic">
                  &ldquo;{review.text}&rdquo;
                </blockquote>

                {/* Attribution */}
                <div className="flex justify-between items-center text-sm border-t border-border-dark pt-4">
                  <div>
                    <span className="font-bold text-white block">
                      {review.name}
                    </span>
                    {review.source === "sample" && (
                      <span className="text-xs text-gray-600">Sample Review</span>
                    )}
                  </div>
                  <span className="text-gray-600">{review.date}</span>
                </div>
              </Card>
            </FadeIn>
          ))}
        </div>

        <FadeIn delay={0.4}>
          <div className="mt-12 text-center">
            <p className="text-gray-500 text-sm">
              Reviews sourced from verified customers.{" "}
              <a
                href="https://www.google.com/maps"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary hover:text-white transition-colors underline underline-offset-2"
              >
                See all reviews on Google
              </a>
            </p>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
