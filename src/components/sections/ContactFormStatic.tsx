import { Send } from "lucide-react";
import Button from "@/components/ui/Button";

const inputClass =
  "w-full px-4 py-3 rounded-lg border border-border bg-white outline-none transition-all duration-fast focus:ring-2 focus:ring-primary/20 focus:border-primary";

/**
 * Server-rendered contact form — identical markup to the enhanced version
 * (same fields, sizes and button) so swapping it in causes no layout shift.
 * It is in the initial HTML so crawlers and the audit see a real <form>;
 * the react-hook-form/zod bundle arrives ~600px before the visitor reaches it
 * and takes over submission (there is no useful no-JS endpoint to post to).
 */
export default function ContactFormStatic() {
  return (
    <form className="space-y-6" aria-label="Contact form">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label htmlFor="contact-name" className="block text-sm font-semibold text-brand-black mb-2">
            Name <span className="text-primary">*</span>
          </label>
          <input type="text" id="contact-name" name="name" className={inputClass} placeholder="Your Name" required />
        </div>
        <div>
          <label htmlFor="contact-phone" className="block text-sm font-semibold text-brand-black mb-2">
            Phone <span className="text-primary">*</span>
          </label>
          <input type="tel" id="contact-phone" name="phone" className={inputClass} placeholder="Your Phone Number" required />
        </div>
      </div>
      <div>
        <label htmlFor="contact-email" className="block text-sm font-semibold text-brand-black mb-2">
          Email <span className="text-primary">*</span>
        </label>
        <input type="email" id="contact-email" name="email" className={inputClass} placeholder="Your Email Address" required />
      </div>
      <div>
        <label htmlFor="contact-message" className="block text-sm font-semibold text-brand-black mb-2">
          Message <span className="text-primary">*</span>
        </label>
        <textarea id="contact-message" name="message" rows={5} className={`${inputClass} resize-none`} placeholder="How can we help you?" required />
      </div>
      <Button type="submit" variant="primary" size="lg" icon={<Send size={20} />} className="w-full md:w-auto">
        Send Message
      </Button>
    </form>
  );
}
