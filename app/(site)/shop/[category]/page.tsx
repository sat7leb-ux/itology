import { notFound } from "next/navigation";
import { ProductCard } from "@/components/product-card";
import { SortSelect } from "@/components/sort-select";
import { getCategoryBySlug, getProductsByCategory } from "@/lib/data";

type SortKey = "featured" | "price_asc" | "price_desc" | "newest";

export default async function CategoryPage({
  params,
  searchParams,
}: {
  params: { category: string };
  searchParams: { sort?: SortKey };
}) {
  const category = await getCategoryBySlug(params.category).catch(() => null);
  if (!category) notFound();

  const products = await getProductsByCategory(category.id, {
    sort: searchParams.sort ?? "featured",
  }).catch(() => []);

  return (
    <div className="container-page py-10">
      <nav className="text-xs text-text-muted">
        <span>Shop</span> <span className="mx-1">/</span> <span>{category.name}</span>
      </nav>
      <div className="mt-2 flex items-end justify-between">
        <h1 className="text-3xl font-semibold">{category.name}</h1>
        <SortSelect current={searchParams.sort ?? "featured"} />
      </div>
      {category.description && (
        <p className="mt-2 max-w-prose text-text-muted">{category.description}</p>
      )}

      <div className="mt-10 grid gap-10 lg:grid-cols-[220px_1fr]">
        {/* Filter sidebar — attributes are rendered dynamically per the
            category_attributes join once real product data is loaded. */}
        <aside className="hidden lg:block">
          <p className="text-sm font-medium">Filters</p>
          <p className="mt-2 text-xs text-text-muted">
            Filters for this category appear here automatically, driven by
            the attributes attached to it in the admin portal.
          </p>
        </aside>

        <div>
          {products.length === 0 ? (
            <p className="text-sm text-text-muted">
              No products in this category yet.
            </p>
          ) : (
            <div className="grid grid-cols-2 gap-6 lg:grid-cols-3">
              {products.map((product) => (
                <ProductCard key={product.id} product={product} categorySlug={category.slug} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
