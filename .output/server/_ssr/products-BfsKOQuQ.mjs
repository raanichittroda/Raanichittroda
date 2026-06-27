//#region node_modules/.nitro/vite/services/ssr/assets/products-BfsKOQuQ.js
var cat_rakhi_default = "/assets/cat-rakhi-DDrgGcH3.jpg";
var cat_murti_default = "/assets/cat-murti-CRnEKq8i.jpg";
var cat_necklace_default = "/assets/cat-necklace-Bf3RBgYW.jpg";
var cat_chain_default = "/assets/cat-chain-CkN7nmR5.jpg";
var cat_bracelet_default = "/assets/cat-bracelet-C8_St_U1.jpg";
var cat_coin_default = "/assets/cat-coin-D3i1R58f.jpg";
var cat_gift_default = "/assets/cat-gift-CwkHbVxO.jpg";
var imageFor = {
	"silver-rakhis": cat_rakhi_default,
	"silver-murtis": cat_murti_default,
	"silver-necklaces": cat_necklace_default,
	"silver-chains": cat_chain_default,
	"silver-bracelets": cat_bracelet_default,
	"silver-rings": cat_bracelet_default,
	"silver-coins": cat_coin_default,
	"silver-gift-articles": cat_gift_default,
	"gold-jewellery": cat_necklace_default,
	"custom-orders": cat_murti_default
};
var categories = [
	{
		slug: "silver-rakhis",
		name: "Silver Rakhis",
		image: cat_rakhi_default,
		blurb: "Hand-finished bonds of love."
	},
	{
		slug: "silver-murtis",
		name: "Silver Murtis",
		image: cat_murti_default,
		blurb: "Sacred idols, perfectly cast."
	},
	{
		slug: "silver-necklaces",
		name: "Silver Necklaces",
		image: cat_necklace_default,
		blurb: "Statement pieces, soft lustre."
	},
	{
		slug: "silver-chains",
		name: "Silver Chains",
		image: cat_chain_default,
		blurb: "Everyday icons, refined links."
	},
	{
		slug: "silver-bracelets",
		name: "Silver Bracelets",
		image: cat_bracelet_default,
		blurb: "Sculpted to the wrist."
	},
	{
		slug: "silver-rings",
		name: "Silver Rings",
		image: cat_bracelet_default,
		blurb: "Elegance on your fingers."
	},
	{
		slug: "silver-coins",
		name: "Silver Coins",
		image: cat_coin_default,
		blurb: "Pure 999, gifted forever."
	},
	{
		slug: "silver-gift-articles",
		name: "Silver Gift Articles",
		image: cat_gift_default,
		blurb: "Curated for occasions."
	},
	{
		slug: "gold-jewellery",
		name: "Gold Jewellery",
		image: cat_necklace_default,
		blurb: "Timeless gold masterpieces."
	},
	{
		slug: "custom-orders",
		name: "Custom Orders",
		image: cat_murti_default,
		blurb: "Bespoke creations for you."
	}
];
function p(id, name, category, price, flags = {}) {
	return {
		id,
		name,
		category,
		price,
		image: imageFor[category],
		description: "Hand-crafted in 92.5 sterling silver with meticulous detailing. Each piece is hallmarked and presented in our signature Aurelia box.",
		weight: `${(10 + price % 30).toFixed(1)} g`,
		purity: category === "silver-coins" ? "999 Fine Silver" : "925 Sterling Silver",
		isNew: flags.new,
		isBestSeller: flags.best,
		inStock: flags.inStock ?? true,
		offerBadge: flags.offerBadge
	};
}
var products = [
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
	p("AUR-GF-001", "Aurelia Gift Box — Petite", "silver-gift-articles", 3499, {
		new: true,
		inStock: false
	}),
	p("AUR-GF-002", "Aurelia Gift Box — Signature", "silver-gift-articles", 6999, {
		best: true,
		offerBadge: "10% OFF"
	}),
	p("AUR-GF-003", "Wedding Gift Hamper", "silver-gift-articles", 12999),
	p("AUR-GF-004", "Festive Bonbon Hamper", "silver-gift-articles", 4999),
	p("AUR-RG-001", "Diamond Accent Silver Ring", "silver-rings", 1999, { best: true }),
	p("AUR-RG-002", "Minimalist Band", "silver-rings", 999, { new: true }),
	p("AUR-GJ-001", "22k Gold Heritage Necklace", "gold-jewellery", 125e3, { best: true }),
	p("AUR-GJ-002", "18k Gold Minimalist Chain", "gold-jewellery", 35e3),
	p("AUR-CU-001", "Bespoke Name Pendant", "custom-orders", 4500, { new: true }),
	p("AUR-CU-002", "Custom Bridal Set Consultation", "custom-orders", 5e3)
];
var getProduct = (id) => products.find((p) => p.id === id);
var getCategory = (slug) => categories.find((c) => c.slug === slug);
var formatINR = (n) => new Intl.NumberFormat("en-IN", {
	style: "currency",
	currency: "INR",
	maximumFractionDigits: 0
}).format(n);
//#endregion
export { products as a, getProduct as i, formatINR as n, getCategory as r, categories as t };
