import Link from "next/link";
import { Package, ClipboardList, Users, DollarSign, ArrowUpRight } from "lucide-react";
import { createClient } from "@/lib/supabase/server";

const STATS = [
  { label: "Orders (30d)", icon: ClipboardList },
  { label: "Revenue (30d)", icon: DollarSign },
  { label: "Products", icon: Package },
  { label: "Customers", icon: Users },
];

async function getCounts() {
  try {
    const supabase = createClient();
    const [{ count: products }, { count: orders }, { count: customers }] = await Promise.all([
      supabase.from("products").select("*", { count: "exact", head: true }),
      supabase.from("orders").select("*", { count: "exact", head: true }),
      supabase.from("customers").select("*", { count: "exact", head: true }),
    ]);
    return { products, orders, customers };
  } catch {
    return { products: null, orders: null, customers: null };
  }
}

export default async function AdminDashboardPage() {
  const counts = await getCounts();
  const values: Record<string, number | null> = {
    "Orders (30d)": counts.orders,
    "Revenue (30d)": null, // requires an order-totals aggregate — wire up in Phase 4
    Products: counts.products,
    Customers: counts.customers,
  };

  return (
    <div className="p-8">
      <h1 className="text-2xl font-semibold">Dashboard</h1>

      <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {STATS.map((stat) => {
          const Icon = stat.icon;
          const value = values[stat.label];
          return (
            <div key={stat.label} className="rounded-md border border-line bg-white p-5">
              <div className="flex items-center justify-between text-text-muted">
                <span className="text-xs">{stat.label}</span>
                <Icon size={16} strokeWidth={1.75} />
              </div>
              <p className="mt-3 text-2xl font-semibold">
                {value === null ? "—" : value}
              </p>
            </div>
          );
        })}
      </div>

      <div className="mt-8 rounded-md border border-line bg-white p-6">
        <p className="text-sm font-medium">Get started</p>
        <ul className="mt-3 space-y-2 text-sm">
          <li>
            <Link href="/admin/categories" className="flex items-center gap-1.5 text-jade-dark hover:text-jade">
              Create your first category <ArrowUpRight size={14} />
            </Link>
          </li>
          <li>
            <Link href="/admin/products/new" className="flex items-center gap-1.5 text-jade-dark hover:text-jade">
              Add your first product <ArrowUpRight size={14} />
            </Link>
          </li>
          <li>
            <Link href="/admin/services" className="flex items-center gap-1.5 text-jade-dark hover:text-jade">
              Publish your IT services <ArrowUpRight size={14} />
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
}
