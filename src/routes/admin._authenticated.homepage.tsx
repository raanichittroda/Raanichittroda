import { createFileRoute } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { Save } from "lucide-react";
import { supabase } from "@/lib/supabase";

export const Route = createFileRoute("/admin/_authenticated/homepage")({
  component: HomepageCMS,
});

function HomepageCMS() {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [cms, setCms] = useState({
    announcement: "Wholesale | Bulk Orders | Custom Jewellery | PAN India Delivery",
    heroHeading: "Crafting Elegance in Gold & Silver",
    wholesaleHeading: "Need Jewellery in Bulk?",
    aboutUsText: "We are a trusted jewellery business dealing in premium Gold & Silver products for retailers, gift shops, religious stores, and individual customers.",
    contactPageText: "Get in touch with us for any inquiries about our collections or wholesale orders.",
    heroImages: [] as string[]
  });

  useEffect(() => {
    fetchCMS();
  }, []);

  const fetchCMS = async () => {
    setLoading(true);
    const { data, error } = await supabase.from("settings").select("value").eq("key", "homepage_cms").single();
    if (data && data.value) {
      setCms(prev => ({ ...prev, ...(data.value as any) }));
    }
    setLoading(false);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    const { error } = await supabase.from("settings").upsert({
      key: "homepage_cms",
      value: cms
    });
    setSaving(false);
    
    if (error) {
      alert("Failed to save CMS settings: " + error.message);
    } else {
      alert("Saved CMS Settings to database successfully!");
    }
  };

  if (loading) {
    return <div className="p-8 text-center text-gray-500">Loading CMS...</div>;
  }

  return (
    <div className="max-w-4xl pb-20">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-gray-900">Content Management</h1>
          <p className="mt-2 text-sm text-gray-500">Edit website text content directly.</p>
        </div>
        <button onClick={handleSave} disabled={saving} className="inline-flex items-center gap-2 bg-gray-900 text-white px-4 py-2 rounded-md hover:bg-gray-800 disabled:opacity-50">
          <Save className="w-4 h-4" /> {saving ? "Saving..." : "Save All Changes"}
        </button>
      </div>

      <div className="space-y-8">
        <section className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Announcement Bar</h2>
          <input 
            type="text" 
            value={cms.announcement} 
            onChange={(e) => setCms({...cms, announcement: e.target.value})}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-gray-900 focus:border-gray-900"
          />
        </section>

        <section className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Hero Section</h2>
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Heading</label>
              <input 
                type="text" 
                value={cms.heroHeading} 
                onChange={(e) => setCms({...cms, heroHeading: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-gray-900 focus:border-gray-900"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Slider Images (URLs)</label>
              <div className="space-y-2">
                {(cms.heroImages || []).map((imgUrl, idx) => (
                  <div key={idx} className="flex gap-2 items-center">
                    <input 
                      type="text" 
                      placeholder="https://example.com/image.jpg"
                      value={imgUrl} 
                      onChange={(e) => {
                        const updated = [...(cms.heroImages || [])];
                        updated[idx] = e.target.value;
                        setCms({...cms, heroImages: updated});
                      }}
                      className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:ring-gray-900 focus:border-gray-900"
                    />
                    <button
                      type="button"
                      onClick={() => {
                        const updated = (cms.heroImages || []).filter((_, i) => i !== idx);
                        setCms({...cms, heroImages: updated});
                      }}
                      className="px-3 py-2 bg-red-50 text-red-600 border border-red-200 rounded-md hover:bg-red-100 text-xs font-semibold"
                    >
                      Remove
                    </button>
                  </div>
                ))}
                <button
                  type="button"
                  onClick={() => {
                    setCms({...cms, heroImages: [...(cms.heroImages || []), ""]});
                  }}
                  className="mt-2 text-xs font-semibold text-gold hover:text-yellow-600 flex items-center gap-1"
                >
                  + Add Slider Image URL
                </button>
              </div>
            </div>
          </div>
        </section>

        <section className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Wholesale Banner</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Heading</label>
              <input 
                type="text" 
                value={cms.wholesaleHeading} 
                onChange={(e) => setCms({...cms, wholesaleHeading: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-gray-900 focus:border-gray-900"
              />
            </div>
          </div>
        </section>

        <section className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">About Page & Homepage Footer</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
              <textarea 
                rows={4}
                value={cms.aboutUsText} 
                onChange={(e) => setCms({...cms, aboutUsText: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-gray-900 focus:border-gray-900"
              />
            </div>
          </div>
        </section>

        <section className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Contact Page Text</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
              <textarea 
                rows={3}
                value={cms.contactPageText} 
                onChange={(e) => setCms({...cms, contactPageText: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-gray-900 focus:border-gray-900"
              />
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
