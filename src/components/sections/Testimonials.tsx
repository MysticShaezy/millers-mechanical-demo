import { Star } from "lucide-react";
import { reviews as sampleReviews } from "@/data/reviews";
import { googleMapsSearchUrl } from "@/data/site";
import { getGoogleRating } from "@/lib/google-reviews";
import Card from "@/components/ui/Card";
import SectionHeading from "@/components/ui/SectionHeading";
import FadeIn from "@/components/motion/FadeIn";

interface DisplayReview {
  id: string;
  name: string;
  date: string;
  text: string;
  rating: number;
  sample: boolean;
}

/**
 * Customer reviews. With a Places key the three cards, the rating in the
 * heading and the "see all" link are Google's own (refreshed daily); without
 * one the clearly-labelled sample cards show and no rating is claimed.
 */
export default async function Testimonials() {
  const live = await getGoogleRating();

  const liveReviews: DisplayReview[] = (live?.reviews ?? [])
    .filter((r) => r.rating >= 4)
    .sort((a, b) => b.rating - a.rating || b.publishTime.localeCompare(a.publishTime))
    .slice(0, 3)
    .map((r) => ({
      id: r.id,
      name: r.author,
      date: r.relativeTime,
      text: r.text,
      rating: r.rating,
      sample: false,
    }));

  const shown: DisplayReview[] =
    liveReviews.length > 0
      ? liveReviews
      : sampleReviews.map((r) => ({
          id: r.id,
          name: r.name,
          date: r.date,
          text: r.text,
          rating: r.rating,
          sample: true,
        }));

  const subtitle = live
    ? `Rated ${live.rating.toFixed(1)} out of 5 from ${live.reviewCount} Google reviews`
    : "Straight from the people who bring their cars to us";
  const seeAllUrl = live?.mapsUrl ?? googleMapsSearchUrl;

  return (
    <section className="py-section bg-brand-black">
      <div className="container mx-auto px-4">
        <FadeIn>
          <SectionHeading title="What Our Customers Say" subtitle={subtitle} dark />
        </FadeIn>

        {/* Mobile: vertical stack | Desktop: 3-column grid */}
        <div className="flex flex-col gap-4 md:grid md:grid-cols-3 md:gap-6">
          {shown.map((review, i) => (
            <FadeIn key={review.id} delay={0.1 + i * 0.1}>
              <Card dark className="h-full p-5 md:p-8">
                {/* Stars */}
                <div className="flex gap-1 mb-3 md:mb-4" role="img" aria-label={`${review.rating} out of 5 stars`}>
                  {Array.from({ length: review.rating }).map((_, idx) => (
                    <Star
                      key={idx}
                      size={16}
                      className="text-yellow-400 md:w-[18px] md:h-[18px]"
                      fill="currentColor"
                      aria-hidden="true"
                    />
                  ))}
                </div>

                {/* Review text */}
                <blockquote className="text-gray-300 mb-4 md:mb-6 leading-relaxed italic text-sm md:text-base line-clamp-6">
                  &ldquo;{review.text}&rdquo;
                </blockquote>

                {/* Attribution */}
                <div className="flex justify-between items-center text-sm border-t border-border-dark pt-3 md:pt-4">
                  <div>
                    <span className="font-bold text-white block text-sm">
                      {review.name}
                    </span>
                    <span className="text-xs text-gray-600">
                      {review.sample ? "Sample Review" : "Google review"}
                    </span>
                  </div>
                  <span className="text-gray-600 text-xs md:text-sm">{review.date}</span>
                </div>
              </Card>
            </FadeIn>
          ))}
        </div>

        <FadeIn delay={0.4}>
          <div className="mt-8 md:mt-12 text-center">
            <p className="text-gray-500 text-sm">
              {live ? "Reviews from our Google Business Profile." : "Reviews sourced from verified customers."}{" "}
              <a
                href={seeAllUrl}
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
