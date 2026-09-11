"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  Minus,
  Plus,
  Trash2,
  ShoppingBag,
  ArrowRight,
  Truck,
  ShieldCheck,
  Tag,
  ChevronRight,
} from "lucide-react";
import { formatPrice, cn } from "@/lib/utils";

interface CartItem {
  id: string;
  name: string;
  slug: string;
  price: number;
  sale_price: number | null;
  image_url: string | null;
  qty: number;
  stock_qty: number;
}

export default function CartPage() {
  const [items, setItems] = useState<CartItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [promoCode, setPromoCode] = useState("");
  const [promoApplied, setPromoApplied] = useState(false);

  useEffect(() => {
    loadCart();
  }, []);

  const loadCart = () => {
    try {
      const stored = localStorage.getItem("itology_cart");
      if (stored) setItems(JSON.parse(stored));
    } catch {
      setItems([]);
    }
    setIsLoading(false);
  };

  const updateQuantity = (id: string, delta: number) => {
    const updated = items
      .map((item) =>
        item.id === id
          ? { ...item, qty: Math.max(1, Math.min(item.qty + delta, item.stock_qty)) }
          : item
      )
      .filter((item) => item.qty > 0);
    setItems(updated);
    localStorage.setItem("itology_cart", JSON.stringify(updated));
    window.dispatchEvent(new Event("cart:updated"));
  };

  const removeItem = (id: string) => {
    const updated = items.filter((item) => item.id !== id);
    setItems(updated);
    localStorage.setItem("itology_cart", JSON.stringify(updated));
    window.dispatchEvent(new Event("cart:updated"));
  };

  const subtotal = items.reduce(
    (sum, item) => sum + (item.sale_price ?? item.price) * item.qty,
    0
  );
  const discount = promoApplied ? Math.round(subtotal * 0.1) : 0;
  const shipping = subtotal >= 20000 ? 0 : 1500;
  const total = subtotal - discount + shipping;
  const itemCount = items.reduce((sum, item) => sum + item.qty, 0);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="w-10 h-10 border-3 border-jade border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="container-page py-16">
        <div className="max-w-md mx-auto text-center">
          <div className="w-24 h-24 rounded-full bg-paper flex items-center justify-center mx-auto mb-6">
            <ShoppingBag size={40} className="text-text-muted" />
          </div>
          <h1 className="text-2xl font-bold text-text-primary mb-3">Your cart is empty</h1>
          <p className="text-text-muted mb-8">
            Looks like you haven&apos;t added any items yet. Browse our catalog to find what you need.
          </p>
          <Link
            href="/shop"
            className="inline-flex items-center gap-2 px-7 py-3.5 bg-ink text-text-onDark rounded-lg text-sm font-semibold hover:bg-jade transition"
          >
            Start Shopping
            <ArrowRight size={16} />
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="container-page py-8 lg:py-12">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-xs text-text-muted mb-6">
        <Link href="/" className="hover:text-jade transition">Home</Link>
        <ChevronRight size={12} />
        <span className="text-text-primary font-medium">Cart</span>
      </nav>

      <h1 className="text-3xl font-bold text-text-primary mb-8">
        Shopping Cart
        <span className="text-base font-normal text-text-muted ml-2">
          ({itemCount} {itemCount === 1 ? "item" : "items"})
        </span>
      </h1>

      <div className="grid gap-8 lg:grid-cols-[1fr_380px]">
        {/* Cart items */}
        <div className="space-y-4">
          {items.map((item) => (
            <div
              key={item.id}
              className="flex gap-4 sm:gap-6 p-4 sm:p-5 rounded-xl border border-line bg-white"
            >
              {/* Image */}
              <Link
                href={`/shop/${item.slug}`}
                className="shrink-0 w-20 h-20 sm:w-24 sm:h-24 rounded-lg border border-line bg-white overflow-hidden"
              >
                {item.image_url ? (
                  <Image
                    src={item.image_url}
                    alt={item.name}
                    width={96}
                    height={96}
                    className="w-full h-full object-contain p-2"
                  />
                ) : (
                  <div className="w-full h-full bg-line/40" />
                )}
              </Link>

              {/* Info */}
              <div className="flex-1 min-w-0">
                <Link
                  href={`/shop/${item.slug}`}
                  className="text-sm sm:text-base font-medium text-text-primary hover:text-jade transition line-clamp-2"
                >
                  {item.name}
                </Link>
                <p className="mt-1 text-sm font-semibold text-jade-dark">
                  {formatPrice(item.sale_price ?? item.price)}
                </p>

                <div className="flex items-center gap-3 mt-3">
                  <div className="flex items-center border border-line rounded-md">
                    <button
                      onClick={() => updateQuantity(item.id, -1)}
                      className="p-2 hover:bg-paper transition"
                      disabled={item.qty <= 1}
                    >
                      <Minus size={14} />
                    </button>
                    <span className="w-8 text-center text-sm font-medium">{item.qty}</span>
                    <button
                      onClick={() => updateQuantity(item.id, 1)}
                      className="p-2 hover:bg-paper transition"
                      disabled={item.qty >= item.stock_qty}
                    >
                      <Plus size={14} />
                    </button>
                  </div>
                  <button
                    onClick={() => removeItem(item.id)}
                    className="p-2 text-text-muted hover:text-red-500 transition"
                    aria-label="Remove item"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>

              {/* Line total */}
              <div className="text-right shrink-0">
                <p className="text-sm font-bold text-text-primary">
                  {formatPrice((item.sale_price ?? item.price) * item.qty)}
                </p>
              </div>
            </div>
          ))}

          {/* Continue shopping */}
          <Link
            href="/shop"
            className="inline-flex items-center gap-2 text-sm text-jade-dark font-medium hover:text-jade transition pt-2"
          >
            ← Continue shopping
          </Link>
        </div>

        {/* Order summary */}
        <div className="lg:sticky lg:top-24 lg:self-start">
          <div className="rounded-xl border border-line bg-white p-6">
            <h2 className="font-display text-lg font-semibold mb-5">Order Summary</h2>

            {/* Promo code */}
            <div className="mb-5">
              <div className="flex gap-2">
                <div className="relative flex-1">
                  <Tag size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted" />
                  <input
                    type="text"
                    value={promoCode}
                    onChange={(e) => setPromoCode(e.target.value)}
                    placeholder="Promo code"
                    className="w-full pl-10 pr-3 py-2.5 rounded-md border border-line text-sm focus:outline-none focus:border-jade transition"
                  />
                </div>
                <button
                  onClick={() => {
                    if (promoCode.trim()) setPromoApplied(true);
                  }}
                  className="px-4 py-2.5 rounded-md bg-ink text-text-onDark text-sm font-medium hover:bg-jade transition"
                >
                  Apply
                </button>
              </div>
              {promoApplied && (
                <p className="mt-2 text-xs text-jade-dark font-medium">
                  ✓ Promo code applied! 10% off
                </p>
              )}
            </div>

            {/* Summary lines */}
            <div className="space-y-3 text-sm">
              <div className="flex justify-between">
                <span className="text-text-muted">Subtotal</span>
                <span className="font-medium">{formatPrice(subtotal)}</span>
              </div>
              {promoApplied && (
                <div className="flex justify-between text-jade-dark">
                  <span>Discount (10%)</span>
                  <span>-{formatPrice(discount)}</span>
                </div>
              )}
              <div className="flex justify-between">
                <span className="text-text-muted">Shipping</span>
                <span className={cn("font-medium", shipping === 0 && "text-jade-dark")}>
                  {shipping === 0 ? "Free" : formatPrice(shipping)}
                </span>
              </div>
              <div className="flex justify-between text-base font-bold pt-3 border-t border-line">
                <span>Total</span>
                <span>{formatPrice(total)}</span>
              </div>
            </div>

            {/* Checkout button */}
            <button className="w-full mt-5 py-3.5 bg-ink text-text-onDark rounded-lg text-sm font-semibold hover:bg-jade transition flex items-center justify-center gap-2">
              Proceed to Checkout
              <ArrowRight size={16} />
            </button>

            {/* Trust badges */}
            <div className="mt-5 pt-5 border-t border-line space-y-2.5">
              <p className="flex items-center gap-2 text-xs text-text-muted">
                <ShieldCheck size={14} className="text-jade" />
                Secure SSL encrypted checkout
              </p>
              <p className="flex items-center gap-2 text-xs text-text-muted">
                <Truck size={14} className="text-jade" />
                Free shipping on orders over $200
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
