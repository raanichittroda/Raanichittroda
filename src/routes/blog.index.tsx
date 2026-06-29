import { createFileRoute, Link } from "@tanstack/react-router";
import { useState, useMemo } from "react";
import { Clock, Calendar, ArrowRight } from "lucide-react";

export const Route = createFileRoute("/blog/")({
  head: () => ({
    meta: [
      { title: "Gold & Silver Jewellery Guide Blog | Raani Chittroda" },
      { name: "description", content: "Explore the Raani Chittroda blog for silver rakhi styling guides, gold jewellery trends, sterling silver care tips, and festive gifting ideas." },
    ],
  }),
  component: BlogIndex,
});

export const BLOG_CATEGORIES = [
  "All Articles",
  "Silver Rakhi Guide",
  "Jewellery Care",
  "Raksha Bandhan Ideas",
  "Silver Jewellery Trends",
  "Gift Guides"
] as const;

export interface BlogPost {
  slug: string;
  title: string;
  category: typeof BLOG_CATEGORIES[number];
  summary: string;
  date: string;
  readTime: string;
  image: string;
}

export const MOCK_POSTS: BlogPost[] = [
  {
    slug: "ultimate-925-silver-rakhi-buying-guide",
    title: "The Ultimate 925 Sterling Silver Rakhi Buying Guide",
    category: "Silver Rakhi Guide",
    summary: "Understand what makes sterling silver rakhis the perfect legacy choice for your brother. Learn how to verify BIS hallmarks, purity, and choose designs that double as premium bracelets.",
    date: "June 25, 2026",
    readTime: "6 min read",
    image: "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&q=80&w=600"
  },
  {
    slug: "how-to-clean-and-care-for-sterling-silver-jewellery",
    title: "How to Keep Your Sterling Silver Sparkling: Care & Repair Guidelines",
    category: "Jewellery Care",
    summary: "Discover why silver oxidizes and learn expert tips on restoring the signature shine of your favourite silver chains, necklaces, and rings with simple home methods and legacy care.",
    date: "June 20, 2026",
    readTime: "4 min read",
    image: "https://images.unsplash.com/photo-1617038260897-41a1f14a8ca0?auto=format&fit=crop&q=80&w=600"
  },
  {
    slug: "top-5-meaningful-raksha-bandhan-gifting-ideas",
    title: "Top 5 Meaningful Gifts for Sibling protection on Raksha Bandhan",
    category: "Raksha Bandhan Ideas",
    summary: "Make this festival unforgettable with thoughtful heirloom-quality gifts. From dynamic silver deity murtis to customizable gold pendants, discover gifts carrying emotional value.",
    date: "June 18, 2026",
    readTime: "5 min read",
    image: "https://images.unsplash.com/photo-1601004890684-d8cbf643f5f2?auto=format&fit=crop&q=80&w=600"
  },
  {
    slug: "summer-silver-jewellery-trends-you-need-to-know",
    title: "Summer Jewellery Trends: The Rise of Minimalist 925 Silver Ornaments",
    category: "Silver Jewellery Trends",
    summary: "Explore why minimalist sterling silver necklaces, lightweight kadas, and statement stackable rings are dominating the fashion landscape this season. Perfect for transition styling.",
    date: "June 12, 2026",
    readTime: "5 min read",
    image: "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?auto=format&fit=crop&q=80&w=600"
  },
  {
    slug: "corporate-gifting-guide-fine-silver-coins-and-gift-articles",
    title: "Corporate Gifting Guide: Why Hallmarked Silver Coins Stand Out",
    category: "Gift Guides",
    summary: "A professional guide on selecting corporate gifts for employees, clients, and partners. Learn the intrinsic value benefits of hallmarked silver coins and custom engraved articles.",
    date: "June 05, 2026",
    readTime: "4 min read",
    image: "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&q=80&w=600"
  }
];

function BlogIndex() {
  const [activeCategory, setActiveCategory] = useState<typeof BLOG_CATEGORIES[number] | "All Articles">("All Articles");

  const filteredPosts = useMemo(() => {
    if (activeCategory === "All Articles") return MOCK_POSTS;
    return MOCK_POSTS.filter(post => post.category === activeCategory);
  }, [activeCategory]);

  return (
    <div className="space-y-12">
      {/* Breadcrumb */}
      <nav className="text-[10px] uppercase tracking-[0.28em] text-muted-foreground flex items-center gap-2">
        <Link to="/" className="hover:text-gold">Home</Link>
        <span>/</span>
        <span className="text-foreground">Blog</span>
      </nav>

      {/* Hero Header */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl text-foreground">
          The Raani Chittroda Blog
        </h1>
        <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
          Your source for sterling silver rakhi reviews, luxury jewellery care manuals, styling trends, and heritage craftsmanship guides.
        </p>
      </div>

      {/* Category Tabs */}
      <div className="flex flex-wrap justify-center gap-2 border-b border-border pb-6">
        {BLOG_CATEGORIES.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`px-4 py-2 text-xs uppercase tracking-wider transition-colors border rounded-full ${
              activeCategory === cat 
                ? "bg-gold border-gold text-ink font-semibold" 
                : "border-border text-muted-foreground hover:border-foreground hover:text-foreground"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Grid listing */}
      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        {filteredPosts.map((post) => (
          <article key={post.slug} className="group flex flex-col border border-border bg-secondary overflow-hidden transition hover:border-gold">
            <Link to="/blog/$postSlug" params={{ postSlug: post.slug }} className="block aspect-[16/10] overflow-hidden bg-background">
              <img 
                src={post.image} 
                alt={post.title} 
                loading="lazy"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" 
              />
            </Link>
            <div className="flex-1 p-6 flex flex-col justify-between space-y-4">
              <div className="space-y-2">
                <span className="text-[10px] uppercase tracking-[0.2em] text-gold font-medium">{post.category}</span>
                <h2 className="font-display text-2xl text-foreground leading-snug group-hover:text-gold transition-colors">
                  <Link to="/blog/$postSlug" params={{ postSlug: post.slug }}>
                    {post.title}
                  </Link>
                </h2>
                <p className="text-xs sm:text-sm text-muted-foreground line-clamp-3 leading-relaxed">
                  {post.summary}
                </p>
              </div>
              <div className="flex items-center justify-between pt-4 border-t border-border/60 text-[10px] uppercase tracking-wider text-muted-foreground">
                <span className="flex items-center gap-1.5"><Calendar className="w-3.5 h-3.5" /> {post.date}</span>
                <span className="flex items-center gap-1.5"><Clock className="w-3.5 h-3.5" /> {post.readTime}</span>
              </div>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
