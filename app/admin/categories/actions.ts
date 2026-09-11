"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";

export async function createCategory(formData: FormData) {
  const supabase = createClient();

  const { error } = await supabase.from("categories").insert({
    name: String(formData.get("name")),
    slug: String(formData.get("slug")),
    parent_id: formData.get("parent_id") ? String(formData.get("parent_id")) : null,
    description: String(formData.get("description") ?? ""),
    is_active: true,
    sort_order: 0,
  });

  if (error) throw error;
  revalidatePath("/admin/categories");
}
