import { Link } from "@tanstack/react-router";
import { Heart, ShoppingBag, Trash2, X } from "lucide-react";
import { useState, useEffect } from "react";
import { useWishlist } from "@/lib/wishlist";
import { useCart } from "@/lib/cart";
import { formatINR, getProducts, type Product } from "@/lib/products";

export function WishlistDrawer() {
  const { items, isOpen, close, remove, clear } = useWishlist();
  const { add } = useCart();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadWishlistProducts() {
      if (items.length === 0) {
        setProducts([]);
        setLoading(false);
        return;
      }
      setLoading(true);
      const all = await getProducts();
      const matched = all.filter((p) => items.includes(p.id));
      setProducts(matched);
      setLoading(false);
    }

    if (isOpen) {
      loadWishlistProducts();
    }
  }, [items, isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity" onClick={close} />

      <div className="fixed inset-y-0 right-0 flex max-w-full pl-10">
        <div className="w-screen max-w-md bg-background text-foreground shadow-2xl flex flex-col border-l border-border">
          {/* Header */}
          <div className="flex items-center justify-between px-6 py-5 border-b border-border bg-secondary/30">
            <div className="flex items-center gap-2">
              <Heart className="h-5 w-5 text-gold fill-gold" />
              <h2 className="font-display text-xl">My Saved Wishlist</h2>
              <span className="text-xs bg-gold/20 text-ink dark:text-gold px-2 py-0.5 rounded-full font-medium">
                {items.length} {items.length === 1 ? "item" : "items"}
              </span>
            </div>
            <button onClick={close} className="p-2 text-muted-foreground hover:text-foreground transition-colors" aria-label="Close wishlist">
              <X className="h-5 w-5" />
            </button>
          </div>

          {/* Body */}
          <div className="flex-1 overflow-y-auto p-6 space-y-4">
            {loading ? (
              <div className="py-12 text-center text-sm text-muted-foreground">Loading saved pieces...</div>
            ) : products.length === 0 ? (
              <div className="py-16 text-center space-y-4">
                <Heart className="h-12 w-12 text-muted-foreground/40 mx-auto stroke-1" />
                <p className="font-display text-2xl text-foreground">Your wishlist is empty</p>
                <p className="text-xs text-muted-foreground max-w-xs mx-auto">
                  Click the heart icon on any piece to save it to your personal collection.
                </p>
                <button onClick={close} className="btn-gold mt-4 text-xs">
                  Explore Collections
                </button>
              </div>
            ) : (
              <div className="space-y-4">
                {products.map((p) => (
                  <div key={p.id} className="flex gap-4 p-3 border border-border rounded-lg bg-card/50 hover:border-gold/50 transition-colors">
                    <Link to="/product/$id" params={{ id: p.id }} onClick={close} className="h-20 w-20 shrink-0 bg-secondary rounded overflow-hidden p-1 border border-border/60">
                      <img src={p.image} alt={p.name} className="h-full w-full object-contain" />
                    </Link>
                    <div className="flex flex-1 flex-col justify-between min-w-0">
                      <div>
                        <Link to="/product/$id" params={{ id: p.id }} onClick={close} className="font-display text-base hover:text-gold transition-colors line-clamp-1">
                          {p.name}
                        </Link>
                        <p className="text-[10px] text-muted-foreground uppercase tracking-widest">{p.id}</p>
                        <p className="mt-1 text-sm font-medium text-foreground">{formatINR(p.retail_price)}</p>
                      </div>

                      <div className="flex items-center gap-2 mt-2">
                        <button
                          type="button"
                          onClick={() => {
                            add(p.id, 1);
                            remove(p.id);
                          }}
                          disabled={p.in_stock === false}
                          className="flex-1 flex items-center justify-center gap-1 bg-ink text-background hover:bg-gold hover:text-ink px-2.5 py-1.5 text-[10px] uppercase tracking-wider transition-colors rounded disabled:opacity-50"
                        >
                          <ShoppingBag className="w-3 h-3" /> Move to Cart
                        </button>
                        <button
                          type="button"
                          onClick={() => remove(p.id)}
                          className="p-1.5 text-muted-foreground hover:text-red-600 transition-colors"
                          aria-label="Remove item"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Footer */}
          {products.length > 0 && (
            <div className="p-6 border-t border-border bg-secondary/20 space-y-3">
              <button
                onClick={() => {
                  products.forEach((p) => add(p.id, 1));
                  clear();
                }}
                className="btn-gold w-full text-center text-xs tracking-widest"
              >
                Move All to Cart
              </button>
              <button
                onClick={clear}
                className="w-full text-center text-[10px] text-muted-foreground hover:text-red-500 uppercase tracking-widest transition-colors py-1"
              >
                Clear Wishlist
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
