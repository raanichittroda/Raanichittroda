import { supabase } from "../supabase";

export async function getProducts() {
  const { data, error } = await supabase.from("products").select("*").eq("is_active", true).order("created_at", { ascending: false });
  if (error) {
    console.error("Error fetching products:", error);
    return [];
  }
  return data;
}

export async function getProduct(id: string) {
  const { data, error } = await supabase.from("products").select("*").eq("id", id).single();
  if (error) {
    console.error("Error fetching product:", error);
    return null;
  }
  return data;
}

export async function getProductsByCategory(categorySlug: string) {
  const { data, error } = await supabase.from("products").select("*").eq("category", categorySlug).eq("is_active", true);
  if (error) {
    console.error("Error fetching products by category:", error);
    return [];
  }
  return data;
}
