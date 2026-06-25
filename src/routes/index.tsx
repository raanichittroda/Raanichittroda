import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Award, ShieldCheck, Sparkles, Truck } from "lucide-react";
import heroImg from "@/assets/hero.jpg";
import aboutImg from "@/assets/about.jpg";
import { categories, products } from "@/lib/products";
import { ProductCard } from "@/components/ProductCard";
import { buildWhatsAppUrl } from "@/lib/whatsapp";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Aurelia — Fine Gold & Silver Jewellery" },
      { name: "description", content: "Discover Aurelia's hand-crafted gold and silver jewellery — necklaces, chains, bracelets, coins, murtis, rakhis and gift collections." },
      { property: "og:title", content: "Aurelia — Fine Gold & Silver Jewellery" },
      { property: "og:description", content: "Modern luxury, timeless craft." },
    ],
  }),
  component: Home,
});

function Home() {
  const bestsellers = products.filter((p) => p.isBestSeller).slice(0, 4);
  const newArrivals = products.filter((p) => p.isNew).slice(0, 4);
  const featured = categories.slice(0, 4);

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
            <span className="eyebrow text-gold">The Autumn Edit · 2026</span>
            <h1 className="mt-5 font-display text-5xl leading-[1.02] text-background sm:text-6xl md:text-7xl">
              Quiet luxury, <em className="text-gold not-italic">cast in silver.</em>
            </h1>
            <p className="mt-6 max-w-md text-sm leading-relaxed text-background/75 sm:text-base">
              Heirloom-grade jewellery, hand-finished in our atelier. From rakhis to murtis, each Aurelia piece is hallmarked and meant to be passed on.
            </p>
            <div className="mt-9 flex flex-wrap gap-3">
              <Link to="/collections" className="btn-gold">
                Shop Collections <ArrowRight className="h-3.5 w-3.5" />
              </Link>
              <Link
                to="/collections"
                search={{ category: "gift-collection" }}
                className="inline-flex items-center justify-center gap-2 border border-background/60 px-8 py-3.5 text-[0.72rem] uppercase tracking-[0.28em] text-background transition hover:border-gold hover:text-gold"
              >
                Gift Edit
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Categories */}
      <Section eyebrow="The House" title="Featured Categories" subtitle="Seven worlds of silver, curated by craft.">
        <div className="grid grid-cols-2 gap-4 sm:gap-6 md:grid-cols-4">
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
              <span className="eyebrow">Why Aurelia</span>
              <h2 className="mt-4 font-display text-4xl sm:text-5xl">A house built on craft, not noise.</h2>
              <p className="mt-5 max-w-md text-sm leading-relaxed text-muted-foreground">
                For three generations, we have hand-finished sterling silver and 22k gold for India's most discerning families.
              </p>
              <ul className="mt-10 grid gap-6 sm:grid-cols-2">
                {[
                  { icon: ShieldCheck, t: "BIS Hallmarked", d: "Certified purity, guaranteed for life." },
                  { icon: Award, t: "Heirloom Craft", d: "Filigree by hand in our Jaipur atelier." },
                  { icon: Truck, t: "Insured Shipping", d: "Pan-India, with discreet packaging." },
                  { icon: Sparkles, t: "Lifetime Polish", d: "Complimentary care, always." },
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

      {/* Reviews */}
      <Section eyebrow="Patrons" title="Letters to the House" subtitle="A few words from those who carry Aurelia." dark>
        <div className="grid gap-6 md:grid-cols-3">
          {[
            { n: "Ananya Mehta", c: "Mumbai", q: "The filigree on my rakhi is impossibly fine. It felt like unwrapping an heirloom, not a gift." },
            { n: "Rohan Iyer", c: "Bengaluru", q: "Bought the Lakshmi murti for my mother. The detail is staggering. The presentation matched the piece." },
            { n: "Devika Rao", c: "New Delhi", q: "Their WhatsApp service is what won me. Personal, fast, and they remembered my last order." },
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
      <Section eyebrow="@aurelia.house" title="On Instagram" subtitle="Behind the bench, on the wrist, at home.">
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

      {/* Contact CTA */}
      <section className="bg-ink py-20 text-background sm:py-28">
        <div className="mx-auto max-w-3xl px-6 text-center sm:px-8">
          <span className="eyebrow">A Personal Concierge</span>
          <h2 className="mt-4 font-display text-4xl sm:text-5xl md:text-6xl">
            Looking for something <em className="text-gold not-italic">just for you?</em>
          </h2>
          <p className="mt-5 text-sm leading-relaxed text-background/70 sm:text-base">
            From bespoke commissions to gifting advice, our team replies personally on WhatsApp — usually within the hour.
          </p>
          <div className="mt-9 flex flex-wrap justify-center gap-3">
            <a href={buildWhatsAppUrl("Hello Aurelia, I would like assistance with a piece.")} target="_blank" rel="noopener noreferrer" className="btn-outline-gold">
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