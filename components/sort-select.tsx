"use client";

const OPTIONS = [
  { value: "featured", label: "Featured" },
  { value: "newest", label: "Newest" },
  { value: "price_asc", label: "Price: low to high" },
  { value: "price_desc", label: "Price: high to low" },
] as const;

export function SortSelect({ current }: { current: string }) {
  return (
    <form>
      <label className="sr-only" htmlFor="sort">Sort</label>
      <select
        id="sort"
        name="sort"
        defaultValue={current}
        className="rounded-sm border border-line bg-white px-3 py-2 text-sm"
        onChange={(e) => e.currentTarget.form?.submit()}
      >
        {OPTIONS.map((o) => (
          <option key={o.value} value={o.value}>{o.label}</option>
        ))}
      </select>
    </form>
  );
}
