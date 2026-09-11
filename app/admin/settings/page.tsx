"use client";

import { useState } from "react";
import { Save, Store, Truck, CreditCard, Bell, Shield, Globe } from "lucide-react";
import { useToast } from "@/components/toast";

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState("store");
  const { toast } = useToast();

  const tabs = [
    { id: "store", label: "Store", icon: Store },
    { id: "shipping", label: "Shipping", icon: Truck },
    { id: "payments", label: "Payments", icon: CreditCard },
    { id: "notifications", label: "Notifications", icon: Bell },
    { id: "security", label: "Security", icon: Shield },
    { id: "seo", label: "SEO", icon: Globe },
  ];

  const handleSave = () => {
    toast({ type: "success", title: "Settings saved", description: "Your changes have been applied" });
  };

  return (
    <div className="p-6 lg:p-8">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-bold text-text-primary">Settings</h1>
          <p className="mt-1 text-sm text-text-muted">Manage your store configuration</p>
        </div>
        <button
          onClick={handleSave}
          className="inline-flex items-center gap-2 px-5 py-2.5 bg-ink text-text-onDark rounded-lg text-sm font-semibold hover:bg-jade transition"
        >
          <Save size={16} />
          Save Changes
        </button>
      </div>

      <div className="grid gap-6 lg:grid-cols-[240px_1fr]">
        {/* Sidebar tabs */}
        <nav className="space-y-1">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-medium transition ${
                activeTab === tab.id
                  ? "bg-ink text-text-onDark"
                  : "text-text-muted hover:bg-paper hover:text-text-primary"
              }`}
            >
              <tab.icon size={16} />
              {tab.label}
            </button>
          ))}
        </nav>

        {/* Content */}
        <div className="rounded-xl border border-line bg-white p-6">
          {activeTab === "store" && (
            <div className="space-y-6">
              <h2 className="font-display text-lg font-semibold">Store Settings</h2>
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label className="block text-sm font-medium text-text-primary mb-1">Store Name</label>
                  <input type="text" defaultValue="ITOLOGY" className="w-full px-3 py-2 rounded-lg border border-line text-sm focus:outline-none focus:border-jade" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-text-primary mb-1">Store Email</label>
                  <input type="email" defaultValue="eliekhachane@gmail.com" className="w-full px-3 py-2 rounded-lg border border-line text-sm focus:outline-none focus:border-jade" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-text-primary mb-1">Phone</label>
                  <input type="tel" defaultValue="+961 76 784 433" className="w-full px-3 py-2 rounded-lg border border-line text-sm focus:outline-none focus:border-jade" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-text-primary mb-1">Currency</label>
                  <select className="w-full px-3 py-2 rounded-lg border border-line text-sm focus:outline-none focus:border-jade">
                    <option value="USD">USD ($)</option>
                    <option value="EUR">EUR (€)</option>
                    <option value="LBP">LBP (ل.ل)</option>
                  </select>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-text-primary mb-1">Store Description</label>
                <textarea rows={3} defaultValue="ITOLOGY is where IT infrastructure and technology commerce meet — hardware, networking, cybersecurity, and the expertise to run it." className="w-full px-3 py-2 rounded-lg border border-line text-sm focus:outline-none focus:border-jade" />
              </div>
            </div>
          )}

          {activeTab === "shipping" && (
            <div className="space-y-6">
              <h2 className="font-display text-lg font-semibold">Shipping Settings</h2>
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label className="block text-sm font-medium text-text-primary mb-1">Free Shipping Threshold</label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted">$</span>
                    <input type="number" defaultValue="200" className="w-full pl-8 pr-3 py-2 rounded-lg border border-line text-sm focus:outline-none focus:border-jade" />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-text-primary mb-1">Default Shipping Rate</label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted">$</span>
                    <input type="number" defaultValue="15" className="w-full pl-8 pr-3 py-2 rounded-lg border border-line text-sm focus:outline-none focus:border-jade" />
                  </div>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-text-primary mb-1">Delivery Estimate</label>
                <input type="text" defaultValue="2-4 business days" className="w-full px-3 py-2 rounded-lg border border-line text-sm focus:outline-none focus:border-jade" />
              </div>
            </div>
          )}

          {activeTab === "payments" && (
            <div className="space-y-6">
              <h2 className="font-display text-lg font-semibold">Payment Settings</h2>
              <div className="p-4 rounded-lg bg-amber-50 border border-amber-200">
                <p className="text-sm text-amber-800">Connect Stripe to accept credit card payments. Configure your API keys in environment variables.</p>
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label className="block text-sm font-medium text-text-primary mb-1">Stripe Publishable Key</label>
                  <input type="text" placeholder="pk_live_..." className="w-full px-3 py-2 rounded-lg border border-line text-sm focus:outline-none focus:border-jade" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-text-primary mb-1">Stripe Secret Key</label>
                  <input type="password" placeholder="sk_live_..." className="w-full px-3 py-2 rounded-lg border border-line text-sm focus:outline-none focus:border-jade" />
                </div>
              </div>
            </div>
          )}

          {activeTab === "notifications" && (
            <div className="space-y-6">
              <h2 className="font-display text-lg font-semibold">Notification Settings</h2>
              <div className="space-y-4">
                {[
                  { label: "New order notifications", desc: "Get notified when a new order is placed" },
                  { label: "Low stock alerts", desc: "Get notified when products are running low" },
                  { label: "Customer review alerts", desc: "Get notified when a review is submitted" },
                  { label: "Daily summary email", desc: "Receive a daily summary of your store activity" },
                ].map((item, i) => (
                  <label key={i} className="flex items-center justify-between p-4 rounded-lg border border-line cursor-pointer hover:bg-paper transition">
                    <div>
                      <p className="text-sm font-medium text-text-primary">{item.label}</p>
                      <p className="text-xs text-text-muted">{item.desc}</p>
                    </div>
                    <input type="checkbox" defaultChecked className="rounded" />
                  </label>
                ))}
              </div>
            </div>
          )}

          {activeTab === "security" && (
            <div className="space-y-6">
              <h2 className="font-display text-lg font-semibold">Security Settings</h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-text-primary mb-1">Admin Password</label>
                  <input type="password" placeholder="••••••••" className="w-full px-3 py-2 rounded-lg border border-line text-sm focus:outline-none focus:border-jade" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-text-primary mb-1">Two-Factor Authentication</label>
                  <button className="px-4 py-2 rounded-lg border border-line text-sm font-medium text-text-muted hover:bg-paper transition">
                    Enable 2FA
                  </button>
                </div>
              </div>
            </div>
          )}

          {activeTab === "seo" && (
            <div className="space-y-6">
              <h2 className="font-display text-lg font-semibold">SEO Settings</h2>
              <div className="grid gap-4">
                <div>
                  <label className="block text-sm font-medium text-text-primary mb-1">Meta Title</label>
                  <input type="text" defaultValue="ITOLOGY — IT Services, Technology & Hardware" className="w-full px-3 py-2 rounded-lg border border-line text-sm focus:outline-none focus:border-jade" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-text-primary mb-1">Meta Description</label>
                  <textarea rows={3} defaultValue="ITOLOGY is where IT infrastructure and technology commerce meet — hardware, networking, cybersecurity, and the expertise to run it." className="w-full px-3 py-2 rounded-lg border border-line text-sm focus:outline-none focus:border-jade" />
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
