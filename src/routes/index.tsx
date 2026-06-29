import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Award, ShieldCheck, Sparkles, Truck, Star } from "lucide-react";
import { useState, useEffect } from "react";
import heroImg from "@/assets/hero.jpg";
import aboutImg from "@/assets/about.jpg";
import { getCategories, getProducts } from "@/lib/products";
import { ProductCard } from "@/components/ProductCard";
import { buildWhatsAppUrl } from "@/lib/whatsapp";
import { supabase } from "@/lib/supabase";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Raani Chittroda | Premium 925 Silver Rakhi & Silver Jewellery Online" },
      { name: "description", content: "Discover handcrafted 925 Silver Rakhis and premium silver jewellery from Raani Chittroda. Elegant designs, authentic craftsmanship, secure shopping and delivery across India." },
      { property: "og:title", content: "Raani Chittroda | Premium 925 Silver Rakhi & Silver Jewellery Online" },
      { property: "og:description", content: "Discover handcrafted 925 Silver Rakhis and premium silver jewellery from Raani Chittroda." },
    ],
  }),
  loader: async () => {
    const [categories, products, { data: cmsData }, { data: reviewsData }] = await Promise.all([
      getCategories(),
      getProducts(),
      supabase.from("settings").select("value").eq("key", "homepage_cms").single(),
      supabase.from("settings").select("value").eq("key", "customer_reviews").single(),
    ]);

    const cms = (cmsData?.value || {}) as any;
    const reviews = (reviewsData?.value || [
      { name: "Ananya Mehta", city: "Mumbai", comment: "The quality of wholesale silver murtis exceeded our expectations. Our customers love them.", rating: 5 },
      { name: "Rohan Iyer", city: "Bengaluru", comment: "Best rates for bulk festival gifting. The delivery was fast and the items were securely packed.", rating: 5 },
      { name: "Devika Rao", city: "New Delhi", comment: "Custom manufacturing was seamless. Raani Chittroda truly understands the nuances of fine jewellery.", rating: 5 },
    ]) as any[];

    return { categories, products, cms, reviews };
  },
  component: Home,
});

