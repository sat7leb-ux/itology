"use client";

import { useState, useMemo } from "react";
import {
  Search,
  Filter,
  Eye,
  ChevronDown,
  ChevronUp,
  X,
  Check,
  Clock,
  Truck,
  Package,
  XCircle,
} from "lucide-react";
import { cn, formatPrice } from "@/lib/utils";

const MOCK_ORDERS = [
  { id: "ORD-001", customer: "Sarah Khachane", email: "sarah@example.com", total: 349900, status: "pending", payment: "paid", date: "2026-09-11", items: 2 },
  { id: "ORD-002", customer: "Michael Saad", email: "michael@example.com", total: 189900, status: "confirmed", payment: "paid", date: "2026-09-11", items: 1 },
  { id: "ORD-003", customer: "Rita Haddad", email: "rita@example.com", total: 99900, status: "shipped", payment: "paid", date: "2026-09-10", items: 3 },
  { id: "ORD-004", customer: "Elie Khachane", email: "elie@example.com", total: 72000, status: "delivered", payment: "paid", date: "2026-09-10", items: 1 },
  { id: "ORD-005", customer: "Tony Habib", email: "tony@example.com", total: 27900, status: "pending", payment: "unpaid", date: "2026-09-09", items: 1 },
  { id: "ORD-006", customer: "Nadia Mansour", email: "nadia@example.com", total: 450000, status: "confirmed", payment: "paid", date: "2026-09-09", items: 5 },
  { id: "ORD-007", customer: "Fadi Khoury", email: "fadi@example.com", total: 129900, status: "cancelled", payment: "refunded", date: "2026-09-08", items: 2 },
  { id: "ORD-008", customer: "Layla Saad", email: "layla@example.com", total: 890000, status: "shipped", payment: "paid", date: "2026-09-08", items: 1 },
];

const STATUS_CONFIG = {
  pending: { label: "Pending", color: "bg-amber-100 text-amber-700", icon: Clock },
  confirmed: { label: "Confirmed", color: "bg-blue-100 text-blue-700", icon: Check },
  shipped: { label: "Shipped", color: "bg-purple-100 text-purple-700", icon: Truck },
  delivered: { label: "Delivered", color: "bg-emerald-100 text-emerald-700", icon: Package },
  cancelled: { label: "Cancelled", color: "bg-red-100 text-red-700", icon: XCircle },
};

