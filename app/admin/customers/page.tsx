"use client";

import { useState, useMemo } from "react";
import { Search, Eye, Mail, Phone, MapPin, X } from "lucide-react";
import { cn } from "@/lib/utils";

const MOCK_CUSTOMERS = [
  { id: "1", name: "Sarah Khachane", email: "sarah@example.com", phone: "+961 76 123 456", city: "Beirut", orders: 12, total: 2450000, joined: "2025-03-15" },
  { id: "2", name: "Michael Saad", email: "michael@example.com", phone: "+961 70 987 654", city: "Tripoli", orders: 8, total: 1890000, joined: "2025-05-22" },
  { id: "3", name: "Rita Haddad", email: "rita@example.com", phone: "+961 71 456 789", city: "Sidon", orders: 5, total: 678000, joined: "2025-07-10" },
  { id: "4", name: "Elie Khachane", email: "elie@example.com", phone: "+961 76 789 012", city: "Beirut", orders: 23, total: 5670000, joined: "2024-11-01" },
  { id: "5", name: "Tony Habib", email: "tony@example.com", phone: "+961 78 321 654", city: "Jounieh", orders: 3, total: 234000, joined: "2026-01-18" },
  { id: "6", name: "Nadia Mansour", email: "nadia@example.com", phone: "+961 79 654 321", city: "Baalbek", orders: 7, total: 1230000, joined: "2025-09-05" },
  { id: "7", name: "Fadi Khoury", email: "fadi@example.com", phone: "+961 77 890 123", city: "Zahle", orders: 1, total: 45000, joined: "2026-08-30" },
  { id: "8", name: "Layla Saad", email: "layla@example.com", phone: "+961 76 567 890", city: "Beirut", orders: 15, total: 3450000, joined: "2025-02-14" },
];

export default function CustomersPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCustomer, setSelectedCustomer] = useState<string | null>(null);

  const filtered = useMemo(() => {
    if (!searchQuery) return MOCK_CUSTOMERS;
    const q = searchQuery.toLowerCase();
    return MOCK_CUSTOMERS.filter((c) =>
      c.name.toLowerCase().includes(q) || c.email.toLowerCase().includes(q) || c.city.toLowerCase().includes(q)
    );
  }, [searchQuery]);

  return (
    <div className="p-6 lg:p-8">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-bold text-text-primary">Customers</h1>
          <p className="mt-1 text-sm text-text-muted">{filtered.length} customers</p>
        </div>
      </div>

      <div className="relative max-w-sm mb-6">
        <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted" />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search customers..."
          className="w-full pl-10 pr-4 py-2 rounded-lg border border-line text-sm focus:outline-none focus:border-jade transition"
        />
      </div>

      <div className="rounded-xl border border-line bg-white">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-line bg-paper/50">
                <th className="text-left px-4 py-3 text-xs font-medium text-text-muted uppercase tracking-wider">Customer</th>
                <th className="text-left px-4 py-3 text-xs font-medium text-text-muted uppercase tracking-wider">Contact</th>
                <th className="text-left px-4 py-3 text-xs font-medium text-text-muted uppercase tracking-wider">City</th>
                <th className="text-left px-4 py-3 text-xs font-medium text-text-muted uppercase tracking-wider">Orders</th>
                <th className="text-left px-4 py-3 text-xs font-medium text-text-muted uppercase tracking-wider">Total Spent</th>
                <th className="text-left px-4 py-3 text-xs font-medium text-text-muted uppercase tracking-wider">Joined</th>
                <th className="text-right px-4 py-3 text-xs font-medium text-text-muted uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-line">
              {filtered.map((customer) => (
                <tr key={customer.id} className="hover:bg-paper/50 transition">
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-full bg-jade/10 flex items-center justify-center">
                        <span className="text-sm font-semibold text-jade-dark">{customer.name[0]}</span>
                      </div>
                      <span className="font-medium text-text-primary">{customer.name}</span>
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <p className="text-sm">{customer.email}</p>
                    <p className="text-xs text-text-muted">{customer.phone}</p>
                  </td>
                  <td className="px-4 py-3 text-text-muted">{customer.city}</td>
                  <td className="px-4 py-3 font-medium">{customer.orders}</td>
                  <td className="px-4 py-3 font-medium">${(customer.total / 100).toFixed(2)}</td>
                  <td className="px-4 py-3 text-text-muted">{customer.joined}</td>
                  <td className="px-4 py-3 text-right">
                    <button
                      onClick={() => setSelectedCustomer(customer.id)}
                      className="p-1.5 rounded-md text-text-muted hover:text-jade hover:bg-jade/5 transition"
                    >
                      <Eye size={14} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {filtered.length === 0 && (
          <div className="py-16 text-center">
            <p className="text-text-muted">No customers found</p>
          </div>
        )}
      </div>

      {/* Customer detail modal */}
      {selectedCustomer && (
        <div className="fixed inset-0 z-[100] animate-fade-in">
          <div className="absolute inset-0 bg-ink/50 backdrop-blur-sm" onClick={() => setSelectedCustomer(null)} />
          <div className="absolute right-0 top-0 h-full w-full max-w-md bg-white shadow-floating p-6 overflow-y-auto animate-slide-left">
            <div className="flex items-center justify-between mb-6">
              <h2 className="font-display text-lg font-semibold">Customer Details</h2>
              <button onClick={() => setSelectedCustomer(null)} className="p-2 rounded-lg text-text-muted hover:bg-paper transition">
                <X size={18} />
              </button>
            </div>
            {(() => {
              const customer = MOCK_CUSTOMERS.find((c) => c.id === selectedCustomer);
              if (!customer) return null;
              return (
                <div className="space-y-6">
                  <div className="flex items-center gap-4">
                    <div className="w-14 h-14 rounded-full bg-jade/10 flex items-center justify-center">
                      <span className="text-xl font-bold text-jade-dark">{customer.name[0]}</span>
                    </div>
                    <div>
                      <p className="font-semibold text-lg">{customer.name}</p>
                      <p className="text-sm text-text-muted">Customer since {customer.joined}</p>
                    </div>
                  </div>
                  <div className="space-y-3">
                    <div className="flex items-center gap-3 p-3 rounded-lg bg-paper">
                      <Mail size={16} className="text-jade" />
                      <span className="text-sm">{customer.email}</span>
                    </div>
                    <div className="flex items-center gap-3 p-3 rounded-lg bg-paper">
                      <Phone size={16} className="text-jade" />
                      <span className="text-sm">{customer.phone}</span>
                    </div>
                    <div className="flex items-center gap-3 p-3 rounded-lg bg-paper">
                      <MapPin size={16} className="text-jade" />
                      <span className="text-sm">{customer.city}, Lebanon</span>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="p-4 rounded-lg border border-line text-center">
                      <p className="text-2xl font-bold text-text-primary">{customer.orders}</p>
                      <p className="text-xs text-text-muted mt-1">Total Orders</p>
                    </div>
                    <div className="p-4 rounded-lg border border-line text-center">
                      <p className="text-2xl font-bold text-text-primary">${(customer.total / 100).toFixed(0)}</p>
                      <p className="text-xs text-text-muted mt-1">Total Spent</p>
                    </div>
                  </div>
                </div>
              );
            })()}
          </div>
        </div>
      )}
    </div>
  );
}
