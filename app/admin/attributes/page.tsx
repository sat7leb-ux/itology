"use client";

import { useState } from "react";
import { Plus, Search, Edit, Trash2, Check, X, SlidersHorizontal } from "lucide-react";
import { useToast } from "@/components/toast";
import { ConfirmModal } from "@/components/confirm-modal";

const MOCK_ATTRIBUTES = [
  { id: "1", name: "RAM", inputType: "select", values: ["8GB", "16GB", "32GB", "64GB"] },
  { id: "2", name: "Storage", inputType: "select", values: ["256GB", "512GB", "1TB", "2TB"] },
  { id: "3", name: "Processor", inputType: "select", values: ["Intel i5", "Intel i7", "Intel i9", "AMD Ryzen 5", "AMD Ryzen 7"] },
  { id: "4", name: "Screen Size", inputType: "select", values: ["13\"", "14\"", "15\"", "16\"", "17\""] },
  { id: "5", name: "Warranty", inputType: "select", values: ["1 Year", "2 Years", "3 Years"] },
  { id: "6", name: "Color", inputType: "select", values: ["Silver", "Space Gray", "Black", "White"] },
];

export default function AttributesPage() {
  const [attributes, setAttributes] = useState(MOCK_ATTRIBUTES);
  const [searchQuery, setSearchQuery] = useState("");
  const [deleteModal, setDeleteModal] = useState<{ open: boolean; id: string | null }>({ open: false, id: null });
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editName, setEditName] = useState("");
  const [showAddForm, setShowAddForm] = useState(false);
  const [newName, setNewName] = useState("");
  const [newInputType, setNewInputType] = useState("select");
  const { toast } = useToast();

  const filtered = attributes.filter((a) => a.name.toLowerCase().includes(searchQuery.toLowerCase()));

  const handleDelete = () => {
    if (deleteModal.id) {
      setAttributes(attributes.filter((a) => a.id !== deleteModal.id));
      toast({ type: "success", title: "Attribute deleted" });
    }
    setDeleteModal({ open: false, id: null });
  };

  const handleAdd = () => {
    if (!newName) {
      toast({ type: "error", title: "Name is required" });
      return;
    }
    setAttributes([...attributes, { id: String(Date.now()), name: newName, inputType: newInputType, values: [] }]);
    setNewName("");
    setShowAddForm(false);
    toast({ type: "success", title: "Attribute created", description: newName });
  };

  const handleEditSave = (id: string) => {
    setAttributes(attributes.map((a) => (a.id === id ? { ...a, name: editName } : a)));
    setEditingId(null);
    toast({ type: "success", title: "Attribute updated" });
  };

  return (
    <div className="p-6 lg:p-8">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-bold text-text-primary">Attributes</h1>
          <p className="mt-1 text-sm text-text-muted">{attributes.length} attributes</p>
        </div>
        <button onClick={() => setShowAddForm(true)} className="inline-flex items-center gap-2 px-5 py-2.5 bg-ink text-text-onDark rounded-lg text-sm font-semibold hover:bg-jade transition">
          <Plus size={16} />
          Add Attribute
        </button>
      </div>

      <div className="relative max-w-sm mb-6">
        <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted" />
        <input type="text" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} placeholder="Search attributes..." className="w-full pl-10 pr-4 py-2 rounded-lg border border-line text-sm focus:outline-none focus:border-jade transition" />
      </div>

      {showAddForm && (
        <div className="mb-6 rounded-xl border border-jade/30 bg-jade/5 p-5 animate-slide-down">
          <h3 className="font-semibold text-text-primary mb-4">New Attribute</h3>
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className="block text-sm font-medium text-text-primary mb-1">Name *</label>
              <input type="text" value={newName} onChange={(e) => setNewName(e.target.value)} placeholder="e.g., RAM" className="w-full px-3 py-2 rounded-lg border border-line text-sm focus:outline-none focus:border-jade" />
            </div>
            <div>
              <label className="block text-sm font-medium text-text-primary mb-1">Input Type</label>
              <select value={newInputType} onChange={(e) => setNewInputType(e.target.value)} className="w-full px-3 py-2 rounded-lg border border-line text-sm focus:outline-none focus:border-jade">
                <option value="select">Select</option>
                <option value="range">Range</option>
                <option value="boolean">Boolean</option>
              </select>
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
            <div className="col-span-3">Name</div>
            <div className="col-span-2">Type</div>
            <div className="col-span-4">Values</div>
            <div className="col-span-3 text-right">Actions</div>
          </div>
        </div>
        <div className="divide-y divide-line">
          {filtered.map((attr) => (
            <div key={attr.id} className="px-5 py-3 grid grid-cols-12 gap-4 items-center hover:bg-paper/50 transition">
              <div className="col-span-3">
                {editingId === attr.id ? (
                  <div className="flex items-center gap-2">
                    <input type="text" value={editName} onChange={(e) => setEditName(e.target.value)} className="flex-1 px-2 py-1 rounded border border-jade text-sm focus:outline-none" autoFocus />
                    <button onClick={() => handleEditSave(attr.id)} className="p-1 text-jade hover:bg-jade/10 rounded"><Check size={14} /></button>
                    <button onClick={() => setEditingId(null)} className="p-1 text-text-muted hover:bg-paper rounded"><X size={14} /></button>
                  </div>
                ) : (
                  <span className="font-medium text-text-primary">{attr.name}</span>
                )}
              </div>
              <div className="col-span-2">
                <span className="px-2 py-0.5 rounded-full bg-paper text-xs font-medium text-text-muted">{attr.inputType}</span>
              </div>
              <div className="col-span-4">
                <div className="flex flex-wrap gap-1">
                  {attr.values.slice(0, 3).map((v, i) => (
                    <span key={i} className="px-2 py-0.5 rounded bg-paper text-xs text-text-muted">{v}</span>
                  ))}
                  {attr.values.length > 3 && <span className="text-xs text-text-muted">+{attr.values.length - 3} more</span>}
                </div>
              </div>
              <div className="col-span-3 flex items-center justify-end gap-1">
                <button onClick={() => { setEditingId(attr.id); setEditName(attr.name); }} className="p-1.5 rounded-md text-text-muted hover:text-jade hover:bg-jade/5 transition"><Edit size={14} /></button>
                <button onClick={() => setDeleteModal({ open: true, id: attr.id })} className="p-1.5 rounded-md text-text-muted hover:text-red-500 hover:bg-red-50 transition"><Trash2 size={14} /></button>
              </div>
            </div>
          ))}
        </div>
      </div>

      <ConfirmModal open={deleteModal.open} title="Delete Attribute" description="Are you sure you want to delete this attribute?" confirmLabel="Delete" variant="danger" onConfirm={handleDelete} onCancel={() => setDeleteModal({ open: false, id: null })} />
    </div>
  );
}
