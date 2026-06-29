import { Link } from "@tanstack/react-router";
import { Menu, ShoppingBag, X, Heart } from "lucide-react";
import { useState, useEffect } from "react";
import { useCart } from "@/lib/cart";
import { useWishlist } from "@/hooks/useWishlist";
import { CartDrawer } from "./CartDrawer";
import { supabase } from "@/lib/supabase";

const nav = [
  { to: "/", label: "Home" },
  { to: "/collections", label: "Collections" },
  { to: "/about", label: "About" },
  { to: "/contact", label: "Contact" },
] as const;

export function SiteHeader() {
  const { count, open } = useCart();
  const { items } = useWishlist();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [announcement, setAnnouncement] = useState("Wholesale | Bulk Orders | Custom Jewellery | PAN India Delivery");

  useEffect(() => {
    async function loadCMS() {
      const { data } = await supabase.from("settings").select("value").eq("key", "homepage_cms").single();
      if (data?.value && (data.value as any).announcement) {
        setAnnouncement((data.value as any).announcement);
      }
    }
    loadCMS();
  }, []);

  return (
    <>
      <div className="bg-gold px-4 py-2 text-center text-xs font-medium tracking-wide text-ink sm:text-sm">
        {announcement}
      </div>
      <header className="sticky top-0 z-40 border-b border-border/60 bg-background/85 backdrop-blur-md">
        <div className="mx-auto grid max-w-7xl grid-cols-[auto_1fr_auto] items-center gap-4 px-5 py-4 sm:px-8">
          <button
            type="button"
            aria-label="Open menu"
            className="md:hidden -ml-2 p-2 text-foreground"
            onClick={() => setMobileOpen(true)}
          >
            <Menu className="h-5 w-5" />
          </button>

          <Link to="/" className="flex items-center justify-self-center md:justify-self-start">
            <span className="font-display text-xl tracking-[0.18em] text-foreground sm:text-2xl font-semibold">
              RAANI CHITTRODA
            </span>
          </Link>

          <nav className="hidden items-center justify-center gap-10 md:flex">
            {nav.map((n) => (
              <Link
                key={n.to}
                to={n.to}
                className="text-[0.72rem] tracking-[0.28em] uppercase text-foreground/80 transition-colors hover:text-gold"
                activeProps={{ className: "text-gold" }}
              >
                {n.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-4">
            <button
              type="button"
              className="relative -mr-2 p-2 text-foreground transition-colors hover:text-gold"
              onClick={() => alert("Wishlist items: " + items.length)}
            >
              <Heart className="h-5 w-5" />
              {items.length > 0 && (
                <span className="absolute -right-0.5 -top-0.5 flex h-4 min-w-4 items-center justify-center rounded-full bg-gold px-1 text-[10px] font-medium text-ink">
                  {items.length}
                </span>
              )}
            </button>
            <button
              type="button"
              onClick={open}
              aria-label="Open cart"
              className="relative -mr-2 p-2 text-foreground transition-colors hover:text-gold"
            >
              <ShoppingBag className="h-5 w-5" />
              {count > 0 && (
                <span className="absolute -right-0.5 -top-0.5 flex h-4 min-w-4 items-center justify-center rounded-full bg-gold px-1 text-[10px] font-medium text-ink">
                  {count}
                </span>
              )}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="fixed inset-0 z-50 bg-background md:hidden">
          <div className="flex items-center justify-between px-5 py-4">
            <span className="font-display text-xl tracking-[0.18em] font-semibold">RAANI CHITTRODA</span>
            <button onClick={() => setMobileOpen(false)} aria-label="Close menu" className="p-2">
              <X className="h-5 w-5" />
            </button>
          </div>
          <nav className="mt-10 flex flex-col items-center gap-8">
            {nav.map((n) => (
              <Link
                key={n.to}
                to={n.to}
                onClick={() => setMobileOpen(false)}
                className="font-display text-3xl text-foreground"
              >
                {n.label}
              </Link>
            ))}
          </nav>
        </div>
      )}

      <CartDrawer />
    </>
  );
}