"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Plus,
  Search,
  Edit,
  Trash2,
  ChevronRight,
  FolderTree,
  X,
  Check,
  GripVertical,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useToast } from "@/components/toast";
import { ConfirmModal } from "@/components/confirm-modal";

const MOCK_CATEGORIES = [
  { id: "1", name: "Computers", slug: "computers", description: "Laptops, desktops, and workstations", productCount: 45, isActive: true, parentId: null },
  { id: "2", name: "Components", slug: "components", description: "CPUs, GPUs, RAM, motherboards", productCount: 128, isActive: true, parentId: null },
  { id: "3", name: "Networking", slug: "networking", description: "Routers, switches, access points", productCount: 67, isActive: true, parentId: null },
  { id: "4", name: "Cybersecurity", slug: "cybersecurity", description: "Firewalls, antivirus, security tools", productCount: 34, isActive: true, parentId: null },
  { id: "5", name: "Servers & Storage", slug: "servers-storage", description: "Server hardware, NAS, SAN", productCount: 23, isActive: true, parentId: null },
  { id: "6", name: "Displays", slug: "displays", description: "Monitors, projectors, accessories", productCount: 56, isActive: true, parentId: null },
  { id: "7", name: "Accessories", slug: "accessories", description: "Keyboards, mice, cables, adapters", productCount: 234, isActive: true, parentId: null },
  { id: "8", name: "Gadgets", slug: "gadgets", description: "Smart devices, wearables, IoT", productCount: 89, isActive: true, parentId: null },
  { id: "9", name: "Software", slug: "software", description: "Operating systems, licenses", productCount: 12, isActive: false, parentId: null },
];

