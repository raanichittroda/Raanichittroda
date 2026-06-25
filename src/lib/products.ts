import rakhi from "@/assets/cat-rakhi.jpg";
import murti from "@/assets/cat-murti.jpg";
import necklace from "@/assets/cat-necklace.jpg";
import chain from "@/assets/cat-chain.jpg";
import bracelet from "@/assets/cat-bracelet.jpg";
import coin from "@/assets/cat-coin.jpg";
import gift from "@/assets/cat-gift.jpg";

export type CategorySlug =
  | "silver-rakhis"
  | "silver-murtis"
  | "silver-necklaces"
  | "silver-chains"
  | "silver-bracelets"
  | "silver-coins"
  | "gift-collection";

export interface Category {
  slug: CategorySlug;
  name: string;
  image: string;
  blurb: string;
}

export interface Product {
  id: string;
  name: string;
  category: CategorySlug;
  price: number;
  image: string;
  description: string;
  weight: string;
  purity: string;
  isNew?: boolean;
  isBestSeller?: boolean;
}

const imageFor: Record<CategorySlug, string> = {
  "silver-rakhis": rakhi,
  "silver-murtis": murti,
  "silver-necklaces": necklace,
  "silver-chains": chain,
  "silver-bracelets": bracelet,
  "silver-coins": coin,
  "gift-collection": gift,
};

export const categories: Category[] = [
  { slug: "silver-rakhis", name: "Silver Rakhis", image: rakhi, blurb: "Hand-finished bonds of love." },
  { slug: "silver-murtis", name: "Silver Murtis", image: murti, blurb: "Sacred idols, perfectly cast." },
  { slug: "silver-necklaces", name: "Silver Necklaces", image: necklace, blurb: "Statement pieces, soft lustre." },
  { slug: "silver-chains", name: "Silver Chains", image: chain, blurb: "Everyday icons, refined links." },
  { slug: "silver-bracelets", name: "Silver Bracelets", image: bracelet, blurb: "Sculpted to the wrist." },
  { slug: "silver-coins", name: "Silver Coins", image: coin, blurb: "Pure 999, gifted forever." },
  { slug: "gift-collection", name: "Gift Collection", image: gift, blurb: "Curated for occasions." },
];

function p(
  id: string,
  name: string,
  category: CategorySlug,
  price: number,
  flags: { new?: boolean; best?: boolean } = {},
): Product {
  return {
    id,
    name,
    category,
    price,
    image: imageFor[category],
    description:
      "Hand-crafted in 92.5 sterling silver with meticulous detailing. Each piece is hallmarked and presented in our signature Aurelia box.",
    weight: `${(10 + (price % 30)).toFixed(1)} g`,
    purity: category === "silver-coins" ? "999 Fine Silver" : "925 Sterling Silver",
    isNew: flags.new,
    isBestSeller: flags.best,
  };
}

export const products: Product[] = [
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

  p("AUR-GF-001", "Aurelia Gift Box — Petite", "gift-collection", 3499, { new: true }),
  p("AUR-GF-002", "Aurelia Gift Box — Signature", "gift-collection", 6999, { best: true }),
  p("AUR-GF-003", "Wedding Gift Hamper", "gift-collection", 12999),
  p("AUR-GF-004", "Festive Bonbon Hamper", "gift-collection", 4999),
];

export const getProduct = (id: string) => products.find((p) => p.id === id);
export const getCategory = (slug: CategorySlug) => categories.find((c) => c.slug === slug);

export const formatINR = (n: number) =>
  new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR", maximumFractionDigits: 0 }).format(n);