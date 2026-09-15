// ============================================================================
// Miller Engines & Mechanical — Site Configuration
// ============================================================================

import type { SiteConfig } from "@/types";

export const siteConfig: SiteConfig = {
  name: "Miller Engines & Mechanical",
  shortName: "Miller Engines",
  description:
    "Professional vehicle diagnosis, servicing and repairs in Toowoomba. Honest, reliable automotive care backed by guaranteed workmanship.",
  // Production host — canonical, sitemap, robots and OG URLs all derive from
  // this. The apex 308s to www, so www is the canonical form. Change this one
  // string when the site moves to the client's own domain.
  url: "https://www.millersmotors.online",
  owner: "Darrin Miller",

  address: {
    street: "27 Mansell Street",
    city: "Toowoomba",
    state: "QLD",
    postcode: "4350",
    country: "Australia",
    full: "27 Mansell Street, Toowoomba, QLD 4350, Australia",
  },

  phone: "+61746332417",
  phoneFormatted: "+61 7 4633 2417",
  email: "info@millerengines.com.au",

  hours: {
    days: "Mon – Thu",
    open: "08:00",
    close: "17:00",
    formatted: "Mon – Thu: 8:00 AM – 5:00 PM",
    schedules: [
      { days: "Mon – Thu", hours: "8:00 AM – 5:00 PM" },
      { days: "Fri", hours: "8:00 AM – 12:00 PM" },
      { days: "Sat & Sun", hours: "Closed" },
    ],
  },

  social: {
    // Their real Facebook page (linked from millerenginesmechanical.com.au).
    facebook:
      "https://www.facebook.com/p/Miller-Engines-and-Mechanical-Toowoomba-Queensland-4350-100057209060122/",
    // No Instagram profile exists (only a location tag) — leave empty and the
    // footer omits the link rather than shipping a dead href.
    instagram: "",
  },

  coordinates: {
    lat: -27.5598,
    lng: 151.9507,
  },

  google: {
    // Text used to find the Business Profile when GOOGLE_PLACE_ID is not set,
    // and for the always-working "find us on Google" fallback link.
    placeQuery: "Miller Engines and Mechanical, 27 Mansell Street, Toowoomba QLD 4350",
  },
};

/** Google Maps search for the business — never dead, even without an API key. */
export const googleMapsSearchUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(siteConfig.google.placeQuery)}`;

/** Social links that actually exist (empty strings are dropped). */
export const socialLinks = (
  [
    { label: "Facebook", href: siteConfig.social.facebook },
    { label: "Instagram", href: siteConfig.social.instagram },
  ] as const
).filter((s) => /^https?:\/\//.test(s.href));

/** Structured data for SEO — LocalBusiness schema */
export function getLocalBusinessSchema(live?: {
  rating: number;
  reviewCount: number;
  mapsUrl?: string | null;
} | null) {
  return {
    "@context": "https://schema.org",
    "@type": "AutoRepair",
    name: siteConfig.name,
    description: siteConfig.description,
    url: siteConfig.url,
    telephone: siteConfig.phoneFormatted,
    address: {
      "@type": "PostalAddress",
      streetAddress: siteConfig.address.street,
      addressLocality: siteConfig.address.city,
      addressRegion: siteConfig.address.state,
      postalCode: siteConfig.address.postcode,
      addressCountry: "AU",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: siteConfig.coordinates.lat,
      longitude: siteConfig.coordinates.lng,
    },
    // Identical to the Google Business Profile: Mon–Thu 8–5, Fri 8–12,
    // Sat–Sun closed (Google's convention for a closed day is 00:00–00:00).
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday"],
        opens: "08:00",
        closes: "17:00",
      },
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Friday"],
        opens: "08:00",
        closes: "12:00",
      },
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Saturday", "Sunday"],
        opens: "00:00",
        closes: "00:00",
      },
    ],
    priceRange: "$$",
    image: `${siteConfig.url}/assets/og-image.jpg`,
    sameAs: [...socialLinks.map((s) => s.href), ...(live?.mapsUrl ? [live.mapsUrl] : [])],
    // Only ever from the live Google data — never a typed number.
    ...(live && live.reviewCount > 0
      ? {
          aggregateRating: {
            "@type": "AggregateRating",
            ratingValue: live.rating,
            reviewCount: live.reviewCount,
            bestRating: 5,
            worstRating: 1,
          },
        }
      : {}),
  };
}
