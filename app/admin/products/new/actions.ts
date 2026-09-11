"use server";

import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";

export async function createProduct(formData: FormData) {
  const supabase = createClient();

  const payload = {
    name: String(formData.get("name")),
    slug: String(formData.get("slug")),
    sku: String(formData.get("sku")),
    category_id: String(formData.get("category_id")),
    brand_id: formData.get("brand_id") ? String(formData.get("brand_id")) : null,
    price: Math.round(Number(formData.get("price")) * 100),
    sale_price: formData.get("sale_price")
      ? Math.round(Number(formData.get("sale_price")) * 100)
      : null,
    stock_qty: Number(formData.get("stock_qty") ?? 0),
    description: String(formData.get("description") ?? ""),
    warranty_text: String(formData.get("warranty_text") ?? ""),
    seo_title: String(formData.get("seo_title") ?? ""),
    seo_description: String(formData.get("seo_description") ?? ""),
    is_published: formData.get("is_published") === "on",
    is_featured: formData.get("is_featured") === "on",
    is_bestseller: formData.get("is_bestseller") === "on",
    is_new: formData.get("is_new") === "on",
  };

  const { error } = await supabase.from("products").insert(payload);
  if (error) throw error;

  redirect("/admin/products");
}
