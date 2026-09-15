import { Star } from "lucide-react";
import type { GoogleRating } from "@/lib/google-reviews";
import { googleMapsSearchUrl } from "@/data/site";

interface GoogleRatingBadgeProps {
  live: GoogleRating | null;
  className?: string;
}

/**
 * "4.6 ★ · 43 Google reviews" straight from the Business Profile, plus a
 * "Leave a review" link. Nothing here is typed: with no live data the number
 * is omitted entirely and the links fall back to a Maps search that always
 * resolves — never a hard-coded count, never a dead href.
 */
export default function GoogleRatingBadge({ live, className = "" }: GoogleRatingBadgeProps) {
  const seeUrl = live?.mapsUrl ?? googleMapsSearchUrl;
  const writeUrl = live?.writeReviewUrl ?? googleMapsSearchUrl;
  return (
    <div className={`flex flex-wrap items-center gap-x-3 gap-y-1 text-sm ${className}`}>
      {live ? (
        <a
          href={seeUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 text-white hover:text-primary transition-colors"
          aria-label={`Rated ${live.rating} out of 5 from ${live.reviewCount} Google reviews`}
        >
          <Star size={16} className="text-yellow-400" fill="currentColor" aria-hidden="true" />
          <span className="font-bold">{live.rating.toFixed(1)}</span>
          <span className="text-gray-400">
            · {live.reviewCount} Google review{live.reviewCount === 1 ? "" : "s"}
          </span>
        </a>
      ) : (
        <a
          href={seeUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 text-gray-400 hover:text-white transition-colors"
        >
          <Star size={16} className="text-yellow-400" fill="currentColor" aria-hidden="true" />
          Find us on Google
        </a>
      )}
      <span aria-hidden="true" className="text-gray-600">·</span>
      <a
        href={writeUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="text-primary hover:text-white transition-colors underline underline-offset-2"
      >
        Leave a review
      </a>
    </div>
  );
}
