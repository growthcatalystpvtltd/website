import type { Metadata } from "next";
import ContactForm from "@/components/contact/ContactForm";

export const metadata: Metadata = { title: "Contact Us" };

export default function ContactPage() {
  return (
    <div className="px-6 pt-32 pb-24">
      <div className="mx-auto grid max-w-6xl gap-16 lg:grid-cols-2">
        <div>
          <p className="text-xs font-medium tracking-[0.3em] text-muted uppercase">Contact</p>
          <h1 className="mt-4 text-4xl font-light tracking-tight md:text-5xl">
            Let&apos;s start the conversation
          </h1>
          <p className="mt-6 text-sm text-muted">
            Tell us about your project. We typically respond within one business day.
          </p>
          <div className="mt-12 space-y-6 text-sm">
            <div>
              <p className="text-xs tracking-widest text-muted uppercase">Location</p>
              <p className="mt-2">Imadol, Lalitpur, Nepal</p>
            </div>
            <div>
              <p className="text-xs tracking-widest text-muted uppercase">Email</p>
              <p className="mt-2">
                <a href="mailto:info@growthcatalyst.com.np" className="hover:underline">
                  info@growthcatalyst.com.np
                </a>
              </p>
            </div>
            <div>
              <p className="text-xs tracking-widest text-muted uppercase">Phone</p>
              <p className="mt-2">
                <a href="tel:+9779849242008" className="hover:underline">
                  +977 984-9242008
                </a>
              </p>
            </div>
          </div>
        </div>
        <ContactForm />
      </div>
    </div>
  );
}
