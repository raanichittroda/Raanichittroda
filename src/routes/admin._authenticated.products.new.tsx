import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { ArrowLeft, Save } from "lucide-react";
import { supabase } from "@/lib/supabase";
import { type CategorySlug } from "@/lib/products";
import { MediaManager, type LocalMediaItem } from "@/components/MediaManager";

export const Route = createFileRoute("/admin/_authenticated/products/new")({
  component: NewProduct,
});

function NewProduct() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState<{slug: string, name: string}[]>([]);
  
  const [media, setMedia] = useState<LocalMediaItem[]>([]);
  const [coverId, setCoverId] = useState<string | null>(null);

  const [form, setForm] = useState({
    id: "",
    name: "",
    category: "" as CategorySlug,
    retail_price: 0,
    wholesale_price: 0,
    description: "",
    weight: "",
    purity: "",
    in_stock: true,
    is_new: false,
    is_best_seller: false,
    is_active: true,
    seo_title: "",
    seo_description: ""
  });

  useEffect(() => {
    async function loadCategories() {
      const { data } = await supabase.from("categories").select("slug, name").order("name");
      if (data) {
        setCategories(data);
        if (data.length > 0) {
          setForm(f => ({ ...f, category: data[0].slug as CategorySlug }));
        }
      }
    }
    loadCategories();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.id || !form.name) return alert("ID and Name are required");
    
    setLoading(true);

    try {
      // 1. Upload files
      const uploadedMedia = [];
      let coverUrl = "https://images.unsplash.com/photo-1599643478524-fb66f70d00f8?w=800&q=80"; // fallback

      for (let i = 0; i < media.length; i++) {
        const item = media[i];
        const isCover = item.id === coverId || (!coverId && i === 0);
        const folder = item.media_type === 'video' ? 'videos' : 'images';
        const fileExt = item.file.name.split('.').pop();
        const fileName = `${Math.random().toString(36).substring(7)}_${Date.now()}.${fileExt}`;
        const filePath = `products/${form.id}/${folder}/${fileName}`;

        const { error: uploadError } = await supabase.storage.from('media').upload(filePath, item.file, {
          cacheControl: '3600',
          upsert: false
        });

        if (uploadError) throw uploadError;

        const { data: { publicUrl } } = supabase.storage.from('media').getPublicUrl(filePath);

        if (isCover) {
          coverUrl = item.media_type === 'video' && item.thumbnail_url ? item.thumbnail_url : publicUrl;
        }

        uploadedMedia.push({
          product_id: form.id,
          media_type: item.media_type,
          file_url: publicUrl,
          thumbnail_url: item.thumbnail_url, // Note: For real prod, thumbnail should also be uploaded as a file! But data URL works for now if short.
          display_order: i,
          is_cover: isCover,
          file_size: item.file_size,
          duration: item.duration
        });
      }

      // If thumbnail is a data URL and it's too long, Supabase insert might fail or be inefficient.
      // A better approach would be to upload the thumbnail blob to storage as well.
      // But let's proceed with inserting the product first.
      
      const productPayload = {
        ...form,
        image: coverUrl,
        images: uploadedMedia.map(m => m.file_url)
      };

      const { error: productError } = await supabase.from("products").insert([productPayload]);
      if (productError) throw productError;

      if (uploadedMedia.length > 0) {
        const { error: mediaError } = await supabase.from("product_media").insert(uploadedMedia);
        if (mediaError) throw mediaError;
      }

      alert("Product and media saved successfully!");
      navigate({ to: "/admin/products" });

    } catch (err: any) {
      alert("Error saving product: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6 pb-20">
      <div className="flex items-center gap-4">
        <button onClick={() => history.back()} className="p-2 -ml-2 rounded-full hover:bg-gray-100 text-gray-500">
          <ArrowLeft className="w-5 h-5" />
        </button>
        <div>
          <h1 className="text-2xl font-bold text-gray-900 tracking-tight">Add New Product</h1>
          <p className="text-sm text-gray-500">Create a new product listing in your Supabase catalog.</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden">
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-base font-semibold text-gray-900">Basic Details</h2>
          </div>
          <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700">Product Name</label>
              <input type="text" required value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:ring-gray-900 sm:text-sm" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Product ID (SKU)</label>
              <input type="text" required value={form.id} onChange={e => setForm({ ...form, id: e.target.value })} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:ring-gray-900 sm:text-sm" placeholder="e.g. AUR-RG-005" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Retail Price (₹)</label>
              <input type="number" required value={form.retail_price || ""} onChange={e => setForm({ ...form, retail_price: Number(e.target.value) })} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:ring-gray-900 sm:text-sm" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Wholesale Price (₹) (Admin Only)</label>
              <input type="number" value={form.wholesale_price || ""} onChange={e => setForm({ ...form, wholesale_price: Number(e.target.value) })} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:ring-gray-900 sm:text-sm" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Category</label>
              <select value={form.category} onChange={e => setForm({ ...form, category: e.target.value as CategorySlug })} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:ring-gray-900 sm:text-sm">
                {categories.length === 0 ? (
                  <option value="">Loading categories...</option>
                ) : (
                  categories.map(c => (
                    <option key={c.slug} value={c.slug}>{c.name}</option>
                  ))
                )}
              </select>
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700">Description</label>
              <textarea rows={4} value={form.description} onChange={e => setForm({ ...form, description: e.target.value })} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:ring-gray-900 sm:text-sm" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden">
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-base font-semibold text-gray-900">Media Manager</h2>
          </div>
          <div className="p-6">
            <MediaManager media={media} setMedia={setMedia} coverId={coverId} setCoverId={setCoverId} />
          </div>
        </div>

        <div className="bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden">
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-base font-semibold text-gray-900">Attributes & SEO</h2>
          </div>
          <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
             <div>
              <label className="block text-sm font-medium text-gray-700">Weight</label>
              <input type="text" value={form.weight} onChange={e => setForm({ ...form, weight: e.target.value })} placeholder="e.g. 10.5g" className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 sm:text-sm" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Purity</label>
              <input type="text" value={form.purity} onChange={e => setForm({ ...form, purity: e.target.value })} placeholder="e.g. 925 Sterling Silver" className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 sm:text-sm" />
            </div>
            
            <div className="md:col-span-2 pt-4 border-t border-gray-100 flex flex-wrap gap-6">
              <label className="flex items-center gap-2">
                <input type="checkbox" checked={form.in_stock} onChange={e => setForm({ ...form, in_stock: e.target.checked })} className="rounded border-gray-300 text-gray-900 focus:ring-gray-900 h-4 w-4" />
                <span className="text-sm text-gray-700">In Stock</span>
              </label>
              <label className="flex items-center gap-2">
                <input type="checkbox" checked={form.is_new} onChange={e => setForm({ ...form, is_new: e.target.checked })} className="rounded border-gray-300 text-gray-900 focus:ring-gray-900 h-4 w-4" />
                <span className="text-sm text-gray-700">New Arrival</span>
              </label>
              <label className="flex items-center gap-2">
                <input type="checkbox" checked={form.is_best_seller} onChange={e => setForm({ ...form, is_best_seller: e.target.checked })} className="rounded border-gray-300 text-gray-900 focus:ring-gray-900 h-4 w-4" />
                <span className="text-sm text-gray-700">Best Seller</span>
              </label>
              <label className="flex items-center gap-2">
                <input type="checkbox" checked={form.is_active} onChange={e => setForm({ ...form, is_active: e.target.checked })} className="rounded border-gray-300 text-gray-900 focus:ring-gray-900 h-4 w-4" />
                <span className="text-sm text-gray-700">Active (Visible)</span>
              </label>
            </div>
          </div>
        </div>

        <div className="flex justify-end gap-3 pt-6">
          <button type="button" onClick={() => navigate({ to: "/admin/products" })} className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900">
            Cancel
          </button>
          <button disabled={loading} type="submit" className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-gray-900 border border-transparent rounded-md shadow-sm hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900 disabled:opacity-50">
            <Save className="w-4 h-4" />
            {loading ? "Saving..." : "Save Product"}
          </button>
        </div>
      </form>
    </div>
  );
}
