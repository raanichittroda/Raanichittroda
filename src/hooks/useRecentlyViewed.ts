import { useState, useEffect, useCallback } from "react";

const RECENTLY_VIEWED_KEY = "aurelia.recentlyViewed.v1";
const MAX_ITEMS = 10;

export function useRecentlyViewed() {
  const [items, setItems] = useState<string[]>([]);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    try {
      const raw = typeof window !== "undefined" ? localStorage.getItem(RECENTLY_VIEWED_KEY) : null;
      if (raw) setItems(JSON.parse(raw));
    } catch {}
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    try {
      localStorage.setItem(RECENTLY_VIEWED_KEY, JSON.stringify(items));
    } catch {}
  }, [items, hydrated]);

  const addViewed = useCallback((productId: string) => {
    setItems((prev) => {
      const filtered = prev.filter((id) => id !== productId);
      return [productId, ...filtered].slice(0, MAX_ITEMS);
    });
  }, []);

  return { items, addViewed };
}
