import { createClient } from "@supabase/supabase-js";
import fs from "fs";
import path from "path";

// Mock data (we could import it, but we'll just hardcode it to avoid vite/ts import issues in node)
const supabase = createClient(
  "https://fmaqalanvoejxfefkxrp.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZtYXFhbGFudm9lanhmZWZreHJwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODI1MzI5NzcsImV4cCI6MjA5ODEwODk3N30.JvplkURgY62jfdLd6Xq5ZHh-94WioXWkkbT82Tvk3_k"
);

const categories = [
  { slug: "silver-rakhis", name: "Silver Rakhis", image: "/cat-rakhi.jpg", blurb: "Hand-finished bonds of love." },
  { slug: "silver-murtis", name: "Silver Murtis", image: "/cat-murti.jpg", blurb: "Sacred idols, perfectly cast." },
  { slug: "silver-necklaces", name: "Silver Necklaces", image: "/cat-necklace.jpg", blurb: "Statement pieces, soft lustre." },
  { slug: "silver-chains", name: "Silver Chains", image: "/cat-chain.jpg", blurb: "Everyday icons, refined links." },
  { slug: "silver-bracelets", name: "Silver Bracelets", image: "/cat-bracelet.jpg", blurb: "Sculpted to the wrist." },
  { slug: "silver-rings", name: "Silver Rings", image: "/cat-bracelet.jpg", blurb: "Elegance on your fingers." },
  { slug: "silver-coins", name: "Silver Coins", image: "/cat-coin.jpg", blurb: "Pure 999, gifted forever." },
  { slug: "silver-gift-articles", name: "Silver Gift Articles", image: "/cat-gift.jpg", blurb: "Curated for occasions." },
  { slug: "gold-jewellery", name: "Gold Jewellery", image: "/cat-necklace.jpg", blurb: "Timeless gold masterpieces." },
  { slug: "custom-orders", name: "Custom Orders", image: "/cat-murti.jpg", blurb: "Bespoke creations for you." },
];

function p(id, name, category, price, flags = {}) {
  return {
    id,
    name,
    category,
    retail_price: price,
    image: categories.find(c => c.slug === category).image,
    description: "Hand-crafted in 92.5 sterling silver with meticulous detailing. Each piece is hallmarked and presented in our signature Raani Chittroda box.",
    weight: `${(10 + (price % 30)).toFixed(1)} g`,
    purity: category === "silver-coins" ? "999 Fine Silver" : "925 Sterling Silver",
    is_new: flags.new ?? false,
    is_best_seller: flags.best ?? false,
    in_stock: flags.inStock ?? true,
    is_active: true,
    offer_badge: flags.offerBadge || null,
  };
}

const products = [
  p("AUR-RK-001", "Lotus Filigree Rakhi", "silver-rakhis", 1499, { best: true }),
  p("AUR-RK-002", "Royal Kalash Rakhi", "silver-rakhis", 1899, { new: true }),
  p("AUR-RK-003", "Mandala Silver Rakhi", "silver-rakhis", 1299),
  p("AUR-RK-004", "Heritage Stone Rakhi", "silver-rakhis", 2199),

  p("AUR-MU-001", "Ganesha Murti — Small", "silver-murtis", 4999, { best: true }),
  p("AUR-MU-002", "Lakshmi Murti", "silver-murtis", 6499, { new: true }),
  p("AUR-MU-003", "Krishna Murti", "silver-murtis", 5499),
  p("AUR-MU-004", "Saraswati Murti", "silver-murtis", 7299),

  p("AUR-NK-001", "Filigree Drop Pendant", "silver-necklaces", 3899, { best: true }),
  p("AUR-NK-002", "Serene Pearl Necklace", "silver-necklaces", 5299, { new: true }),
  p("AUR-NK-003", "Mughal Bloom Necklace", "silver-necklaces", 7899),
  p("AUR-NK-004", "Minimalist Bar Necklace", "silver-necklaces", 2499),

  p("AUR-CH-001", "Classic Cable Chain", "silver-chains", 1899, { best: true }),
  p("AUR-CH-002", "Box Link Chain", "silver-chains", 2299),
  p("AUR-CH-003", "Figaro Chain", "silver-chains", 2499, { new: true }),
  p("AUR-CH-004", "Rope Twist Chain", "silver-chains", 2799),

  p("AUR-BR-001", "Engraved Bangle", "silver-bracelets", 2899),
  p("AUR-BR-002", "Twist Cuff Bracelet", "silver-bracelets", 3299, { best: true }),
  p("AUR-BR-003", "Beaded Stretch Bracelet", "silver-bracelets", 1999, { new: true }),
  p("AUR-BR-004", "Heritage Kada", "silver-bracelets", 4599),

  p("AUR-CN-001", "Lakshmi Coin — 10g", "silver-coins", 1199, { best: true }),
  p("AUR-CN-002", "Ganesha Coin — 20g", "silver-coins", 2299),
  p("AUR-CN-003", "Pure Silver Coin — 50g", "silver-coins", 5499, { new: true }),
  p("AUR-CN-004", "Festive Coin Set", "silver-coins", 8999),

  p("AUR-GF-001", "Raani Chittroda Gift Box — Petite", "silver-gift-articles", 3499, { new: true, inStock: false }),
  p("AUR-GF-002", "Raani Chittroda Gift Box — Signature", "silver-gift-articles", 6999, { best: true, offerBadge: "10% OFF" }),
  p("AUR-GF-003", "Wedding Gift Hamper", "silver-gift-articles", 12999),
  p("AUR-GF-004", "Festive Bonbon Hamper", "silver-gift-articles", 4999),

  p("AUR-RG-001", "Diamond Accent Silver Ring", "silver-rings", 1999, { best: true }),
  p("AUR-RG-002", "Minimalist Band", "silver-rings", 999, { new: true }),

  p("AUR-GJ-001", "22k Gold Heritage Necklace", "gold-jewellery", 125000, { best: true }),
  p("AUR-GJ-002", "18k Gold Minimalist Chain", "gold-jewellery", 35000),

  p("AUR-CU-001", "Bespoke Name Pendant", "custom-orders", 4500, { new: true }),
  p("AUR-CU-002", "Custom Bridal Set Consultation", "custom-orders", 5000),
];

async function seed() {
  console.log("Seeding categories...");
  const { error: catError } = await supabase.from("categories").upsert(categories);
  if (catError) {
    console.error("Categories error:", catError);
    return;
  }
  
  console.log("Seeding products...");
  const { error: prodError } = await supabase.from("products").upsert(products);
  if (prodError) {
    console.error("Products error:", prodError);
    return;
  }
  
  console.log("Seeding settings...");
  const settings = {
    key: "global_settings",
    value: {
      storeName: "Raani Chittroda",
      phone: "+91 97850 90816",
      whatsapp: "919785090816",
      address: "123 Heritage Row, Old City, Jaipur, Rajasthan 302001",
      seoTitle: "Raani Chittroda — Gold & Silver Jewellery Manufacturer, Wholesaler & Retailer",
      seoDescription: "Premium Gold & Silver Jewellery for Every Occasion."
    }
  };
  const { error: setError } = await supabase.from("settings").upsert(settings);
  if (setError) {
    console.error("Settings error:", setError);
    return;
  }
  
  console.log("Seed successful!");
}

seed();
