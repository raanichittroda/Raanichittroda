import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { Minus, Plus, ShieldCheck, Sparkles, Truck } from "lucide-react";
import { useState } from "react";
import { useCart } from "@/lib/cart";
import { formatINR, getCategory, getProduct, products } from "@/lib/products";
import { ProductCard } from "@/components/ProductCard";
import { WaIcon } from "@/components/ProductCard";
import { buildWhatsAppUrl, productInquiryMessage } from "@/lib/whatsapp";

export const Route = createFileRoute("/product/$id")({
  loader: ({ params }) => {
    const product = getProduct(params.id);
    if (!product) throw notFound();
    return { product };
  },
  head: ({ loaderData }) => ({
    meta: loaderData
      ? [
          { title: `${loaderData.product.name} — Aurelia` },
          { name: "description", content: loaderData.product.description },
          { property: "og:title", content: `${loaderData.product.name} — Aurelia` },
          { property: "og:description", content: loaderData.product.description },
          { property: "og:image", content: loaderData.product.image },
        ]
      : [],
  }),
  notFoundComponent: () => (
    <div className="grid min-h-[60vh] place-items-center px-6 text-center">
      <div>
        <p className="eyebrow">404</p>
        <h1 className="mt-3 font-display text-4xl">Piece not found</h1>
        <Link to="/collections" className="btn-gold mt-8">Back to collections</Link>
      </div>
    </div>
  ),
  component: ProductPage,
});

function ProductPage() {
  const { product } = Route.useLoaderData();
  const { add } = useCart();
  const [qty, setQty] = useState(1);
  const category = getCategory(product.category);
  const related = products.filter((p) => p.category === product.category && p.id !== product.id).slice(0, 4);
  const waUrl = buildWhatsAppUrl(productInquiryMessage({ name: product.name, id: product.id }));

  return (
    <div className="bg-background">
      <div className="mx-auto max-w-7xl px-6 py-8 sm:px-8 sm:py-10">
        <nav className="text-[10px] uppercase tracking-[0.28em] text-muted-foreground">
          <Link to="/" className="hover:text-gold">Home</Link>
          <span className="mx-2">/</span>
          <Link to="/collections" search={{ category: product.category }} className="hover:text-gold">
            {category?.name}
          </Link>
          <span className="mx-2">/</span>
          <span className="text-foreground">{product.name}</span>
        </nav>
      </div>

      <div className="mx-auto grid max-w-7xl gap-12 px-6 pb-16 sm:px-8 md:grid-cols-2 md:gap-16">
        <div className="aspect-[4/5] overflow-hidden bg-secondary">
          <img src={product.image} alt={product.name} className="h-full w-full object-cover" />
        </div>

        <div className="flex flex-col">
          <span className="eyebrow">{category?.name}</span>
          <h1 className="mt-3 font-display text-4xl leading-tight sm:text-5xl">{product.name}</h1>
          <p className="mt-2 text-[10px] tracking-[0.28em] uppercase text-muted-foreground">
            ID · {product.id}
          </p>
          <p className="mt-6 font-display text-3xl text-foreground">{formatINR(product.price)}</p>
          <p className="mt-1 text-xs text-muted-foreground">Inclusive of all taxes</p>

          <div className="mt-8 h-px w-full bg-border" />

          <p className="mt-8 text-sm leading-relaxed text-muted-foreground">{product.description}</p>

          <dl className="mt-8 grid grid-cols-2 gap-y-3 text-sm">
            <dt className="text-muted-foreground">Purity</dt>
            <dd>{product.purity}</dd>
            <dt className="text-muted-foreground">Weight (approx.)</dt>
            <dd>{product.weight}</dd>
            <dt className="text-muted-foreground">Hallmark</dt>
            <dd>BIS Certified</dd>
          </dl>

          {/* Quantity + Add */}
          <div className="mt-10 flex flex-wrap items-stretch gap-3">
            <div className="inline-flex items-center border border-border">
              <button onClick={() => setQty((q) => Math.max(1, q - 1))} aria-label="Decrease" className="grid h-12 w-12 place-items-center hover:text-gold">
                <Minus className="h-4 w-4" />
              </button>
              <span className="w-10 text-center text-sm">{qty}</span>
              <button onClick={() => setQty((q) => q + 1)} aria-label="Increase" className="grid h-12 w-12 place-items-center hover:text-gold">
                <Plus className="h-4 w-4" />
              </button>
            </div>
            <button onClick={() => add(product.id, qty)} className="btn-gold flex-1">
              Add to Bag
            </button>
            <a href={waUrl} target="_blank" rel="noopener noreferrer" className="btn-outline-gold gap-2">
              <WaIcon className="h-4 w-4" /> Inquire
            </a>
          </div>

          <ul className="mt-10 grid gap-4 sm:grid-cols-3">
            {[
              { icon: ShieldCheck, t: "Hallmarked" },
              { icon: Truck, t: "Insured shipping" },
              { icon: Sparkles, t: "Lifetime polish" },
            ].map((f) => (
              <li key={f.t} className="flex items-center gap-2 text-xs text-muted-foreground">
                <f.icon className="h-4 w-4 text-gold" /> {f.t}
              </li>
            ))}
          </ul>
        </div>
      </div>

      {related.length > 0 && (
        <section className="border-t border-border bg-secondary py-20">
          <div className="mx-auto max-w-7xl px-6 sm:px-8">
            <div className="mb-10 text-center sm:text-left">
              <span className="eyebrow">Pairs Beautifully With</span>
              <h2 className="mt-3 font-display text-3xl sm:text-4xl">From the same collection</h2>
            </div>
            <div className="grid grid-cols-2 gap-6 md:grid-cols-4">
              {related.map((p) => <ProductCard key={p.id} product={p} />)}
            </div>
          </div>
        </section>
      )}
    </div>
  );
}