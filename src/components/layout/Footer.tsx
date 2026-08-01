import Link from "next/link";
import Image from "next/image";
import { MapPin, Phone, Clock } from "lucide-react";
import { siteConfig } from "@/data/site";
import { footerNavigation, serviceNavigation } from "@/data/navigation";

export default function Footer() {
  return (
    <footer className="relative z-10 bg-brand-black text-white mt-auto" role="contentinfo">
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand */}
          <div className="lg:col-span-1">
            <Link href="/" className="inline-block mb-6">
              <Image
                src="/assets/transparent-logo-white-removebg-preview.png"
                alt="Miller Engines & Mechanical"
                width={180}
                height={141}
                className="w-40 h-auto object-contain drop-shadow-[0_0_15px_rgba(255,255,255,0.1)]"
              />
            </Link>
            <p className="text-gray-400 leading-relaxed">
              Professional vehicle diagnosis and repairs in Toowoomba. Honest,
              reliable automotive care backed by guaranteed workmanship.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-bold mb-6 text-[#ef4444]">Quick Links</h3>
            <ul className="space-y-3">
              {footerNavigation.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-gray-400 hover:text-white transition-colors duration-fast inline-block"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-lg font-bold mb-6 text-[#ef4444]">Our Services</h3>
            <ul className="space-y-3">
              {serviceNavigation.slice(0, 6).map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-gray-400 hover:text-white transition-colors duration-fast inline-block"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-bold mb-6 text-[#ef4444]">Contact Us</h3>
            <address className="not-italic space-y-4 text-gray-400">
              <div className="flex items-start gap-3">
                <MapPin
                  size={18}
                  className="text-primary flex-shrink-0 mt-1"
                  aria-hidden="true"
                />
                <span>{siteConfig.address.full}</span>
              </div>
              <div className="flex items-center gap-3">
                <Phone
                  size={18}
                  className="text-primary flex-shrink-0"
                  aria-hidden="true"
                />
                <a
                  href={`tel:${siteConfig.phone}`}
                  className="hover:text-white transition-colors"
                >
                  {siteConfig.phoneFormatted}
                </a>
              </div>
              <div className="flex items-center gap-3">
                <Clock
                  size={18}
                  className="text-primary flex-shrink-0"
                  aria-hidden="true"
                />
                <span>{siteConfig.hours.formatted}</span>
              </div>
            </address>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-border-dark">
        <div className="container mx-auto px-4 py-6 flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-gray-400">
          <p>
            © {new Date().getFullYear()} {siteConfig.name}. All rights reserved.
          </p>
          <div className="flex items-center gap-4">
            <a
              href={siteConfig.social.facebook}
              className="hover:text-white transition-colors"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Visit us on Facebook"
            >
              Facebook
            </a>
            <span aria-hidden="true">·</span>
            <a
              href={siteConfig.social.instagram}
              className="hover:text-white transition-colors"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Visit us on Instagram"
            >
              Instagram
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
