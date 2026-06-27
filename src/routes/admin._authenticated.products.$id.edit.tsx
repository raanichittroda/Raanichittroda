import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { ArrowLeft, Save } from "lucide-react";
import { supabase } from "@/lib/supabase";
import { type CategorySlug, getProduct, getProductMedia } from "@/lib/products";
import { MediaManager, type LocalMediaItem } from "@/components/MediaManager";

export const Route = createFileRoute("/admin/_authenticated/products/$id/edit")({
  loader: async ({ params }) => {
    const product = await getProduct(params.id);
    if (!product) throw new Error("Product not found");
    const media = await getProductMedia(params.id);
    return { product, existingMedia: media };
  },
  component: EditProduct,
});

function EditProduct() {
  const { product, existingMedia } = Route.useLoaderData();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState<{slug: string, name: string}[]>([]);
  
  const [media, setMedia] = useState<LocalMediaItem[]>([]);
  const [coverId, setCoverId] = useState<string | null>(null);

  const [form, setForm] = useState({
    id: product.id,
    name: product.name,
    category: product.category as CategorySlug,
    retail_price: product.retail_price,
    wholesale_price: product.wholesale_price || 0,
    description: product.description || "",
    weight: product.weight || "",
    purity: product.purity || "",
    in_stock: product.in_stock,
    is_new: product.is_new,
    is_best_seller: product.is_best_seller,
    is_active: product.is_active,
    seo_title: product.seo_title || "",
    seo_description: product.seo_description || ""
  });

  useEffect(() => {
    async function loadCategories() {
      const { data } = await supabase.from("categories").select("slug, name").order("name");
      if (data) {
        setCategories(data);
      }
    }
    loadCategories();
  }, []);

  useEffect(() => {
    // Populate existing media into the MediaManager
    const initialMedia: LocalMediaItem[] = existingMedia.map(m => {
      // Mock a File object so MediaManager doesn't complain, 
      // but we tag it with original_size = -1 to know it's existing.
      const mockFile = new File([""], "existing", { type: m.media_type === "video" ? "video/mp4" : "image/jpeg" });
      return {
        id: m.id, // existing DB id
        file: mockFile,
        media_type: m.media_type,
        preview_url: m.file_url,
        thumbnail_url: m.thumbnail_url || undefined,
        file_size: 0,
        original_size: -1, // marker for existing
        duration: m.duration || undefined,
      };
    });
    setMedia(initialMedia);
    
    const cover = existingMedia.find(m => m.is_cover);
    if (cover) setCoverId(cover.id);
  }, [existingMedia]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name) return alert("Name is required");
    
    setLoading(true);

    try {
      const uploadedMedia = [];
      let coverUrl = product.image;

      for (let i = 0; i < media.length; i++) {
        const item = media[i];
        const isCover = item.id === coverId || (!coverId && i === 0);
        let publicUrl = item.preview_url;
        let thumbUrl = item.thumbnail_url;

        // If it's a NEW file (doesn't have original_size = -1 marker)
        if (item.original_size !== -1) {
          const folder = item.media_type === 'video' ? 'videos' : 'images';
          const fileExt = item.file.name.split('.').pop();
          const fileName = `${Math.random().toString(36).substring(7)}_${Date.now()}.${fileExt}`;
          const filePath = `products/${form.id}/${folder}/${fileName}`;

          const { error: uploadError } = await supabase.storage.from('media').upload(filePath, item.file, {
            cacheControl: '3600',
            upsert: false
          });

          if (uploadError) throw uploadError;

          const { data } = supabase.storage.from('media').getPublicUrl(filePath);
          publicUrl = data.publicUrl;
        }

        if (isCover) {
          coverUrl = item.media_type === 'video' && thumbUrl ? thumbUrl : publicUrl;
        }

        uploadedMedia.push({
          id: item.original_size === -1 ? item.id : undefined, // Keep ID if existing
          product_id: form.id,
          media_type: item.media_type,
          file_url: publicUrl,
          thumbnail_url: thumbUrl,
          display_order: i,
          is_cover: isCover,
          file_size: item.file_size || 0,
          duration: item.duration || null
        });
      }
      
      const productPayload = {
        ...form,
        image: coverUrl,
        images: uploadedMedia.map(m => m.file_url)
      };

      const { error: productError } = await supabase.from("products").update(productPayload).eq("id", form.id);
      if (productError) throw productError;

      // Wipe old media and insert new
      await supabase.from("product_media").delete().eq("product_id", form.id);
      
      if (uploadedMedia.length > 0) {
        // Strip out the manual 'id' if we're just re-inserting them cleanly, 
        // or let Supabase generate new UUIDs for the order. Deleting and re-inserting is easiest for sorting.
        const cleanMedia = uploadedMedia.map(m => {
          const { id, ...rest } = m;
          return rest;
        });
        const { error: mediaError } = await supabase.from("product_media").insert(cleanMedia);
        if (mediaError) throw mediaError;
      }

      alert("Product updated successfully!");
      navigate({ to: "/admin/products" });

    } catch (err: any) {
      alert("Error updating product: " + err.message);
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
          <h1 className="text-2xl font-bold text-gray-900 tracking-tight">Edit Product</h1>
          <p className="text-sm text-gray-500">Update the details for {form.id}</p>
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
              <input type="text" disabled value={form.id} className="mt-1 block w-full bg-gray-50 border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:ring-gray-900 sm:text-sm" />
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
            {loading ? "Saving..." : "Save Changes"}
          </button>
        </div>
      </form>
    </div>
  );
}
