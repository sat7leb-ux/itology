"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { X, Minus, Plus, ShoppingBag, Trash2, ArrowRight, Truck, ShieldCheck } from "lucide-react";
import Image from "next/image";
import { cn, formatPrice } from "@/lib/utils";

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

interface CartDrawerProps {
  open: boolean;
  onClose: () => void;
}

export function CartDrawer({ open, onClose }: CartDrawerProps) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (open) {
      loadCart();
    }
  }, [open]);

  const loadCart = () => {
    try {
      const stored = localStorage.getItem("itology_cart");
      if (stored) {
        setItems(JSON.parse(stored));
      }
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
  const itemCount = items.reduce((sum, item) => sum + item.qty, 0);
  const freeShippingThreshold = 20000; // $200 in cents
  const remainingForFreeShipping = Math.max(0, freeShippingThreshold - subtotal);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[100] animate-fade-in">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-ink/60 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Drawer */}
      <div className="absolute right-0 top-0 h-full w-full max-w-md bg-white shadow-floating flex flex-col animate-slide-left">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-line">
          <div className="flex items-center gap-3">
            <ShoppingBag size={20} className="text-jade" />
            <h2 className="font-display text-lg font-semibold">Your Cart</h2>
            {itemCount > 0 && (
              <span className="px-2 py-0.5 rounded-full bg-jade/10 text-jade-dark text-xs font-medium">
                {itemCount} {itemCount === 1 ? "item" : "items"}
              </span>
            )}
          </div>
          <button
            onClick={onClose}
            className="p-2 -mr-2 text-text-muted hover:text-text-primary transition rounded-md hover:bg-paper"
          >
            <X size={20} />
          </button>
        </div>

        {/* Free shipping progress */}
        {itemCount > 0 && (
          <div className="px-6 py-3 bg-jade/5 border-b border-jade/10">
            {remainingForFreeShipping > 0 ? (
              <>
                <div className="flex items-center justify-between text-xs mb-2">
                  <span className="text-text-muted">
                    Add {formatPrice(remainingForFreeShipping)} more for free shipping
                  </span>
                  <span className="text-jade-dark font-medium">
                    {Math.round((subtotal / freeShippingThreshold) * 100)}%
                  </span>
                </div>
                <div className="h-1.5 bg-line rounded-full overflow-hidden">
                  <div
                    className="h-full bg-jade rounded-full transition-all duration-500"
                    style={{ width: `${Math.min(100, (subtotal / freeShippingThreshold) * 100)}%` }}
                  />
                </div>
              </>
            ) : (
              <p className="flex items-center gap-2 text-xs text-jade-dark font-medium">
                <Truck size={14} />
                You&apos;ve unlocked free shipping!
              </p>
            )}
          </div>
        )}

        {/* Items */}
        <div className="flex-1 overflow-y-auto">
          {isLoading ? (
            <div className="flex items-center justify-center h-full">
              <div className="w-8 h-8 border-2 border-jade border-t-transparent rounded-full animate-spin" />
            </div>
          ) : items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full px-6 text-center">
              <div className="w-20 h-20 rounded-full bg-paper flex items-center justify-center mb-4">
                <ShoppingBag size={32} className="text-text-muted" />
              </div>
              <h3 className="font-display text-lg font-semibold mb-2">
                Your cart is empty
              </h3>
              <p className="text-sm text-text-muted mb-6 max-w-[240px]">
                Looks like you haven&apos;t added any items yet. Browse our catalog to find what you need.
              </p>
              <Link
                href="/shop"
                onClick={onClose}
                className="inline-flex items-center gap-2 px-6 py-3 bg-ink text-text-onDark rounded-md text-sm font-medium hover:bg-ink/90 transition"
              >
                Start shopping
                <ArrowRight size={16} />
              </Link>
            </div>
          ) : (
            <div className="divide-y divide-line">
              {items.map((item) => (
                <div key={item.id} className="flex gap-4 p-4">
                  {/* Image */}
                  <Link
                    href={`/shop/${item.slug}`}
                    onClick={onClose}
                    className="shrink-0 w-20 h-20 rounded-md border border-line bg-white overflow-hidden"
                  >
                    {item.image_url ? (
                      <Image
                        src={item.image_url}
                        alt={item.name}
                        width={80}
                        height={80}
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
                      onClick={onClose}
                      className="text-sm font-medium text-text-primary hover:text-jade transition line-clamp-2"
                    >
                      {item.name}
                    </Link>
                    <p className="mt-1 text-sm font-semibold text-jade-dark">
                      {formatPrice(item.sale_price ?? item.price)}
                    </p>

                    {/* Quantity controls */}
                    <div className="flex items-center gap-2 mt-2">
                      <div className="flex items-center border border-line rounded-md">
                        <button
                          onClick={() => updateQuantity(item.id, -1)}
                          className="p-1.5 hover:bg-paper transition"
                          disabled={item.qty <= 1}
                        >
                          <Minus size={14} />
                        </button>
                        <span className="w-8 text-center text-sm font-medium">
                          {item.qty}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.id, 1)}
                          className="p-1.5 hover:bg-paper transition"
                          disabled={item.qty >= item.stock_qty}
                        >
                          <Plus size={14} />
                        </button>
                      </div>
                      <button
                        onClick={() => removeItem(item.id)}
                        className="p-1.5 text-text-muted hover:text-red-500 transition"
                        aria-label="Remove item"
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
                  </div>

                  {/* Line total */}
                  <div className="text-right shrink-0">
                    <p className="text-sm font-semibold">
                      {formatPrice((item.sale_price ?? item.price) * item.qty)}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        {items.length > 0 && (
          <div className="border-t border-line px-6 py-4 space-y-4 bg-paper/30">
            {/* Summary */}
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-text-muted">Subtotal</span>
                <span className="font-medium">{formatPrice(subtotal)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-text-muted">Shipping</span>
                <span className={cn("font-medium", remainingForFreeShipping === 0 && "text-jade-dark")}>
                  {remainingForFreeShipping === 0 ? "Free" : "Calculated at checkout"}
                </span>
              </div>
              <div className="flex justify-between text-base font-semibold pt-2 border-t border-line">
                <span>Total</span>
                <span>{formatPrice(subtotal + (remainingForFreeShipping === 0 ? 0 : 0))}</span>
              </div>
            </div>

            {/* Checkout button */}
            <Link
              href="/cart"
              onClick={onClose}
              className="flex items-center justify-center gap-2 w-full py-3.5 bg-ink text-text-onDark rounded-md text-sm font-medium hover:bg-ink/90 transition"
            >
              <ShoppingBag size={16} />
              View Cart & Checkout
            </Link>

            {/* Trust badges */}
            <div className="flex items-center justify-center gap-4 text-xs text-text-muted">
              <span className="flex items-center gap-1">
                <ShieldCheck size={12} className="text-jade" />
                Secure checkout
              </span>
              <span className="flex items-center gap-1">
                <Truck size={12} className="text-jade" />
                Free over $200
              </span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
