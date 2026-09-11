"use client";

import { useState } from "react";
import { X, AlertTriangle } from "lucide-react";
import { cn } from "@/lib/utils";

interface ConfirmModalProps {
  open: boolean;
  title: string;
  description: string;
  confirmLabel?: string;
  cancelLabel?: string;
  variant?: "danger" | "warning" | "info";
  onConfirm: () => void;
  onCancel: () => void;
  loading?: boolean;
}

export function ConfirmModal({
  open,
  title,
  description,
  confirmLabel = "Confirm",
  cancelLabel = "Cancel",
  variant = "danger",
  onConfirm,
  onCancel,
  loading = false,
}: ConfirmModalProps) {
  if (!open) return null;

  const variants = {
    danger: {
      icon: "bg-red-100 text-red-600",
      button: "bg-red-600 hover:bg-red-700",
    },
    warning: {
      icon: "bg-amber-100 text-amber-600",
      button: "bg-amber-600 hover:bg-amber-700",
    },
    info: {
      icon: "bg-blue-100 text-blue-600",
      button: "bg-blue-600 hover:bg-blue-700",
    },
  };

  return (
    <div className="fixed inset-0 z-[150] animate-fade-in">
      <div className="absolute inset-0 bg-ink/50 backdrop-blur-sm" onClick={onCancel} />
      <div className="absolute inset-0 flex items-center justify-center p-4">
        <div className="bg-white rounded-xl shadow-floating max-w-md w-full p-6 animate-scale-in">
          <div className="flex items-start gap-4">
            <div className={cn("w-10 h-10 rounded-full flex items-center justify-center shrink-0", variants[variant].icon)}>
              <AlertTriangle size={20} />
            </div>
            <div className="flex-1">
              <h3 className="font-display text-lg font-semibold text-text-primary">{title}</h3>
              <p className="mt-1.5 text-sm text-text-muted leading-relaxed">{description}</p>
            </div>
            <button onClick={onCancel} className="p-1 text-text-muted hover:text-text-primary transition">
              <X size={18} />
            </button>
          </div>
          <div className="flex justify-end gap-3 mt-6">
            <button
              onClick={onCancel}
              disabled={loading}
              className="px-4 py-2 rounded-md border border-line text-sm font-medium text-text-muted hover:bg-paper transition disabled:opacity-50"
            >
              {cancelLabel}
            </button>
            <button
              onClick={onConfirm}
              disabled={loading}
              className={cn(
                "px-4 py-2 rounded-md text-sm font-medium text-white transition disabled:opacity-50 flex items-center gap-2",
                variants[variant].button
              )}
            >
              {loading && (
                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              )}
              {confirmLabel}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
