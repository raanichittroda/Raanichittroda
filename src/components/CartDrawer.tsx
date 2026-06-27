import { ShoppingBag, X, ArrowRight } from "lucide-react";
import { Link, useNavigate } from "@tanstack/react-router";
import { useCart } from "@/lib/cart";
import { formatINR, getProduct } from "@/lib/products";
import type { Product } from "@/lib/products";
import { useEffect, useState } from "react";

export function CartDrawer() {
  const { items, remove, setQty, count, isOpen, close } = useCart();
  const navigate = useNavigate();
  const [cartProducts, setCartProducts] = useState<(Product & { quantity: number })[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!isOpen) return;
    const fetchCartProducts = async () => {
      setLoading(true);
      const loaded: (Product & { quantity: number })[] = [];
      for (const item of items) {
        const p = await getProduct(item.productId);
        if (p) loaded.push({ ...p, quantity: item.quantity });
      }
      setCartProducts(loaded);
      setLoading(false);
    };
    fetchCartProducts();
  }, [items, isOpen]);

  const subtotal = cartProducts.reduce((acc, curr) => acc + curr.retail_price * curr.quantity, 0);

  return (
    <>
      <div 
        className={`fixed inset-0 z-50 bg-ink/40 backdrop-blur-sm transition-opacity ${isOpen ? "opacity-100" : "opacity-0 pointer-events-none"}`} 
        onClick={close} 
      />
      <div 
        className={`fixed inset-y-0 right-0 z-50 flex w-full max-w-md flex-col bg-background shadow-2xl transition-transform duration-500 ease-in-out sm:w-[400px] ${isOpen ? "translate-x-0" : "translate-x-full"}`}
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-border px-6 py-5">
          <div className="flex items-center gap-3">
            <ShoppingBag className="h-5 w-5 text-gold" />
            <h2 className="font-display text-xl text-foreground">Your Cart</h2>
            <span className="flex h-5 min-w-[20px] items-center justify-center rounded-full bg-gold px-1.5 text-[10px] font-bold text-ink">
              {count}
            </span>
          </div>
          <button onClick={close} className="p-2 text-muted-foreground transition-colors hover:text-foreground">
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6">
          {loading ? (
            <div className="flex h-full flex-col items-center justify-center text-center">
              <p className="text-muted-foreground">Loading cart...</p>
            </div>
          ) : cartProducts.length === 0 ? (
            <div className="flex h-full flex-col items-center justify-center text-center">
              <ShoppingBag className="h-12 w-12 text-border" />
              <p className="mt-4 font-display text-2xl text-foreground">Your cart is empty</p>
              <p className="mt-2 text-sm text-muted-foreground">Looks like you haven't added anything yet.</p>
              <button
                onClick={() => {
                  close();
                  navigate({ to: "/collections" });
                }}
                className="btn-gold mt-8"
              >
                Start Shopping
              </button>
            </div>
          ) : (
            <ul className="flex flex-col gap-6">
              {cartProducts.map((item) => (
                <li key={item.id} className="flex gap-4">
                  <div className="h-24 w-20 shrink-0 overflow-hidden bg-secondary">
                    <img src={item.image} alt={item.name} className="h-full w-full object-cover" />
                  </div>
                  <div className="flex flex-1 flex-col justify-between">
                    <div>
                      <div className="flex justify-between">
                        <h3 className="font-display text-base text-foreground">
                          <Link to="/product/$id" params={{ id: item.id }} onClick={close} className="hover:text-gold transition-colors">
                            {item.name}
                          </Link>
                        </h3>
                        <p className="text-sm font-medium text-foreground">
                          {formatINR(item.retail_price * item.quantity)}
                        </p>
                      </div>
                      <p className="mt-1 text-[10px] uppercase tracking-widest text-muted-foreground">{item.id}</p>
                    </div>
                    <div className="flex flex-col gap-2">
                      <div className="flex flex-wrap gap-1">
                        {[10, 20, 50, 100].map(q => (
                          <button 
                            key={q} 
                            onClick={() => setQty(item.id, q)} 
                            className={`px-2 py-0.5 border text-[10px] font-medium rounded-full transition-colors ${item.quantity === q ? 'bg-gold border-gold text-ink' : 'border-border text-foreground hover:border-gold hover:text-gold'}`}
                          >
                            {q}
                          </button>
                        ))}
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="inline-flex h-8 items-center border border-border bg-background rounded-md overflow-hidden">
                          <button
                            onClick={() => setQty(item.id, Math.max(1, item.quantity - 1))}
                            className="flex h-full w-8 items-center justify-center text-muted-foreground hover:bg-secondary hover:text-gold transition-colors"
                          >
                            -
                          </button>
                          <input 
                            type="number"
                            value={item.quantity}
                            min={1}
                            onChange={(e) => {
                              const val = parseInt(e.target.value);
                              if (!isNaN(val)) setQty(item.id, Math.max(1, val));
                            }}
                            className="w-12 text-center text-xs font-medium bg-transparent border-none focus:outline-none focus:ring-0 p-0"
                          />
                          <button
                            onClick={() => setQty(item.id, item.quantity + 1)}
                            className="flex h-full w-8 items-center justify-center text-muted-foreground hover:bg-secondary hover:text-gold transition-colors"
                          >
                            +
                          </button>
                        </div>
                        <button
                          onClick={() => remove(item.id)}
                          className="text-[10px] uppercase tracking-widest text-muted-foreground hover:text-red-500 transition-colors"
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Footer */}
        {cartProducts.length > 0 && !loading && (
          <div className="border-t border-border bg-background px-6 py-5">
            <div className="flex items-baseline justify-between">
              <span className="text-[10px] tracking-[0.28em] uppercase text-muted-foreground">Subtotal</span>
              <span className="font-display text-2xl">{formatINR(subtotal)}</span>
            </div>
            <p className="mt-1 text-xs text-muted-foreground">
              Final pricing &amp; availability confirmed on WhatsApp.
            </p>
            <Link to="/checkout" onClick={close} className="btn-gold mt-5 w-full block text-center">
              Checkout via WhatsApp
            </Link>
          </div>
        )}
      </div>
    </>
  );
}