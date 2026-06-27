import { useState, useEffect, useCallback } from "react";

const WISHLIST_KEY = "aurelia.wishlist.v1";

export function useWishlist() {
  const [items, setItems] = useState<string[]>([]);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    try {
      const raw = typeof window !== "undefined" ? localStorage.getItem(WISHLIST_KEY) : null;
      if (raw) setItems(JSON.parse(raw));
    } catch {}
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    try {
      localStorage.setItem(WISHLIST_KEY, JSON.stringify(items));
    } catch {}
  }, [items, hydrated]);

  const toggle = useCallback((productId: string) => {
    setItems((prev) =>
      prev.includes(productId)
        ? prev.filter((id) => id !== productId)
        : [...prev, productId]
    );
  }, []);

  const has = useCallback((productId: string) => items.includes(productId), [items]);

  return { items, toggle, has };
}
