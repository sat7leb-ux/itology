import Link from "next/link";
import { Plus } from "lucide-react";
import { formatPrice } from "@/lib/utils";
import { createClient } from "@/lib/supabase/server";

async function getProducts() {
  try {
    const supabase = createClient();
    const { data } = await supabase
      .from("products")
      .select("id, name, sku, price, stock_qty, is_published")
      .order("created_at", { ascending: false })
      .limit(50);
    return data ?? [];
  } catch {
    return [];
  }
}

export default async function AdminProductsPage() {
  const products = await getProducts();

  return (
    <div className="p-8">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold">Products</h1>
        <Link
          href="/admin/products/new"
          className="flex items-center gap-1.5 rounded-sm bg-ink px-4 py-2 text-sm font-medium text-text-onDark hover:bg-ink/90"
        >
          <Plus size={16} /> New product
        </Link>
      </div>

      <div className="mt-6 rounded-md border border-line bg-white overflow-hidden">
        {products.length === 0 ? (
          <p className="p-8 text-center text-sm text-text-muted">
            No products yet. Add your first one to get the catalog started.
          </p>
        ) : (
          <table className="w-full text-sm">
            <thead className="border-b border-line text-left text-xs text-text-muted">
              <tr>
                <th className="px-5 py-3 font-medium">Name</th>
                <th className="px-5 py-3 font-medium">SKU</th>
                <th className="px-5 py-3 font-medium">Price</th>
                <th className="px-5 py-3 font-medium">Stock</th>
                <th className="px-5 py-3 font-medium">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-line">
              {products.map((p: any) => (
                <tr key={p.id}>
                  <td className="px-5 py-3">
                    <Link href={`/admin/products/${p.id}`} className="hover:text-jade-dark">
                      {p.name}
                    </Link>
                  </td>
                  <td className="px-5 py-3 font-mono text-xs text-text-muted">{p.sku}</td>
                  <td className="px-5 py-3">{formatPrice(p.price)}</td>
                  <td className="px-5 py-3">{p.stock_qty}</td>
                  <td className="px-5 py-3">
                    <span
                      className={
                        p.is_published
                          ? "rounded-sm bg-jade/10 px-2 py-0.5 text-xs text-jade-dark"
                          : "rounded-sm bg-line px-2 py-0.5 text-xs text-text-muted"
                      }
                    >
                      {p.is_published ? "Published" : "Draft"}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
