import { createFileRoute, Link, useLoaderData } from "@tanstack/react-router";
import { ArrowRight, Award, ShieldCheck, Sparkles, Truck } from "lucide-react";
import heroImg from "@/assets/hero.jpg";
import aboutImg from "@/assets/about.jpg";
import { getCategories, getProducts } from "@/lib/products";
import { ProductCard } from "@/components/ProductCard";
import { buildWhatsAppUrl } from "@/lib/whatsapp";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Raani Chittroda — Gold & Silver Jewellery Manufacturer, Wholesaler & Retailer" },
      { name: "description", content: "Premium Gold & Silver Jewellery for Every Occasion. We deal in Wholesale, Bulk Orders, Retail, Corporate Gifting, and Custom Manufacturing." },
      { property: "og:title", content: "Raani Chittroda — Gold & Silver Jewellery" },
      { property: "og:description", content: "Crafting Elegance in Gold & Silver." },
    ],
  }),
  loader: async () => {
    const [categories, products] = await Promise.all([
      getCategories(),
      getProducts(),
    ]);
    return { categories, products };
  },
  component: Home,
});

function Home() {
  const { categories, products } = Route.useLoaderData();
  const bestsellers = products.filter((p) => p.is_best_seller).slice(0, 4);
  const newArrivals = products.filter((p) => p.is_new).slice(0, 4);
  const featuredSlugs = ["silver-rakhis", "silver-murtis", "silver-necklaces", "silver-chains", "silver-gift-articles", "gold-jewellery"];
  const featured = categories.filter((c) => featuredSlugs.includes(c.slug));

  return (
    <div>
      {/* Hero */}
      <section className="relative isolate overflow-hidden bg-ink text-background">
        <img
          src={heroImg}
          alt="Aurelia signature necklace"
          className="absolute inset-0 h-full w-full object-cover opacity-70"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-ink via-ink/60 to-transparent" />
        <div className="relative mx-auto flex min-h-[78vh] max-w-7xl flex-col justify-end px-6 py-16 sm:px-8 sm:py-24 md:min-h-[88vh] md:justify-center">
          <div className="max-w-xl">
            <span className="eyebrow text-gold">RAANI CHITTRODA</span>
            <h1 className="mt-5 font-display text-5xl leading-[1.02] text-background sm:text-6xl md:text-7xl">
              Crafting Elegance in <em className="text-gold not-italic">Gold & Silver</em>
            </h1>
            <p className="mt-6 max-w-md text-sm leading-relaxed text-background/75 sm:text-base">
              Premium Gold & Silver Jewellery for Every Occasion. Retail, Wholesale, Bulk Orders, and Custom Manufacturing.
            </p>
            <div className="mt-9 flex flex-wrap gap-3">
              <Link to="/collections" className="btn-gold">
                Shop Collections <ArrowRight className="h-3.5 w-3.5" />
              </Link>
              <Link
                to="/collections"
                search={{ category: "silver-gift-articles" }}
                className="inline-flex items-center justify-center gap-2 border border-background/60 px-8 py-3.5 text-[0.72rem] uppercase tracking-[0.28em] text-background transition hover:border-gold hover:text-gold"
              >
                Gift Edit
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Bulk Order Banner */}
      <section className="bg-gold py-16 sm:py-20 text-ink text-center px-6">
        <h2 className="font-display text-4xl sm:text-5xl">Need Jewellery in Bulk?</h2>
        <p className="mt-5 max-w-3xl mx-auto text-base sm:text-lg font-medium text-ink/80 leading-relaxed">
          We supply Gold & Silver Jewellery to retailers, wholesalers, gift stores, corporate clients and businesses across India.
        </p>
        <div className="mt-10 flex flex-wrap justify-center gap-4">
          <a href={buildWhatsAppUrl("Hello Raani Chittroda, I would like to request a wholesale quote.")} target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center bg-ink text-gold px-8 py-4 text-sm uppercase tracking-widest font-semibold hover:bg-ink/90 transition">
            Request Wholesale Quote
          </a>
          <a href={buildWhatsAppUrl("Hello Raani Chittroda, I have an inquiry.")} target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center border-2 border-ink text-ink px-8 py-4 text-sm uppercase tracking-widest font-semibold hover:bg-ink hover:text-gold transition">
            Contact on WhatsApp
          </a>
        </div>
      </section>

      <Section eyebrow="The House" title="Featured Collections" subtitle="Explore our premium collection of gold and silver.">
        <div className="grid grid-cols-2 gap-4 sm:gap-6 md:grid-cols-3 lg:grid-cols-6">
          {featured.map((c) => (
            <Link
              key={c.slug}
              to="/collections"
              search={{ category: c.slug }}
              className="group block"
            >
              <div className="aspect-[3/4] overflow-hidden bg-secondary">
                <img src={c.image} alt={c.name} loading="lazy" className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" />
              </div>
              <div className="mt-4">
                <p className="font-display text-lg text-foreground group-hover:text-gold">{c.name}</p>
                <p className="mt-0.5 text-xs text-muted-foreground">{c.blurb}</p>
              </div>
            </Link>
          ))}
        </div>
      </Section>

      {/* Best Sellers */}
      <Section eyebrow="House Favourites" title="Best Selling Pieces" subtitle="What our patrons have been loving.">
        <div className="grid grid-cols-2 gap-6 md:grid-cols-4">
          {bestsellers.map((p) => <ProductCard key={p.id} product={p} />)}
        </div>
      </Section>

      {/* New Arrivals */}
      <Section eyebrow="Just In" title="New Arrivals" subtitle="Fresh from the atelier this season." dark>
        <div className="grid grid-cols-2 gap-6 md:grid-cols-4">
          {newArrivals.map((p) => <ProductCard key={p.id} product={p} />)}
        </div>
      </Section>

      {/* Why Choose Us */}
      <section className="bg-background py-20 sm:py-28">
        <div className="mx-auto max-w-7xl px-6 sm:px-8">
          <div className="grid items-center gap-12 md:grid-cols-2">
            <div className="aspect-[5/6] overflow-hidden">
              <img src={aboutImg} alt="Aurelia atelier" loading="lazy" className="h-full w-full object-cover" />
            </div>
            <div>
              <span className="eyebrow">Why Raani Chittroda</span>
              <h2 className="mt-4 font-display text-4xl sm:text-5xl">Trusted Manufacturer & Wholesaler.</h2>
              <p className="mt-5 max-w-md text-sm leading-relaxed text-muted-foreground">
                We are a trusted jewellery business dealing in premium Gold & Silver products for retailers, gift shops, religious stores, and individual customers.
              </p>
              <ul className="mt-10 grid gap-6 sm:grid-cols-2">
                {[
                  { icon: ShieldCheck, t: "Premium Quality Materials", d: "Finest gold and silver with guaranteed purity." },
                  { icon: Award, t: "Trusted Jewellery Manufacturer", d: "Decades of manufacturing excellence." },
                  { icon: Sparkles, t: "Wholesale Pricing", d: "Highly competitive rates for retailers." },
                  { icon: Truck, t: "Bulk Orders Accepted", d: "Capacity for large scale production." },
                  { icon: ArrowRight, t: "Fast Delivery", d: "Secure and quick PAN India dispatch." },
                  { icon: ShieldCheck, t: "Excellent Customer Support", d: "Personal concierge service on WhatsApp." },
                ].map((f) => (
                  <li key={f.t} className="flex gap-4">
                    <f.icon className="mt-0.5 h-5 w-5 shrink-0 text-gold" />
                    <div>
                      <p className="font-display text-lg">{f.t}</p>
                      <p className="mt-1 text-xs leading-relaxed text-muted-foreground">{f.d}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Business Statistics */}
      <section className="border-t border-border bg-secondary py-16 sm:py-24">
        <div className="mx-auto max-w-7xl px-6 sm:px-8">
          <div className="grid grid-cols-2 gap-8 md:grid-cols-4 text-center">
            {[
              { val: "5000+", lbl: "Happy Customers" },
              { val: "1000+", lbl: "Wholesale Clients" },
              { val: "500+", lbl: "Jewellery Designs" },
              { val: "10+", lbl: "Years of Experience" },
            ].map((stat) => (
              <div key={stat.lbl} className="flex flex-col gap-2">
                <span className="font-display text-4xl sm:text-5xl text-gold">{stat.val}</span>
                <span className="text-sm tracking-[0.2em] uppercase text-muted-foreground font-medium">{stat.lbl}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Reviews */}
      <Section eyebrow="Patrons" title="Words of Trust" subtitle="A few words from our wholesale and retail clients." dark>
        <div className="grid gap-6 md:grid-cols-3">
          {[
            { n: "Ananya Mehta", c: "Mumbai", q: "The quality of wholesale silver murtis exceeded our expectations. Our customers love them." },
            { n: "Rohan Iyer", c: "Bengaluru", q: "Best rates for bulk festival gifting. The delivery was fast and the items were securely packed." },
            { n: "Devika Rao", c: "New Delhi", q: "Custom manufacturing was seamless. Raani Chittroda truly understands the nuances of fine jewellery." },
          ].map((r) => (
            <figure key={r.n} className="border border-border bg-background p-8">
              <div className="flex gap-1 text-gold">{"★★★★★"}</div>
              <blockquote className="mt-5 font-display text-xl leading-snug text-foreground">
                “{r.q}”
              </blockquote>
              <figcaption className="mt-6 text-[10px] uppercase tracking-[0.28em] text-muted-foreground">
                {r.n} · {r.c}
              </figcaption>
            </figure>
          ))}
        </div>
      </Section>

      {/* Instagram */}
      <Section eyebrow="@raanichittroda" title="Our Collections" subtitle="Explore our wide range of products.">
        <div className="grid grid-cols-3 gap-2 sm:gap-4 md:grid-cols-6">
          {categories.slice(0, 6).map((c) => (
            <a key={c.slug} href="#" className="group relative block aspect-square overflow-hidden bg-secondary">
              <img src={c.image} alt="" loading="lazy" className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110" />
              <div className="absolute inset-0 grid place-items-center bg-ink/0 transition group-hover:bg-ink/30">
                <span className="opacity-0 transition group-hover:opacity-100 text-background text-xs tracking-[0.28em] uppercase">View</span>
              </div>
            </a>
          ))}
        </div>
      </Section>

      {/* FAQ */}
      <Section eyebrow="Common Queries" title="Frequently Asked Questions" subtitle="Everything you need to know about ordering." dark>
        <div className="mx-auto max-w-3xl divide-y divide-border border-t border-border">
          {[
            { q: "Do you accept wholesale orders?", a: "Yes, we are a leading manufacturer and wholesaler, catering to retailers and businesses with highly competitive wholesale pricing." },
            { q: "Can I customize jewellery?", a: "Absolutely. We accept custom orders and bespoke commissions to meet your exact design and purity requirements." },
            { q: "Do you ship across India?", a: "Yes, we provide secure and insured PAN India delivery for both retail and bulk orders." },
            { q: "How do I place a bulk order?", a: "You can place an inquiry through our website checkout flow or contact us directly on WhatsApp to discuss your bulk requirements." },
          ].map((faq) => (
            <details key={faq.q} className="group py-6">
              <summary className="flex cursor-pointer items-center justify-between font-display text-xl sm:text-2xl outline-none">
                {faq.q}
                <span className="ml-4 transition-transform duration-300 group-open:rotate-45 text-gold">+</span>
              </summary>
              <div className="mt-4 text-muted-foreground leading-relaxed">
                {faq.a}
              </div>
            </details>
          ))}
        </div>
      </Section>

      {/* Contact CTA */}
      <section className="bg-ink py-20 text-background sm:py-28">
        <div className="mx-auto max-w-3xl px-6 text-center sm:px-8">
          <span className="eyebrow">Dedicated Support</span>
          <h2 className="mt-4 font-display text-4xl sm:text-5xl md:text-6xl">
            Ready to place an <em className="text-gold not-italic">order?</em>
          </h2>
          <p className="mt-5 text-sm leading-relaxed text-background/70 sm:text-base">
            For retail, wholesale, or custom orders, connect directly with our team on WhatsApp.
          </p>
          <div className="mt-9 flex flex-wrap justify-center gap-3">
            <a href={buildWhatsAppUrl("Hello Raani Chittroda, I would like to place an order.")} target="_blank" rel="noopener noreferrer" className="btn-outline-gold">
              Chat on WhatsApp
            </a>
            <Link to="/contact" className="inline-flex items-center justify-center gap-2 border border-background/60 px-8 py-3.5 text-[0.72rem] uppercase tracking-[0.28em] text-background transition hover:border-gold hover:text-gold">
              Visit the Atelier
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

function Section({
  eyebrow,
  title,
  subtitle,
  children,
  dark = false,
}: {
  eyebrow: string;
  title: string;
  subtitle?: string;
  children: React.ReactNode;
  dark?: boolean;
}) {
  return (
    <section className={`${dark ? "bg-secondary" : "bg-background"} py-20 sm:py-28`}>
      <div className="mx-auto max-w-7xl px-6 sm:px-8">
        <div className="mb-12 max-w-2xl text-center sm:mb-16 sm:text-left">
          <span className="eyebrow">{eyebrow}</span>
          <h2 className="mt-3 font-display text-4xl sm:text-5xl">{title}</h2>
          {subtitle && <p className="mt-3 text-sm text-muted-foreground sm:text-base">{subtitle}</p>}
        </div>
        {children}
      </div>
    </section>
  );
}