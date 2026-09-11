import { createClient } from "@/lib/supabase/server";
import { createCategory } from "./actions";

async function getCategories() {
  try {
    const supabase = createClient();
    const { data } = await supabase
      .from("categories")
      .select("id, name, slug, is_active, parent_id")
      .order("sort_order");
    return data ?? [];
  } catch {
    return [];
  }
}

export default async function AdminCategoriesPage() {
  const categories = await getCategories();

  return (
    <div className="p-8 grid gap-8 lg:grid-cols-[1fr_320px]">
      <div>
        <h1 className="text-2xl font-semibold">Categories</h1>
        <div className="mt-6 rounded-md border border-line bg-white overflow-hidden">
          {categories.length === 0 ? (
            <p className="p-8 text-center text-sm text-text-muted">
              No categories yet — create one to start organizing products.
            </p>
          ) : (
            <table className="w-full text-sm">
              <thead className="border-b border-line text-left text-xs text-text-muted">
                <tr>
                  <th className="px-5 py-3 font-medium">Name</th>
                  <th className="px-5 py-3 font-medium">Slug</th>
                  <th className="px-5 py-3 font-medium">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-line">
                {categories.map((c: any) => (
                  <tr key={c.id}>
                    <td className="px-5 py-3">{c.name}</td>
                    <td className="px-5 py-3 font-mono text-xs text-text-muted">{c.slug}</td>
                    <td className="px-5 py-3">
                      <span
                        className={
                          c.is_active
                            ? "rounded-sm bg-jade/10 px-2 py-0.5 text-xs text-jade-dark"
                            : "rounded-sm bg-line px-2 py-0.5 text-xs text-text-muted"
                        }
                      >
                        {c.is_active ? "Active" : "Inactive"}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>

      <div className="h-fit rounded-md border border-line bg-white p-5">
        <p className="text-sm font-medium">New category</p>
        <form action={createCategory} className="mt-4 space-y-3">
          <label className="block">
            <span className="text-xs text-text-muted">Name</span>
            <input name="name" required className={inputClass} />
          </label>
          <label className="block">
            <span className="text-xs text-text-muted">Slug</span>
            <input name="slug" required className={inputClass} />
          </label>
          <label className="block">
            <span className="text-xs text-text-muted">Description</span>
            <textarea name="description" rows={3} className={inputClass} />
          </label>
          <button
            type="submit"
            className="w-full rounded-sm bg-ink px-4 py-2 text-sm font-medium text-text-onDark hover:bg-ink/90"
          >
            Create category
          </button>
        </form>
      </div>
    </div>
  );
}

const inputClass =
  "mt-1.5 w-full rounded-sm border border-line bg-white px-3 py-2 text-sm focus:border-jade";
