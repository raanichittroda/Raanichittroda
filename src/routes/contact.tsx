import { createFileRoute } from "@tanstack/react-router";
import { Mail, MapPin, MessageCircle, Phone } from "lucide-react";
import { useState } from "react";
import { z } from "zod";
import { buildWhatsAppUrl } from "@/lib/whatsapp";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact — Aurelia" },
      { name: "description", content: "Visit our Jaipur atelier or message us on WhatsApp — we reply personally within the hour." },
      { property: "og:title", content: "Contact — Aurelia" },
      { property: "og:description", content: "Speak with a human, on WhatsApp." },
    ],
  }),
  component: Contact,
});

const schema = z.object({
  name: z.string().trim().min(1, "Required").max(80),
  mobile: z.string().trim().min(7, "Enter a valid number").max(20),
  message: z.string().trim().min(1, "Required").max(800),
});

function Contact() {
  const [form, setForm] = useState({ name: "", mobile: "", message: "" });
  const [errors, setErrors] = useState<Record<string, string>>({});

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const result = schema.safeParse(form);
    if (!result.success) {
      const errs: Record<string, string> = {};
      result.error.issues.forEach((i) => (errs[i.path[0] as string] = i.message));
      setErrors(errs);
      return;
    }
    setErrors({});
    const msg = `Hello Aurelia,\n\nName: ${form.name}\nMobile: ${form.mobile}\n\n${form.message}`;
    window.open(buildWhatsAppUrl(msg), "_blank", "noopener,noreferrer");
  }

  return (
    <div className="bg-background">
      <section className="border-b border-border bg-secondary py-20 text-center sm:py-24">
        <div className="mx-auto max-w-2xl px-6 sm:px-8">
          <span className="eyebrow">Get in Touch</span>
          <h1 className="mt-3 font-display text-5xl sm:text-6xl">We'd love to hear from you</h1>
          <p className="mt-4 text-sm text-muted-foreground sm:text-base">
            Bespoke commissions, gifting advice, or simply a hello — message us, and a human responds.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 py-16 sm:px-8 sm:py-20">
        <div className="grid gap-12 md:grid-cols-[1fr_1.2fr] md:gap-16">
          {/* Info */}
          <div className="space-y-8">
            {[
              { icon: MapPin, t: "Atelier", d: "12, Heritage Lane, Johari Bazaar\nJaipur 302003, India" },
              { icon: Phone, t: "Call", d: "+91 99999 99999\nMon–Sat · 10am – 8pm IST" },
              { icon: Mail, t: "Email", d: "hello@aurelia.in\nconcierge@aurelia.in" },
              { icon: MessageCircle, t: "WhatsApp", d: "The fastest way to reach us." },
            ].map((c) => (
              <div key={c.t} className="grid grid-cols-[auto_1fr] gap-5">
                <div className="grid h-11 w-11 shrink-0 place-items-center border border-gold text-gold">
                  <c.icon className="h-4 w-4" />
                </div>
                <div>
                  <p className="font-display text-xl">{c.t}</p>
                  <p className="mt-1 whitespace-pre-line text-sm leading-relaxed text-muted-foreground">{c.d}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="border border-border bg-background p-8 sm:p-10">
            <h2 className="font-display text-3xl">Send a note</h2>
            <p className="mt-2 text-sm text-muted-foreground">Your message opens directly in WhatsApp.</p>

            <div className="mt-8 space-y-5">
              <Field
                label="Your Name"
                value={form.name}
                onChange={(v) => setForm({ ...form, name: v })}
                error={errors.name}
                maxLength={80}
              />
              <Field
                label="Mobile Number"
                value={form.mobile}
                onChange={(v) => setForm({ ...form, mobile: v })}
                error={errors.mobile}
                maxLength={20}
                inputMode="tel"
              />
              <div>
                <label className="text-[10px] tracking-[0.28em] uppercase text-muted-foreground">Message</label>
                <textarea
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                  rows={5}
                  maxLength={800}
                  className="mt-2 w-full border border-border bg-background px-4 py-3 text-sm focus:border-gold focus:outline-none"
                />
                {errors.message && <p className="mt-1 text-xs text-destructive">{errors.message}</p>}
              </div>
            </div>

            <button type="submit" className="btn-gold mt-8 w-full">
              Send via WhatsApp
            </button>
          </form>
        </div>
      </section>
    </div>
  );
}

function Field({
  label,
  value,
  onChange,
  error,
  maxLength,
  inputMode,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  error?: string;
  maxLength?: number;
  inputMode?: React.HTMLAttributes<HTMLInputElement>["inputMode"];
}) {
  return (
    <div>
      <label className="text-[10px] tracking-[0.28em] uppercase text-muted-foreground">{label}</label>
      <input
        type="text"
        value={value}
        inputMode={inputMode}
        maxLength={maxLength}
        onChange={(e) => onChange(e.target.value)}
        className="mt-2 w-full border border-border bg-background px-4 py-3 text-sm focus:border-gold focus:outline-none"
      />
      {error && <p className="mt-1 text-xs text-destructive">{error}</p>}
    </div>
  );
}