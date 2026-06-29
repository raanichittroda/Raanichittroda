import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState, useEffect, useMemo, useCallback } from "react";
import { z } from "zod";
import { useCart } from "@/lib/cart";
import { formatINR, getProduct, type Product } from "@/lib/products";
import { buildWhatsAppUrl, checkoutMessage } from "@/lib/whatsapp";
import { supabase } from "@/lib/supabase";

export const Route = createFileRoute("/checkout")({
  head: () => ({
    meta: [
      { title: "Checkout — Raani Chittroda" },
      { name: "robots", content: "noindex, nofollow" },
    ],
  }),
  component: Checkout,
});

const schema = z.object({
  customerName: z.string().trim().min(1, "Please enter your name").max(80),
  businessName: z.string().trim().max(100).optional(),
  mobile: z.string().trim().min(7, "Please enter a valid mobile number").max(20),
  email: z.string().trim().email("Please enter a valid email"),
  gstNumber: z.string().trim().max(20).optional(),
  city: z.string().trim().min(1, "Please enter your city").max(50),
  state: z.string().trim().min(1, "Please enter your state").max(50),
  address: z.string().trim().min(5, "Please enter your full address").max(300),
  orderType: z.enum(["Retail Order", "Wholesale Order", "Bulk Order"]),
  expectedQuantity: z.string().trim().max(50).optional(),
  note: z.string().trim().max(500).optional(),
});

