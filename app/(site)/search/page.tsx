import { Search, SlidersHorizontal, X, ChevronDown } from "lucide-react";
import { ProductCard } from "@/components/product-card";
import { getFeaturedProducts } from "@/lib/data";

export const metadata = { title: "Search" };

export default async function SearchPage({
  searchParams,
}: {
  searchParams: { q?: string };
}) {
  const query = searchParams.q || "";
  let products: Awaited<ReturnType<typeof getFeaturedProducts>> = [];

  try {
    products = await getFeaturedProducts(50);
  } catch {
    products = [];
  }

  // Simple client-side filtering simulation
  const filtered = query
    ? products.filter(
        (p) =>
          p.name.toLowerCase().includes(query.toLowerCase()) ||
          p.brand?.name?.toLowerCase().includes(query.toLowerCase())
      )
    : products;

  return (
    <div className="container-page py-10">
      {/* Search header */}
      <div className="max-w-2xl">
        <h1 className="text-3xl font-bold text-text-primary">Search</h1>
        {query && (
          <p className="mt-2 text-text-muted">
            {filtered.length} result{filtered.length !== 1 ? "s" : ""} for &ldquo;{query}&rdquo;
          </p>
        )}
      </div>

      {/* Search input */}
      <div className="mt-6 relative max-w-2xl">
        <Search size={20} className="absolute left-4 top-1/2 -translate-y-1/2 text-text-muted" />
        <input
          type="text"
          defaultValue={query}
          placeholder="Search products, brands, categories..."
          className="w-full pl-12 pr-4 py-3.5 rounded-lg border border-line bg-white text-sm focus:outline-none focus:border-jade focus:ring-2 focus:ring-jade/10 transition"
        />
      </div>

      {/* Filters bar */}
      <div className="mt-6 flex items-center gap-3 flex-wrap">
        <button className="flex items-center gap-2 px-4 py-2 rounded-lg border border-line bg-white text-sm text-text-primary hover:border-jade transition">
          <SlidersHorizontal size={16} />
          Filters
        </button>
        {["Category", "Price", "Brand", "Rating"].map((filter) => (
          <button
            key={filter}
            className="flex items-center gap-1.5 px-4 py-2 rounded-lg border border-line bg-white text-sm text-text-muted hover:border-jade hover:text-text-primary transition"
          >
            {filter}
            <ChevronDown size={14} />
          </button>
        ))}
      </div>

      {/* Results */}
      <div className="mt-8">
        {filtered.length > 0 ? (
          <div className="grid grid-cols-2 gap-4 sm:gap-6 lg:grid-cols-4">
            {filtered.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                categorySlug={product.category?.slug ?? "shop"}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <p className="text-text-muted text-lg">No products found for &ldquo;{query}&rdquo;</p>
            <p className="mt-2 text-sm text-text-muted">Try a different search term or browse categories</p>
          </div>
        )}
      </div>
    </div>
  );
}
