import { ShoppingBag } from "lucide-react";
import { useCart } from "@/lib/cart";
import { formatINR, type Product } from "@/lib/products";
import { Plus } from "lucide-react";

export function StickyCart({ product }: { product: Product }) {
  const { add } = useCart();

  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 border-t border-border bg-background/80 px-6 py-4 backdrop-blur-md sm:hidden">
      <div className="flex items-center justify-between">
        <div className="flex flex-col">
          <span className="font-display text-lg text-foreground">{formatINR(product.retail_price)}</span>
          <span className="text-[10px] uppercase tracking-widest text-muted-foreground">
            {product.id}
          </span>
        </div>
        <button
          onClick={() => add(product.id)}
          disabled={product.in_stock === false}
          className="btn-gold flex items-center gap-2 px-6 py-3 disabled:opacity-50"
        >
          <Plus className="h-4 w-4" /> Add
        </button>
      </div>
    </div>
  );
}
