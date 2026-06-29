import { createFileRoute } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { Plus, Edit, Trash2, Star } from "lucide-react";
import { supabase } from "@/lib/supabase";

export const Route = createFileRoute("/admin/_authenticated/reviews")({
  component: ReviewsCMS,
});

interface Review {
  id: string;
  name: string;
  city: string;
  comment: string;
  rating: number;
}

function ReviewsCMS() {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [reviewForm, setReviewForm] = useState<Omit<Review, "id">>({
    name: "",
    city: "",
    comment: "",
    rating: 5,
  });

  useEffect(() => {
    fetchReviews();
  }, []);

  const fetchReviews = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from("settings")
      .select("value")
      .eq("key", "customer_reviews")
      .single();
    
    if (data && data.value) {
      setReviews(data.value as Review[]);
    }
    setLoading(false);
  };

  const handleSaveReviews = async (updatedReviews: Review[]) => {
    setSaving(true);
    const { error } = await supabase.from("settings").upsert({
      key: "customer_reviews",
      value: updatedReviews,
    });
    setSaving(false);
    
    if (error) {
      alert("Failed to save reviews: " + error.message);
      return false;
    }
    return true;
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    let updatedReviews: Review[];

    if (editingId) {
      updatedReviews = reviews.map((r) =>
        r.id === editingId ? { ...r, ...reviewForm } : r
      );
    } else {
      // Simple random ID generation fallback for browser environments
      const newReview: Review = {
        id: Math.random().toString(36).substring(2, 9),
        ...reviewForm,
      };
      updatedReviews = [...reviews, newReview];
    }

    const success = await handleSaveReviews(updatedReviews);
    if (success) {
      setReviews(updatedReviews);
      setShowForm(false);
      setEditingId(null);
      setReviewForm({ name: "", city: "", comment: "", rating: 5 });
    }
  };

  const handleEditClick = (review: Review) => {
    setReviewForm({
      name: review.name,
      city: review.city,
      comment: review.comment,
      rating: review.rating,
    });
    setEditingId(review.id);
    setShowForm(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this review?")) return;
    const updatedReviews = reviews.filter((r) => r.id !== id);
    const success = await handleSaveReviews(updatedReviews);
    if (success) {
      setReviews(updatedReviews);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 tracking-tight">Customer Reviews</h1>
          <p className="mt-1 text-sm text-gray-500">Manage customer testimonials shown on the homepage.</p>
        </div>
        <button 
          onClick={() => { 
            setEditingId(null); 
            setReviewForm({ name: "", city: "", comment: "", rating: 5 }); 
            setShowForm(true); 
          }} 
          className="inline-flex items-center justify-center gap-2 rounded-md bg-gray-900 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-gray-800 transition-colors"
        >
          <Plus className="h-4 w-4" /> Add Review
        </button>
      </div>

      {showForm && (
        <form onSubmit={handleFormSubmit} className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 mb-6 space-y-4">
          <h2 className="text-lg font-medium text-gray-900">{editingId ? "Edit Review" : "Add Review"}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Customer Name</label>
              <input required type="text" value={reviewForm.name} onChange={e => setReviewForm({...reviewForm, name: e.target.value})} className="mt-1 w-full border border-gray-300 rounded-md py-2 px-3 text-sm focus:outline-none focus:ring-1 focus:ring-gray-900 focus:border-gray-900" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">City / Designation</label>
              <input required type="text" value={reviewForm.city} onChange={e => setReviewForm({...reviewForm, city: e.target.value})} className="mt-1 w-full border border-gray-300 rounded-md py-2 px-3 text-sm focus:outline-none focus:ring-1 focus:ring-gray-900 focus:border-gray-900" placeholder="e.g. Mumbai" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Rating (Stars)</label>
              <select value={reviewForm.rating} onChange={e => setReviewForm({...reviewForm, rating: Number(e.target.value)})} className="mt-1 w-full border border-gray-300 rounded-md py-2 px-3 text-sm focus:outline-none focus:ring-1 focus:ring-gray-900 focus:border-gray-900 bg-white">
                {[5, 4, 3, 2, 1].map(r => <option key={r} value={r}>{r} Stars</option>)}
              </select>
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700">Comment</label>
              <textarea required value={reviewForm.comment} onChange={e => setReviewForm({...reviewForm, comment: e.target.value})} className="mt-1 w-full border border-gray-300 rounded-md py-2 px-3 text-sm focus:outline-none focus:ring-1 focus:ring-gray-900 focus:border-gray-900" rows={4} placeholder="Write the testimonial here..." />
            </div>
          </div>
          <div className="flex justify-end gap-3 pt-2">
            <button type="button" onClick={() => { setShowForm(false); setEditingId(null); }} className="px-4 py-2 text-sm text-gray-700 bg-white border border-gray-300 rounded-md">Cancel</button>
            <button type="submit" disabled={saving} className="px-4 py-2 text-sm text-white bg-gray-900 rounded-md">{saving ? "Saving..." : editingId ? "Update Review" : "Save Review"}</button>
          </div>
        </form>
      )}

      <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-gray-50 border-b border-gray-200 text-gray-500 uppercase tracking-wider text-[11px] font-semibold">
              <tr>
                <th className="px-6 py-4">Customer</th>
                <th className="px-6 py-4">Rating</th>
                <th className="px-6 py-4">Review Text</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {loading ? (
                <tr>
                  <td colSpan={4} className="px-6 py-8 text-center text-gray-500">Loading reviews...</td>
                </tr>
              ) : reviews.length === 0 ? (
                <tr>
                  <td colSpan={4} className="px-6 py-8 text-center text-gray-500">No reviews found. Add some to display them on the homepage.</td>
                </tr>
              ) : (
                reviews.map((review) => (
                  <tr key={review.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4">
                      <div className="font-medium text-gray-900">{review.name}</div>
                      <div className="text-xs text-gray-500">{review.city}</div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center text-gold gap-0.5">
                        {Array.from({ length: review.rating }).map((_, idx) => (
                          <Star key={idx} className="w-4 h-4 fill-current text-gold" />
                        ))}
                      </div>
                    </td>
                    <td className="px-6 py-4 text-gray-500 max-w-md truncate">{review.comment}</td>
                    <td className="px-6 py-4 text-right animate-none">
                      <div className="flex items-center justify-end gap-2">
                        <button onClick={() => handleEditClick(review)} className="p-1 text-gray-400 hover:text-blue-600 transition-colors">
                          <Edit className="h-4 w-4" />
                        </button>
                        <button onClick={() => handleDelete(review.id)} className="p-1 text-gray-400 hover:text-red-600 transition-colors">
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
