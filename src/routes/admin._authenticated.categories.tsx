import { createFileRoute } from "@tanstack/react-router";
import { Plus, Edit, Trash2 } from "lucide-react";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import type { Category } from "@/lib/products";

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

  const handleDelete = async (slug: string) => {
    if (!confirm("Are you sure you want to delete this category?")) return;
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
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
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
          <p className="mt-1 text-sm text-gray-500">Organize your products into collections.</p>
        </div>
        <button onClick={() => { setEditingSlug(null); setCatForm({ slug: "", name: "", image: "", blurb: "" }); setShowForm(true); }} className="inline-flex items-center justify-center gap-2 rounded-md bg-gray-900 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-gray-800 transition-colors">
          <Plus className="h-4 w-4" /> Add Category
        </button>
      </div>

      {showForm && (
        <form onSubmit={handleSave} className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 mb-6 space-y-4">
          <h2 className="text-lg font-medium text-gray-900">{editingSlug ? "Edit Category" : "New Category"}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Name</label>
              <input required type="text" value={catForm.name} onChange={e => setCatForm({...catForm, name: e.target.value, slug: editingSlug ? catForm.slug : e.target.value.toLowerCase().replace(/[^a-z0-9]+/g, '-')})} className="mt-1 w-full border border-gray-300 rounded-md py-2 px-3 text-sm" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Slug</label>
              <input required type="text" value={catForm.slug} disabled={!!editingSlug} onChange={e => setCatForm({...catForm, slug: e.target.value})} className="mt-1 w-full border border-gray-300 rounded-md py-2 px-3 text-sm font-mono disabled:bg-gray-100" />
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700">Image URL</label>
              <input required type="text" value={catForm.image} onChange={e => setCatForm({...catForm, image: e.target.value})} className="mt-1 w-full border border-gray-300 rounded-md py-2 px-3 text-sm" />
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700">Blurb (Description)</label>
              <textarea required value={catForm.blurb} onChange={e => setCatForm({...catForm, blurb: e.target.value})} className="mt-1 w-full border border-gray-300 rounded-md py-2 px-3 text-sm" rows={2} />
            </div>
          </div>
          <div className="flex justify-end gap-3 pt-2">
            <button type="button" onClick={() => { setShowForm(false); setEditingSlug(null); }} className="px-4 py-2 text-sm text-gray-700 bg-white border border-gray-300 rounded-md">Cancel</button>
            <button type="submit" disabled={saving} className="px-4 py-2 text-sm text-white bg-gray-900 rounded-md">{saving ? "Saving..." : editingSlug ? "Update Category" : "Save Category"}</button>
          </div>
        </form>
      )}

      <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-gray-50 border-b border-gray-200 text-gray-500 uppercase tracking-wider text-[11px] font-semibold">
              <tr>
                <th className="px-6 py-4">Category</th>
                <th className="px-6 py-4">Slug</th>
                <th className="px-6 py-4">Description</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {loading ? (
                <tr>
                  <td colSpan={4} className="px-6 py-8 text-center text-gray-500">Loading categories...</td>
                </tr>
              ) : categories.length === 0 ? (
                <tr>
                  <td colSpan={4} className="px-6 py-8 text-center text-gray-500">No categories found.</td>
                </tr>
              ) : (
                categories.map((category) => (
                  <tr key={category.slug} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="h-10 w-10 shrink-0 overflow-hidden rounded bg-gray-100">
                          <img
                            src={category.image}
                            alt={category.name}
                            className="h-full w-full object-cover"
                          />
                        </div>
                        <div className="font-medium text-gray-900">{category.name}</div>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-gray-500 font-mono text-xs">{category.slug}</td>
                    <td className="px-6 py-4 text-gray-500 max-w-xs truncate">{category.blurb}</td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button onClick={() => handleEditClick(category)} className="p-1 text-gray-400 hover:text-blue-600 transition-colors">
                          <Edit className="h-4 w-4" />
                        </button>
                        <button onClick={() => handleDelete(category.slug)} className="p-1 text-gray-400 hover:text-red-600 transition-colors">
                          <Trash2 className="h-4 w-4" />
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
