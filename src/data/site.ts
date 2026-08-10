// ============================================================================
// Miller Engines & Mechanical — Site Configuration
// ============================================================================

import type { SiteConfig } from "@/types";

export const siteConfig: SiteConfig = {
  name: "Miller Engines & Mechanical",
  shortName: "Miller Engines",
  description:
    "Professional vehicle diagnosis, servicing and repairs in Toowoomba. Honest, reliable automotive care backed by guaranteed workmanship.",
  url: "https://millerengines.com.au",
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
    // TODO: Replace with actual Miller Engines social media URLs
    facebook: "#",
    instagram: "#",
  },

  coordinates: {
    lat: -27.5598,
    lng: 151.9507,
  },
};

/** Structured data for SEO — LocalBusiness schema */
export function getLocalBusinessSchema() {
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
    ],
    priceRange: "$$",
    image: `${siteConfig.url}/assets/hero-car.jpg`,
  };
}
