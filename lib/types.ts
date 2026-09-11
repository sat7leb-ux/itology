// Domain types mirroring supabase/migrations/0001_init.sql.
// Once the project is linked, replace `Database` with the generated types:
//   npx supabase gen types typescript --project-id <id> > lib/database.types.ts

export type Category = {
  id: string;
  parent_id: string | null;
  name: string;
  slug: string;
  description: string | null;
  image_url: string | null;
  sort_order: number;
  is_active: boolean;
};

export type Brand = {
  id: string;
  name: string;
  slug: string;
  logo_url: string | null;
};

export type ProductImage = {
  id: string;
  url: string;
  sort_order: number;
};

export type ProductAttributeValue = {
  attribute_name: string;
  value: string;
};

export type Product = {
  id: string;
  name: string;
  slug: string;
  brand: Pick<Brand, "id" | "name" | "slug"> | null;
  category_id: string;
  category?: { slug: string } | null;
  sku: string;
  description: string | null;
  price: number;
  sale_price: number | null;
  stock_qty: number;
  is_published: boolean;
  is_featured: boolean;
  is_bestseller: boolean;
  is_new: boolean;
  warranty_text: string | null;
  images: ProductImage[];
  attributes: ProductAttributeValue[];
  rating_avg?: number;
  rating_count?: number;
};

export type Service = {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  icon: string | null;
  sort_order: number;
};

export type CartItem = {
  product: Pick<Product, "id" | "name" | "slug" | "price" | "sale_price"> & {
    image_url: string | null;
  };
  variant_id: string | null;
  qty: number;
};

// Minimal placeholder so the Supabase client generics compile before
// `supabase gen types` has been run against a real project.
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type Database = any;
