// ============================================================================
// Miller Engines & Mechanical — Shared TypeScript Interfaces
// ============================================================================

import type { LucideIcon } from "lucide-react";

/** Navigation link item */
export interface NavItem {
  label: string;
  href: string;
  children?: NavItem[];
}

/** Service data model — CMS-ready */
export interface Service {
  slug: string;
  title: string;
  shortDescription: string;
  longDescription: string;
  icon: LucideIcon;
  features: string[];
  faq: { question: string; answer: string }[];
  metaTitle: string;
  metaDescription: string;
}

/** Customer review */
export interface Review {
  id: string;
  name: string;
  date: string;
  text: string;
  rating: number;
  source: "google" | "facebook" | "sample";
}

/** Site-wide configuration */
export interface SiteConfig {
  name: string;
  shortName: string;
  description: string;
  url: string;
  owner: string;
  address: {
    street: string;
    city: string;
    state: string;
    postcode: string;
    country: string;
    full: string;
  };
  phone: string;
  phoneFormatted: string;
  email: string;
  hours: {
    days: string;
    open: string;
    close: string;
    formatted: string;
    schedules: { days: string; hours: string }[];
  };
  social: {
    facebook: string;
    instagram: string;
  };
  coordinates: {
    lat: number;
    lng: number;
  };
}

/** Contact form data */
export interface ContactFormData {
  name: string;
  phone: string;
  email: string;
  message: string;
}

/** Quote wizard form data */
export interface QuoteFormData {
  vehicleMake: string;
  vehicleModel: string;
  vehicleYear: string;
  serviceType: string;
  description: string;
  name: string;
  phone: string;
  email: string;
  preferredDate: string;
}

/** Feature flag entry */
export interface FeatureFlag {
  id: string;
  name: string;
  description: string;
  enabled: boolean;
  category: "hero" | "interaction" | "layout" | "conversion" | "content" | "system";
}