export default function CategoriesPage() {
  const [categories, setCategories] = useState(MOCK_CATEGORIES);
  const [searchQuery, setSearchQuery] = useState("");
  const [deleteModal, setDeleteModal] = useState<{ open: boolean; id: string | null }>({ open: false, id: null });
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editName, setEditName] = useState("");
  const [showAddForm, setShowAddForm] = useState(false);
  const [newName, setNewName] = useState("");
  const [newSlug, setNewSlug] = useState("");
  const [newDesc, setNewDesc] = useState("");
  const { toast } = useToast();

  const filtered = categories.filter((c) =>
    c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    c.slug.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleDelete = () => {
    if (deleteModal.id) {
      setCategories(categories.filter((c) => c.id !== deleteModal.id));
      toast({ type: "success", title: "Category deleted" });
    }
    setDeleteModal({ open: false, id: null });
  };

  const handleAddCategory = () => {
    if (!newName || !newSlug) {
      toast({ type: "error", title: "Name and slug are required" });
      return;
    }
    const newCat = {
      id: String(Date.now()),
      name: newName,
      slug: newSlug,
      description: newDesc,
      productCount: 0,
      isActive: true,
      parentId: null,
    };
    setCategories([...categories, newCat]);
    setNewName("");
    setNewSlug("");
    setNewDesc("");
    setShowAddForm(false);
    toast({ type: "success", title: "Category created", description: newName });
  };

  const handleEditSave = (id: string) => {
    setCategories(categories.map((c) => (c.id === id ? { ...c, name: editName } : c)));
    setEditingId(null);
    toast({ type: "success", title: "Category updated" });
  };

  const toggleActive = (id: string) => {
    setCategories(categories.map((c) => (c.id === id ? { ...c, isActive: !c.isActive } : c)));
  };

  return (
    <div className="p-6 lg:p-8">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-bold text-text-primary">Categories</h1>
          <p className="mt-1 text-sm text-text-muted">{categories.length} categories</p>
        </div>
        <button
          onClick={() => setShowAddForm(true)}
          className="inline-flex items-center gap-2 px-5 py-2.5 bg-ink text-text-onDark rounded-lg text-sm font-semibold hover:bg-jade transition"
        >
          <Plus size={16} />
          Add Category
        </button>
      </div>

      {/* Search */}
      <div className="relative max-w-sm mb-6">
        <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted" />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search categories..."
          className="w-full pl-10 pr-4 py-2 rounded-lg border border-line text-sm focus:outline-none focus:border-jade transition"
        />
      </div>

      {/* Add form */}
      {showAddForm && (
        <div className="mb-6 rounded-xl border border-jade/30 bg-jade/5 p-5 animate-slide-down">
          <h3 className="font-semibold text-text-primary mb-4">New Category</h3>
          <div className="grid gap-4 sm:grid-cols-3">
            <div>
              <label className="block text-sm font-medium text-text-primary mb-1">Name *</label>
              <input
                type="text"
                value={newName}
                onChange={(e) => setNewName(e.target.value)}
                placeholder="e.g., Laptops"
                className="w-full px-3 py-2 rounded-lg border border-line text-sm focus:outline-none focus:border-jade"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-text-primary mb-1">Slug *</label>
              <input
                type="text"
                value={newSlug}
                onChange={(e) => setNewSlug(e.target.value.toLowerCase().replace(/\s+/g, "-"))}
                placeholder="e.g., laptops"
                className="w-full px-3 py-2 rounded-lg border border-line text-sm focus:outline-none focus:border-jade"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-text-primary mb-1">Description</label>
              <input
                type="text"
                value={newDesc}
                onChange={(e) => setNewDesc(e.target.value)}
                placeholder="Brief description"
                className="w-full px-3 py-2 rounded-lg border border-line text-sm focus:outline-none focus:border-jade"
              />
            </div>
          </div>
          <div className="flex justify-end gap-2 mt-4">
            <button onClick={() => setShowAddForm(false)} className="px-4 py-2 rounded-lg border border-line text-sm font-medium text-text-muted hover:bg-paper transition">
              Cancel
            </button>
            <button onClick={handleAddCategory} className="px-4 py-2 rounded-lg bg-ink text-text-onDark text-sm font-medium hover:bg-jade transition flex items-center gap-1.5">
              <Check size={14} />
              Create
            </button>
          </div>
        </div>
      )}

      {/* Categories list */}
      <div className="rounded-xl border border-line bg-white">
        <div className="px-5 py-3 border-b border-line bg-paper/50">
          <div className="grid grid-cols-12 gap-4 text-xs font-medium text-text-muted uppercase tracking-wider">
            <div className="col-span-1"></div>
            <div className="col-span-3">Name</div>
            <div className="col-span-2">Slug</div>
            <div className="col-span-3">Description</div>
            <div className="col-span-1 text-center">Products</div>
            <div className="col-span-1 text-center">Status</div>
            <div className="col-span-1 text-right">Actions</div>
          </div>
        </div>
        <div className="divide-y divide-line">
          {filtered.map((cat) => (
            <div key={cat.id} className="px-5 py-3 grid grid-cols-12 gap-4 items-center hover:bg-paper/50 transition">
              <div className="col-span-1">
                <GripVertical size={16} className="text-text-muted/50 cursor-grab" />
              </div>
              <div className="col-span-3">
                {editingId === cat.id ? (
                  <div className="flex items-center gap-2">
                    <input
                      type="text"
                      value={editName}
                      onChange={(e) => setEditName(e.target.value)}
                      className="flex-1 px-2 py-1 rounded border border-jade text-sm focus:outline-none"
                      autoFocus
                    />
                    <button onClick={() => handleEditSave(cat.id)} className="p-1 text-jade hover:bg-jade/10 rounded">
                      <Check size={14} />
                    </button>
                    <button onClick={() => setEditingId(null)} className="p-1 text-text-muted hover:bg-paper rounded">
                      <X size={14} />
                    </button>
                  </div>
                ) : (
                  <span className="font-medium text-text-primary">{cat.name}</span>
                )}
              </div>
              <div className="col-span-2">
                <span className="font-mono text-xs text-text-muted">{cat.slug}</span>
              </div>
              <div className="col-span-3">
                <span className="text-sm text-text-muted line-clamp-1">{cat.description}</span>
              </div>
              <div className="col-span-1 text-center">
                <span className="text-sm font-medium">{cat.productCount}</span>
              </div>
              <div className="col-span-1 flex justify-center">
                <button
                  onClick={() => toggleActive(cat.id)}
                  className={cn(
                    "w-10 h-5 rounded-full transition-colors relative",
                    cat.isActive ? "bg-jade" : "bg-line"
                  )}
                >
                  <span className={cn(
                    "absolute top-0.5 w-4 h-4 rounded-full bg-white shadow transition-transform",
                    cat.isActive ? "left-5.5 translate-x-0" : "left-0.5"
                  )} style={{ left: cat.isActive ? "22px" : "2px" }} />
                </button>
              </div>
              <div className="col-span-1 flex items-center justify-end gap-1">
                <button
                  onClick={() => { setEditingId(cat.id); setEditName(cat.name); }}
                  className="p-1.5 rounded-md text-text-muted hover:text-jade hover:bg-jade/5 transition"
                >
                  <Edit size={14} />
                </button>
                <button
                  onClick={() => setDeleteModal({ open: true, id: cat.id })}
                  className="p-1.5 rounded-md text-text-muted hover:text-red-500 hover:bg-red-50 transition"
                >
                  <Trash2 size={14} />
                </button>
              </div>
            </div>
          ))}
        </div>
        {filtered.length === 0 && (
          <div className="py-16 text-center">
            <FolderTree size={40} className="mx-auto text-text-muted mb-3" />
            <p className="text-text-muted">No categories found</p>
          </div>
        )}
      </div>

      <ConfirmModal
        open={deleteModal.open}
        title="Delete Category"
        description="Are you sure you want to delete this category? Products in this category will not be deleted."
        confirmLabel="Delete"
        variant="danger"
        onConfirm={handleDelete}
        onCancel={() => setDeleteModal({ open: false, id: null })}
      />
    </div>
  );
}
