import { createFileRoute } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import { Sparkles, X, Maximize2 } from "lucide-react";

export const Route = createFileRoute("/gallery")({
  head: () => ({
    meta: [
      { title: "Atelier Gallery — Raani Chittroda Gold & Silver Jewellery" },
      { name: "description", content: "Explore the visual gallery of Raani Chittroda gold and silver craftsmanship, heritage designs, temple murtis, and bespoke collections." },
      { property: "og:title", content: "Atelier Gallery — Raani Chittroda" },
      { property: "og:description", content: "Visual gallery of handcrafted gold & silver jewelry." },
    ],
  }),
  component: GalleryPage,
});

export interface GalleryItem {
  id?: string;
  imageUrl: string;
  title: string;
  category?: string;
}

const DEFAULT_GALLERY: GalleryItem[] = [
  { imageUrl: "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=800", title: "Royal Silver Necklace Set", category: "Silver" },
  { imageUrl: "https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=800", title: "Handcrafted Temple Murti", category: "Craftsmanship" },
  { imageUrl: "https://images.unsplash.com/photo-1611591475140-137da1b17b2b?w=800", title: "Heritage Gold Kada", category: "Gold" },
  { imageUrl: "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=800", title: "925 Silver Rakhi Collection", category: "Silver" },
  { imageUrl: "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=800", title: "Fine Antique Earrings", category: "Antique" },
  { imageUrl: "https://images.unsplash.com/photo-1573408301185-9146fe634ad0?w=800", title: "Custom Bridal Silver Set", category: "Craftsmanship" },
];

function GalleryPage() {
  const [items, setItems] = useState<GalleryItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedFilter, setSelectedFilter] = useState("All");
  const [activeItem, setActiveItem] = useState<GalleryItem | null>(null);

  useEffect(() => {
    fetchGallery();
  }, []);

  const fetchGallery = async () => {
    setLoading(true);
    const { data } = await supabase.from("settings").select("value").eq("key", "gallery_cms").single();
    if (data?.value && (data.value as any).images && (data.value as any).images.length > 0) {
      setItems((data.value as any).images);
    } else {
      setItems(DEFAULT_GALLERY);
    }
    setLoading(false);
  };

  const categories = ["All", ...Array.from(new Set(items.map(i => i.category).filter(Boolean))) as string[]];

  const filteredItems = selectedFilter === "All" 
    ? items 
    : items.filter(i => i.category?.toLowerCase() === selectedFilter.toLowerCase());

  return (
    <div className="bg-background min-h-screen">
      {/* Hero Header */}
      <section className="relative bg-ink text-background py-24 px-6 text-center">
        <div className="max-w-3xl mx-auto space-y-4">
          <span className="eyebrow text-gold tracking-[0.3em] font-semibold uppercase">RAANI CHITTRODA ATELIER</span>
          <h1 className="font-display text-4xl sm:text-6xl text-background">
            Visual <em className="text-gold not-italic">Gallery</em>
          </h1>
          <p className="text-sm sm:text-base text-background/75 max-w-xl mx-auto leading-relaxed">
            Discover our portfolio of handcrafted gold and 925 sterling silver jewelry, festival rakhis, temple murtis, and bespoke commissions.
          </p>
        </div>
      </section>

      {/* Filter Tabs */}
      <section className="py-8 bg-secondary border-b border-border">
        <div className="max-w-7xl mx-auto px-6 flex flex-wrap justify-center gap-3">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedFilter(cat)}
              className={`px-5 py-2 text-xs font-semibold uppercase tracking-wider rounded-full transition-all ${
                selectedFilter === cat
                  ? "bg-gold text-ink shadow-md"
                  : "bg-background text-foreground border border-border hover:border-gold"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </section>

      {/* Gallery Grid */}
      <section className="py-16 sm:py-24 max-w-7xl mx-auto px-6">
        {loading ? (
          <div className="py-20 text-center text-muted-foreground">Loading gallery items...</div>
        ) : filteredItems.length === 0 ? (
          <div className="py-20 text-center text-muted-foreground">No photos found in this category.</div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
            {filteredItems.map((item, idx) => (
              <div
                key={item.id || idx}
                onClick={() => setActiveItem(item)}
                className="group relative overflow-hidden rounded-lg border border-border bg-secondary cursor-pointer shadow-sm hover:shadow-xl transition-all duration-500"
              >
                <div className="aspect-[4/3] overflow-hidden bg-ink/10">
                  <img
                    src={item.imageUrl}
                    alt={item.title}
                    loading="lazy"
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                </div>

                <div className="absolute inset-0 bg-gradient-to-t from-ink/90 via-ink/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6 text-background">
                  <span className="text-[10px] text-gold uppercase tracking-widest font-semibold">{item.category || "Atelier"}</span>
                  <h3 className="font-display text-xl text-background">{item.title}</h3>
                  <div className="mt-2 inline-flex items-center gap-1 text-xs text-gold">
                    <Maximize2 className="w-3.5 h-3.5" /> Click to View
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* Lightbox Modal */}
      {activeItem && (
        <div className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4" onClick={() => setActiveItem(null)}>
          <button
            onClick={() => setActiveItem(null)}
            className="absolute top-6 right-6 text-white hover:text-gold p-2 bg-black/50 rounded-full"
          >
            <X className="w-6 h-6" />
          </button>
          <div className="max-w-4xl w-full max-h-[90vh] flex flex-col items-center" onClick={(e) => e.stopPropagation()}>
            <img
              src={activeItem.imageUrl}
              alt={activeItem.title}
              className="max-h-[75vh] w-auto object-contain rounded-lg shadow-2xl border border-white/20"
            />
            <div className="mt-4 text-center text-white space-y-1">
              <h3 className="font-display text-2xl text-gold">{activeItem.title}</h3>
              {activeItem.category && (
                <p className="text-xs uppercase tracking-widest text-white/60">{activeItem.category}</p>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
