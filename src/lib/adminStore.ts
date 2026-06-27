import { products as defaultProducts, categories as defaultCategories, type Product, type Category } from "./products";

const STORE_KEY = "aurelia_admin_store_v1";

interface StoreState {
  products: Product[];
  categories: Category[];
  orders: any[]; // We'll type this better later
  settings: {
    storeName: string;
    phone: string;
    whatsapp: string;
    address: string;
    seoTitle: string;
    seoDescription: string;
  };
}

const defaultState: StoreState = {
  products: defaultProducts,
  categories: defaultCategories,
  orders: [],
  settings: {
    storeName: "Raani Chittroda",
    phone: "+91 97850 90816",
    whatsapp: "919785090816",
    address: "123 Heritage Row, Old City, Jaipur, Rajasthan 302001",
    seoTitle: "Raani Chittroda — Gold & Silver Jewellery Manufacturer, Wholesaler & Retailer",
    seoDescription: "Premium Gold & Silver Jewellery for Every Occasion. We deal in Wholesale, Bulk Orders, Retail, Corporate Gifting, and Custom Manufacturing.",
  },
};

export function getAdminStore(): StoreState {
  if (typeof window === "undefined") return defaultState;
  try {
    const raw = localStorage.getItem(STORE_KEY);
    if (raw) return JSON.parse(raw);
  } catch (e) {
    console.error(e);
  }
  return defaultState;
}

export function updateAdminStore(newState: Partial<StoreState>) {
  if (typeof window === "undefined") return;
  const current = getAdminStore();
  const updated = { ...current, ...newState };
  try {
    localStorage.setItem(STORE_KEY, JSON.stringify(updated));
  } catch (e) {
    console.error(e);
  }
}
