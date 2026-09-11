"use client";

import { useState } from "react";
import { ShoppingCart, Heart, Share2, Check, Minus, Plus } from "lucide-react";
import { formatPrice, cn } from "@/lib/utils";
import type { Product } from "@/lib/types";

interface AddToCartButtonProps {
  product: Pick<Product, "id" | "name" | "slug" | "price" | "sale_price" | "stock_qty"> & {
    images: { url: string }[];
  };
}

export function AddToCartButton({ product }: AddToCartButtonProps) {
  const [qty, setQty] = useState(1);
  const [added, setAdded] = useState(false);
  const [addedToWishlist, setAddedToWishlist] = useState(false);

  const outOfStock = product.stock_qty <= 0;

  const handleAddToCart = () => {
    if (outOfStock) return;

    const cart = JSON.parse(localStorage.getItem("itology_cart") || "[]");
    const existing = cart.find((item: any) => item.id === product.id);
    if (existing) {
      existing.qty += qty;
    } else {
      cart.push({
        id: product.id,
        name: product.name,
        slug: product.slug,
        price: product.price,
        sale_price: product.sale_price,
        image_url: product.images?.[0]?.url || null,
        qty,
        stock_qty: product.stock_qty,
      });
    }
    localStorage.setItem("itology_cart", JSON.stringify(cart));
    window.dispatchEvent(new Event("cart:updated"));

    setAdded(true);
    setTimeout(() => setAdded(false), 2500);
  };

  const handleAddToWishlist = () => {
    const wishlist = JSON.parse(localStorage.getItem("itology_wishlist") || "[]");
    const exists = wishlist.find((item: any) => item.id === product.id);
    if (!exists) {
      wishlist.push({ id: product.id, name: product.name, slug: product.slug });
      localStorage.setItem("itology_wishlist", JSON.stringify(wishlist));
      window.dispatchEvent(new Event("wishlist:updated"));
    }
    setAddedToWishlist(true);
    setTimeout(() => setAddedToWishlist(false), 2000);
  };

  return (
    <div className="space-y-3">
      {/* Quantity selector */}
      <div className="flex items-center gap-4">
        <span className="text-sm font-medium text-text-primary">Quantity</span>
        <div className="flex items-center border border-line rounded-lg overflow-hidden">
          <button
            onClick={() => setQty(Math.max(1, qty - 1))}
            disabled={qty <= 1}
            className="p-2.5 hover:bg-paper transition disabled:opacity-40"
          >
            <Minus size={16} />
          </button>
          <span className="w-12 text-center text-sm font-semibold">{qty}</span>
          <button
            onClick={() => setQty(Math.min(product.stock_qty, qty + 1))}
            disabled={qty >= product.stock_qty}
            className="p-2.5 hover:bg-paper transition disabled:opacity-40"
          >
            <Plus size={16} />
          </button>
        </div>
      </div>

      {/* Action buttons */}
      <div className="flex gap-3">
        <button
          onClick={handleAddToCart}
          disabled={outOfStock}
          className={cn(
            "flex-1 flex items-center justify-center gap-2.5 py-3.5 rounded-lg text-sm font-semibold transition-all duration-300",
            outOfStock
              ? "bg-line text-text-muted cursor-not-allowed"
              : added
              ? "bg-jade text-white"
              : "bg-ink text-text-onDark hover:bg-jade active:scale-[0.98]"
          )}
        >
          {added ? (
            <>
              <Check size={18} />
              Added to Cart!
            </>
          ) : (
            <>
              <ShoppingCart size={18} />
              {outOfStock ? "Notify Me When Available" : "Add to Cart"}
            </>
          )}
        </button>

        <button
          onClick={handleAddToWishlist}
          className={cn(
            "p-3.5 rounded-lg border transition-all duration-300",
            addedToWishlist
              ? "border-jade bg-jade/10 text-jade"
              : "border-line text-text-muted hover:border-jade hover:text-jade hover:bg-jade/5"
          )}
          aria-label="Add to wishlist"
        >
          <Heart size={18} className={addedToWishlist ? "fill-jade" : ""} />
        </button>

        <button
          className="p-3.5 rounded-lg border border-line text-text-muted hover:border-jade hover:text-jade hover:bg-jade/5 transition-all"
          aria-label="Share product"
        >
          <Share2 size={18} />
        </button>
      </div>

      {/* Urgency message */}
      {!outOfStock && product.stock_qty <= 5 && (
        <p className="text-xs text-amber-dark font-medium flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full bg-amber animate-pulse" />
          Only {product.stock_qty} left in stock — order soon
        </p>
      )}
    </div>
  );
}
