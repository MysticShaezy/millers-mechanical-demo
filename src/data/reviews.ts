// ============================================================================
// Miller Engines & Mechanical — Reviews Data Layer
// ============================================================================

import type { Review } from "@/types";

/**
 * Sample reviews — clearly marked as samples.
 * Replace with real reviews from Google Places API or manual entry.
 */
export const reviews: Review[] = [
  {
    id: "review-1",
    name: "Verified Customer",
    date: "2 months ago",
    text: "Miller Engines is absolutely fantastic! They fixed my brakes in record time and the customer service was top notch. Highly recommend to anyone in Toowoomba.",
    rating: 5,
    source: "sample",
  },
  {
    id: "review-2",
    name: "Verified Customer",
    date: "3 months ago",
    text: "Honest, reliable, and very well priced. Darrin took the time to explain exactly what was wrong with my car before doing any work.",
    rating: 5,
    source: "sample",
  },
  {
    id: "review-3",
    name: "Verified Customer",
    date: "4 months ago",
    text: "Best mechanic in town. Diagnosed an issue that three other places couldn't figure out. Will definitely be coming back for my logbook services.",
    rating: 5,
    source: "sample",
  },
];
