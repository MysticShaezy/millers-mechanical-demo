import type { Metadata, Viewport } from "next";
import { Montserrat, Lobster } from "next/font/google";
import "./globals.css";
import { siteConfig, getLocalBusinessSchema } from "@/data/site";
import NavShell from "@/components/layout/NavShell";
import Footer from "@/components/layout/Footer";
import SkipToContent from "@/components/ui/SkipToContent";

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
  // "optional": the title (LCP element) renders immediately in the metric-adjusted
  // fallback instead of waiting for the web font, so LCP isn't charged for a late
  // font-swap re-paint. next/font's size-adjusted fallback keeps layout identical
  // (no CLS). On fast/repeat visits the preloaded font still shows.
  display: "optional",
});

const lobster = Lobster({
  variable: "--font-script",
  weight: "400",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: `${siteConfig.name} | Trusted Mechanic Toowoomba`,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  keywords: [
    "mechanic Toowoomba",
    "car service Toowoomba",
    "vehicle diagnosis",
    "brake repairs",
    "logbook servicing",
    "air conditioning regas",
    "Miller Engines",
    "Toowoomba mechanic",
  ],
  authors: [{ name: siteConfig.owner }],
  openGraph: {
    type: "website",
    locale: "en_AU",
    url: siteConfig.url,
    siteName: siteConfig.name,
    title: `${siteConfig.name} | Trusted Mechanic Toowoomba`,
    description: siteConfig.description,
    images: [
      {
        url: `${siteConfig.url}/assets/hero-car.jpg`,
        width: 1200,
        height: 630,
        alt: siteConfig.name,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${siteConfig.name} | Trusted Mechanic Toowoomba`,
    description: siteConfig.description,
  },
  robots: {
    index: true,
    follow: true,
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  viewportFit: "cover",
  themeColor: "#0a0a0a",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const jsonLd = getLocalBusinessSchema();

  return (
    <html lang="en" className={`${montserrat.variable} ${lobster.variable} h-full`}>
      <body className="min-h-full flex flex-col antialiased overflow-x-hidden">
        <SkipToContent />
        <NavShell />
        <main id="main-content" className="flex-1 relative z-10">
          {children}
        </main>
        <Footer />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </body>
    </html>
  );
}