export default function OrdersPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [sortField, setSortField] = useState<"date" | "total">("date");
  const [sortDir, setSortDir] = useState<"asc" | "desc">("desc");
  const [selectedOrder, setSelectedOrder] = useState<string | null>(null);

  const filtered = useMemo(() => {
    let result = [...MOCK_ORDERS];
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      result = result.filter((o) => o.id.toLowerCase().includes(q) || o.customer.toLowerCase().includes(q) || o.email.toLowerCase().includes(q));
    }
    if (filterStatus !== "all") result = result.filter((o) => o.status === filterStatus);
    result.sort((a, b) => {
      if (sortField === "date") return sortDir === "asc" ? a.date.localeCompare(b.date) : b.date.localeCompare(a.date);
      return sortDir === "asc" ? a.total - b.total : b.total - a.total;
    });
    return result;
  }, [searchQuery, filterStatus, sortField, sortDir]);

  const toggleSort = (field: "date" | "total") => {
    if (sortField === field) setSortDir(sortDir === "asc" ? "desc" : "asc");
    else { setSortField(field); setSortDir("desc"); }
  };

  const SortIcon = ({ field }: { field: string }) => {
    if (sortField !== field) return <ChevronDown size={14} className="text-text-muted/50" />;
    return sortDir === "asc" ? <ChevronUp size={14} className="text-jade" /> : <ChevronDown size={14} className="text-jade" />;
  };

  return (
    <div className="p-6 lg:p-8">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-bold text-text-primary">Orders</h1>
          <p className="mt-1 text-sm text-text-muted">{filtered.length} orders</p>
        </div>
      </div>

      {/* Stats */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5 mb-6">
        {Object.entries(STATUS_CONFIG).map(([key, config]) => {
          const count = MOCK_ORDERS.filter((o) => o.status === key).length;
          return (
            <button
              key={key}
              onClick={() => setFilterStatus(filterStatus === key ? "all" : key)}
              className={cn(
                "p-4 rounded-xl border text-left transition",
                filterStatus === key ? "border-jade bg-jade/5" : "border-line bg-white hover:border-jade/30"
              )}
            >
              <div className="flex items-center gap-2">
                <config.icon size={16} className={config.color.split(" ")[1]} />
                <span className="text-xs font-medium text-text-muted">{config.label}</span>
              </div>
              <p className="mt-2 text-2xl font-bold text-text-primary">{count}</p>
            </button>
          );
        })}
      </div>

      {/* Toolbar */}
      <div className="rounded-xl border border-line bg-white">
        <div className="p-4 border-b border-line flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1 max-w-sm">
            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search orders, customers..."
              className="w-full pl-10 pr-4 py-2 rounded-lg border border-line text-sm focus:outline-none focus:border-jade transition"
            />
          </div>
          <select value={filterStatus} onChange={(e) => setFilterStatus(e.target.value)} className="px-3 py-2 rounded-lg border border-line text-sm bg-white focus:outline-none focus:border-jade">
            <option value="all">All Status</option>
            {Object.entries(STATUS_CONFIG).map(([key, config]) => (
              <option key={key} value={key}>{config.label}</option>
            ))}
          </select>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-line bg-paper/50">
                <th className="text-left px-4 py-3 text-xs font-medium text-text-muted uppercase tracking-wider">Order</th>
                <th className="text-left px-4 py-3 text-xs font-medium text-text-muted uppercase tracking-wider">Customer</th>
                <th className="text-left px-4 py-3 text-xs font-medium text-text-muted uppercase tracking-wider cursor-pointer" onClick={() => toggleSort("date")}>
                  <span className="flex items-center gap-1">Date <SortIcon field="date" /></span>
                </th>
                <th className="text-left px-4 py-3 text-xs font-medium text-text-muted uppercase tracking-wider">Items</th>
                <th className="text-left px-4 py-3 text-xs font-medium text-text-muted uppercase tracking-wider cursor-pointer" onClick={() => toggleSort("total")}>
                  <span className="flex items-center gap-1">Total <SortIcon field="total" /></span>
                </th>
                <th className="text-left px-4 py-3 text-xs font-medium text-text-muted uppercase tracking-wider">Status</th>
                <th className="text-left px-4 py-3 text-xs font-medium text-text-muted uppercase tracking-wider">Payment</th>
                <th className="text-right px-4 py-3 text-xs font-medium text-text-muted uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-line">
              {filtered.map((order) => {
                const statusConfig = STATUS_CONFIG[order.status as keyof typeof STATUS_CONFIG];
                return (
                  <tr key={order.id} className="hover:bg-paper/50 transition">
                    <td className="px-4 py-3 font-mono text-xs font-medium">{order.id}</td>
                    <td className="px-4 py-3">
                      <p className="font-medium text-text-primary">{order.customer}</p>
                      <p className="text-xs text-text-muted">{order.email}</p>
                    </td>
                    <td className="px-4 py-3 text-text-muted">{order.date}</td>
                    <td className="px-4 py-3">{order.items}</td>
                    <td className="px-4 py-3 font-medium">{formatPrice(order.total)}</td>
                    <td className="px-4 py-3">
                      <span className={cn("px-2 py-0.5 rounded-full text-xs font-medium", statusConfig.color)}>
                        {statusConfig.label}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <span className={cn(
                        "px-2 py-0.5 rounded-full text-xs font-medium",
                        order.payment === "paid" && "bg-emerald-100 text-emerald-700",
                        order.payment === "unpaid" && "bg-amber-100 text-amber-700",
                        order.payment === "refunded" && "bg-gray-100 text-gray-600",
                      )}>
                        {order.payment}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-right">
                      <button
                        onClick={() => setSelectedOrder(selectedOrder === order.id ? null : order.id)}
                        className="p-1.5 rounded-md text-text-muted hover:text-jade hover:bg-jade/5 transition"
                      >
                        <Eye size={14} />
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {filtered.length === 0 && (
          <div className="py-16 text-center">
            <Package size={40} className="mx-auto text-text-muted mb-3" />
            <p className="text-text-muted">No orders found</p>
          </div>
        )}
      </div>

      {/* Order detail panel */}
      {selectedOrder && (
        <div className="fixed inset-0 z-[100] animate-fade-in">
          <div className="absolute inset-0 bg-ink/50 backdrop-blur-sm" onClick={() => setSelectedOrder(null)} />
          <div className="absolute right-0 top-0 h-full w-full max-w-md bg-white shadow-floating p-6 overflow-y-auto animate-slide-left">
            <div className="flex items-center justify-between mb-6">
              <h2 className="font-display text-lg font-semibold">Order Details</h2>
              <button onClick={() => setSelectedOrder(null)} className="p-2 rounded-lg text-text-muted hover:bg-paper transition">
                <X size={18} />
              </button>
            </div>
            {(() => {
              const order = MOCK_ORDERS.find((o) => o.id === selectedOrder);
              if (!order) return null;
              return (
                <div className="space-y-6">
                  <div>
                    <p className="font-mono text-sm font-medium">{order.id}</p>
                    <p className="text-xs text-text-muted mt-0.5">{order.date}</p>
                  </div>
                  <div className="p-4 rounded-lg bg-paper">
                    <p className="font-medium">{order.customer}</p>
                    <p className="text-sm text-text-muted">{order.email}</p>
                  </div>
                  <div className="flex items-center justify-between p-4 rounded-lg border border-line">
                    <span className="text-sm text-text-muted">Total</span>
                    <span className="text-lg font-bold">{formatPrice(order.total)}</span>
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Status</label>
                    <select className="w-full px-3 py-2 rounded-lg border border-line text-sm focus:outline-none focus:border-jade">
                      {Object.entries(STATUS_CONFIG).map(([key, config]) => (
                        <option key={key} value={key}>{config.label}</option>
                      ))}
                    </select>
                  </div>
                  <button className="w-full py-2.5 bg-ink text-text-onDark rounded-lg text-sm font-medium hover:bg-jade transition">
                    Update Order
                  </button>
                </div>
              );
            })()}
          </div>
        </div>
      )}
    </div>
  );
}
