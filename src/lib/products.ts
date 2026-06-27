import { supabase } from "./supabase";

export type CategorySlug =
  | "silver-rakhis"
  | "silver-murtis"
  | "silver-necklaces"
  | "silver-chains"
  | "silver-bracelets"
  | "silver-rings"
  | "silver-coins"
  | "silver-gift-articles"
  | "gold-jewellery"
  | "custom-orders";

export interface Category {
  slug: CategorySlug;
  name: string;
  image: string;
  blurb: string;
}

export interface Product {
  id: string;
  name: string;
  category: CategorySlug;
  retail_price: number;
  wholesale_price: number | null;
  image: string;
  images: string[];
  description: string;
  weight: string;
  purity: string;
  seo_title: string | null;
  seo_description: string | null;
  is_new: boolean;
  is_best_seller: boolean;
  in_stock: boolean;
  is_active: boolean;
  offer_badge: string | null;
}

export async function getCategories(): Promise<Category[]> {
  const { data } = await supabase.from("categories").select("*").order("created_at", { ascending: true });
  return data || [];
}

export async function getCategory(slug: string): Promise<Category | null> {
  const { data } = await supabase.from("categories").select("*").eq("slug", slug).single();
  return data;
}

export async function getProducts(): Promise<Product[]> {
  const { data } = await supabase.from("products").select("*").eq("is_active", true).order("created_at", { ascending: false });
  return data || [];
}

export async function getProduct(id: string): Promise<Product | null> {
  const { data } = await supabase.from("products").select("*").eq("id", id).single();
  return data;
}

export async function getProductsByCategory(categorySlug: string): Promise<Product[]> {
  const { data } = await supabase.from("products").select("*").eq("category", categorySlug).eq("is_active", true);
  return data || [];
}

export interface ProductMedia {
  id: string;
  product_id: string;
  media_type: 'image' | 'video';
  file_url: string;
  thumbnail_url: string | null;
  display_order: number;
  is_cover: boolean;
  duration: number | null;
}

export async function getProductMedia(productId: string): Promise<ProductMedia[]> {
  const { data } = await supabase.from("product_media").select("*").eq("product_id", productId).order("display_order", { ascending: true });
  return data || [];
}

export const formatINR = (n: number) =>
  new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR", maximumFractionDigits: 0 }).format(n);