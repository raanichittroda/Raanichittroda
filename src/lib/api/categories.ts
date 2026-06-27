import { supabase } from "../supabase";

export async function getCategories() {
  const { data, error } = await supabase.from("categories").select("*").order("created_at", { ascending: true });
  if (error) {
    console.error("Error fetching categories:", error);
    return [];
  }
  return data;
}

export async function getCategory(slug: string) {
  const { data, error } = await supabase.from("categories").select("*").eq("slug", slug).single();
  if (error) {
    console.error("Error fetching category:", error);
    return null;
  }
  return data;
}
