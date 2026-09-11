import { createClient } from "@/lib/supabase/server";
import type { Category, Product, Service } from "@/lib/types";

const PRODUCT_SELECT = `
  id, name, slug, sku, description, price, sale_price, stock_qty,
  is_published, is_featured, is_bestseller, is_new, warranty_text, category_id,
  brand:brands ( id, name, slug ),
  category:categories ( slug ),
  images:product_images ( id, url, sort_order )
`;

export async function getFeaturedCategories(limit = 8): Promise<Category[]> {
  const supabase = createClient();
  const { data, error } = await supabase
    .from("categories")
    .select("*")
    .is("parent_id", null)
    .eq("is_active", true)
    .order("sort_order")
    .limit(limit);

  if (error) throw error;
  return data ?? [];
}

export async function getFeaturedProducts(limit = 8): Promise<Product[]> {
  const supabase = createClient();
  const { data, error } = await supabase
    .from("products")
    .select(PRODUCT_SELECT)
    .eq("is_published", true)
    .eq("is_featured", true)
    .order("created_at", { ascending: false })
    .limit(limit);

  if (error) throw error;
  return (data ?? []) as unknown as Product[];
}

export async function getServices(): Promise<Service[]> {
  const supabase = createClient();
  const { data, error } = await supabase
    .from("services")
    .select("*")
    .order("sort_order");

  if (error) throw error;
  return data ?? [];
}

export async function getCategoryBySlug(slug: string): Promise<Category | null> {
  const supabase = createClient();
  const { data, error } = await supabase
    .from("categories")
    .select("*")
    .eq("slug", slug)
    .maybeSingle();

  if (error) throw error;
  return data;
}

export async function getProductsByCategory(
  categoryId: string,
  {
    sort = "featured",
  }: { sort?: "featured" | "price_asc" | "price_desc" | "newest" } = {}
): Promise<Product[]> {
  const supabase = createClient();
  let query = supabase
    .from("products")
    .select(PRODUCT_SELECT)
    .eq("category_id", categoryId)
    .eq("is_published", true);

  if (sort === "price_asc") query = query.order("price", { ascending: true });
  else if (sort === "price_desc") query = query.order("price", { ascending: false });
  else if (sort === "newest") query = query.order("created_at", { ascending: false });
  else query = query.order("is_featured", { ascending: false });

  const { data, error } = await query;
  if (error) throw error;
  return (data ?? []) as unknown as Product[];
}

export async function getProductBySlug(slug: string): Promise<Product | null> {
  const supabase = createClient();
  const { data, error } = await supabase
    .from("products")
    .select(
      `${PRODUCT_SELECT},
       attributes:product_attributes (
         attribute:attributes ( name ),
         attribute_value:attribute_values ( value )
       )`
    )
    .eq("slug", slug)
    .maybeSingle();

  if (error) throw error;
  if (!data) return null;

  // Flatten the joined attribute rows into { attribute_name, value } pairs.
  const raw = data as unknown as Record<string, unknown>;
  const flatAttributes = ((raw.attributes as unknown[]) ?? []).map((row: any) => ({
    attribute_name: row.attribute?.name,
    value: row.attribute_value?.value,
  }));

  return { ...(data as unknown as Product), attributes: flatAttributes };
}
