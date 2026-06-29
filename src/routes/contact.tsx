import { createFileRoute } from "@tanstack/react-router";
import { Mail, MapPin, Phone } from "lucide-react";
import { useState, useEffect } from "react";
import { z } from "zod";
import { buildWhatsAppUrl } from "@/lib/whatsapp";
import { supabase } from "@/lib/supabase";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact — Raani Chittroda" },
      { name: "description", content: "Get in touch with Raani Chittroda for inquiries, bespoke orders, and appointments." },
      { property: "og:title", content: "Contact — Raani Chittroda" },
      { property: "og:description", content: "We look forward to hearing from you." },
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
  
  const [settings, setSettings] = useState({
    address: "50 Vasundra Nagar, Pal Balaji\nJodhpur, Rajasthan, India",
    phone: "+91 97850 90816",
    email: "hello@raanichittroda.in"
  });

  const [cms, setCms] = useState({
    contactPageText: "Bespoke commissions, gifting advice, or simply a hello — message us, and a human responds."
  });

  useEffect(() => {
    async function loadData() {
      const [{ data: sData }, { data: cData }] = await Promise.all([
        supabase.from("settings").select("value").eq("key", "global_settings").single(),
        supabase.from("settings").select("value").eq("key", "homepage_cms").single()
      ]);
      if (sData?.value) setSettings(prev => ({ ...prev, ...(sData.value as any) }));
      if (cData?.value) setCms(prev => ({ ...prev, ...(cData.value as any) }));
    }
    loadData();
  }, []);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!form.name || !form.mobile || !form.message) return;
    const msg = `Hello Raani Chittroda,\n\nName: ${form.name}\nMobile: ${form.mobile}\n\n${form.message}`;
    window.open(buildWhatsAppUrl(msg), "_blank", "noopener,noreferrer");
    setForm({ name: "", mobile: "", message: "" });
  }

  return (
    <div className="bg-background">
      <section className="border-b border-border bg-secondary py-20 text-center sm:py-24">
        <div className="mx-auto max-w-2xl px-6 sm:px-8">
          <span className="eyebrow">Get in Touch</span>
          <h1 className="mt-3 font-display text-5xl sm:text-6xl">We'd love to hear from you</h1>
          <p className="mt-4 text-sm text-muted-foreground sm:text-base">
            {cms.contactPageText}
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 py-16 sm:px-8 sm:py-20">
        <div className="grid gap-12 md:grid-cols-[1fr_1.2fr] md:gap-16">
          {/* Info */}
          <div className="space-y-8">
            {[
              { icon: MapPin, t: "Atelier & Store", d: settings.address },
              { icon: Phone, t: "Phone / WhatsApp", d: `${settings.phone}\nMon–Sat, 11am to 7pm` },
              { icon: Mail, t: "Email", d: settings.email },
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