import { createFileRoute, Link, useLoaderData, notFound } from "@tanstack/react-router";
import { Search, SlidersHorizontal } from "lucide-react";
import { useMemo, useState } from "react";
import { getCategories, getProducts, type CategorySlug } from "@/lib/products";
import { ProductCard } from "@/components/ProductCard";

export const Route = createFileRoute("/collections/$categorySlug")({
  loader: async ({ params }) => {
    const [categories, products] = await Promise.all([getCategories(), getProducts()]);
    const activeCategory = categories.find((c) => c.slug === params.categorySlug);
    
    if (!activeCategory) {
      throw notFound();
    }
    
    return { categories, products, activeCategory };
  },
  head: ({ loaderData }) => {
    if (!loaderData) return {};
    const { activeCategory } = loaderData;
    
    // SEO Titles based on requested keywords
    let title = `${activeCategory.name} | Chittroda Jewellery | Raani Chittroda`;
    let desc = `${activeCategory.blurb} Handcrafted 925 sterling silver ornaments from Raani Chittroda. Authenticity guaranteed.`;
    
    if (activeCategory.slug.includes("rakhi")) {
      title = `Buy 925 Silver Rakhi Online | Handmade Silver Rakhis - Raani Chittroda`;
      desc = `Explore our premium BIS hallmarked 925 Silver Rakhi collection. Handcrafted sterling silver rakhis, designer kadas, and custom Raksha Bandhan gifts with safe PAN India shipping.`;
    }
    
    return {
      meta: [
        { title },
        { name: "description", content: desc },
        { property: "og:title", content: title },
        { property: "og:description", content: desc },
        { property: "og:image", content: activeCategory.image },
      ],
    };
  },
  component: CategoryLandingPage,
});

function CategoryLandingPage() {
  const { categories, products, activeCategory } = Route.useLoaderData();
  const [searchQuery, setSearchQuery] = useState("");

  const filteredProducts = useMemo(() => {
    let result = products.filter((p) => p.category === activeCategory.slug);
    if (searchQuery.trim() !== "") {
      const q = searchQuery.toLowerCase();
      result = result.filter(
        (p) => p.name.toLowerCase().includes(q) || p.id.toLowerCase().includes(q),
      );
    }
    return result;
  }, [activeCategory.slug, searchQuery, products]);

  return (
    <div className="bg-background pt-16">
      {/* JSON-LD Schemas */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "CollectionPage",
        "name": `${activeCategory.name} Collection`,
        "description": activeCategory.blurb,
        "url": `https://raanichittroda.netlify.app/collections/${activeCategory.slug}`,
        "mainEntity": {
          "@type": "ItemList",
          "itemListElement": filteredProducts.slice(0, 12).map((p, idx) => ({
            "@type": "ListItem",
            "position": idx + 1,
            "url": `https://raanichittroda.netlify.app/product/${p.id}`
          }))
        }
      })}} />

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
            "name": "Collections",
            "item": "https://raanichittroda.netlify.app/collections"
          },
          {
            "@type": "ListItem",
            "position": 3,
            "name": activeCategory.name,
            "item": `https://raanichittroda.netlify.app/collections/${activeCategory.slug}`
          }
        ]
      })}} />

      {/* Breadcrumbs */}
      <div className="mx-auto max-w-7xl px-6 pt-6 sm:px-8">
        <nav className="text-[10px] uppercase tracking-[0.28em] text-muted-foreground flex items-center gap-2">
          <Link to="/" className="hover:text-gold">Home</Link>
          <span>/</span>
          <Link to="/collections" className="hover:text-gold">Collections</Link>
          <span>/</span>
          <span className="text-foreground">{activeCategory.name}</span>
        </nav>
      </div>

      {/* Header */}
      <section className="bg-secondary py-16 sm:py-24 mt-2">
        <div className="mx-auto max-w-7xl px-6 text-center sm:px-8">
          <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl text-foreground">
            {activeCategory.name}
          </h1>
          <p className="mx-auto mt-4 max-w-xl text-muted-foreground">
            {activeCategory.blurb}
          </p>
        </div>
      </section>

      {/* Main content */}
      <section className="mx-auto flex max-w-7xl flex-col gap-8 px-6 py-12 sm:px-8 lg:flex-row">
        {/* Sidebar Filters */}
        <aside className="w-full lg:w-64 shrink-0">
          <div className="sticky top-24 space-y-8">
            <div>
              <h3 className="flex items-center gap-2 font-display text-lg border-b border-border pb-3 text-foreground">
                <SlidersHorizontal className="h-4 w-4" /> Collections
              </h3>
              <div className="mt-5 space-y-2">
                <Link
                  to="/collections"
                  className="block text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  All Products
                </Link>
                {categories.map((c) => (
                  <Link
                    key={c.slug}
                    to="/collections/$categorySlug"
                    params={{ categorySlug: c.slug }}
                    className={`block text-sm transition-colors ${
                      activeCategory.slug === c.slug ? "text-gold font-medium" : "text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    {c.name}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </aside>

        {/* Product Grid */}
        <div className="flex-1">
          {/* Toolbar */}
          <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between border-b border-border pb-4">
            <p className="text-sm text-muted-foreground">
              Showing <span className="font-medium text-foreground">{filteredProducts.length}</span> products
            </p>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search category products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full sm:w-64 rounded-none border border-border bg-transparent py-2 pl-9 pr-3 text-sm text-foreground focus:border-gold focus:outline-none focus:ring-0"
              />
            </div>
          </div>

          {/* Grid */}
          {filteredProducts.length > 0 ? (
            <div className="grid grid-cols-2 gap-x-4 gap-y-10 sm:gap-x-6 md:grid-cols-3 lg:gap-x-8">
              {filteredProducts.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          ) : (
            <div className="py-20 text-center">
              <h3 className="font-display text-xl text-foreground">No pieces found in this collection.</h3>
              <p className="mt-2 text-muted-foreground">Try searching or view another collection.</p>
              <Link
                to="/collections"
                className="mt-6 inline-block text-sm uppercase tracking-widest text-gold hover:text-gold/80"
              >
                View all collections
              </Link>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
