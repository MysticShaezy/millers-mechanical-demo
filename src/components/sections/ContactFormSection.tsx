import SectionHeading from "@/components/ui/SectionHeading";
import FadeIn from "@/components/motion/FadeIn";
import ContactForm from "./ContactForm";

export default function ContactFormSection() {
  return (
    <section className="py-section bg-white">
      <div className="container mx-auto px-4 max-w-4xl">
        <FadeIn>
          <SectionHeading
            title="Feel Free To Ask Us Anything"
            subtitle="Got a question about your vehicle? Need a quote? Send us a message and we'll get back to you as soon as possible."
          />
        </FadeIn>
        <ContactForm />
      </div>
    </section>
  );
}
