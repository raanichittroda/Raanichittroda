import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { Minus, Plus, ShieldCheck, Sparkles, Truck, Play, X, ChevronLeft, ChevronRight, Heart } from "lucide-react";
import { useState, useEffect } from "react";
import { useCart } from "@/lib/cart";
import { useWishlist } from "@/hooks/useWishlist";
import { useRecentlyViewed } from "@/hooks/useRecentlyViewed";
import { formatINR, getCategory, getProduct, getProductsByCategory, getProducts } from "@/lib/products";
import { ProductCard } from "@/components/ProductCard";
import { StickyCart } from "@/components/StickyCart";
import { WaIcon } from "@/components/ProductCard";
import { buildWhatsAppUrl, productInquiryMessage } from "@/lib/whatsapp";
import type { Product, ProductMedia } from "@/lib/products";
import { getProductMedia } from "@/lib/products";
import { supabase } from "@/lib/supabase";

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
  head: ({ loaderData }) => {
    if (!loaderData) return {};
    const { product, category } = loaderData;
    const title = `${product.name} | 925 Sterling Silver | Raani Chittroda`;
    const desc = `Purchase ${product.name} online from Raani Chittroda. Certified 925 silver ${category?.name || "jewellery"} with premium craftsmanship. Purity: ${product.purity}. Weight: ${product.weight}. PAN India delivery.`;
    
    return {
      meta: [
        { title },
        { name: "description", content: desc },
        { property: "og:title", content: title },
        { property: "og:description", content: desc },
        { property: "og:image", content: product.image },
        { name: "twitter:title", content: title },
        { name: "twitter:description", content: desc },
        { name: "twitter:image", content: product.image },
      ],
    };
  },
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
  const { toggle: toggleWishlist, has: hasWishlist } = useWishlist();
  const isWishlisted = hasWishlist(product.id);
  const { addViewed, items: viewedIds } = useRecentlyViewed();
  const [qty, setQty] = useState(1);
  const [orderType, setOrderType] = useState<"Retail" | "Wholesale" | "Bulk">("Retail");
  const minQty = orderType === "Retail" ? 1 : orderType === "Wholesale" ? 10 : 50;

  const [activeMedia, setActiveMedia] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [recentlyViewed, setRecentlyViewed] = useState<Product[]>([]);
  const [isHovered, setIsHovered] = useState(false);
  const [imgErrorMap, setImgErrorMap] = useState<Record<number, boolean>>({});

  // Slideshow config from admin settings
  const [slideshowAuto, setSlideshowAuto] = useState(true);
  const [slideshowSpeed, setSlideshowSpeed] = useState(4);
  
  const waUrl = buildWhatsAppUrl(productInquiryMessage({ name: product.name, id: product.id }));

  const gallery = media.length > 0 
    ? media 
    : [{ id: 'fallback', media_type: 'image', file_url: product.image, thumbnail_url: null }] as ProductMedia[];

  useEffect(() => {
    async function loadSlideshowSettings() {
      const { data } = await supabase.from("settings").select("value").eq("key", "slideshow_settings").single();
      if (data?.value) {
        const val = data.value as any;
        if (val.product_slideshow_auto !== undefined) setSlideshowAuto(Boolean(val.product_slideshow_auto));
        if (val.product_slideshow_speed) setSlideshowSpeed(Number(val.product_slideshow_speed));
      }
    }
    loadSlideshowSettings();
  }, []);

  useEffect(() => {
    if (!slideshowAuto || gallery.length <= 1 || isHovered || lightboxOpen) return;
    const timer = setInterval(() => {
      setActiveMedia((prev) => (prev + 1) % gallery.length);
    }, slideshowSpeed * 1000);
    return () => clearInterval(timer);
  }, [slideshowAuto, slideshowSpeed, gallery.length, isHovered, lightboxOpen]);

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

  const currentMedia = gallery[activeMedia] || gallery[0];
  const currentFileUrl = imgErrorMap[activeMedia] ? product.image : currentMedia.file_url;

  return (
    <div className="bg-background">
      {/* Product JSON-LD Schema */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "Product",
        "name": product.name,
        "image": product.image,
        "description": product.description,
        "sku": product.id,
        "offers": {
          "@type": "Offer",
          "url": `https://raanichittroda.netlify.app/product/${product.id}`,
          "priceCurrency": "INR",
          "price": product.retail_price,
          "availability": product.in_stock !== false ? "https://schema.org/InStock" : "https://schema.org/OutOfStock",
          "priceValidUntil": "2027-12-31"
        }
      })}} />

      {/* Breadcrumb JSON-LD Schema */}
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
            "name": category?.name || "Product Collection",
            "item": `https://raanichittroda.netlify.app/collections/${product.category}`
          },
          {
            "@type": "ListItem",
            "position": 4,
            "name": product.name,
            "item": `https://raanichittroda.netlify.app/product/${product.id}`
          }
        ]
      })}} />

      <div className="mx-auto max-w-7xl px-6 py-8 sm:px-8 sm:py-10">
        <nav className="text-[10px] uppercase tracking-[0.28em] text-muted-foreground flex items-center gap-2">
          <Link to="/" className="hover:text-gold">Home</Link>
          <span>/</span>
          <Link to="/collections/$categorySlug" params={{ categorySlug: product.category }} className="hover:text-gold">
            {category?.name}
          </Link>
          <span>/</span>
          <span className="text-foreground truncate max-w-[200px]">{product.name}</span>
        </nav>
      </div>

      <div className="mx-auto grid max-w-7xl gap-8 px-6 pb-16 sm:px-8 md:grid-cols-2 md:gap-12 items-start">
        {/* Product Image Gallery Box */}
        <div className="flex flex-col gap-4 w-full">
          <div 
            className="group relative w-full aspect-square max-h-[340px] sm:max-h-[460px] md:max-h-[500px] rounded-xl border border-border bg-white dark:bg-secondary/30 flex items-center justify-center overflow-hidden p-3 shadow-sm transition-all"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            {currentMedia.media_type === 'video' ? (
              <video 
                src={currentFileUrl} 
                controls 
                playsInline
                className="max-h-full max-w-full w-auto h-auto object-contain rounded-md"
              />
            ) : (
              <img 
                src={currentFileUrl} 
                alt={product.name} 
                onError={() => setImgErrorMap(prev => ({ ...prev, [activeMedia]: true }))}
                onClick={() => setLightboxOpen(true)}
                className="max-h-full max-w-full w-auto h-auto object-contain mx-auto my-auto rounded-md cursor-zoom-in transition-transform duration-500 ease-out group-hover:scale-105" 
              />
            )}

            {/* Slideshow controls */}
            {gallery.length > 1 && (
              <>
                <button
                  onClick={() => setActiveMedia((prev) => (prev - 1 + gallery.length) % gallery.length)}
                  className="absolute left-2 top-1/2 -translate-y-1/2 grid h-9 w-9 place-items-center rounded-full bg-black/40 text-white backdrop-blur-sm opacity-80 sm:opacity-0 transition-opacity group-hover:opacity-100 hover:bg-black/70"
                  aria-label="Previous Slide"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <button
                  onClick={() => setActiveMedia((prev) => (prev + 1) % gallery.length)}
                  className="absolute right-2 top-1/2 -translate-y-1/2 grid h-9 w-9 place-items-center rounded-full bg-black/40 text-white backdrop-blur-sm opacity-80 sm:opacity-0 transition-opacity group-hover:opacity-100 hover:bg-black/70"
                  aria-label="Next Slide"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
                <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex items-center gap-1.5 bg-black/40 backdrop-blur-md px-3 py-1 rounded-full border border-white/10">
                  {gallery.map((_, idx) => (
                    <button
                      key={idx}
                      onClick={() => setActiveMedia(idx)}
                      className={`h-1.5 rounded-full transition-all ${activeMedia === idx ? "w-5 bg-gold" : "w-1.5 bg-white/50 hover:bg-white/80"}`}
                      aria-label={`Slide ${idx + 1}`}
                    />
                  ))}
                </div>
              </>
            )}
          </div>

          {gallery.length > 1 && (
            <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-none">
              {gallery.map((m, idx) => (
                <button 
                  key={m.id} 
                  onClick={() => setActiveMedia(idx)}
                  className={`relative h-16 w-16 sm:h-20 sm:w-20 shrink-0 rounded-lg overflow-hidden border-2 transition-all ${activeMedia === idx ? 'border-gold scale-95 shadow-sm' : 'border-transparent hover:border-border opacity-70 hover:opacity-100'}`}
                >
                  <img src={m.media_type === 'video' && m.thumbnail_url ? m.thumbnail_url : m.file_url} alt={`Gallery thumbnail ${idx}`} loading="lazy" className="h-full w-full object-contain p-1" />
                  {m.media_type === 'video' && (
                    <div className="absolute inset-0 flex items-center justify-center bg-black/20">
                      <Play className="w-5 h-5 text-white opacity-80" />
                    </div>
                  )}
                </button>
              ))}
            </div>
          )}
        </div>

        <div className="flex flex-col min-w-0">
          <span className="eyebrow">{category?.name}</span>
          <h1 className="mt-2 font-display text-2xl sm:text-4xl md:text-5xl leading-tight text-foreground break-words max-w-full font-normal">
            {product.name}
          </h1>
          <p className="mt-1.5 text-[10px] tracking-[0.28em] uppercase text-muted-foreground">
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
              <button 
                onClick={() => toggleWishlist(product.id)}
                className={`grid h-12 w-12 shrink-0 place-items-center rounded-md border transition-colors ${isWishlisted ? 'border-gold bg-gold/10 text-gold' : 'border-border text-foreground hover:border-gold hover:text-gold'}`}
                aria-label="Save to Wishlist"
                title={isWishlisted ? "Saved in Wishlist" : "Save to Wishlist"}
              >
                <Heart className={`h-5 w-5 ${isWishlisted ? "fill-gold text-gold" : ""}`} />
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
      {lightboxOpen && currentMedia.media_type === 'image' && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 p-4 sm:p-8" onClick={() => setLightboxOpen(false)}>
          <button className="absolute top-6 right-6 text-white hover:text-gold transition-colors" onClick={() => setLightboxOpen(false)}>
            <X className="w-8 h-8" />
          </button>
          <img 
            src={currentFileUrl} 
            alt={product.name} 
            className="max-h-full max-w-full object-contain select-none"
            onClick={(e) => e.stopPropagation()} 
          />
        </div>
      )}
    </div>
  );
}