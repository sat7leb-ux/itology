import { Laptop, Cpu, Router, ShieldCheck, Server, Monitor, Keyboard, Smartphone, Wrench } from "lucide-react";
import { CategoryTile } from "@/components/category-tile";
import { getFeaturedCategories } from "@/lib/data";

export const metadata = { title: "Shop" };

const CATEGORY_ICONS: Record<string, typeof Laptop> = {
  computers: Laptop,
  components: Cpu,
  networking: Router,
  cybersecurity: ShieldCheck,
  "servers-storage": Server,
  displays: Monitor,
  accessories: Keyboard,
  gadgets: Smartphone,
  "it-services": Wrench,
};

export default async function ShopPage() {
  let categories: Awaited<ReturnType<typeof getFeaturedCategories>> = [];
  try {
    categories = await getFeaturedCategories(20);
  } catch {
    categories = [];
  }

  return (
    <div className="container-page py-14">
      <h1 className="text-3xl font-semibold">Shop</h1>
      <p className="mt-2 max-w-prose text-text-muted">
        Browse the full ITOLOGY catalog by category.
      </p>
      <div className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
        {(categories.length ? categories : []).map((cat: any) => (
          <CategoryTile
            key={cat.slug}
            name={cat.name}
            slug={cat.slug}
            icon={CATEGORY_ICONS[cat.slug] ?? Laptop}
          />
        ))}
        {categories.length === 0 && (
          <p className="col-span-full text-sm text-text-muted">
            No categories yet — add some from the admin portal.
          </p>
        )}
      </div>
    </div>
  );
}
