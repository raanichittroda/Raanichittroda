import { Link } from "@tanstack/react-router";
import { ShoppingBag, Heart, Eye } from "lucide-react";
import { useCart } from "@/lib/cart";
import { useWishlist } from "@/hooks/useWishlist";
import { formatINR, type Product } from "@/lib/products";
import { buildWhatsAppUrl, productInquiryMessage } from "@/lib/whatsapp";

export function ProductCard({ product }: { product: Product }) {
  const { add } = useCart();
  const { toggle, has } = useWishlist();
  const isWishlisted = has(product.id);
  const waUrl = buildWhatsAppUrl(productInquiryMessage({ name: product.name, id: product.id }));

  return (
    <article className="group flex flex-col">
      <Link
        to="/product/$id"
        params={{ id: product.id }}
        className="relative block overflow-hidden bg-secondary"
      >
        <div className="aspect-[4/5] w-full overflow-hidden">
          <img
            src={product.image}
            alt={product.name}
            loading="lazy"
            className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
          />
        </div>
        <div className="absolute left-3 top-3 flex flex-col gap-1">
          {(product.is_new || product.is_best_seller) && (
            <span className="bg-background/95 px-2.5 py-1 text-[10px] tracking-[0.24em] uppercase text-ink inline-block w-fit">
              {product.is_new ? "New" : "Bestseller"}
            </span>
          )}
          {product.offer_badge && (
            <span className="bg-gold/90 px-2.5 py-1 text-[10px] tracking-[0.24em] uppercase text-ink inline-block w-fit">
              {product.offer_badge}
            </span>
          )}
          {product.in_stock === false && (
            <span className="bg-red-900/90 px-2.5 py-1 text-[10px] tracking-[0.24em] uppercase text-white inline-block w-fit">
              Out of Stock
            </span>
          )}
        </div>
        <button
          onClick={(e) => {
            e.preventDefault();
            toggle(product.id);
          }}
          className="absolute right-3 top-3 grid h-8 w-8 place-items-center rounded-full bg-background/80 text-foreground transition hover:bg-background hover:text-gold"
          aria-label="Toggle Wishlist"
        >
          <Heart className={`h-4 w-4 ${isWishlisted ? "fill-gold text-gold" : ""}`} />
        </button>
        {/* Quick View overlay on hover */}
        <div className="absolute inset-0 hidden place-items-center bg-black/40 opacity-0 transition-opacity group-hover:opacity-100 sm:grid">
           <span className="flex items-center gap-2 border border-background bg-background/95 px-4 py-2 text-xs uppercase tracking-widest text-foreground hover:bg-background hover:text-gold">
             <Eye className="h-4 w-4" /> Quick View
           </span>
        </div>
      </Link>

      <div className="mt-4 flex flex-1 flex-col">
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            <Link to="/product/$id" params={{ id: product.id }}>
              <h3 className="font-display text-lg leading-tight text-foreground hover:text-gold">
                {product.name}
              </h3>
            </Link>
            <p className="mt-1 text-[10px] tracking-[0.24em] uppercase text-muted-foreground">
              {product.id}
            </p>
          </div>
          <p className="shrink-0 text-sm font-medium text-foreground">{formatINR(product.retail_price)}</p>
        </div>

        <div className="mt-4 flex flex-col gap-2">
          <button
            type="button"
            onClick={() => add(product.id, 1)}
            disabled={product.in_stock === false}
            className="flex w-full items-center justify-center gap-2 border border-ink bg-ink px-3 py-2.5 text-[10px] uppercase tracking-[0.24em] text-background transition hover:bg-gold hover:border-gold hover:text-ink disabled:opacity-50"
          >
            <ShoppingBag className="h-3.5 w-3.5" /> Add to Cart
          </button>
          
          <div className="flex items-stretch gap-2">
            <Link
              to="/product/$id"
              params={{ id: product.id }}
              className="flex flex-1 items-center justify-center border border-border px-3 py-2 text-[10px] uppercase tracking-[0.24em] text-muted-foreground transition hover:border-gold hover:text-gold"
            >
              View Details
            </Link>
            <a
              href={waUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Wholesale Inquiry on WhatsApp"
              className="flex flex-1 items-center justify-center gap-1.5 border border-border px-3 py-2 text-[10px] uppercase tracking-[0.24em] text-foreground transition hover:border-gold hover:text-gold"
            >
              <WaIcon /> Wholesale Inquiry
            </a>
          </div>
        </div>
      </div>
    </article>
  );
}

export function WaIcon({ className = "h-4 w-4" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path d="M20.52 3.48A11.86 11.86 0 0 0 12.05 0C5.5 0 .18 5.32.18 11.87a11.8 11.8 0 0 0 1.61 5.94L0 24l6.34-1.66a11.87 11.87 0 0 0 5.7 1.45h.01c6.55 0 11.87-5.32 11.87-11.87a11.8 11.8 0 0 0-3.4-8.44ZM12.05 21.4h-.01a9.5 9.5 0 0 1-4.84-1.33l-.35-.21-3.76.99 1-3.67-.22-.37a9.51 9.51 0 0 1-1.45-5.04c0-5.25 4.28-9.52 9.54-9.52a9.49 9.49 0 0 1 6.75 2.8 9.49 9.49 0 0 1 2.79 6.74c0 5.25-4.28 9.52-9.45 9.52Zm5.45-7.13c-.3-.15-1.77-.87-2.04-.97-.27-.1-.47-.15-.67.15s-.77.97-.94 1.17c-.17.2-.35.22-.65.07s-1.26-.46-2.39-1.47c-.88-.78-1.48-1.74-1.65-2.04-.17-.3-.02-.46.13-.6.13-.13.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.02-.52-.07-.15-.67-1.62-.92-2.22-.24-.58-.49-.5-.67-.5l-.57-.01c-.2 0-.52.07-.79.37s-1.04 1.02-1.04 2.48 1.06 2.87 1.21 3.07c.15.2 2.09 3.2 5.07 4.49.71.31 1.26.49 1.69.62.71.22 1.36.19 1.87.12.57-.09 1.77-.72 2.02-1.41.25-.7.25-1.29.17-1.41-.07-.12-.27-.2-.57-.35Z" />
    </svg>
  );
}