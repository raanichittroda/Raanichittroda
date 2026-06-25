import { createFileRoute, Link } from "@tanstack/react-router";
import aboutImg from "@/assets/about.jpg";
import heroImg from "@/assets/hero.jpg";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About — Aurelia Jewellery" },
      { name: "description", content: "Three generations of silversmiths, one quiet philosophy: make pieces worth inheriting." },
      { property: "og:title", content: "About — Aurelia Jewellery" },
      { property: "og:description", content: "Three generations of silversmiths, one quiet philosophy." },
    ],
  }),
  component: About,
});

function About() {
  return (
    <div className="bg-background">
      <section className="relative isolate overflow-hidden bg-ink text-background">
        <img src={heroImg} alt="" className="absolute inset-0 h-full w-full object-cover opacity-50" />
        <div className="absolute inset-0 bg-gradient-to-b from-ink/40 via-ink/60 to-ink" />
        <div className="relative mx-auto max-w-3xl px-6 py-28 text-center sm:px-8 sm:py-36">
          <span className="eyebrow">Our House</span>
          <h1 className="mt-4 font-display text-5xl leading-[1.05] sm:text-6xl md:text-7xl">
            A small atelier with a <em className="text-gold not-italic">long memory.</em>
          </h1>
          <p className="mt-6 text-sm text-background/75 sm:text-base">
            Founded in Jaipur in 1962. Still hand-finishing every piece, three generations on.
          </p>
        </div>
      </section>

      <section className="py-20 sm:py-28">
        <div className="mx-auto grid max-w-6xl gap-12 px-6 sm:px-8 md:grid-cols-2 md:gap-16">
          <div>
            <span className="eyebrow">The Beginning</span>
            <h2 className="mt-3 font-display text-4xl sm:text-5xl">Cast in 1962.</h2>
            <p className="mt-6 text-sm leading-relaxed text-muted-foreground">
              Aurelia began with a single bench, a kerosene torch and a stubborn refusal to compromise on purity. Our grandfather, a master silversmith from Jaipur's old city, sold his first piece — a filigree pendant — for ₹40. The buyer's family still wears it today.
            </p>
            <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
              Three generations later, our atelier has grown, but the bench is still where everything begins.
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
              { n: "01", t: "Purity", d: "Only 925 sterling and 999 fine silver — hallmarked, always." },
              { n: "02", t: "Hand-finish", d: "No machine polish. Every surface is hand-buffed." },
              { n: "03", t: "Fair craft", d: "Our karigars are paid by piece, with healthcare and pension." },
              { n: "04", t: "Lifetime care", d: "Free polishing and re-stringing, for as long as you wear it." },
              { n: "05", t: "Personal service", d: "A human on WhatsApp, not a chatbot. Usually within the hour." },
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