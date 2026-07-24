import { createFileRoute } from "@tanstack/react-router";
import { Plus, Edit, Trash2, Upload, Loader2, Image as ImageIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import type { Category } from "@/lib/products";
import { uploadMediaFile } from "@/lib/mediaUpload";

export const Route = createFileRoute("/admin/_authenticated/categories")({
  component: AdminCategories,
});

function AdminCategories() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);

  const [showForm, setShowForm] = useState(false);
  const [editingSlug, setEditingSlug] = useState<string | null>(null);
  const [catForm, setCatForm] = useState({ slug: "", name: "", image: "", blurb: "" });
  const [saving, setSaving] = useState(false);
  const [uploadingImage, setUploadingImage] = useState(false);

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    setLoading(true);
    const { data, error } = await supabase.from("categories").select("*").order("created_at", { ascending: true });
    if (!error && data) {
      setCategories(data);
    }
    setLoading(false);
  };

  const handleDelete = async (slug: string, name: string) => {
    if (!confirm(`Are you sure you want to delete category "${name}"? This action cannot be undone.`)) return;
    const { error } = await supabase.from("categories").delete().eq("slug", slug);
    if (error) {
      alert("Failed to delete category: " + error.message);
    } else {
      setCategories(categories.filter(c => c.slug !== slug));
    }
  };

  const handleEditClick = (category: Category) => {
    setCatForm({ slug: category.slug, name: category.name, image: category.image, blurb: category.blurb });
    setEditingSlug(category.slug);
    setShowForm(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploadingImage(true);
    try {
      const url = await uploadMediaFile(file, "categories");
      setCatForm(prev => ({ ...prev, image: url }));
    } catch (err: any) {
      alert("Failed to upload photo: " + (err.message || "Unknown error"));
    } finally {
      setUploadingImage(false);
    }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!catForm.image) {
      alert("Please upload or provide an image for the category.");
      return;
    }
    setSaving(true);
    
    if (editingSlug) {
      const { error } = await supabase.from("categories").update(catForm).eq("slug", editingSlug);
      if (error) {
        alert("Failed to update category: " + error.message);
      } else {
        setCategories(categories.map(c => c.slug === editingSlug ? { ...c, ...catForm } : c));
        setShowForm(false);
        setEditingSlug(null);
        setCatForm({ slug: "", name: "", image: "", blurb: "" });
      }
    } else {
      const { data, error } = await supabase.from("categories").insert([catForm]).select();
      if (error) {
        alert("Failed to add category: " + error.message);
      } else if (data) {
        setCategories([...categories, data[0]]);
        setShowForm(false);
        setCatForm({ slug: "", name: "", image: "", blurb: "" });
      }
    }
    setSaving(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 tracking-tight">Categories</h1>
          <p className="mt-1 text-sm text-gray-500">Organize your products into collections with custom photos.</p>
        </div>
        <button onClick={() => { setEditingSlug(null); setCatForm({ slug: "", name: "", image: "", blurb: "" }); setShowForm(true); }} className="inline-flex items-center justify-center gap-2 rounded-md bg-gray-900 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-gray-800 transition-colors">
          <Plus className="h-4 w-4" /> Add Category
        </button>
      </div>

      {showForm && (
        <form onSubmit={handleSave} className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 mb-6 space-y-4">
          <div className="flex items-center justify-between border-b border-gray-100 pb-3">
            <h2 className="text-lg font-medium text-gray-900">{editingSlug ? "Edit Category" : "New Category"}</h2>
            <button type="button" onClick={() => { setShowForm(false); setEditingSlug(null); }} className="text-xs text-gray-500 hover:text-gray-700">Close Form</button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Category Name</label>
              <input 
                required 
                type="text" 
                placeholder="e.g. Royal Silver Necklaces"
                value={catForm.name} 
                onChange={e => setCatForm({
                  ...catForm, 
                  name: e.target.value, 
                  slug: editingSlug ? catForm.slug : e.target.value.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '')
                })} 
                className="mt-1 w-full border border-gray-300 rounded-md py-2 px-3 text-sm focus:ring-1 focus:ring-gray-900 focus:outline-none" 
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Category Slug (URL Identifier)</label>
              <input 
                required 
                type="text" 
                value={catForm.slug} 
                disabled={!!editingSlug} 
                onChange={e => setCatForm({...catForm, slug: e.target.value})} 
                className="mt-1 w-full border border-gray-300 rounded-md py-2 px-3 text-sm font-mono disabled:bg-gray-100 focus:ring-1 focus:ring-gray-900 focus:outline-none" 
              />
            </div>

            <div className="md:col-span-2 space-y-2">
              <label className="block text-sm font-medium text-gray-700">Category Photo</label>
              
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
                {catForm.image ? (
                  <div className="relative group w-24 h-24 rounded-lg overflow-hidden border border-gray-200 shrink-0 bg-gray-50">
                    <img src={catForm.image} alt="Category preview" className="w-full h-full object-cover" />
                    <button 
                      type="button" 
                      onClick={() => setCatForm({ ...catForm, image: "" })} 
                      className="absolute inset-0 bg-black/60 text-white text-xs opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity font-medium"
                    >
                      Remove Photo
                    </button>
                  </div>
                ) : (
                  <div className="w-24 h-24 rounded-lg border-2 border-dashed border-gray-300 flex flex-col items-center justify-center shrink-0 bg-gray-50 text-gray-400">
                    <ImageIcon className="w-6 h-6 mb-1" />
                    <span className="text-[10px]">No Photo</span>
                  </div>
                )}

                <div className="flex-1 space-y-2 w-full">
                  <div className="relative inline-block">
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageUpload}
                      disabled={uploadingImage}
                      className="absolute inset-0 w-full h-full opacity-0 cursor-pointer disabled:cursor-not-allowed"
                    />
                    <button
                      type="button"
                      disabled={uploadingImage}
                      className="inline-flex items-center gap-2 bg-amber-50 text-amber-800 border border-amber-200 px-4 py-2 rounded-md text-sm font-medium hover:bg-amber-100 transition-colors disabled:opacity-50"
                    >
                      {uploadingImage ? <Loader2 className="w-4 h-4 animate-spin" /> : <Upload className="w-4 h-4 text-amber-600" />}
                      {uploadingImage ? "Uploading Photo..." : catForm.image ? "Change Photo from Computer" : "Upload Category Photo"}
                    </button>
                  </div>
                  
                  <div className="text-xs text-gray-400">
                    Upload image directly from your computer or phone. Or enter URL link below:
                  </div>

                  <input 
                    type="text" 
                    placeholder="https://example.com/image.jpg"
                    value={catForm.image} 
                    onChange={e => setCatForm({...catForm, image: e.target.value})} 
                    className="w-full border border-gray-200 rounded-md py-1.5 px-3 text-xs text-gray-600 focus:ring-1 focus:ring-gray-900 focus:outline-none" 
                  />
                </div>
              </div>
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700">Description / Blurb</label>
              <textarea 
                required 
                value={catForm.blurb} 
                onChange={e => setCatForm({...catForm, blurb: e.target.value})} 
                className="mt-1 w-full border border-gray-300 rounded-md py-2 px-3 text-sm focus:ring-1 focus:ring-gray-900 focus:outline-none" 
                rows={2} 
                placeholder="Short description of this jewelry collection..."
              />
            </div>
          </div>

          <div className="flex justify-end gap-3 pt-2">
            <button type="button" onClick={() => { setShowForm(false); setEditingSlug(null); }} className="px-4 py-2 text-sm text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50">Cancel</button>
            <button type="submit" disabled={saving || uploadingImage} className="px-4 py-2 text-sm text-white bg-gray-900 rounded-md hover:bg-gray-800 disabled:opacity-50">{saving ? "Saving..." : editingSlug ? "Update Category" : "Save Category"}</button>
          </div>
        </form>
      )}

      <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-gray-50 border-b border-gray-200 text-gray-500 uppercase tracking-wider text-[11px] font-semibold">
              <tr>
                <th className="px-6 py-4">Category Photo</th>
                <th className="px-6 py-4">Category Name</th>
                <th className="px-6 py-4">Slug</th>
                <th className="px-6 py-4">Description</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {loading ? (
                <tr>
                  <td colSpan={5} className="px-6 py-8 text-center text-gray-500">Loading categories...</td>
                </tr>
              ) : categories.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-6 py-8 text-center text-gray-500">No categories found. Click "Add Category" to create one.</td>
                </tr>
              ) : (
                categories.map((category) => (
                  <tr key={category.slug} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4">
                      <div className="h-12 w-12 shrink-0 overflow-hidden rounded-md border border-gray-200 bg-gray-100">
                        <img
                          src={category.image || "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=300"}
                          alt={category.name}
                          className="h-full w-full object-cover"
                        />
                      </div>
                    </td>
                    <td className="px-6 py-4 font-medium text-gray-900">{category.name}</td>
                    <td className="px-6 py-4 text-gray-500 font-mono text-xs">{category.slug}</td>
                    <td className="px-6 py-4 text-gray-500 max-w-xs truncate">{category.blurb}</td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button 
                          onClick={() => handleEditClick(category)} 
                          className="inline-flex items-center gap-1 px-2.5 py-1 text-xs font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-blue-50 hover:text-blue-600 transition-colors"
                          title="Edit Category"
                        >
                          <Edit className="h-3.5 w-3.5" /> Edit
                        </button>
                        <button 
                          onClick={() => handleDelete(category.slug, category.name)} 
                          className="inline-flex items-center gap-1 px-2.5 py-1 text-xs font-medium text-red-600 bg-red-50 rounded-md hover:bg-red-100 transition-colors"
                          title="Delete Category"
                        >
                          <Trash2 className="h-3.5 w-3.5" /> Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