function Checkout() {
  const { items, count, clear } = useCart();
  const navigate = useNavigate();
  const [form, setForm] = useState({ 
    customerName: "", businessName: "", mobile: "", email: "", gstNumber: "", 
    city: "", state: "", address: "", orderType: "Retail Order" as const, expectedQuantity: "", note: "" 
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [productsData, setProductsData] = useState<Record<string, Product>>({});

  useEffect(() => {
    async function loadCartProducts() {
      const newProducts: Record<string, Product> = {};
      for (const item of items) {
        if (!productsData[item.productId]) {
          const product = await getProduct(item.productId);
          if (product) {
            newProducts[item.productId] = product;
          }
        }
      }
      if (Object.keys(newProducts).length > 0) {
        setProductsData(prev => ({ ...prev, ...newProducts }));
      }
    }
    loadCartProducts();
  }, [items]);

  const detailed = useMemo(() => {
    return items.map(item => {
      const product = productsData[item.productId];
      return product ? { product, quantity: item.quantity } : null;
    }).filter(Boolean) as { product: Product, quantity: number }[];
  }, [items, productsData]);

  const getActivePrice = useCallback((product: Product) => {
    if ((form.orderType === "Wholesale Order" || form.orderType === "Bulk Order") && product.wholesale_price !== null) {
      return product.wholesale_price;
    }
    return product.retail_price;
  }, [form.orderType]);

  const subtotal = useMemo(() => {
    return detailed.reduce((sum, item) => sum + (getActivePrice(item.product) * item.quantity), 0);
  }, [detailed, getActivePrice]);

  if (submitted) {
    return (
      <div className="mx-auto grid min-h-[60vh] max-w-md place-items-center px-6 text-center">
        <div>
          <span className="hairline" />
          <h1 className="mt-6 font-display text-4xl">Thank you for your enquiry.</h1>
          <p className="mt-3 text-sm text-muted-foreground">Our team will contact you shortly.</p>
          <Link to="/" className="btn-gold mt-8">Return Home</Link>
        </div>
      </div>
    );
  }

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

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (isSubmitting) return;

    const result = schema.safeParse(form);
    if (!result.success) {
      const errs: Record<string, string> = {};
      result.error.issues.forEach((i) => (errs[i.path[0] as string] = i.message));
      setErrors(errs);
      return;
    }

    setIsSubmitting(true);
    try {
      // 1. Insert order details into database
      const { data: orderData, error: orderError } = await supabase
        .from("orders")
        .insert({
          customer_name: form.customerName,
          business_name: form.businessName || null,
          mobile: form.mobile,
          email: form.email,
          gst_number: form.gstNumber || null,
          city: form.city,
          state: form.state,
          address: form.address,
          order_type: form.orderType,
          expected_quantity: form.expectedQuantity || null,
          total_amount: subtotal,
          note: form.note || null,
          status: 'New'
        })
        .select()
        .single();

      if (orderError) throw orderError;

      // 2. Insert order items
      const orderItems = detailed.map(item => ({
        order_id: orderData.id,
        product_id: item.product.id,
        product_name: item.product.name,
        quantity: item.quantity,
        price: getActivePrice(item.product)
      }));

      const { error: itemsError } = await supabase
        .from("order_items")
        .insert(orderItems);

      if (itemsError) throw itemsError;

      // 3. Clear cart
      clear();

      // 4. Build WhatsApp message and open
      const msg = checkoutMessage({
        customerName: form.customerName,
        businessName: form.businessName,
        mobile: form.mobile,
        email: form.email,
        gstNumber: form.gstNumber,
        city: form.city,
        state: form.state,
        address: form.address,
        orderType: form.orderType,
        expectedQuantity: form.expectedQuantity,
        items: detailed.map((d) => ({
          name: d.product.name,
          id: d.product.id,
          quantity: d.quantity,
          price: getActivePrice(d.product)
        })),
        totalAmount: formatINR(subtotal),
        note: form.note,
      });

      window.open(buildWhatsAppUrl(msg), "_blank", "noopener,noreferrer");
      setSubmitted(true);
    } catch (err) {
      console.error("Checkout failed:", err);
      alert("Failed to submit enquiry. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
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
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <Input
                label="Full Name *"
                value={form.customerName}
                onChange={(v) => setForm({ ...form, customerName: v })}
                error={errors.customerName}
                maxLength={80}
              />
              <Input
                label="Business Name (Optional)"
                value={form.businessName}
                onChange={(v) => setForm({ ...form, businessName: v })}
                error={errors.businessName}
                maxLength={100}
              />
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <Input
                label="Mobile Number *"
                value={form.mobile}
                onChange={(v) => setForm({ ...form, mobile: v })}
                error={errors.mobile}
                maxLength={20}
                inputMode="tel"
                placeholder="+91 99999 99999"
              />
              <Input
                label="Email Address *"
                value={form.email}
                onChange={(v) => setForm({ ...form, email: v })}
                error={errors.email}
                maxLength={100}
                inputMode="email"
                placeholder="hello@example.com"
              />
            </div>

            <Input
              label="GST Number (Optional)"
              value={form.gstNumber}
              onChange={(v) => setForm({ ...form, gstNumber: v })}
              error={errors.gstNumber}
              maxLength={20}
            />
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <Input
                label="City *"
                value={form.city}
                onChange={(v) => setForm({ ...form, city: v })}
                error={errors.city}
                maxLength={50}
              />
              <Input
                label="State *"
                value={form.state}
                onChange={(v) => setForm({ ...form, state: v })}
                error={errors.state}
                maxLength={50}
              />
            </div>
            <Input
              label="Full Address *"
              value={form.address}
              onChange={(v) => setForm({ ...form, address: v })}
              error={errors.address}
              maxLength={300}
              placeholder="Flat, House no., Building, Company, Apartment"
            />

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div className="sm:col-span-2">
                <label className="text-[10px] tracking-[0.28em] uppercase text-muted-foreground">Order Type *</label>
                <div className="mt-3 flex flex-wrap gap-3">
                  {(["Retail Order", "Wholesale Order", "Bulk Order"] as const).map(type => (
                    <button
                      key={type}
                      type="button"
                      onClick={() => setForm({ ...form, orderType: type })}
                      className={`px-6 py-3 border text-sm font-medium transition-colors ${form.orderType === type ? 'bg-ink border-ink text-background' : 'bg-background border-border text-foreground hover:border-ink hover:text-ink'}`}
                    >
                      {type}
                    </button>
                  ))}
                </div>
                {errors.orderType && <p className="mt-1 text-xs text-destructive">{errors.orderType}</p>}
              </div>
              <Input
                label="Expected Quantity (Optional)"
                value={form.expectedQuantity}
                onChange={(v) => setForm({ ...form, expectedQuantity: v })}
                error={errors.expectedQuantity}
                maxLength={50}
                placeholder="e.g. 50 pieces, 2 kg"
              />
            </div>

            <div>
              <label className="text-[10px] tracking-[0.28em] uppercase text-muted-foreground">Special Instructions (optional)</label>
              <textarea
                value={form.note}
                onChange={(e) => setForm({ ...form, note: e.target.value })}
                rows={4}
                maxLength={500}
                placeholder="Gift wrap, custom sizing, delivery preference…"
                className="mt-2 w-full border border-border bg-background px-4 py-3 text-sm focus:border-gold focus:outline-none"
              />
            </div>
          </div>
          <button type="submit" disabled={isSubmitting} className="btn-gold mt-8 w-full flex items-center justify-center gap-2">
            {isSubmitting ? "Processing..." : "Send Enquiry"}
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
                <p className="text-sm">{formatINR(getActivePrice(product) * quantity)}</p>
              </li>
            ))}
          </ul>
          <div className="mt-6 flex flex-col gap-2 border-t border-border pt-6">
            <div className="flex items-baseline justify-between">
              <span className="text-[10px] tracking-[0.28em] uppercase text-muted-foreground">Total Pieces</span>
              <span className="font-medium">{count}</span>
            </div>
            <div className="flex items-baseline justify-between mt-2">
              <span className="text-[10px] tracking-[0.28em] uppercase text-muted-foreground">Estimated Total</span>
              <span className="font-display text-3xl">{formatINR(subtotal)}</span>
            </div>
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