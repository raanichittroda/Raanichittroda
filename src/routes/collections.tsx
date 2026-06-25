import { createFileRoute, Link } from "@tanstack/react-router";
import { Search, SlidersHorizontal } from "lucide-react";
import { useMemo, useState } from "react";
import { z } from "zod";
import { categories, products, type CategorySlug } from "@/lib/products";
import { ProductCard } from "@/components/ProductCard";

const search = z.object({
  category: z
    .enum([
      "silver-rakhis",
      "silver-murtis",
      "silver-necklaces",
      "silver-chains",
      "silver-bracelets",
      "silver-coins",
      "gift-collection",
    ])
    .optional(),
});

export const Route = createFileRoute("/collections")({
  validateSearch: search,
  head: () => ({
    meta: [
      { title: "Collections — Aurelia" },
      { name: "description", content: "Browse the full Aurelia collection of silver rakhis, murtis, necklaces, chains, bracelets, coins and gift sets." },
      { property: "og:title", content: "Collections — Aurelia" },
      { property: "og:description", content: "Hand-crafted gold and silver, organised by craft." },
    ],
  }),
  component: Collections,
});

const maxPrice = Math.max(...products.map((p) => p.price));

function Collections() {
  const { category } = Route.useSearch();
  const [active, setActive] = useState<CategorySlug | "all">(category ?? "all");
  const [query, setQuery] = useState("");
  const [priceCap, setPriceCap] = useState(maxPrice);
  const [showFilters, setShowFilters] = useState(false);

  // Sync from URL
  useMemo(() => setActive(category ?? "all"), [category]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return products.filter((p) => {
      if (active !== "all" && p.category !== active) return false;
      if (p.price > priceCap) return false;
      if (q && !`${p.name} ${p.id}`.toLowerCase().includes(q)) return false;
      return true;
    });
  }, [active, query, priceCap]);

  return (
    <div className="bg-background">
      {/* Page header */}
      <header className="border-b border-border bg-secondary">
        <div className="mx-auto max-w-7xl px-6 py-16 sm:px-8 sm:py-20 text-center">
          <span className="eyebrow">The Collections</span>
          <h1 className="mt-3 font-display text-5xl sm:text-6xl">Find your forever piece</h1>
          <p className="mx-auto mt-4 max-w-xl text-sm text-muted-foreground sm:text-base">
            Filter by craft, price, or search by name and product ID.
          </p>
        </div>
      </header>

      <div className="mx-auto max-w-7xl px-6 py-12 sm:px-8">
        {/* Search + filter trigger (mobile) */}
        <div className="mb-8 grid grid-cols-[1fr_auto] items-center gap-3 sm:grid-cols-[1fr_auto_auto]">
          <label className="relative block">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search by name or product ID"
              className="w-full border border-border bg-background py-3 pl-10 pr-4 text-sm placeholder:text-muted-foreground focus:border-gold focus:outline-none"
              maxLength={80}
            />
          </label>
          <button
            type="button"
            onClick={() => setShowFilters((s) => !s)}
            className="grid h-12 w-12 place-items-center border border-border text-foreground sm:hidden"
            aria-label="Toggle filters"
          >
            <SlidersHorizontal className="h-4 w-4" />
          </button>
          <p className="hidden text-xs tracking-[0.24em] uppercase text-muted-foreground sm:block">
            {filtered.length} pieces
          </p>
        </div>

        <div className="grid gap-10 md:grid-cols-[240px_1fr]">
          {/* Filters */}
          <aside className={`${showFilters ? "block" : "hidden"} md:block`}>
            <div>
              <h3 className="eyebrow">Category</h3>
              <ul className="mt-5 space-y-2">
                <li>
                  <Link
                    to="/collections"
                    className={`block text-sm transition ${
                      active === "all" ? "text-gold" : "text-foreground hover:text-gold"
                    }`}
                  >
                    All Collections
                  </Link>
                </li>
                {categories.map((c) => (
                  <li key={c.slug}>
                    <Link
                      to="/collections"
                      search={{ category: c.slug }}
                      className={`block text-sm transition ${
                        active === c.slug ? "text-gold" : "text-foreground hover:text-gold"
                      }`}
                    >
                      {c.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-10">
              <h3 className="eyebrow">Price</h3>
              <div className="mt-5">
                <input
                  type="range"
                  min={1000}
                  max={maxPrice}
                  step={500}
                  value={priceCap}
                  onChange={(e) => setPriceCap(Number(e.target.value))}
                  className="w-full accent-[oklch(0.72_0.13_80)]"
                />
                <div className="mt-2 flex justify-between text-[10px] tracking-[0.2em] uppercase text-muted-foreground">
                  <span>Up to</span>
                  <span>₹{priceCap.toLocaleString("en-IN")}</span>
                </div>
              </div>
            </div>
          </aside>

          {/* Grid */}
          <div>
            {filtered.length === 0 ? (
              <div className="border border-dashed border-border p-16 text-center">
                <p className="font-display text-2xl">No pieces match.</p>
                <p className="mt-2 text-sm text-muted-foreground">Try clearing filters or a different search.</p>
              </div>
            ) : (
              <div className="grid grid-cols-2 gap-6 lg:grid-cols-3">
                {filtered.map((p) => <ProductCard key={p.id} product={p} />)}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}