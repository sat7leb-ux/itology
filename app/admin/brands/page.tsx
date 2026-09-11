"use client";

import { useState } from "react";
import { Plus, Search, Edit, Trash2, Check, X } from "lucide-react";
import { useToast } from "@/components/toast";
import { ConfirmModal } from "@/components/confirm-modal";

const MOCK_BRANDS = [
  { id: "1", name: "Apple", slug: "apple", productCount: 45 },
  { id: "2", name: "Dell", slug: "dell", productCount: 32 },
  { id: "3", name: "Logitech", slug: "logitech", productCount: 28 },
  { id: "4", name: "Samsung", slug: "samsung", productCount: 21 },
  { id: "5", name: "Cisco", slug: "cisco", productCount: 18 },
  { id: "6", name: "Fortinet", slug: "fortinet", productCount: 12 },
  { id: "7", name: "HP", slug: "hp", productCount: 15 },
  { id: "8", name: "Sony", slug: "sony", productCount: 9 },
  { id: "9", name: "Keychron", slug: "keychron", productCount: 7 },
  { id: "10", name: "ASUS", slug: "asus", productCount: 14 },
];

export default function BrandsPage() {
  const [brands, setBrands] = useState(MOCK_BRANDS);
  const [searchQuery, setSearchQuery] = useState("");
  const [deleteModal, setDeleteModal] = useState<{ open: boolean; id: string | null }>({ open: false, id: null });
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editName, setEditName] = useState("");
  const [showAddForm, setShowAddForm] = useState(false);
  const [newName, setNewName] = useState("");
  const [newSlug, setNewSlug] = useState("");
  const { toast } = useToast();

  const filtered = brands.filter((b) => b.name.toLowerCase().includes(searchQuery.toLowerCase()));

  const handleDelete = () => {
    if (deleteModal.id) {
      setBrands(brands.filter((b) => b.id !== deleteModal.id));
      toast({ type: "success", title: "Brand deleted" });
    }
    setDeleteModal({ open: false, id: null });
  };

  const handleAdd = () => {
    if (!newName || !newSlug) {
      toast({ type: "error", title: "Name and slug are required" });
      return;
    }
    setBrands([...brands, { id: String(Date.now()), name: newName, slug: newSlug, productCount: 0 }]);
    setNewName("");
    setNewSlug("");
    setShowAddForm(false);
    toast({ type: "success", title: "Brand created", description: newName });
  };

  const handleEditSave = (id: string) => {
    setBrands(brands.map((b) => (b.id === id ? { ...b, name: editName } : b)));
    setEditingId(null);
    toast({ type: "success", title: "Brand updated" });
  };

  return (
    <div className="p-6 lg:p-8">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-bold text-text-primary">Brands</h1>
          <p className="mt-1 text-sm text-text-muted">{brands.length} brands</p>
        </div>
        <button onClick={() => setShowAddForm(true)} className="inline-flex items-center gap-2 px-5 py-2.5 bg-ink text-text-onDark rounded-lg text-sm font-semibold hover:bg-jade transition">
          <Plus size={16} />
          Add Brand
        </button>
      </div>

      <div className="relative max-w-sm mb-6">
        <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted" />
        <input type="text" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} placeholder="Search brands..." className="w-full pl-10 pr-4 py-2 rounded-lg border border-line text-sm focus:outline-none focus:border-jade transition" />
      </div>

      {showAddForm && (
        <div className="mb-6 rounded-xl border border-jade/30 bg-jade/5 p-5 animate-slide-down">
          <h3 className="font-semibold text-text-primary mb-4">New Brand</h3>
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className="block text-sm font-medium text-text-primary mb-1">Name *</label>
              <input type="text" value={newName} onChange={(e) => setNewName(e.target.value)} placeholder="e.g., Apple" className="w-full px-3 py-2 rounded-lg border border-line text-sm focus:outline-none focus:border-jade" />
            </div>
            <div>
              <label className="block text-sm font-medium text-text-primary mb-1">Slug *</label>
              <input type="text" value={newSlug} onChange={(e) => setNewSlug(e.target.value.toLowerCase().replace(/\s+/g, "-"))} placeholder="e.g., apple" className="w-full px-3 py-2 rounded-lg border border-line text-sm focus:outline-none focus:border-jade" />
            </div>
          </div>
          <div className="flex justify-end gap-2 mt-4">
            <button onClick={() => setShowAddForm(false)} className="px-4 py-2 rounded-lg border border-line text-sm font-medium text-text-muted hover:bg-paper transition">Cancel</button>
            <button onClick={handleAdd} className="px-4 py-2 rounded-lg bg-ink text-text-onDark text-sm font-medium hover:bg-jade transition flex items-center gap-1.5">
              <Check size={14} />
              Create
            </button>
          </div>
        </div>
      )}

      <div className="rounded-xl border border-line bg-white">
        <div className="px-5 py-3 border-b border-line bg-paper/50">
          <div className="grid grid-cols-12 gap-4 text-xs font-medium text-text-muted uppercase tracking-wider">
            <div className="col-span-4">Name</div>
            <div className="col-span-3">Slug</div>
            <div className="col-span-2 text-center">Products</div>
            <div className="col-span-3 text-right">Actions</div>
          </div>
        </div>
        <div className="divide-y divide-line">
          {filtered.map((brand) => (
            <div key={brand.id} className="px-5 py-3 grid grid-cols-12 gap-4 items-center hover:bg-paper/50 transition">
              <div className="col-span-4">
                {editingId === brand.id ? (
                  <div className="flex items-center gap-2">
                    <input type="text" value={editName} onChange={(e) => setEditName(e.target.value)} className="flex-1 px-2 py-1 rounded border border-jade text-sm focus:outline-none" autoFocus />
                    <button onClick={() => handleEditSave(brand.id)} className="p-1 text-jade hover:bg-jade/10 rounded"><Check size={14} /></button>
                    <button onClick={() => setEditingId(null)} className="p-1 text-text-muted hover:bg-paper rounded"><X size={14} /></button>
                  </div>
                ) : (
                  <span className="font-medium text-text-primary">{brand.name}</span>
                )}
              </div>
              <div className="col-span-3"><span className="font-mono text-xs text-text-muted">{brand.slug}</span></div>
              <div className="col-span-2 text-center"><span className="text-sm font-medium">{brand.productCount}</span></div>
              <div className="col-span-3 flex items-center justify-end gap-1">
                <button onClick={() => { setEditingId(brand.id); setEditName(brand.name); }} className="p-1.5 rounded-md text-text-muted hover:text-jade hover:bg-jade/5 transition"><Edit size={14} /></button>
                <button onClick={() => setDeleteModal({ open: true, id: brand.id })} className="p-1.5 rounded-md text-text-muted hover:text-red-500 hover:bg-red-50 transition"><Trash2 size={14} /></button>
              </div>
            </div>
          ))}
        </div>
      </div>

      <ConfirmModal open={deleteModal.open} title="Delete Brand" description="Are you sure you want to delete this brand?" confirmLabel="Delete" variant="danger" onConfirm={handleDelete} onCancel={() => setDeleteModal({ open: false, id: null })} />
    </div>
  );
}
