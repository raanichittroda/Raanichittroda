import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { Minus, Plus, ShieldCheck, Sparkles, Truck } from "lucide-react";
import { useState, useEffect } from "react";
import { useCart } from "@/lib/cart";
import { useRecentlyViewed } from "@/hooks/useRecentlyViewed";
import { formatINR, getCategory, getProduct, getProductsByCategory, getProducts } from "@/lib/products";
import { ProductCard } from "@/components/ProductCard";
import { StickyCart } from "@/components/StickyCart";
import { WaIcon } from "@/components/ProductCard";
import { buildWhatsAppUrl, productInquiryMessage } from "@/lib/whatsapp";
import type { Product, ProductMedia } from "@/lib/products";
import { getProductMedia } from "@/lib/products";
import { Play, X } from "lucide-react";

export const Route = createFileRoute("/product/$id")({
  loader: async ({ params }) => {
    const product = await getProduct(params.id);
    if (!product) throw notFound();
    
    const [category, related, media] = await Promise.all([
      getCategory(product.category),
      getProductsByCategory(product.category),
      getProductMedia(product.id)
    ]);

    return { 
      product, 
      category, 
      media,
      related: related.filter(p => p.id !== product.id).slice(0, 4) 
    };
  },
  head: ({ loaderData }) => ({
    meta: loaderData
      ? [
          { title: `${loaderData.product.name} — Raani Chittroda` },
          { name: "description", content: loaderData.product.description },
          { property: "og:title", content: `${loaderData.product.name} — Raani Chittroda` },
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
  const { product, category, related, media } = Route.useLoaderData();
  const { add } = useCart();
  const { addViewed, items: viewedIds } = useRecentlyViewed();
  const [qty, setQty] = useState(1);
  const [orderType, setOrderType] = useState<"Retail" | "Wholesale" | "Bulk">("Retail");
  const minQty = orderType === "Retail" ? 1 : orderType === "Wholesale" ? 10 : 50;

  const [activeMedia, setActiveMedia] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [recentlyViewed, setRecentlyViewed] = useState<Product[]>([]);
  
  const waUrl = buildWhatsAppUrl(productInquiryMessage({ name: product.name, id: product.id }));

  useEffect(() => {
    addViewed(product.id);
  }, [product.id, addViewed]);

  useEffect(() => {
    const fetchRecentlyViewed = async () => {
      const allProducts = await getProducts();
      const viewed = allProducts.filter((p) => viewedIds.includes(p.id) && p.id !== product.id).slice(0, 4);
      setRecentlyViewed(viewed);
    };
    fetchRecentlyViewed();
  }, [viewedIds, product.id]);

  const gallery = media.length > 0 
    ? media 
    : [{ id: 'fallback', media_type: 'image', file_url: product.image, thumbnail_url: null }] as ProductMedia[];

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
        <div className="flex flex-col gap-4">
          <div className="group relative aspect-[4/5] overflow-hidden bg-secondary">
            {gallery[activeMedia].media_type === 'video' ? (
              <video 
                src={gallery[activeMedia].file_url} 
                controls 
                playsInline
                className="h-full w-full object-cover"
              />
            ) : (
              <img 
                src={gallery[activeMedia].file_url} 
                alt={product.name} 
                onClick={() => setLightboxOpen(true)}
                className="h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-110 cursor-zoom-in" 
              />
            )}
          </div>
          <div className="flex gap-4 overflow-x-auto pb-2">
            {gallery.map((m, idx) => (
              <button 
                key={m.id} 
                onClick={() => setActiveMedia(idx)}
                className={`relative h-24 w-20 shrink-0 border-2 transition-colors ${activeMedia === idx ? 'border-gold' : 'border-transparent hover:border-border'}`}
              >
                <img src={m.media_type === 'video' && m.thumbnail_url ? m.thumbnail_url : m.file_url} alt={`Gallery ${idx}`} className="h-full w-full object-cover" />
                {m.media_type === 'video' && (
                  <div className="absolute inset-0 flex items-center justify-center bg-black/20">
                    <Play className="w-6 h-6 text-white opacity-80" />
                  </div>
                )}
              </button>
            ))}
          </div>
        </div>

        <div className="flex flex-col">
          <span className="eyebrow">{category?.name}</span>
          <h1 className="mt-3 font-display text-4xl leading-tight sm:text-5xl">{product.name}</h1>
          <p className="mt-2 text-[10px] tracking-[0.28em] uppercase text-muted-foreground">
            ID · {product.id}
          </p>
          <p className="mt-6 font-display text-3xl text-foreground">{formatINR(product.retail_price)}</p>
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

          <div className="mt-8 flex flex-col gap-3">
            <span className="text-[10px] font-medium uppercase tracking-widest text-muted-foreground">Order Type</span>
            <div className="flex flex-wrap gap-2">
              {(["Retail", "Wholesale", "Bulk"] as const).map(type => (
                <button
                  key={type}
                  onClick={() => {
                    setOrderType(type);
                    if (type === "Retail" && qty < 1) setQty(1);
                    if (type === "Wholesale" && qty < 10) setQty(10);
                    if (type === "Bulk" && qty < 50) setQty(50);
                  }}
                  className={`px-4 py-2 border rounded-full text-xs font-medium transition-colors ${orderType === type ? 'bg-ink border-ink text-background' : 'border-border text-foreground hover:border-ink hover:text-ink'}`}
                >
                  {type}
                </button>
              ))}
            </div>
            <p className="text-xs text-muted-foreground mt-1">Wholesale and Bulk pricing available. Contact us for the best quotation.</p>
          </div>

          <div className="mt-6 flex flex-col gap-3">
            <span className="text-[10px] font-medium uppercase tracking-widest text-muted-foreground">Quantity</span>
            <div className="flex flex-wrap gap-2 mb-2">
              {[10, 20, 50, 100, 250, 500].map((q) => (
                <button
                  key={q}
                  onClick={() => setQty(q)}
                  className={`px-3 py-1.5 border rounded-full text-xs font-medium transition-colors ${qty === q ? 'bg-gold border-gold text-ink' : 'border-border text-foreground hover:border-gold hover:text-gold'}`}
                >
                  {q}
                </button>
              ))}
            </div>
            <div className="flex flex-wrap items-stretch gap-3">
              <div className="inline-flex items-center border border-border bg-background rounded-md overflow-hidden">
                <button 
                  onClick={() => setQty((q) => Math.max(minQty, q - 1))} 
                  aria-label="Decrease" 
                  className="grid h-12 w-12 place-items-center hover:bg-secondary hover:text-gold transition-colors"
                >
                  <Minus className="h-4 w-4" />
                </button>
                <input 
                  type="number"
                  value={qty}
                  min={minQty}
                  onChange={(e) => {
                    const val = parseInt(e.target.value);
                    if (!isNaN(val)) setQty(Math.max(minQty, val));
                  }}
                  className="w-16 text-center text-sm bg-transparent border-none focus:outline-none focus:ring-0"
                />
                <button 
                  onClick={() => setQty((q) => q + 1)} 
                  aria-label="Increase" 
                  className="grid h-12 w-12 place-items-center hover:bg-secondary hover:text-gold transition-colors"
                >
                  <Plus className="h-4 w-4" />
                </button>
              </div>
              <button onClick={() => add(product.id, qty)} disabled={product.in_stock === false} className="btn-gold flex-1 rounded-md disabled:opacity-50 text-sm tracking-widest">
                Add to Cart
              </button>
            </div>
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
              <h2 className="mt-3 font-display text-3xl sm:text-4xl">Related Products</h2>
            </div>
            <div className="grid grid-cols-2 gap-6 md:grid-cols-4">
              {related.map((p) => <ProductCard key={p.id} product={p} />)}
            </div>
          </div>
        </section>
      )}

      {recentlyViewed.length > 0 && (
        <section className="border-t border-border bg-background py-20">
          <div className="mx-auto max-w-7xl px-6 sm:px-8">
            <div className="mb-10 text-center sm:text-left">
              <span className="eyebrow">Your History</span>
              <h2 className="mt-3 font-display text-3xl sm:text-4xl">Recently Viewed</h2>
            </div>
            <div className="grid grid-cols-2 gap-6 md:grid-cols-4">
              {recentlyViewed.map((p) => <ProductCard key={p.id} product={p} />)}
            </div>
          </div>
        </section>
      )}

      <StickyCart product={product} />

      {/* Lightbox */}
      {lightboxOpen && gallery[activeMedia].media_type === 'image' && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 p-4 sm:p-8" onClick={() => setLightboxOpen(false)}>
          <button className="absolute top-6 right-6 text-white hover:text-gold transition-colors" onClick={() => setLightboxOpen(false)}>
            <X className="w-8 h-8" />
          </button>
          <img 
            src={gallery[activeMedia].file_url} 
            alt={product.name} 
            className="max-h-full max-w-full object-contain select-none"
            onClick={(e) => e.stopPropagation()} 
          />
        </div>
      )}
    </div>
  );
}