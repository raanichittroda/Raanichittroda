import { createFileRoute } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { Save, Plus, Trash2, Edit, Upload, Loader2, ArrowUp, ArrowDown, Image as ImageIcon, Sparkles } from "lucide-react";
import { supabase } from "@/lib/supabase";
import { uploadMediaFile } from "@/lib/mediaUpload";

export const Route = createFileRoute("/admin/_authenticated/homepage")({
  component: HomepageCMS,
});

export interface HeroSlide {
  id: string;
  imageUrl: string;
  heading: string;
  subheading?: string;
  ctaText?: string;
  ctaLink?: string;
}

export interface AboutImage {
  id: string;
  imageUrl: string;
  title: string;
  description?: string;
}

export interface GalleryImage {
  id: string;
  imageUrl: string;
  title: string;
  category?: string;
}

function HomepageCMS() {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [activeTab, setActiveTab] = useState<"hero" | "about" | "gallery" | "text">("hero");

  // CMS Content States
  const [heroSlides, setHeroSlides] = useState<HeroSlide[]>([]);
  const [aboutImages, setAboutImages] = useState<AboutImage[]>([]);
  const [galleryImages, setGalleryImages] = useState<GalleryImage[]>([]);
  
  const [textCms, setTextCms] = useState({
    announcement: "Wholesale | Bulk Orders | Custom Jewellery | PAN India Delivery",
    heroHeading: "Crafting Elegance in Gold & Silver",
    wholesaleHeading: "Need Jewellery in Bulk?",
    aboutUsText: "We are a trusted jewellery business dealing in premium Gold & Silver products for retailers, gift shops, religious stores, and individual customers.",
    contactPageText: "Get in touch with us for any inquiries about our collections or wholesale orders.",
  });

  // Modal / Form States
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    fetchCMS();
  }, []);

  const fetchCMS = async () => {
    setLoading(true);
    // Load Homepage CMS
    const { data: homeData } = await supabase.from("settings").select("value").eq("key", "homepage_cms").single();
    if (homeData?.value) {
      const val = homeData.value as any;
      if (val.heroSlides) setHeroSlides(val.heroSlides);
      else if (val.heroImages) {
        setHeroSlides(val.heroImages.map((img: string, i: number) => ({
          id: String(i),
          imageUrl: img,
          heading: "Crafting Elegance in Gold & Silver",
          subheading: "Timeless Craftsmanship"
        })));
      }
      setTextCms(prev => ({
        ...prev,
        announcement: val.announcement || prev.announcement,
        heroHeading: val.heroHeading || prev.heroHeading,
        wholesaleHeading: val.wholesaleHeading || prev.wholesaleHeading,
        aboutUsText: val.aboutUsText || prev.aboutUsText,
        contactPageText: val.contactPageText || prev.contactPageText
      }));
    }

    // Load About CMS
    const { data: aboutData } = await supabase.from("settings").select("value").eq("key", "about_cms").single();
    if (aboutData?.value && (aboutData.value as any).images) {
      setAboutImages((aboutData.value as any).images);
    }

    // Load Gallery CMS
    const { data: galleryData } = await supabase.from("settings").select("value").eq("key", "gallery_cms").single();
    if (galleryData?.value && (galleryData.value as any).images) {
      setGalleryImages((galleryData.value as any).images);
    }

    setLoading(false);
  };

  const handleSaveAll = async () => {
    setSaving(true);
    try {
      // 1. Save Homepage & Hero Slides
      const { error: err1 } = await supabase.from("settings").upsert({
        key: "homepage_cms",
        value: {
          ...textCms,
          heroSlides,
          heroImages: heroSlides.map(s => s.imageUrl) // fallback
        }
      });

      // 2. Save About Section Images
      const { error: err2 } = await supabase.from("settings").upsert({
        key: "about_cms",
        value: { images: aboutImages }
      });

      // 3. Save Gallery Page Images
      const { error: err3 } = await supabase.from("settings").upsert({
        key: "gallery_cms",
        value: { images: galleryImages }
      });

      if (err1 || err2 || err3) {
        alert("Error saving CMS settings: " + (err1?.message || err2?.message || err3?.message));
      } else {
        alert("All CMS images & content saved successfully!");
      }
    } catch (e: any) {
      alert("Failed to save: " + e.message);
    } finally {
      setSaving(false);
    }
  };

  // Upload helper for direct file inputs
  const handleUploadForSlide = async (index: number, e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    try {
      const url = await uploadMediaFile(file, "hero_slides");
      setHeroSlides(prev => {
        const copy = [...prev];
        copy[index].imageUrl = url;
        return copy;
      });
    } catch (err: any) {
      alert("Upload failed: " + err.message);
    } finally {
      setUploading(false);
    }
  };

  const handleUploadForAbout = async (index: number, e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    try {
      const url = await uploadMediaFile(file, "about_section");
      setAboutImages(prev => {
        const copy = [...prev];
        copy[index].imageUrl = url;
        return copy;
      });
    } catch (err: any) {
      alert("Upload failed: " + err.message);
    } finally {
      setUploading(false);
    }
  };

  const handleUploadForGallery = async (index: number, e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    try {
      const url = await uploadMediaFile(file, "gallery");
      setGalleryImages(prev => {
        const copy = [...prev];
        copy[index].imageUrl = url;
        return copy;
      });
    } catch (err: any) {
      alert("Upload failed: " + err.message);
    } finally {
      setUploading(false);
    }
  };

  if (loading) {
    return <div className="p-12 text-center text-gray-500">Loading Content Management System...</div>;
  }

  return (
    <div className="max-w-5xl mx-auto space-y-6 pb-24">
      {/* Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 tracking-tight flex items-center gap-2">
            <Sparkles className="w-6 h-6 text-amber-600" /> Website Content & Image Manager
          </h1>
          <p className="text-sm text-gray-500 mt-1">Manage Hero Slider photos, About Section images, Gallery page photos & Site text.</p>
        </div>
        <button
          onClick={handleSaveAll}
          disabled={saving || uploading}
          className="inline-flex items-center gap-2 bg-gray-900 text-white px-5 py-2.5 rounded-md font-medium text-sm hover:bg-gray-800 transition-colors disabled:opacity-50 shadow-sm"
        >
          {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
          {saving ? "Saving Changes..." : "Save All CMS Changes"}
        </button>
      </div>

      {/* Navigation Tabs */}
      <div className="flex border-b border-gray-200 bg-white px-4 pt-2 rounded-t-lg">
        {[
          { id: "hero", label: `Hero Slider (${heroSlides.length})` },
          { id: "about", label: `About Section (${aboutImages.length})` },
          { id: "gallery", label: `Gallery Page (${galleryImages.length})` },
          { id: "text", label: "Announcement & Text" },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as any)}
            className={`px-5 py-3 text-sm font-semibold border-b-2 transition-colors ${
              activeTab === tab.id
                ? "border-amber-600 text-amber-600"
                : "border-transparent text-gray-500 hover:text-gray-900"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* TAB 1: HERO SLIDER */}
      {activeTab === "hero" && (
        <div className="space-y-6 bg-white p-6 rounded-b-lg border border-t-0 border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-lg font-bold text-gray-900">Hero Slider Images</h2>
              <p className="text-xs text-gray-500">These images flow automatically as a background banner slider on the homepage.</p>
            </div>
            <button
              onClick={() => {
                setHeroSlides([
                  ...heroSlides,
                  {
                    id: String(Date.now()),
                    imageUrl: "",
                    heading: "Crafting Elegance in Gold & Silver",
                    subheading: "Heritage Jewellery Manufacturer",
                    ctaText: "Explore Collection",
                    ctaLink: "/collections"
                  }
                ]);
              }}
              className="inline-flex items-center gap-2 bg-amber-50 text-amber-900 border border-amber-200 px-4 py-2 rounded-md text-sm font-medium hover:bg-amber-100 transition-colors"
            >
              <Plus className="w-4 h-4 text-amber-600" /> Add Hero Slide
            </button>
          </div>

          {heroSlides.length === 0 ? (
            <div className="p-12 text-center border-2 border-dashed border-gray-200 rounded-lg text-gray-400">
              No hero slides added yet. Click "Add Hero Slide" above to add your first slider image.
            </div>
          ) : (
            <div className="space-y-6">
              {heroSlides.map((slide, idx) => (
                <div key={slide.id || idx} className="p-5 border border-gray-200 rounded-lg bg-gray-50/50 space-y-4">
                  <div className="flex items-center justify-between border-b border-gray-200 pb-3">
                    <span className="font-bold text-sm text-gray-800 flex items-center gap-2">
                      <span className="w-6 h-6 rounded-full bg-amber-600 text-white text-xs flex items-center justify-center font-mono">{idx + 1}</span>
                      Slide #{idx + 1}
                    </span>
                    <div className="flex items-center gap-2">
                      <button
                        disabled={idx === 0}
                        onClick={() => {
                          const copy = [...heroSlides];
                          const temp = copy[idx - 1];
                          copy[idx - 1] = copy[idx];
                          copy[idx] = temp;
                          setHeroSlides(copy);
                        }}
                        className="p-1 text-gray-400 hover:text-gray-700 disabled:opacity-30"
                        title="Move Up"
                      >
                        <ArrowUp className="w-4 h-4" />
                      </button>
                      <button
                        disabled={idx === heroSlides.length - 1}
                        onClick={() => {
                          const copy = [...heroSlides];
                          const temp = copy[idx + 1];
                          copy[idx + 1] = copy[idx];
                          copy[idx] = temp;
                          setHeroSlides(copy);
                        }}
                        className="p-1 text-gray-400 hover:text-gray-700 disabled:opacity-30"
                        title="Move Down"
                      >
                        <ArrowDown className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => setHeroSlides(heroSlides.filter((_, i) => i !== idx))}
                        className="p-1 text-red-500 hover:text-red-700 ml-2"
                        title="Delete Slide"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-start">
                    {/* Image Preview & Upload */}
                    <div className="space-y-2">
                      <label className="block text-xs font-semibold text-gray-700">Slide Photo</label>
                      <div className="relative aspect-video w-full rounded-md border border-gray-300 overflow-hidden bg-gray-200 flex items-center justify-center">
                        {slide.imageUrl ? (
                          <img src={slide.imageUrl} alt={`Slide ${idx + 1}`} className="w-full h-full object-cover" />
                        ) : (
                          <div className="text-center text-gray-400">
                            <ImageIcon className="w-8 h-8 mx-auto mb-1 opacity-50" />
                            <span className="text-xs">No image selected</span>
                          </div>
                        )}
                      </div>

                      <div className="relative w-full">
                        <input
                          type="file"
                          accept="image/*"
                          onChange={(e) => handleUploadForSlide(idx, e)}
                          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                        />
                        <button
                          type="button"
                          className="w-full py-1.5 px-3 bg-white border border-gray-300 rounded text-xs font-medium text-gray-700 hover:bg-gray-50 flex items-center justify-center gap-1"
                        >
                          <Upload className="w-3.5 h-3.5 text-amber-600" /> Choose Photo from Device
                        </button>
                      </div>

                      <input
                        type="text"
                        placeholder="Or enter Image URL..."
                        value={slide.imageUrl}
                        onChange={(e) => {
                          const copy = [...heroSlides];
                          copy[idx].imageUrl = e.target.value;
                          setHeroSlides(copy);
                        }}
                        className="w-full text-xs p-2 border border-gray-200 rounded focus:ring-1 focus:ring-gray-900"
                      />
                    </div>

                    {/* Text Details */}
                    <div className="md:col-span-2 space-y-3">
                      <div>
                        <label className="block text-xs font-semibold text-gray-700 mb-1">Slide Heading</label>
                        <input
                          type="text"
                          value={slide.heading}
                          onChange={(e) => {
                            const copy = [...heroSlides];
                            copy[idx].heading = e.target.value;
                            setHeroSlides(copy);
                          }}
                          className="w-full text-sm p-2 border border-gray-300 rounded focus:ring-1 focus:ring-gray-900"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-semibold text-gray-700 mb-1">Subheading / Description</label>
                        <input
                          type="text"
                          value={slide.subheading || ""}
                          onChange={(e) => {
                            const copy = [...heroSlides];
                            copy[idx].subheading = e.target.value;
                            setHeroSlides(copy);
                          }}
                          className="w-full text-sm p-2 border border-gray-300 rounded focus:ring-1 focus:ring-gray-900"
                        />
                      </div>

                      <div className="grid grid-cols-2 gap-3">
                        <div>
                          <label className="block text-xs font-semibold text-gray-700 mb-1">Button Text</label>
                          <input
                            type="text"
                            value={slide.ctaText || ""}
                            onChange={(e) => {
                              const copy = [...heroSlides];
                              copy[idx].ctaText = e.target.value;
                              setHeroSlides(copy);
                            }}
                            className="w-full text-sm p-2 border border-gray-300 rounded focus:ring-1 focus:ring-gray-900"
                          />
                        </div>
                        <div>
                          <label className="block text-xs font-semibold text-gray-700 mb-1">Button Link</label>
                          <input
                            type="text"
                            value={slide.ctaLink || ""}
                            onChange={(e) => {
                              const copy = [...heroSlides];
                              copy[idx].ctaLink = e.target.value;
                              setHeroSlides(copy);
                            }}
                            className="w-full text-sm p-2 border border-gray-300 rounded focus:ring-1 focus:ring-gray-900"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* TAB 2: ABOUT SECTION IMAGES */}
      {activeTab === "about" && (
        <div className="space-y-6 bg-white p-6 rounded-b-lg border border-t-0 border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-lg font-bold text-gray-900">About Section Images</h2>
              <p className="text-xs text-gray-500">Manage photos displayed in the About Us section and page.</p>
            </div>
            <button
              onClick={() => {
                setAboutImages([
                  ...aboutImages,
                  {
                    id: String(Date.now()),
                    imageUrl: "",
                    title: "Our Heritage Studio",
                    description: "Handcrafted perfection in every jewel."
                  }
                ]);
              }}
              className="inline-flex items-center gap-2 bg-amber-50 text-amber-900 border border-amber-200 px-4 py-2 rounded-md text-sm font-medium hover:bg-amber-100 transition-colors"
            >
              <Plus className="w-4 h-4 text-amber-600" /> Add About Photo
            </button>
          </div>

          {aboutImages.length === 0 ? (
            <div className="p-12 text-center border-2 border-dashed border-gray-200 rounded-lg text-gray-400">
              No About section images added yet. Click "Add About Photo" to upload images.
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {aboutImages.map((img, idx) => (
                <div key={img.id || idx} className="p-4 border border-gray-200 rounded-lg bg-gray-50 space-y-3">
                  <div className="flex items-center justify-between border-b border-gray-200 pb-2">
                    <span className="font-bold text-xs text-gray-700">About Photo #{idx + 1}</span>
                    <button
                      onClick={() => setAboutImages(aboutImages.filter((_, i) => i !== idx))}
                      className="p-1 text-red-500 hover:text-red-700"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>

                  <div className="relative aspect-video rounded overflow-hidden bg-gray-200 border border-gray-300">
                    {img.imageUrl ? (
                      <img src={img.imageUrl} alt={img.title} className="w-full h-full object-cover" />
                    ) : (
                      <div className="flex items-center justify-center h-full text-gray-400 text-xs">No image</div>
                    )}
                  </div>

                  <div className="relative w-full">
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => handleUploadForAbout(idx, e)}
                      className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                    />
                    <button
                      type="button"
                      className="w-full py-1.5 px-3 bg-white border border-gray-300 rounded text-xs font-medium text-gray-700 hover:bg-gray-50 flex items-center justify-center gap-1"
                    >
                      <Upload className="w-3.5 h-3.5 text-amber-600" /> Choose Photo from Device
                    </button>
                  </div>

                  <input
                    type="text"
                    placeholder="Photo Title / Caption"
                    value={img.title}
                    onChange={(e) => {
                      const copy = [...aboutImages];
                      copy[idx].title = e.target.value;
                      setAboutImages(copy);
                    }}
                    className="w-full text-xs p-2 border border-gray-300 rounded"
                  />

                  <textarea
                    rows={2}
                    placeholder="Short Description"
                    value={img.description || ""}
                    onChange={(e) => {
                      const copy = [...aboutImages];
                      copy[idx].description = e.target.value;
                      setAboutImages(copy);
                    }}
                    className="w-full text-xs p-2 border border-gray-300 rounded"
                  />
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* TAB 3: GALLERY PAGE IMAGES */}
      {activeTab === "gallery" && (
        <div className="space-y-6 bg-white p-6 rounded-b-lg border border-t-0 border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-lg font-bold text-gray-900">Gallery Page Photos</h2>
              <p className="text-xs text-gray-500">Add, edit, and delete photos displayed on the main website Gallery Page.</p>
            </div>
            <button
              onClick={() => {
                setGalleryImages([
                  ...galleryImages,
                  {
                    id: String(Date.now()),
                    imageUrl: "",
                    title: "Silver Temple Murti Crafting",
                    category: "Craftsmanship"
                  }
                ]);
              }}
              className="inline-flex items-center gap-2 bg-amber-50 text-amber-900 border border-amber-200 px-4 py-2 rounded-md text-sm font-medium hover:bg-amber-100 transition-colors"
            >
              <Plus className="w-4 h-4 text-amber-600" /> Add Gallery Photo
            </button>
          </div>

          {galleryImages.length === 0 ? (
            <div className="p-12 text-center border-2 border-dashed border-gray-200 rounded-lg text-gray-400">
              No gallery images added yet. Click "Add Gallery Photo" to add images.
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              {galleryImages.map((img, idx) => (
                <div key={img.id || idx} className="p-4 border border-gray-200 rounded-lg bg-gray-50 space-y-3">
                  <div className="flex items-center justify-between border-b border-gray-200 pb-2">
                    <span className="font-bold text-xs text-gray-700">Gallery #{idx + 1}</span>
                    <button
                      onClick={() => setGalleryImages(galleryImages.filter((_, i) => i !== idx))}
                      className="p-1 text-red-500 hover:text-red-700"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>

                  <div className="relative aspect-square rounded overflow-hidden bg-gray-200 border border-gray-300">
                    {img.imageUrl ? (
                      <img src={img.imageUrl} alt={img.title} className="w-full h-full object-cover" />
                    ) : (
                      <div className="flex items-center justify-center h-full text-gray-400 text-xs">No image</div>
                    )}
                  </div>

                  <div className="relative w-full">
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => handleUploadForGallery(idx, e)}
                      className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                    />
                    <button
                      type="button"
                      className="w-full py-1.5 px-3 bg-white border border-gray-300 rounded text-xs font-medium text-gray-700 hover:bg-gray-50 flex items-center justify-center gap-1"
                    >
                      <Upload className="w-3.5 h-3.5 text-amber-600" /> Upload Image File
                    </button>
                  </div>

                  <input
                    type="text"
                    placeholder="Photo Title"
                    value={img.title}
                    onChange={(e) => {
                      const copy = [...galleryImages];
                      copy[idx].title = e.target.value;
                      setGalleryImages(copy);
                    }}
                    className="w-full text-xs p-2 border border-gray-300 rounded"
                  />

                  <input
                    type="text"
                    placeholder="Category (e.g. Gold, Silver, Workshop)"
                    value={img.category || ""}
                    onChange={(e) => {
                      const copy = [...galleryImages];
                      copy[idx].category = e.target.value;
                      setGalleryImages(copy);
                    }}
                    className="w-full text-xs p-2 border border-gray-300 rounded"
                  />
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* TAB 4: TEXT CMS */}
      {activeTab === "text" && (
        <div className="space-y-6 bg-white p-6 rounded-b-lg border border-t-0 border-gray-200">
          <section className="space-y-4">
            <h2 className="text-lg font-bold text-gray-900">Announcement Bar Text</h2>
            <input
              type="text"
              value={textCms.announcement}
              onChange={(e) => setTextCms({ ...textCms, announcement: e.target.value })}
              className="w-full p-2.5 border border-gray-300 rounded-md text-sm"
            />
          </section>

          <section className="space-y-4 pt-4 border-t border-gray-200">
            <h2 className="text-lg font-bold text-gray-900">Wholesale Banner Heading</h2>
            <input
              type="text"
              value={textCms.wholesaleHeading}
              onChange={(e) => setTextCms({ ...textCms, wholesaleHeading: e.target.value })}
              className="w-full p-2.5 border border-gray-300 rounded-md text-sm"
            />
          </section>

          <section className="space-y-4 pt-4 border-t border-gray-200">
            <h2 className="text-lg font-bold text-gray-900">About Page Description Text</h2>
            <textarea
              rows={4}
              value={textCms.aboutUsText}
              onChange={(e) => setTextCms({ ...textCms, aboutUsText: e.target.value })}
              className="w-full p-2.5 border border-gray-300 rounded-md text-sm"
            />
          </section>

          <section className="space-y-4 pt-4 border-t border-gray-200">
            <h2 className="text-lg font-bold text-gray-900">Contact Page Text</h2>
            <textarea
              rows={3}
              value={textCms.contactPageText}
              onChange={(e) => setTextCms({ ...textCms, contactPageText: e.target.value })}
              className="w-full p-2.5 border border-gray-300 rounded-md text-sm"
            />
          </section>
        </div>
      )}
    </div>
  );
}
