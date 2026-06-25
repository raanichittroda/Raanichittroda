import { Link } from "@tanstack/react-router";
import { Minus, Plus, X } from "lucide-react";
import { useCart } from "@/lib/cart";
import { formatINR } from "@/lib/products";

export function CartDrawer() {
  const { isOpen, close, detailed, setQty, remove, subtotal, count } = useCart();

  return (
    <>
      <div
        onClick={close}
        aria-hidden={!isOpen}
        className={`fixed inset-0 z-50 bg-ink/40 backdrop-blur-sm transition-opacity duration-300 ${
          isOpen ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
      />
      <aside
        aria-label="Shopping cart"
        className={`fixed right-0 top-0 z-50 flex h-full w-full max-w-md flex-col bg-background shadow-2xl transition-transform duration-300 ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between border-b border-border px-6 py-5">
          <div>
            <p className="eyebrow">Your bag</p>
            <p className="mt-1 font-display text-xl">{count} item{count === 1 ? "" : "s"}</p>
          </div>
          <button onClick={close} aria-label="Close cart" className="p-2 text-foreground hover:text-gold">
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-6 py-6">
          {detailed.length === 0 ? (
            <div className="flex h-full flex-col items-center justify-center text-center">
              <span className="hairline" />
              <p className="mt-6 font-display text-2xl">Your bag awaits</p>
              <p className="mt-2 text-sm text-muted-foreground">
                Discover heirloom pieces, crafted to last generations.
              </p>
              <Link to="/collections" onClick={close} className="btn-gold mt-8">
                Shop Collections
              </Link>
            </div>
          ) : (
            <ul className="space-y-6">
              {detailed.map(({ product, quantity }) => (
                <li key={product.id} className="grid grid-cols-[80px_1fr_auto] gap-4">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="h-24 w-20 object-cover"
                    loading="lazy"
                  />
                  <div className="min-w-0">
                    <p className="truncate font-display text-base text-foreground">{product.name}</p>
                    <p className="mt-0.5 text-[10px] tracking-[0.24em] uppercase text-muted-foreground">
                      {product.id}
                    </p>
                    <p className="mt-2 text-sm">{formatINR(product.price)}</p>
                    <div className="mt-3 inline-flex items-center border border-border">
                      <button onClick={() => setQty(product.id, quantity - 1)} className="grid h-7 w-7 place-items-center hover:text-gold" aria-label="Decrease">
                        <Minus className="h-3 w-3" />
                      </button>
                      <span className="w-8 text-center text-xs">{quantity}</span>
                      <button onClick={() => setQty(product.id, quantity + 1)} className="grid h-7 w-7 place-items-center hover:text-gold" aria-label="Increase">
                        <Plus className="h-3 w-3" />
                      </button>
                    </div>
                  </div>
                  <button
                    onClick={() => remove(product.id)}
                    aria-label="Remove"
                    className="self-start text-muted-foreground hover:text-gold"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>

        {detailed.length > 0 && (
          <div className="border-t border-border bg-background px-6 py-5">
            <div className="flex items-baseline justify-between">
              <span className="text-[10px] tracking-[0.28em] uppercase text-muted-foreground">Subtotal</span>
              <span className="font-display text-2xl">{formatINR(subtotal)}</span>
            </div>
            <p className="mt-1 text-xs text-muted-foreground">
              Final pricing &amp; availability confirmed on WhatsApp.
            </p>
            <Link to="/checkout" onClick={close} className="btn-gold mt-5 w-full">
              Checkout via WhatsApp
            </Link>
          </div>
        )}
      </aside>
    </>
  );
}