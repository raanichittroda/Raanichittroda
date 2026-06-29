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
    </div>
  );
}