"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowLeft, Save, X, Plus } from "lucide-react";
import { useToast } from "@/components/toast";
import { createClient } from "@/lib/supabase/client";

interface Category {
  id: string;
  name: string;
  slug: string;
}

interface Brand {
  id: string;
  name: string;
  slug: string;
}

export default function NewProductPage() {
  const [name, setName] = useState("");
  const [slug, setSlug] = useState("");
  const [sku, setSku] = useState("");
  const [price, setPrice] = useState("");
  const [salePrice, setSalePrice] = useState("");
  const [stock, setStock] = useState("");
  const [description, setDescription] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [brandId, setBrandId] = useState("");
  const [images, setImages] = useState<string[]>([]);
  const [isPublished, setIsPublished] = useState(false);
  const [isFeatured, setIsFeatured] = useState(false);
  const [saving, setSaving] = useState(false);
  const [categories, setCategories] = useState<Category[]>([]);
  const [brands, setBrands] = useState<Brand[]>([]);
  const { toast } = useToast();
  const router = useRouter();

  useEffect(() => {
    fetchCategories();
    fetchBrands();
  }, []);

  const fetchCategories = async () => {
    const supabase = createClient();
    const { data } = await supabase.from("categories").select("id, name, slug").order("name");
    if (data) setCategories(data);
  };

  const fetchBrands = async () => {
    const supabase = createClient();
    const { data } = await supabase.from("brands").select("id, name, slug").order("name");
    if (data) setBrands(data);
  };

  const handleAddImage = () => {
    const url = prompt("Enter image URL:");
    if (url) setImages([...images, url]);
  };

  const handleRemoveImage = (index: number) => {
    setImages(images.filter((_, i) => i !== index));
  };

  const handleSave = async () => {
    if (!name || !sku || !price) {
      toast({ type: "error", title: "Missing required fields", description: "Name, SKU, and Price are required" });
      return;
    }
    setSaving(true);
    try {
      const supabase = createClient();
      const { data, error } = await supabase
        .from("products")
        .insert({
          name,
          slug: slug || name.toLowerCase().replace(/\s+/g, "-"),
          sku,
          price: Math.round(parseFloat(price) * 100),
          sale_price: salePrice ? Math.round(parseFloat(salePrice) * 100) : null,
          stock_qty: parseInt(stock) || 0,
          description,
          category_id: categoryId || null,
          brand_id: brandId || null,
          is_published: isPublished,
          is_featured: isFeatured,
        })
        .select()
        .single();

      if (error) throw error;

      // Add images if any
      if (images.length > 0 && data) {
        const imageRows = images.map((url, i) => ({
          product_id: data.id,
          url,
          sort_order: i,
        }));
        await supabase.from("product_images").insert(imageRows);
      }

      toast({ type: "success", title: "Product created", description: `${name} has been added to your catalog` });
      router.push("/admin/products");
    } catch (err: any) {
      toast({ type: "error", title: "Failed to create product", description: err.message });
    }
    setSaving(false);
  };

  const inputClass = "w-full px-3 py-2 rounded-lg border border-line text-sm focus:outline-none focus:border-jade transition bg-white";

  return (
    <div className="p-6 lg:p-8 max-w-4xl">
      <div className="flex items-center gap-4 mb-6">
        <Link href="/admin/products" className="p-2 rounded-lg text-text-muted hover:bg-paper transition">
          <ArrowLeft size={18} />
        </Link>
        <div>
          <h1 className="text-2xl font-bold text-text-primary">New Product</h1>
          <p className="mt-1 text-sm text-text-muted">Add a new product to your catalog</p>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2 space-y-6">
          <div className="rounded-xl border border-line bg-white p-5 space-y-4">
            <h2 className="font-semibold text-text-primary">Basic Information</h2>
            <div>
              <label className="block text-sm font-medium text-text-primary mb-1">Product Name *</label>
              <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="e.g., MacBook Pro 16-inch M3 Max" className={inputClass} />
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label className="block text-sm font-medium text-text-primary mb-1">SKU *</label>
                <input type="text" value={sku} onChange={(e) => setSku(e.target.value)} placeholder="e.g., MBP16-M3" className={inputClass} />
              </div>
              <div>
                <label className="block text-sm font-medium text-text-primary mb-1">Slug</label>
                <input type="text" value={slug} onChange={(e) => setSlug(e.target.value)} placeholder="Auto-generated from name" className={inputClass} />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-text-primary mb-1">Description</label>
              <textarea value={description} onChange={(e) => setDescription(e.target.value)} rows={4} placeholder="Detailed product description..." className={inputClass} />
            </div>
          </div>

          <div className="rounded-xl border border-line bg-white p-5 space-y-4">
            <h2 className="font-semibold text-text-primary">Pricing & Inventory</h2>
            <div className="grid gap-4 sm:grid-cols-3">
              <div>
                <label className="block text-sm font-medium text-text-primary mb-1">Price (USD) *</label>
                <input type="number" value={price} onChange={(e) => setPrice(e.target.value)} placeholder="3499.00" className={inputClass} />
              </div>
              <div>
                <label className="block text-sm font-medium text-text-primary mb-1">Sale Price</label>
                <input type="number" value={salePrice} onChange={(e) => setSalePrice(e.target.value)} placeholder="Optional" className={inputClass} />
              </div>
              <div>
                <label className="block text-sm font-medium text-text-primary mb-1">Stock Qty</label>
                <input type="number" value={stock} onChange={(e) => setStock(e.target.value)} placeholder="0" className={inputClass} />
              </div>
            </div>
          </div>

          <div className="rounded-xl border border-line bg-white p-5 space-y-4">
            <h2 className="font-semibold text-text-primary">Images</h2>
            <div className="grid grid-cols-3 sm:grid-cols-4 gap-3">
              {images.map((img, i) => (
                <div key={i} className="relative aspect-square rounded-lg border border-line overflow-hidden group">
                  <img src={img} alt="" className="w-full h-full object-cover" />
                  <button onClick={() => handleRemoveImage(i)} className="absolute top-1 right-1 p-1 rounded-full bg-white/90 text-red-500 opacity-0 group-hover:opacity-100 transition">
                    <X size={14} />
                  </button>
                </div>
              ))}
              <button onClick={handleAddImage} className="aspect-square rounded-lg border-2 border-dashed border-line flex flex-col items-center justify-center text-text-muted hover:border-jade hover:text-jade transition">
                <Plus size={20} />
                <span className="text-xs mt-1">Add Image</span>
              </button>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="rounded-xl border border-line bg-white p-5 space-y-4">
            <h2 className="font-semibold text-text-primary">Status & Visibility</h2>
            <div className="space-y-3">
              <label className="flex items-center gap-3 cursor-pointer">
                <input type="checkbox" checked={isPublished} onChange={(e) => setIsPublished(e.target.checked)} className="rounded" />
                <div>
                  <p className="text-sm font-medium text-text-primary">Published</p>
                  <p className="text-xs text-text-muted">Visible to customers</p>
                </div>
              </label>
              <label className="flex items-center gap-3 cursor-pointer">
                <input type="checkbox" checked={isFeatured} onChange={(e) => setIsFeatured(e.target.checked)} className="rounded" />
                <div>
                  <p className="text-sm font-medium text-text-primary">Featured</p>
                  <p className="text-xs text-text-muted">Highlight on homepage</p>
                </div>
              </label>
            </div>
          </div>

          <div className="rounded-xl border border-line bg-white p-5 space-y-4">
            <h2 className="font-semibold text-text-primary">Organization</h2>
            <div>
              <label className="block text-sm font-medium text-text-primary mb-1">Category</label>
              <select value={categoryId} onChange={(e) => setCategoryId(e.target.value)} className={inputClass}>
                <option value="">Select category</option>
                {categories.map((cat) => (
                  <option key={cat.id} value={cat.id}>{cat.name}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-text-primary mb-1">Brand</label>
              <select value={brandId} onChange={(e) => setBrandId(e.target.value)} className={inputClass}>
                <option value="">Select brand</option>
                {brands.map((brand) => (
                  <option key={brand.id} value={brand.id}>{brand.name}</option>
                ))}
              </select>
            </div>
          </div>

          <button
            onClick={handleSave}
            disabled={saving}
            className="w-full flex items-center justify-center gap-2 px-5 py-3 bg-ink text-text-onDark rounded-lg text-sm font-semibold hover:bg-jade transition disabled:opacity-50"
          >
            {saving ? (
              <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            ) : (
              <Save size={16} />
            )}
            {saving ? "Saving..." : "Create Product"}
          </button>
        </div>
      </div>
    </div>
  );
}
