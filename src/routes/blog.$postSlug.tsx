import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { Clock, Calendar, ArrowLeft } from "lucide-react";
import { MOCK_POSTS, type BlogPost } from "./blog.index";

export const Route = createFileRoute("/blog/$postSlug")({
  loader: ({ params }) => {
    const post = MOCK_POSTS.find((p) => p.slug === params.postSlug);
    if (!post) throw notFound();
    return { post };
  },
  head: ({ loaderData }) => {
    if (!loaderData) return {};
    const { post } = loaderData;
    return {
      meta: [
        { title: `${post.title} | Raani Chittroda` },
        { name: "description", content: post.summary },
        { property: "og:title", content: `${post.title} | Raani Chittroda` },
        { property: "og:description", content: post.summary },
        { property: "og:image", content: post.image },
      ],
    };
  },
  component: BlogPostDetails,
});

// Full detailed HTML/JSON contents for mock articles
const ARTICLES_CONTENT: Record<string, JSX.Element> = {
  "ultimate-925-silver-rakhi-buying-guide": (
    <div className="space-y-6">
      <p>
        Raksha Bandhan is a celebration of the enduring bond between siblings. Traditionally, a sacred thread was tied around a brother's wrist. Over the years, this ritual has taken a luxurious and meaningful turn. Today, more sisters are choosing to tie a <strong>925 sterling silver rakhi</strong>. But why has sterling silver become the premier choice?
      </p>
      <h2 className="font-display text-2xl text-foreground mt-8">1. Intrinsic and Lasting Value</h2>
      <p>
        Unlike standard thread rakhis that are discarded after a few days, a <strong>925 silver rakhi</strong> carries lasting intrinsic value. It is an investment in pure precious metal. It is BIS hallmarked, guaranteeing 92.5% silver purity. It does not go to waste; rather, it remains an heirloom keepsake representing a sacred bond.
      </p>
      <h2 className="font-display text-2xl text-foreground mt-8">2. Doubles as a Luxury Bracelet</h2>
      <p>
        Many of our silver rakhi designs are crafted as dynamic bracelets with adjustable chains. Once the festival ends, your brother can continue to wear it as a stylish sterling silver bracelet, pairing beautifully with both casual and ethnic outfits.
      </p>
      <h2 className="font-display text-2xl text-foreground mt-8">3. Certified BIS Purity Standard</h2>
      <p>
        When you <strong>buy silver rakhi online</strong> from Raani Chittroda, you get absolute transparency. Every piece features the 925 authenticity stamp. This stamp confirms the metal composition, ensuring your sibling receives nothing but genuine sterling silver.
      </p>
      <h2 className="font-display text-2xl text-foreground mt-8">Choosing the Perfect Design</h2>
      <p>
        For brothers who prefer traditional styles, choose religious motifs such as Om, Ganesha, Swastik, or Trishul. If he prefers modern designs, go for sleek geometric links or minimalist bar bracelets. Celebrate this Raksha Bandhan with authenticity and style.
      </p>
    </div>
  ),
  "how-to-clean-and-care-for-sterling-silver-jewellery": (
    <div className="space-y-6">
      <p>
        Sterling silver is famous for its bright, reflective finish. However, anyone who owns silver jewellery knows it can tarnish over time. Tarnishing is a completely natural chemical process called oxidation. The good news is that with a few simple habits, you can keep your <strong>sterling silver jewellery</strong> sparkling forever.
      </p>
      <h2 className="font-display text-2xl text-foreground mt-8">1. Store Safely in Airtight Pouches</h2>
      <p>
        Silver tarnishes when exposed to moisture and air. When not wearing your silver chains or necklaces, store them in dry, airtight ziplock bags. Keep them separate from other metals to prevent scratches.
      </p>
      <h2 className="font-display text-2xl text-foreground mt-8">2. Avoid Harsh Chemicals</h2>
      <p>
        Remove your silver rings, bracelets, and ornaments before swimming, bathing, or using household cleaning agents. Perfumes, hairsprays, and lotions can also accelerate oxidation, so put your jewellery on last.
      </p>
      <h2 className="font-display text-2xl text-foreground mt-8">3. Simple Cleaning Methods</h2>
      <p>
        For light cleaning, use a special microfiber silver polishing cloth. Rub in gentle, straight-line motions. If your jewellery has deep tarnish, soak it in warm water with a few drops of mild dish soap, scrub gently with a soft toothbrush, rinse thoroughly, and pat dry.
      </p>
      <h2 className="font-display text-2xl text-foreground mt-8">Our Quality promise</h2>
      <p>
        At Raani Chittroda, we apply premium anti-tarnish coatings to all our gold and silver articles. However, proper personal care ensures their lifetime polish remains intact.
      </p>
    </div>
  ),
  "top-5-meaningful-raksha-bandhan-gifting-ideas": (
    <div className="space-y-6">
      <p>
        Gifting is an integral part of Raksha Bandhan. It is a way to say thank you for always being there. Instead of generic items, choose a gift that lasts. Here are our top 5 meaningful silver and gold gifting recommendations:
      </p>
      <h2 className="font-display text-2xl text-foreground mt-8">1. BIS Hallmarked Silver Coins</h2>
      <p>
        Silver coins represent prosperity and good fortune. Gift your brother a 999 fine silver coin engraved with Lakshmi-Ganesha or a custom message. It is a classic gift that holds investment value.
      </p>
      <h2 className="font-display text-2xl text-foreground mt-8">2. Personalized Sterling Silver rings</h2>
      <p>
        A minimalist silver ring engraved with initials or sibling quotes makes a highly personal and memorable keepsake.
      </p>
      <h2 className="font-display text-2xl text-foreground mt-8">3. Handcrafted Deity Idols & Murtis</h2>
      <p>
        Tying a rakhi is a divine occasion. Gift your sibling a beautifully sculpted silver murti of Lord Ganesha or Balaji for their home or car dashboard, symbolizing blessing and protection.
      </p>
      <h2 className="font-display text-2xl text-foreground mt-8">4. Sleek Silver Chains</h2>
      <p>
        A durable sterling silver chain is a versatile asset. It can be worn daily and serves as a premium fashion accessory.
      </p>
      <h2 className="font-display text-2xl text-foreground mt-8">5. Gift Cards & Bespoke Commissions</h2>
      <p>
        Can't decide? Give them the gift of choice with a custom gift article card or commission a custom design via our WhatsApp atelier service.
      </p>
    </div>
  ),
  "summer-silver-jewellery-trends-you-need-to-know": (
    <div className="space-y-6">
      <p>
        As fashion pivots towards comfort and styling versatility, sterling silver has taken center stage. This summer, light, airy, and reflective metals are dominating the fashion runways. Let's look at the top silver jewellery trends of the season.
      </p>
      <h2 className="font-display text-2xl text-foreground mt-8">1. Stackable Minimalist Rings</h2>
      <p>
        Less is no longer more—layering is key. Stacking multiple dainty sterling silver rings on different fingers creates a unique, boho-chic look suitable for beach outfits and brunch parties.
      </p>
      <h2 className="font-display text-2xl text-foreground mt-8">2. Chunky Silver Kadas</h2>
      <p>
        For a touch of traditional bold style, heavy kadas and textured cuffs are making a huge comeback. They offer a strong fashion statement for both men and women.
      </p>
      <h2 className="font-display text-2xl text-foreground mt-8">3. Delicate Layered Necklaces</h2>
      <p>
        Layering thin silver chains with tiny pendants—such as stars, coins, or initial tags—adds an effortless, elegant sparkle to summer dresses.
      </p>
      <h2 className="font-display text-2xl text-foreground mt-8">Find Your Style</h2>
      <p>
        Embrace summer with Raani Chittroda's curated list of trendy silver jewellery, designed to make you shine with elegance.
      </p>
    </div>
  ),
  "corporate-gifting-guide-fine-silver-coins-and-gift-articles": (
    <div className="space-y-6">
      <p>
        Corporate gifting is more than a formality; it is a relationship-builder. Giving cheap, disposable gifts can reflect poorly on your brand. Fine silver coins and customized gift articles are the perfect high-value corporate gift choice.
      </p>
      <h2 className="font-display text-2xl text-foreground mt-8">1. Custom Brand Engraving</h2>
      <p>
        We manufacture 999 fine silver coins customized with your company logo or client initials, providing a polished and professional finish.
      </p>
      <h2 className="font-display text-2xl text-foreground mt-8">2. Auspicious and Respected</h2>
      <p>
        In Indian business culture, gifting silver represents auspicious beginnings, respect, and wealth. It is a gift that clients and partners display with pride.
      </p>
      <h2 className="font-display text-2xl text-foreground mt-8">3. Lifetime Value</h2>
      <p>
        Precious metals do not lose value. While electronics decay, silver is a stable asset that appreciates over time, reflecting your company's stable vision.
      </p>
    </div>
  ),
};