function HeroSlider({ images, fallbackImage }: { images?: string[], fallbackImage: string }) {
  const slideImages = images && images.filter(img => !!img).length > 0 
    ? images.filter(img => !!img) 
    : [fallbackImage];
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (slideImages.length <= 1) return;
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % slideImages.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [slideImages]);

  return (
    <div className="absolute inset-0 h-full w-full overflow-hidden">
      {slideImages.map((src, idx) => (
        <img
          key={src + idx}
          src={src}
          alt={`Hero slide ${idx + 1}`}
          className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-1000 ${
            idx === currentIndex ? "opacity-70" : "opacity-0"
          }`}
        />
      ))}
    </div>
  );
}

function Home() {
  const { categories, products, cms, reviews } = Route.useLoaderData();
  const bestsellers = products.filter((p) => p.is_best_seller).slice(0, 4);
  const newArrivals = products.filter((p) => p.is_new).slice(0, 4);
  const featuredSlugs = ["silver-rakhis", "silver-murtis", "silver-necklaces", "silver-chains", "silver-gift-articles", "gold-jewellery"];
  const featured = categories.filter((c) => featuredSlugs.includes(c.slug));

  return (
    <div>
      {/* Hero */}
      <section className="relative isolate overflow-hidden bg-ink text-background">
        <HeroSlider images={cms.heroImages} fallbackImage={heroImg} />
        <div className="absolute inset-0 bg-gradient-to-r from-ink via-ink/60 to-transparent" />
        <div className="relative mx-auto flex min-h-[78vh] max-w-7xl flex-col justify-end px-6 py-16 sm:px-8 sm:py-24 md:min-h-[88vh] md:justify-center">
          <div className="max-w-xl">
            <span className="eyebrow text-gold">RAANI CHITTRODA</span>
            <h1 className="mt-5 font-display text-5xl leading-[1.02] text-background sm:text-6xl md:text-7xl">
              {cms.heroHeading ? (
                cms.heroHeading.includes("Gold & Silver") ? (
                  <>
                    {cms.heroHeading.split("Gold & Silver")[0]}
                    <em className="text-gold not-italic">Gold & Silver</em>
                    {cms.heroHeading.split("Gold & Silver")[1]}
                  </>
                ) : (
                  cms.heroHeading
                )
              ) : (
                <>
                  Crafting Elegance in <em className="text-gold not-italic">Gold & Silver</em>
                </>
              )}
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
          {reviews.map((r: any) => (
            <figure key={r.id || r.name} className="border border-border bg-background p-8">
              <div className="flex gap-0.5 text-gold">
                {Array.from({ length: r.rating || 5 }).map((_, idx) => (
                  <Star key={idx} className="w-4 h-4 fill-current" />
                ))}
              </div>
              <blockquote className="mt-5 font-display text-xl leading-snug text-foreground">
                “{r.comment || r.q}”
              </blockquote>
              <figcaption className="mt-6 text-[10px] uppercase tracking-[0.28em] text-muted-foreground">
                {r.name || r.n} · {r.city || r.c}
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

      {/* FAQ Schema */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "mainEntity": [
          {
            "@type": "Question",
            "name": "Do you accept wholesale orders?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Yes, we are a leading manufacturer and wholesaler, catering to retailers and businesses with highly competitive wholesale pricing."
            }
          },
          {
            "@type": "Question",
            "name": "Can I customize jewellery?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Absolutely. We accept custom orders and bespoke commissions to meet your exact design and purity requirements."
            }
          },
          {
            "@type": "Question",
            "name": "Do you ship across India?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Yes, we provide secure and insured PAN India delivery for both retail and bulk orders."
            }
          },
          {
            "@type": "Question",
            "name": "How do I place a bulk order?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "You can place an inquiry through our website checkout flow or contact us directly on WhatsApp to discuss your bulk requirements."
            }
          }
        ]
      })}} />

      {/* SEO Editorial Content */}
      <section className="bg-background py-16 sm:py-24 border-t border-border">
        <div className="mx-auto max-w-4xl px-6 sm:px-8">
          <div className="prose prose-gold max-w-none text-muted-foreground space-y-8 text-sm sm:text-base leading-relaxed">
            <div>
              <h2 className="font-display text-3xl sm:text-4xl text-foreground mb-4">About Raani Chittroda</h2>
              <p>
                Welcome to <strong>Raani Chittroda</strong>, a premier destination for legacy-grade gold ornaments and authentic <strong>925 sterling silver jewellery</strong>. As a leading manufacturer, wholesaler, and retailer, our house is committed to preserving India’s rich heritage of silver crafting while infusing modern, minimalist sensibilities. Based in Rajasthan, we supply heirloom pieces, festive articles, and bridal collections to retail patrons and wholesale business owners across the nation. Whether you are looking for an exquisite daily-wear silver chain, high-purity silver coins for auspicious occasions, or a custom-designed gold set, Raani Chittroda is synonymous with trust, purity, and artistic brilliance.
              </p>
            </div>

            <div>
              <h2 className="font-display text-3xl sm:text-4xl text-foreground mb-4">Our Craftsmanship & Heritage</h2>
              <p>
                At the heart of <strong>Chittroda Jewellery</strong> lies a deep-rooted passion for manual metallurgy and filigree work. Every single piece in our collection undergoes a rigorous design and manufacturing process, led by master artisans who have kept ancestral metalwork traditions alive for generations. We pride ourselves on creating <strong>handmade silver jewellery</strong> and custom gold orders that reflect meticulous attention to detail. From the initial hand-drawn sketch to the final precision polish, our artisans sculpt precious metals to reflect light beautifully, ensuring your chosen ornament remains a standout piece in your personal collection for a lifetime.
              </p>
            </div>

            <div>
              <h2 className="font-display text-3xl sm:text-4xl text-foreground mb-4">Why Choose 925 Sterling Silver?</h2>
              <p>
                Pure silver is naturally very soft, making it unsuitable for durable, intricate jewellery designs. That is why we use premium <strong>925 sterling silver</strong>—an alloy of 92.5% pure silver and 7.5% copper. This precise standard, certified with official BIS Hallmarks, provides the ideal blend of durability, strength, and brilliant shine. Sterling silver jewellery is hypoallergenic, long-lasting, and highly versatile, making it the perfect choice for everyday luxury. With simple care and occasional polishing, your sterling silver ornaments from Raani Chittroda will retain their premium luster and structural integrity for generations to come.
              </p>
            </div>

            <div>
              <h3 className="font-display text-2xl text-foreground mb-3">Premium 925 Silver Rakhi Collection</h3>
              <p>
                Celebrate the eternal bond of protection with our premium, BIS hallmarked <strong>925 silver rakhi</strong> collection. Specially curated for Raksha Bandhan, our designs range from traditional religious motifs—such as Om, Swastik, Ganesha, and Trishul—to contemporary floral, geometric, and minimalist styles. A silver rakhi is not just a sacred thread; it is a lasting souvenir of sibling love that your brother can wear as a premium silver bracelet long after the festival concludes. When you <strong>buy silver rakhi online</strong> from Raani Chittroda, you invest in a piece of timeless elegance that carries genuine emotional and intrinsic value.
              </p>
            </div>

            <div>
              <h3 className="font-display text-2xl text-foreground mb-3">Exquisite Gifts for Raksha Bandhan</h3>
              <p>
                Finding the perfect gift for your sibling is a cherished tradition. Explore our collection of premium <strong>Raksha Bandhan gifts</strong>, featuring handcrafted silver pendants, bracelets, chains, and unique silver gift articles. Gift your sister a sparkling sterling silver ring or a dainty necklace that complements her everyday wardrobe. For brothers, choose from our heavy silver kadas, masculine chains, or custom gold studs. Each gift is presented in luxury, secure packaging, accompanied by authenticity certificates, ensuring a memorable and delightful unboxing experience on this special day.
              </p>
            </div>

            <div>
              <h3 className="font-display text-2xl text-foreground mb-3">Our Quality Promise & Certification</h3>
              <p>
                Purity and trust form the foundation of Raani Chittroda. Every single gold and silver article we manufacture conforms strictly to national and international purity standards. Our silver ornaments are stamped with the official 925 mark, and our gold jewellery features the BIS Hallmarking logo, certifying its exact gold carat weight. We offer complete transparency in weight, metal purity, and labor charges. When you purchase from us, you receive a detailed invoice and an absolute purity guarantee, giving you complete peace of mind with your investment.
              </p>
            </div>

            <div>
              <h3 className="font-display text-2xl text-foreground mb-3">Bespoke Handcrafted Jewellery</h3>
              <p>
                For those who seek a singular expression of style, our house offers full-scale custom jewellery manufacturing. Share your inspiration, sketch, or design requirements with our atelier on WhatsApp, and our designers will work closely with you to bring your vision to life. From custom-sized bridal kadas to corporate gifting collections featuring engraved logos, we handle custom orders with unmatched professionalism and artistic care. Experience the joy of wearing a custom-tailored gold or silver ornament made exclusively for you.
              </p>
            </div>
          </div>
        </div>
      </section>

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