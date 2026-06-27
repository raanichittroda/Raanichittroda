import { createFileRoute, Link } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import aboutImg from "@/assets/about.jpg";
import heroImg from "@/assets/hero.jpg";
import { supabase } from "@/lib/supabase";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About — Raani Chittroda" },
      { name: "description", content: "Trusted jewellery business dealing in premium Gold & Silver products for retailers, gift shops, religious stores, and individual customers." },
      { property: "og:title", content: "About — Raani Chittroda" },
      { property: "og:description", content: "Trusted jewellery manufacturer and wholesaler." },
    ],
  }),
  component: About,
});

function About() {
  const [cms, setCms] = useState({
    aboutUsText: "Raani Chittroda is a trusted jewellery business dealing in premium Gold & Silver products for retailers, gift shops, religious stores and individual customers."
  });

  useEffect(() => {
    async function loadData() {
      const { data } = await supabase.from("settings").select("value").eq("key", "homepage_cms").single();
      if (data?.value) setCms({ ...cms, ...(data.value as any) });
    }
    loadData();
  }, []);

  return (
    <div className="bg-background">
      <section className="relative isolate overflow-hidden bg-ink text-background">
        <img src={heroImg} alt="" className="absolute inset-0 h-full w-full object-cover opacity-50" />
        <div className="absolute inset-0 bg-gradient-to-b from-ink/40 via-ink/60 to-ink" />
        <div className="relative mx-auto max-w-3xl px-6 py-28 text-center sm:px-8 sm:py-36">
          <span className="eyebrow">Our Story</span>
          <h1 className="mt-4 font-display text-5xl leading-[1.05] sm:text-6xl md:text-7xl">
            Trusted <em className="text-gold not-italic">Gold & Silver</em> Wholesaler.
          </h1>
          <p className="mt-6 text-sm text-background/75 sm:text-base">
            {cms.aboutUsText}
          </p>
        </div>
      </section>

      <section className="py-20 sm:py-28">
        <div className="mx-auto grid max-w-6xl gap-12 px-6 sm:px-8 md:grid-cols-2 md:gap-16">
          <div>
            <span className="eyebrow">The Beginning</span>
            <h2 className="mt-3 font-display text-4xl sm:text-5xl">Our Heritage.</h2>
            <p className="mt-6 text-sm leading-relaxed text-muted-foreground">
              Raani Chittroda began with a commitment to uncompromised purity and craftsmanship. As a premier Gold & Silver Jewellery Manufacturer, Wholesaler & Retailer, we have grown to cater to bulk orders, corporate gifting, and custom manufacturing across the country.
            </p>
            <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
              Whether you are an individual customer looking for a premium piece or a retailer seeking wholesale supplies, we promise fast dispatch, trusted quality, and dedicated service.
            </p>
          </div>
          <div className="aspect-[4/5] overflow-hidden">
            <img src={aboutImg} alt="Aurelia atelier" loading="lazy" className="h-full w-full object-cover" />
          </div>
        </div>
      </section>

      <section className="border-t border-border bg-secondary py-20 sm:py-28">
        <div className="mx-auto max-w-5xl px-6 text-center sm:px-8">
          <span className="eyebrow">Our Promise</span>
          <h2 className="mt-3 font-display text-4xl sm:text-5xl">Five quiet commitments.</h2>
          <div className="mt-14 grid gap-10 sm:grid-cols-2 md:grid-cols-3">
            {[
              { n: "01", t: "Premium Quality", d: "Only the finest gold and silver, guaranteed purity and hallmarks." },
              { n: "02", t: "Wholesale Supplier", d: "We provide the best rates for bulk orders and wholesale buyers." },
              { n: "03", t: "Custom Orders", d: "Have a specific design? We offer custom manufacturing services." },
              { n: "04", t: "Fast Dispatch", d: "Efficient logistics for quick PAN India delivery." },
              { n: "05", t: "Trusted Business", d: "A dedicated team providing personal support on WhatsApp." },
            ].map((c) => (
              <div key={c.n} className="text-left">
                <p className="font-display text-3xl text-gold">{c.n}</p>
                <p className="mt-3 font-display text-xl">{c.t}</p>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{c.d}</p>
              </div>
            ))}
          </div>
          <Link to="/collections" className="btn-gold mt-16">Explore the Collections</Link>
        </div>
      </section>
    </div>
  );
}