import { createFileRoute, Link, useLoaderData } from "@tanstack/react-router";
import { Search, SlidersHorizontal } from "lucide-react";
import { useMemo, useState } from "react";
import { z } from "zod";
import { getCategories, getProducts, type CategorySlug } from "@/lib/products";
import { ProductCard } from "@/components/ProductCard";

const search = z.object({
  category: z
    .enum([
      "silver-rakhis",
      "silver-murtis",
      "silver-necklaces",
      "silver-chains",
      "silver-bracelets",
      "silver-rings",
      "silver-coins",
      "silver-gift-articles",
      "gold-jewellery",
      "custom-orders",
    ])
    .optional(),
});

export const Route = createFileRoute("/collections")({
  validateSearch: search,
  head: () => ({
    meta: [
      { title: "Collections — Raani Chittroda" },
      { name: "description", content: "Explore our finely crafted gold and silver jewellery collections." },
    ],
  }),
  loader: async () => {
    const [categories, products] = await Promise.all([getCategories(), getProducts()]);
    return { categories, products };
  },
  component: Collections,
});

function Collections() {
  const { categories, products } = Route.useLoaderData();
  const searchParams = Route.useSearch();
  const initialCategory = categories.find((c) => c.slug === searchParams.category)?.slug;
  const [activeCategory, setActiveCategory] = useState<CategorySlug | "all">(
    (initialCategory as CategorySlug) || "all",
  );
  const [searchQuery, setSearchQuery] = useState("");

  const filteredProducts = useMemo(() => {
    let result = products;
    if (activeCategory !== "all") {
      result = result.filter((p) => p.category === activeCategory);
    }
    if (searchQuery.trim() !== "") {
      const q = searchQuery.toLowerCase();
      result = result.filter(
        (p) => p.name.toLowerCase().includes(q) || p.id.toLowerCase().includes(q),
      );
    }
    return result;
  }, [activeCategory, searchQuery, products]);

  const activeCategoryData =
    activeCategory !== "all" ? categories.find((c) => c.slug === activeCategory) : null;

  return (
    <div className="bg-background pt-16">
      {/* Header */}
      <section className="bg-secondary py-16 sm:py-24">
        <div className="mx-auto max-w-7xl px-6 text-center sm:px-8">
          <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl text-foreground">
            {activeCategoryData ? activeCategoryData.name : "All Collections"}
          </h1>
          <p className="mx-auto mt-4 max-w-xl text-muted-foreground">
            {activeCategoryData
              ? activeCategoryData.blurb
              : "Discover our entire catalog of masterfully crafted pieces, suitable for retail and wholesale."}
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
                <SlidersHorizontal className="h-4 w-4" /> Filters
              </h3>
              <div className="mt-5 space-y-2">
                <button
                  onClick={() => setActiveCategory("all")}
                  className={`block w-full text-left text-sm transition-colors ${
                    activeCategory === "all" ? "text-gold font-medium" : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  All Products
                </button>
                {categories.map((c) => (
                  <button
                    key={c.slug}
                    onClick={() => setActiveCategory(c.slug)}
                    className={`block w-full text-left text-sm transition-colors ${
                      activeCategory === c.slug ? "text-gold font-medium" : "text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    {c.name}
                  </button>
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
                placeholder="Search products..."
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
              <h3 className="font-display text-xl text-foreground">No pieces found.</h3>
              <p className="mt-2 text-muted-foreground">Try adjusting your filters or search term.</p>
              <button
                onClick={() => {
                  setActiveCategory("all");
                  setSearchQuery("");
                }}
                className="mt-6 text-sm uppercase tracking-widest text-gold hover:text-gold/80"
              >
                Clear all filters
              </button>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}