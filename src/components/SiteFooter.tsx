import { Link } from "@tanstack/react-router";
import { Instagram, Facebook, Mail, Phone } from "lucide-react";

export function SiteFooter() {
  return (
    <footer className="border-t border-border bg-ink text-background">
      <div className="mx-auto grid max-w-7xl gap-12 px-6 py-16 sm:px-8 md:grid-cols-4">
        <div className="md:col-span-1">
          <div className="font-display text-3xl tracking-[0.18em]">AURELIA</div>
          <p className="mt-4 text-sm leading-relaxed text-background/70">
            Fine gold &amp; silver jewellery, handcrafted with reverence for tradition and a modern eye.
          </p>
        </div>

        <div>
          <h4 className="text-[0.7rem] tracking-[0.32em] uppercase text-gold">Shop</h4>
          <ul className="mt-5 space-y-3 text-sm text-background/75">
            <li><Link to="/collections" className="hover:text-gold">All Collections</Link></li>
            <li><Link to="/collections" search={{ category: "silver-necklaces" }} className="hover:text-gold">Necklaces</Link></li>
            <li><Link to="/collections" search={{ category: "silver-coins" }} className="hover:text-gold">Coins</Link></li>
            <li><Link to="/collections" search={{ category: "gift-collection" }} className="hover:text-gold">Gift Collection</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="text-[0.7rem] tracking-[0.32em] uppercase text-gold">House</h4>
          <ul className="mt-5 space-y-3 text-sm text-background/75">
            <li><Link to="/about" className="hover:text-gold">Our Story</Link></li>
            <li><Link to="/contact" className="hover:text-gold">Visit Atelier</Link></li>
            <li><Link to="/contact" className="hover:text-gold">Care &amp; Repair</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="text-[0.7rem] tracking-[0.32em] uppercase text-gold">Contact</h4>
          <ul className="mt-5 space-y-3 text-sm text-background/75">
            <li className="flex items-center gap-2"><Phone className="h-3.5 w-3.5 text-gold" /> +91 99999 99999</li>
            <li className="flex items-center gap-2"><Mail className="h-3.5 w-3.5 text-gold" /> hello@aurelia.in</li>
          </ul>
          <div className="mt-6 flex gap-3">
            <a href="#" aria-label="Instagram" className="grid h-9 w-9 place-items-center border border-background/20 text-background/80 transition hover:border-gold hover:text-gold">
              <Instagram className="h-4 w-4" />
            </a>
            <a href="#" aria-label="Facebook" className="grid h-9 w-9 place-items-center border border-background/20 text-background/80 transition hover:border-gold hover:text-gold">
              <Facebook className="h-4 w-4" />
            </a>
          </div>
        </div>
      </div>
      <div className="border-t border-background/10">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-2 px-6 py-6 text-xs text-background/50 sm:flex-row sm:px-8">
          <p>© {new Date().getFullYear()} Aurelia Jewellery. All rights reserved.</p>
          <p className="tracking-[0.28em] uppercase">Hallmarked · BIS Certified</p>
        </div>
      </div>
    </footer>
  );
}