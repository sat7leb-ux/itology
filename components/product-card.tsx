"use client";

import Link from "next/link";
import Image from "next/image";
import { Heart, ShoppingCart, Star, Eye, Zap } from "lucide-react";
import { useState } from "react";
import { formatPrice, cn } from "@/lib/utils";
import type { Product } from "@/lib/types";

interface ProductCardProps {
  product: Pick<
    Product,
    "id" | "name" | "slug" | "price" | "sale_price" | "is_new" | "is_bestseller" | "stock_qty"
  > & { images: { url: string }[]; brand?: { name: string } | null; rating_avg?: number; rating_count?: number };
  categorySlug: string;
  onAddToCart?: () => void;
  onAddToWishlist?: () => void;
}

export function ProductCard({
  product,
  categorySlug,
  onAddToCart,
  onAddToWishlist,
}: ProductCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [addedToCart, setAddedToCart] = useState(false);

  const onSale = product.sale_price != null && product.sale_price < product.price;
  const outOfStock = product.stock_qty <= 0;
  const lowStock = product.stock_qty > 0 && product.stock_qty <= 5;
  const discount = onSale
    ? Math.round(((product.price - product.sale_price!) / product.price) * 100)
    : 0;

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (outOfStock) return;

    // Add to cart in localStorage
    const cart = JSON.parse(localStorage.getItem("itology_cart") || "[]");
    const existing = cart.find((item: any) => item.id === product.id);
    if (existing) {
      existing.qty += 1;
    } else {
      cart.push({
        id: product.id,
        name: product.name,
        slug: product.slug,
        price: product.price,
        sale_price: product.sale_price,
        image_url: product.images?.[0]?.url || null,
        qty: 1,
        stock_qty: product.stock_qty,
      });
    }
    localStorage.setItem("itology_cart", JSON.stringify(cart));
    window.dispatchEvent(new Event("cart:updated"));

    setAddedToCart(true);
    setTimeout(() => setAddedToCart(false), 2000);
    onAddToCart?.();
  };

  const handleAddToWishlist = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    const wishlist = JSON.parse(localStorage.getItem("itology_wishlist") || "[]");
    const exists = wishlist.find((item: any) => item.id === product.id);
    if (!exists) {
      wishlist.push({ id: product.id, name: product.name, slug: product.slug });
      localStorage.setItem("itology_wishlist", JSON.stringify(wishlist));
      window.dispatchEvent(new Event("wishlist:updated"));
    }
    onAddToWishlist?.();
  };

  return (
    <div
      className="group relative flex flex-col"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Image container */}
      <Link
        href={`/shop/${categorySlug}/${product.slug}`}
        className="relative block aspect-square overflow-hidden rounded-lg bg-white border border-line transition-all duration-300 group-hover:shadow-card-hover group-hover:border-jade/30"
      >
        {/* Product image */}
        <div className={cn("relative w-full h-full transition-transform duration-500", isHovered && "scale-[1.03]")}>
          {product.images?.[0]?.url ? (
            <Image
              src={product.images[0].url}
              alt={product.name}
              fill
              sizes="(min-width: 1024px) 25vw, (min-width: 640px) 33vw, 50vw"
              className={cn(
                "object-contain p-4 transition-opacity duration-300",
                imageLoaded ? "opacity-100" : "opacity-0"
              )}
              onLoad={() => setImageLoaded(true)}
            />
          ) : (
            <div className="h-full w-full bg-line/40 flex items-center justify-center">
              <span className="text-text-muted text-sm">No image</span>
            </div>
          )}
          {!imageLoaded && product.images?.[0]?.url && (
            <div className="absolute inset-0 bg-line/40 animate-shimmer bg-gradient-to-r from-line/40 via-line/20 to-line/40" />
          )}
        </div>

        {/* Badges */}
        <div className="absolute left-2.5 top-2.5 flex flex-col gap-1.5 z-10">
          {product.is_new && (
            <span className="rounded-md bg-ink px-2 py-0.5 text-[10px] font-semibold text-text-onDark uppercase tracking-wider">
              New
            </span>
          )}
          {onSale && (
            <span className="rounded-md bg-amber px-2 py-0.5 text-[10px] font-semibold text-ink uppercase tracking-wider">
              -{discount}%
            </span>
          )}
          {product.is_bestseller && (
            <span className="rounded-md bg-jade px-2 py-0.5 text-[10px] font-semibold text-white uppercase tracking-wider flex items-center gap-1">
              <Zap size={10} />
              Best
            </span>
          )}
        </div>

        {/* Quick actions - appear on hover */}
        <div
          className={cn(
            "absolute right-2.5 top-2.5 flex flex-col gap-1.5 transition-all duration-300 z-10",
            isHovered ? "opacity-100 translate-x-0" : "opacity-0 translate-x-2"
          )}
        >
          <button
            onClick={handleAddToWishlist}
            aria-label="Add to wishlist"
            className="rounded-full bg-white/95 backdrop-blur-sm p-2 text-text-muted shadow-card transition-all hover:bg-jade hover:text-white hover:scale-110"
          >
            <Heart size={15} strokeWidth={1.75} />
          </button>
          <button
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              // Quick view - could open a modal
            }}
            aria-label="Quick view"
            className="rounded-full bg-white/95 backdrop-blur-sm p-2 text-text-muted shadow-card transition-all hover:bg-jade hover:text-white hover:scale-110"
          >
            <Eye size={15} strokeWidth={1.75} />
          </button>
        </div>

        {/* Low stock / urgency */}
        {lowStock && (
          <div className="absolute bottom-2.5 left-2.5 right-2.5 z-10">
            <div className="bg-amber/90 backdrop-blur-sm text-ink text-[10px] font-semibold text-center py-1.5 rounded-md uppercase tracking-wider">
              Only {product.stock_qty} left — order soon
            </div>
          </div>
        )}

        {/* Out of stock overlay */}
        {outOfStock && (
          <div className="absolute inset-0 bg-white/60 backdrop-blur-[1px] flex items-center justify-center z-10">
            <span className="bg-ink text-text-onDark px-4 py-2 rounded-md text-sm font-medium">
              Out of Stock
            </span>
          </div>
        )}
      </Link>

      {/* Product info */}
      <div className="mt-3 flex flex-col flex-1">
        {/* Brand */}
        {product.brand?.name && (
          <p className="text-[11px] text-text-muted uppercase tracking-wider font-medium">
            {product.brand.name}
          </p>
        )}

        {/* Name */}
        <Link
          href={`/shop/${categorySlug}/${product.slug}`}
          className="mt-0.5 text-sm font-medium leading-snug text-text-primary hover:text-jade transition line-clamp-2"
        >
          {product.name}
        </Link>

        {/* Rating */}
        {product.rating_count != null && product.rating_count > 0 && (
          <div className="flex items-center gap-1.5 mt-1.5">
            <div className="flex items-center gap-0.5">
              {[1, 2, 3, 4, 5].map((star) => (
                <Star
                  key={star}
                  size={12}
                  className={cn(
                    star <= Math.round(product.rating_avg || 0)
                      ? "fill-amber text-amber"
                      : "text-line fill-line"
                  )}
                />
              ))}
            </div>
            <span className="text-[11px] text-text-muted">
              ({product.rating_count})
            </span>
          </div>
        )}

        {/* Price */}
        <div className="mt-2 flex items-baseline gap-2">
          <span
            className={cn(
              "text-sm font-bold",
              onSale ? "text-jade-dark" : "text-text-primary"
            )}
          >
            {formatPrice(onSale ? product.sale_price! : product.price)}
          </span>
          {onSale && (
            <span className="text-xs text-text-muted line-through">
              {formatPrice(product.price)}
            </span>
          )}
        </div>

        {/* Quick add button */}
        <button
          onClick={handleAddToCart}
          disabled={outOfStock}
          className={cn(
            "mt-3 flex items-center justify-center gap-2 w-full py-2 rounded-md text-xs font-semibold transition-all duration-300",
            outOfStock
              ? "bg-line text-text-muted cursor-not-allowed"
              : addedToCart
              ? "bg-jade text-white"
              : "bg-ink text-text-onDark hover:bg-jade active:scale-[0.98]"
          )}
        >
          {addedToCart ? (
            <>
              <ShoppingCart size={14} />
              Added!
            </>
          ) : (
            <>
              <ShoppingCart size={14} />
              {outOfStock ? "Notify Me" : "Add to Cart"}
            </>
          )}
        </button>
      </div>
    </div>
  );
}
