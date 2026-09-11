import { createClient } from "@/lib/supabase/server";
import { createProduct } from "./actions";

async function getOptions() {
  try {
    const supabase = createClient();
    const [{ data: categories }, { data: brands }] = await Promise.all([
      supabase.from("categories").select("id, name").order("name"),
      supabase.from("brands").select("id, name").order("name"),
    ]);
    return { categories: categories ?? [], brands: brands ?? [] };
  } catch {
    return { categories: [], brands: [] };
  }
}

export default async function NewProductPage() {
  const { categories, brands } = await getOptions();

  return (
    <div className="p-8 max-w-3xl">
      <h1 className="text-2xl font-semibold">New product</h1>

      <form action={createProduct} className="mt-6 space-y-8">
        <Section title="Basics">
          <Field label="Name">
            <input name="name" required className={inputClass} />
          </Field>
          <div className="grid grid-cols-2 gap-4">
            <Field label="Slug">
              <input name="slug" required placeholder="e.g. thinkpad-x1-carbon" className={inputClass} />
            </Field>
            <Field label="SKU">
              <input name="sku" required className={`${inputClass} font-mono`} />
            </Field>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <Field label="Category">
              <select name="category_id" required className={inputClass}>
                <option value="">Select a category</option>
                {categories.map((c: any) => (
                  <option key={c.id} value={c.id}>{c.name}</option>
                ))}
              </select>
            </Field>
            <Field label="Brand">
              <select name="brand_id" className={inputClass}>
                <option value="">No brand</option>
                {brands.map((b: any) => (
                  <option key={b.id} value={b.id}>{b.name}</option>
                ))}
              </select>
            </Field>
          </div>
        </Section>

        <Section title="Pricing & inventory">
          <div className="grid grid-cols-3 gap-4">
            <Field label="Price (USD)">
              <input name="price" type="number" step="0.01" required className={inputClass} />
            </Field>
            <Field label="Sale price (USD)">
              <input name="sale_price" type="number" step="0.01" className={inputClass} />
            </Field>
            <Field label="Stock quantity">
              <input name="stock_qty" type="number" defaultValue={0} className={inputClass} />
            </Field>
          </div>
        </Section>

        <Section title="Details">
          <Field label="Description">
            <textarea name="description" rows={4} className={inputClass} />
          </Field>
          <Field label="Warranty">
            <input name="warranty_text" placeholder="e.g. 1-year manufacturer warranty" className={inputClass} />
          </Field>
        </Section>

        <Section title="SEO">
          <Field label="SEO title">
            <input name="seo_title" className={inputClass} />
          </Field>
          <Field label="SEO description">
            <textarea name="seo_description" rows={2} className={inputClass} />
          </Field>
        </Section>

        <Section title="Visibility">
          <div className="flex flex-wrap gap-5">
            <Checkbox name="is_published" label="Published" defaultChecked />
            <Checkbox name="is_featured" label="Featured" />
            <Checkbox name="is_bestseller" label="Bestseller" />
            <Checkbox name="is_new" label="New" />
          </div>
        </Section>

        <p className="text-xs text-text-muted">
          Images, variants, and attribute-driven specs are added after the
          product is created (Phase 4: media library + variant builder).
        </p>

        <div className="flex gap-3">
          <button
            type="submit"
            className="rounded-sm bg-jade px-6 py-2.5 text-sm font-medium text-ink hover:bg-jade-light"
          >
            Create product
          </button>
        </div>
      </form>
    </div>
  );
}

const inputClass =
  "mt-1.5 w-full rounded-sm border border-line bg-white px-3 py-2 text-sm focus:border-jade";

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <fieldset className="border-t border-line pt-6 first:border-t-0 first:pt-0">
      <legend className="text-sm font-medium">{title}</legend>
      <div className="mt-4 space-y-4">{children}</div>
    </fieldset>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="text-xs text-text-muted">{label}</span>
      {children}
    </label>
  );
}

function Checkbox({
  name,
  label,
  defaultChecked,
}: {
  name: string;
  label: string;
  defaultChecked?: boolean;
}) {
  return (
    <label className="flex items-center gap-2 text-sm">
      <input type="checkbox" name={name} defaultChecked={defaultChecked} className="accent-jade" />
      {label}
    </label>
  );
}
