import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  Heart,
  Scale,
  ShieldCheck,
  Truck,
  Star,
  Minus,
  Plus,
  Share2,
  ChevronRight,
  Zap,
  Clock,
  RotateCcw,
  Check,
} from "lucide-react";
import { formatPrice, cn } from "@/lib/utils";
import { getProductBySlug } from "@/lib/data";
import { AddToCartButton } from "@/components/add-to-cart-button";
import { ProductCard } from "@/components/product-card";

export default async function ProductPage({
  params,
}: {
  params: { category: string; slug: string };
}) {
  const product = await getProductBySlug(params.slug).catch(() => null);
  if (!product) notFound();

  const onSale = product.sale_price != null && product.sale_price < product.price;
  const discount = onSale
    ? Math.round(((product.price - product.sale_price!) / product.price) * 100)
    : 0;

  return (
    <div className="min-h-screen">
      {/* Breadcrumb */}
      <div className="bg-white border-b border-line">
        <div className="container-page py-3">
          <nav className="flex items-center gap-2 text-xs text-text-muted">
            <span className="hover:text-jade transition cursor-pointer">Home</span>
            <ChevronRight size={12} />
            <span className="hover:text-jade transition cursor-pointer">Shop</span>
            <ChevronRight size={12} />
            <span className="capitalize hover:text-jade transition cursor-pointer">
              {params.category.replace(/-/g, " ")}
            </span>
            <ChevronRight size={12} />
            <span className="text-text-primary font-medium truncate">{product.name}</span>
          </nav>
        </div>
      </div>

      <div className="container-page py-8 lg:py-12">
        <div className="grid gap-10 lg:grid-cols-2 lg:gap-16">
          {/* Gallery */}
          <div className="space-y-4">
            {/* Main image */}
            <div className="relative aspect-square rounded-2xl border border-line bg-white overflow-hidden">
              {product.images?.[0]?.url ? (
                <Image
                  src={product.images[0].url}
                  alt={product.name}
                  fill
                  className="object-contain p-8 lg:p-12"
                  priority
                  sizes="(min-width: 1024px) 50vw, 100vw"
                />
              ) : (
                <div className="h-full w-full flex items-center justify-center text-text-muted">
                  No image available
                </div>
              )}

              {/* Badges on image */}
              <div className="absolute left-4 top-4 flex flex-col gap-2">
                {product.is_new && (
                  <span className="rounded-md bg-ink px-3 py-1 text-xs font-semibold text-text-onDark uppercase tracking-wider">
                    New
                  </span>
                )}
                {onSale && (
                  <span className="rounded-md bg-amber px-3 py-1 text-xs font-semibold text-ink uppercase tracking-wider">
                    -{discount}% OFF
                  </span>
                )}
                {product.is_bestseller && (
                  <span className="rounded-md bg-jade px-3 py-1 text-xs font-semibold text-white uppercase tracking-wider flex items-center gap-1">
                    <Zap size={12} />
                    Bestseller
                  </span>
                )}
              </div>
            </div>

            {/* Thumbnail gallery */}
            {product.images?.length > 1 && (
              <div className="flex gap-3 overflow-x-auto pb-2">
                {product.images.map((img, i) => (
                  <button
                    key={img.id}
                    className={cn(
                      "shrink-0 w-16 h-16 sm:w-20 sm:h-20 rounded-lg border bg-white overflow-hidden transition-all",
                      i === 0
                        ? "border-jade ring-2 ring-jade/20"
                        : "border-line hover:border-jade/50"
                    )}
                  >
                    <Image
                      src={img.url}
                      alt={`${product.name} view ${i + 1}`}
                      width={80}
                      height={80}
                      className="w-full h-full object-contain p-2"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Product info */}
          <div className="lg:sticky lg:top-24 lg:self-start space-y-6">
            {/* Brand */}
            {product.brand?.name && (
              <Link
                href={`/brands/${product.brand.slug}`}
                className="inline-flex items-center gap-1.5 text-sm text-text-muted hover:text-jade transition"
              >
                {product.brand.name}
                <ChevronRight size={14} />
              </Link>
            )}

            {/* Title */}
            <h1 className="text-2xl lg:text-3xl font-bold text-text-primary leading-tight">
              {product.name}
            </h1>

            {/* Rating */}
            {product.rating_count != null && product.rating_count > 0 && (
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-1">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star
                      key={star}
                      size={16}
                      className={cn(
                        star <= Math.round(product.rating_avg || 0)
                          ? "fill-amber text-amber"
                          : "text-line fill-line"
                      )}
                    />
                  ))}
                </div>
                <span className="text-sm text-text-muted">
                  {product.rating_avg?.toFixed(1)} ({product.rating_count} reviews)
                </span>
              </div>
            )}

            {/* SKU */}
            <p className="font-mono text-xs text-text-muted">SKU: {product.sku}</p>

            {/* Price */}
            <div className="flex items-baseline gap-3">
              <span
                className={cn(
                  "text-3xl font-bold",
                  onSale ? "text-jade-dark" : "text-text-primary"
                )}
              >
                {formatPrice(onSale ? product.sale_price! : product.price)}
              </span>
              {onSale && (
                <span className="text-lg text-text-muted line-through">
                  {formatPrice(product.price)}
                </span>
              )}
              {onSale && (
                <span className="px-2 py-0.5 rounded-md bg-jade/10 text-jade-dark text-sm font-semibold">
                  Save {formatPrice(product.price - product.sale_price!)}
                </span>
              )}
            </div>

            {/* Stock status */}
            <div className="flex items-center gap-2">
              {product.stock_qty > 5 ? (
                <span className="flex items-center gap-1.5 text-sm text-jade-dark font-medium">
                  <Check size={16} />
                  In Stock — Ready to Ship
                </span>
              ) : product.stock_qty > 0 ? (
                <span className="flex items-center gap-1.5 text-sm text-amber-dark font-medium">
                  <Zap size={16} />
                  Only {product.stock_qty} left — order soon
                </span>
              ) : (
                <span className="flex items-center gap-1.5 text-sm text-text-muted">
                  <Clock size={16} />
                  Out of Stock
                </span>
              )}
            </div>

            {/* Add to cart */}
            <AddToCartButton product={product} />

            {/* Trust badges */}
            <div className="grid grid-cols-2 gap-3 pt-4 border-t border-line">
              <div className="flex items-center gap-2.5 text-sm text-text-muted">
                <div className="w-9 h-9 rounded-lg bg-jade/10 flex items-center justify-center shrink-0">
                  <Truck size={16} className="text-jade" />
                </div>
                <div>
                  <p className="font-medium text-text-primary text-xs">Free Shipping</p>
                  <p className="text-xs">On orders over $200</p>
                </div>
              </div>
              <div className="flex items-center gap-2.5 text-sm text-text-muted">
                <div className="w-9 h-9 rounded-lg bg-jade/10 flex items-center justify-center shrink-0">
                  <ShieldCheck size={16} className="text-jade" />
                </div>
                <div>
                  <p className="font-medium text-text-primary text-xs">Warranty</p>
                  <p className="text-xs">{product.warranty_text || "2-year coverage"}</p>
                </div>
              </div>
              <div className="flex items-center gap-2.5 text-sm text-text-muted">
                <div className="w-9 h-9 rounded-lg bg-jade/10 flex items-center justify-center shrink-0">
                  <RotateCcw size={16} className="text-jade" />
                </div>
                <div>
                  <p className="font-medium text-text-primary text-xs">Easy Returns</p>
                  <p className="text-xs">30-day return policy</p>
                </div>
              </div>
              <div className="flex items-center gap-2.5 text-sm text-text-muted">
                <div className="w-9 h-9 rounded-lg bg-jade/10 flex items-center justify-center shrink-0">
                  <Clock size={16} className="text-jade" />
                </div>
                <div>
                  <p className="font-medium text-text-primary text-xs">Fast Support</p>
                  <p className="text-xs">24/7 expert help</p>
                </div>
              </div>
            </div>

            {/* Description */}
            {product.description && (
              <div className="pt-4 border-t border-line">
                <h3 className="text-sm font-semibold text-text-primary mb-2">Description</h3>
                <p className="text-sm text-text-muted leading-relaxed">{product.description}</p>
              </div>
            )}

            {/* Specifications */}
            {product.attributes?.length > 0 && (
              <div className="pt-4 border-t border-line">
                <h3 className="text-sm font-semibold text-text-primary mb-3">Specifications</h3>
                <dl className="divide-y divide-line rounded-lg border border-line overflow-hidden">
                  {product.attributes.map((attr, i) => (
                    <div
                      key={i}
                      className={cn(
                        "flex justify-between items-center px-4 py-3 text-sm",
                        i % 2 === 0 ? "bg-white" : "bg-paper/50"
                      )}
                    >
                      <dt className="text-text-muted font-medium">{attr.attribute_name}</dt>
                      <dd className="font-mono text-xs text-text-primary">{attr.value}</dd>
                    </div>
                  ))}
                </dl>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
