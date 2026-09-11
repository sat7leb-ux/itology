"use client";

import { useState, useEffect, useMemo } from "react";
import Link from "next/link";
import {
  Plus,
  Search,
  Edit,
  Trash2,
  Star,
  Image as ImageIcon,
  ChevronDown,
  ChevronUp,
} from "lucide-react";
import { cn, formatPrice } from "@/lib/utils";
import { useToast } from "@/components/toast";
import { ConfirmModal } from "@/components/confirm-modal";
import { createClient } from "@/lib/supabase/client";

interface Product {
  id: string;
  name: string;
  slug: string;
  sku: string;
  price: number;
  sale_price: number | null;
  stock_qty: number;
  is_published: boolean;
  is_featured: boolean;
  is_bestseller: boolean;
  is_new: boolean;
  brand: { name: string } | null;
  category: { name: string; slug: string } | null;
  created_at: string;
}

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortField, setSortField] = useState<"name" | "price" | "stock_qty">("name");
  const [sortDir, setSortDir] = useState<"asc" | "desc">("asc");
  const [selected, setSelected] = useState<Set<string>>(new Set());
  const [deleteModal, setDeleteModal] = useState<{ open: boolean; ids: string[] }>({ open: false, ids: [] });
  const { toast } = useToast();

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const supabase = createClient();
      const { data, error } = await supabase
        .from("products")
        .select("id, name, slug, sku, price, sale_price, stock_qty, is_published, is_featured, is_bestseller, is_new, created_at, brand:brands(name), category:categories(name, slug)")
        .order("created_at", { ascending: false });

      if (error) {
        console.error("Error fetching products:", error);
        toast({ type: "error", title: "Failed to load products", description: error.message });
      } else {
        setProducts(data as unknown as Product[]);
      }
    } catch (err) {
      console.error(err);
      toast({ type: "error", title: "Failed to load products" });
    }
    setLoading(false);
  };

  const filtered = useMemo(() => {
    let result = [...products];
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      result = result.filter((p) => p.name.toLowerCase().includes(q) || p.sku.toLowerCase().includes(q) || p.brand?.name?.toLowerCase().includes(q));
    }
    result.sort((a, b) => {
      const aVal = a[sortField];
      const bVal = b[sortField];
      if (typeof aVal === "string" && typeof bVal === "string") return sortDir === "asc" ? aVal.localeCompare(bVal) : bVal.localeCompare(aVal);
      return sortDir === "asc" ? (aVal as number) - (bVal as number) : (bVal as number) - (aVal as number);
    });
    return result;
  }, [products, searchQuery, sortField, sortDir]);

  const toggleSort = (field: "name" | "price" | "stock_qty") => {
    if (sortField === field) setSortDir(sortDir === "asc" ? "desc" : "asc");
    else { setSortField(field); setSortDir("asc"); }
  };

  const toggleSelectAll = () => {
    if (selected.size === filtered.length) setSelected(new Set());
    else setSelected(new Set(filtered.map((p) => p.id)));
  };

  const toggleSelect = (id: string) => {
    const next = new Set(selected);
    if (next.has(id)) next.delete(id); else next.add(id);
    setSelected(next);
  };

  const handleDelete = async (ids: string[]) => {
    try {
      const supabase = createClient();
      const { error } = await supabase.from("products").delete().in("id", ids);
      if (error) throw error;
      toast({ type: "success", title: "Products deleted", description: `${ids.length} product(s) removed` });
      setDeleteModal({ open: false, ids: [] });
      setSelected(new Set());
      fetchProducts();
    } catch (err: any) {
      toast({ type: "error", title: "Failed to delete", description: err.message });
    }
  };

  const SortIcon = ({ field }: { field: string }) => {
    if (sortField !== field) return <ChevronDown size={14} className="text-text-muted/50" />;
    return sortDir === "asc" ? <ChevronUp size={14} className="text-jade" /> : <ChevronDown size={14} className="text-jade" />;
  };

  return (
    <div className="p-6 lg:p-8">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-bold text-text-primary">Products</h1>
          <p className="mt-1 text-sm text-text-muted">{filtered.length} products</p>
        </div>
        <Link href="/admin/products/new" className="inline-flex items-center gap-2 px-5 py-2.5 bg-ink text-text-onDark rounded-lg text-sm font-semibold hover:bg-jade transition">
          <Plus size={16} />
          Add Product
        </Link>
      </div>

      <div className="rounded-xl border border-line bg-white">
        <div className="p-4 border-b border-line flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1 max-w-sm">
            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search products, SKU, brand..."
              className="w-full pl-10 pr-4 py-2 rounded-lg border border-line text-sm focus:outline-none focus:border-jade transition"
            />
          </div>
          {selected.size > 0 && (
            <button onClick={() => setDeleteModal({ open: true, ids: Array.from(selected) })} className="px-3 py-2 rounded-lg bg-red-50 text-red-600 text-sm font-medium hover:bg-red-100 transition flex items-center gap-1.5">
              <Trash2 size={14} />
              Delete ({selected.size})
            </button>
          )}
        </div>

        {loading ? (
          <div className="py-16 text-center">
            <div className="w-8 h-8 border-2 border-jade border-t-transparent rounded-full animate-spin mx-auto" />
            <p className="mt-2 text-sm text-text-muted">Loading products...</p>
          </div>
        ) : filtered.length === 0 ? (
          <div className="py-16 text-center">
            <ImageIcon size={40} className="mx-auto text-text-muted mb-3" />
            <p className="text-text-muted">No products found</p>
            <Link href="/admin/products/new" className="text-sm text-jade hover:underline mt-2 inline-block">
              Add your first product
            </Link>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-line bg-paper/50">
                  <th className="text-left px-4 py-3 w-10">
                    <input type="checkbox" checked={selected.size === filtered.length && filtered.length > 0} onChange={toggleSelectAll} className="rounded" />
                  </th>
                  <th className="text-left px-4 py-3 text-xs font-medium text-text-muted uppercase tracking-wider cursor-pointer" onClick={() => toggleSort("name")}>
                    <span className="flex items-center gap-1">Product <SortIcon field="name" /></span>
                  </th>
                  <th className="text-left px-4 py-3 text-xs font-medium text-text-muted uppercase tracking-wider">SKU</th>
                  <th className="text-left px-4 py-3 text-xs font-medium text-text-muted uppercase tracking-wider cursor-pointer" onClick={() => toggleSort("price")}>
                    <span className="flex items-center gap-1">Price <SortIcon field="price" /></span>
                  </th>
                  <th className="text-left px-4 py-3 text-xs font-medium text-text-muted uppercase tracking-wider cursor-pointer" onClick={() => toggleSort("stock_qty")}>
                    <span className="flex items-center gap-1">Stock <SortIcon field="stock_qty" /></span>
                  </th>
                  <th className="text-left px-4 py-3 text-xs font-medium text-text-muted uppercase tracking-wider">Status</th>
                  <th className="text-right px-4 py-3 text-xs font-medium text-text-muted uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-line">
                {filtered.map((product) => (
                  <tr key={product.id} className="hover:bg-paper/50 transition">
                    <td className="px-4 py-3">
                      <input type="checkbox" checked={selected.has(product.id)} onChange={() => toggleSelect(product.id)} className="rounded" />
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-lg border border-line bg-paper flex items-center justify-center shrink-0">
                          <ImageIcon size={16} className="text-text-muted" />
                        </div>
                        <div>
                          <p className="font-medium text-text-primary line-clamp-1">{product.name}</p>
                          <p className="text-xs text-text-muted">{product.brand?.name} · {product.category?.name}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-3 font-mono text-xs text-text-muted">{product.sku}</td>
                    <td className="px-4 py-3">
                      <span className="font-medium">{formatPrice(product.sale_price ?? product.price)}</span>
                      {product.sale_price && <span className="ml-1 text-xs text-text-muted line-through">{formatPrice(product.price)}</span>}
                    </td>
                    <td className="px-4 py-3">
                      <span className={cn("font-medium", product.stock_qty <= 5 ? "text-amber-600" : "text-text-primary")}>{product.stock_qty}</span>
                    </td>
                    <td className="px-4 py-3">
                      <span className={cn("px-2 py-0.5 rounded-full text-xs font-medium", product.is_published ? "bg-emerald-100 text-emerald-700" : "bg-gray-100 text-gray-600")}>
                        {product.is_published ? "Published" : "Draft"}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-right">
                      <div className="flex items-center justify-end gap-1">
                        <Link href={`/admin/products/${product.id}`} className="p-1.5 rounded-md text-text-muted hover:text-jade hover:bg-jade/5 transition">
                          <Edit size={14} />
                        </Link>
                        <button onClick={() => setDeleteModal({ open: true, ids: [product.id] })} className="p-1.5 rounded-md text-text-muted hover:text-red-500 hover:bg-red-50 transition">
                          <Trash2 size={14} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      <ConfirmModal
        open={deleteModal.open}
        title="Delete Products"
        description={`Are you sure you want to delete ${deleteModal.ids.length} product(s)? This action cannot be undone.`}
        confirmLabel="Delete"
        variant="danger"
        onConfirm={() => handleDelete(deleteModal.ids)}
        onCancel={() => setDeleteModal({ open: false, ids: [] })}
      />
    </div>
  );
}