function BlogPostDetails() {
  const { post } = Route.useLoaderData();
  const content = ARTICLES_CONTENT[post.slug] || <p>Article content is coming soon.</p>;

  return (
    <div className="max-w-3xl mx-auto space-y-8">
      {/* Blog posting schema */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "BlogPosting",
        "headline": post.title,
        "image": post.image,
        "datePublished": post.date,
        "description": post.summary,
        "author": {
          "@type": "Organization",
          "name": "Raani Chittroda"
        }
      })}} />

      {/* Breadcrumb List Schema */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        "itemListElement": [
          {
            "@type": "ListItem",
            "position": 1,
            "name": "Home",
            "item": "https://raanichittroda.netlify.app"
          },
          {
            "@type": "ListItem",
            "position": 2,
            "name": "Blog",
            "item": "https://raanichittroda.netlify.app/blog"
          },
          {
            "@type": "ListItem",
            "position": 3,
            "name": post.title,
            "item": `https://raanichittroda.netlify.app/blog/${post.slug}`
          }
        ]
      })}} />

      {/* Back button */}
      <Link to="/blog" className="inline-flex items-center gap-2 text-xs uppercase tracking-wider text-muted-foreground hover:text-gold transition-colors">
        <ArrowLeft className="w-4 h-4" /> Back to blog list
      </Link>

      {/* Article Header */}
      <div className="space-y-4">
        <span className="text-xs uppercase tracking-[0.2em] text-gold font-medium">{post.category}</span>
        <h1 className="font-display text-4xl sm:text-5xl text-foreground leading-tight">{post.title}</h1>
        <div className="flex items-center gap-6 text-xs uppercase tracking-wider text-muted-foreground pt-2">
          <span className="flex items-center gap-1.5"><Calendar className="w-3.5 h-3.5" /> {post.date}</span>
          <span className="flex items-center gap-1.5"><Clock className="w-3.5 h-3.5" /> {post.readTime}</span>
        </div>
      </div>

      {/* Article Featured Image */}
      <div className="aspect-[16/9] overflow-hidden bg-secondary border border-border">
        <img src={post.image} alt={post.title} className="w-full h-full object-cover" />
      </div>

      {/* Article Content */}
      <article className="prose prose-gold max-w-none text-muted-foreground space-y-6 text-sm sm:text-base leading-relaxed pt-4">
        {content}
      </article>

      {/* Call to Action */}
      <div className="border border-gold bg-secondary p-8 text-center space-y-4 mt-12">
        <h3 className="font-display text-2xl text-foreground">Explore Our Handcrafted Collection</h3>
        <p className="text-sm text-muted-foreground max-w-md mx-auto">
          We deal in hallmarked 925 sterling silver rakhis, luxury gift articles, and custom gold ornaments.
        </p>
        <Link to="/collections" className="btn-gold inline-block mt-2">
          Shop Collections
        </Link>
      </div>
    </div>
  );
}
