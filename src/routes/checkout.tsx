import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { z } from "zod";
import { useCart } from "@/lib/cart";
import { formatINR } from "@/lib/products";
import { buildWhatsAppUrl, checkoutMessage } from "@/lib/whatsapp";

export const Route = createFileRoute("/checkout")({
  head: () => ({
    meta: [
      { title: "Checkout — Aurelia" },
      { name: "description", content: "Complete your order on WhatsApp." },
    ],
  }),
  component: Checkout,
});

const schema = z.object({
  customerName: z.string().trim().min(1, "Please enter your name").max(80),
  mobile: z.string().trim().min(7, "Please enter a valid mobile number").max(20),
  note: z.string().trim().max(500).optional(),
});

function Checkout() {
  const { detailed, subtotal, count } = useCart();
  const navigate = useNavigate();
  const [form, setForm] = useState({ customerName: "", mobile: "", note: "" });
  const [errors, setErrors] = useState<Record<string, string>>({});

  if (count === 0) {
    return (
      <div className="mx-auto grid min-h-[60vh] max-w-md place-items-center px-6 text-center">
        <div>
          <span className="hairline" />
          <h1 className="mt-6 font-display text-4xl">Your bag is empty</h1>
          <p className="mt-3 text-sm text-muted-foreground">Add a few pieces to begin.</p>
          <Link to="/collections" className="btn-gold mt-8">Shop Collections</Link>
        </div>
      </div>
    );
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const result = schema.safeParse(form);
    if (!result.success) {
      const errs: Record<string, string> = {};
      result.error.issues.forEach((i) => (errs[i.path[0] as string] = i.message));
      setErrors(errs);
      return;
    }
    const msg = checkoutMessage({
      customerName: form.customerName,
      mobile: form.mobile,
      items: detailed.map((d) => ({ name: d.product.name, id: d.product.id, quantity: d.quantity })),
      subtotal: formatINR(subtotal),
      note: form.note,
    });
    window.open(buildWhatsAppUrl(msg), "_blank", "noopener,noreferrer");
    navigate({ to: "/" });
  }

  return (
    <div className="bg-background">
      <header className="border-b border-border bg-secondary">
        <div className="mx-auto max-w-5xl px-6 py-12 text-center sm:px-8">
          <span className="eyebrow">Checkout</span>
          <h1 className="mt-3 font-display text-4xl sm:text-5xl">Complete your order</h1>
          <p className="mx-auto mt-3 max-w-md text-sm text-muted-foreground">
            We confirm availability, final pricing and shipping personally on WhatsApp.
          </p>
        </div>
      </header>

      <div className="mx-auto grid max-w-5xl gap-10 px-6 py-12 sm:px-8 md:grid-cols-[1.1fr_1fr]">
        <form onSubmit={handleSubmit} className="border border-border p-8 sm:p-10">
          <h2 className="font-display text-2xl">Your details</h2>
          <div className="mt-6 space-y-5">
            <Input
              label="Full Name"
              value={form.customerName}
              onChange={(v) => setForm({ ...form, customerName: v })}
              error={errors.customerName}
              maxLength={80}
            />
            <Input
              label="Mobile Number (with country code)"
              value={form.mobile}
              onChange={(v) => setForm({ ...form, mobile: v })}
              error={errors.mobile}
              maxLength={20}
              inputMode="tel"
              placeholder="+91 99999 99999"
            />
            <div>
              <label className="text-[10px] tracking-[0.28em] uppercase text-muted-foreground">Note (optional)</label>
              <textarea
                value={form.note}
                onChange={(e) => setForm({ ...form, note: e.target.value })}
                rows={4}
                maxLength={500}
                placeholder="Gift wrap, engraving, delivery preference…"
                className="mt-2 w-full border border-border bg-background px-4 py-3 text-sm focus:border-gold focus:outline-none"
              />
            </div>
          </div>
          <button type="submit" className="btn-gold mt-8 w-full">
            Send Order on WhatsApp
          </button>
          <p className="mt-3 text-center text-xs text-muted-foreground">
            No payment is taken here. We confirm everything on WhatsApp first.
          </p>
        </form>

        <aside className="border border-border bg-secondary p-8 sm:p-10">
          <h2 className="font-display text-2xl">Order summary</h2>
          <ul className="mt-6 divide-y divide-border">
            {detailed.map(({ product, quantity }) => (
              <li key={product.id} className="grid grid-cols-[60px_1fr_auto] gap-4 py-4">
                <img src={product.image} alt={product.name} className="h-20 w-16 object-cover" />
                <div className="min-w-0">
                  <p className="truncate font-display text-base">{product.name}</p>
                  <p className="text-[10px] tracking-[0.24em] uppercase text-muted-foreground">{product.id}</p>
                  <p className="mt-1 text-xs text-muted-foreground">Qty {quantity}</p>
                </div>
                <p className="text-sm">{formatINR(product.price * quantity)}</p>
              </li>
            ))}
          </ul>
          <div className="mt-6 flex items-baseline justify-between border-t border-border pt-6">
            <span className="text-[10px] tracking-[0.28em] uppercase text-muted-foreground">Estimated Total</span>
            <span className="font-display text-3xl">{formatINR(subtotal)}</span>
          </div>
        </aside>
      </div>
    </div>
  );
}

function Input({
  label,
  value,
  onChange,
  error,
  maxLength,
  inputMode,
  placeholder,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  error?: string;
  maxLength?: number;
  inputMode?: React.HTMLAttributes<HTMLInputElement>["inputMode"];
  placeholder?: string;
}) {
  return (
    <div>
      <label className="text-[10px] tracking-[0.28em] uppercase text-muted-foreground">{label}</label>
      <input
        type="text"
        value={value}
        inputMode={inputMode}
        maxLength={maxLength}
        placeholder={placeholder}
        onChange={(e) => onChange(e.target.value)}
        className="mt-2 w-full border border-border bg-background px-4 py-3 text-sm focus:border-gold focus:outline-none"
      />
      {error && <p className="mt-1 text-xs text-destructive">{error}</p>}
    </div>
  );
}