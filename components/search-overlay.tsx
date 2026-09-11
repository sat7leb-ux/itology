"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { useRouter } from "next/navigation";
import { Search, X, TrendingUp, Clock, ArrowRight, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";

const TRENDING_SEARCHES = [
  "Laptop",
  "Server",
  "Router",
  "Monitor",
  "SSD",
  "RAM",
  "Firewall",
  "UPS",
];

const RECENT_SEARCHES_KEY = "itology_recent_searches";

interface SearchOverlayProps {
  open: boolean;
  onClose: () => void;
}

export function SearchOverlay({ open, onClose }: SearchOverlayProps) {
  const [query, setQuery] = useState("");
  const [recentSearches, setRecentSearches] = useState<string[]>([]);
  const [isFocused, setIsFocused] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  useEffect(() => {
    if (open) {
      setQuery("");
      const stored = localStorage.getItem(RECENT_SEARCHES_KEY);
      if (stored) setRecentSearches(JSON.parse(stored));
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [open]);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        onClose();
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [onClose]);

  const saveRecentSearch = useCallback((term: string) => {
    if (!term.trim()) return;
    const updated = [term, ...recentSearches.filter((s) => s !== term)].slice(0, 5);
    setRecentSearches(updated);
    localStorage.setItem(RECENT_SEARCHES_KEY, JSON.stringify(updated));
  }, [recentSearches]);

  const handleSearch = (term: string) => {
    if (!term.trim()) return;
    saveRecentSearch(term.trim());
    router.push(`/search?q=${encodeURIComponent(term.trim())}`);
    onClose();
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[100] animate-fade-in">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-ink/60 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Panel */}
      <div className="relative mx-auto mt-[10vh] w-full max-w-2xl px-4 animate-slide-down">
        <div className="bg-white rounded-xl shadow-floating overflow-hidden">
          {/* Search input */}
          <div className="flex items-center gap-3 px-5 py-4 border-b border-line">
            <Search size={20} className="text-text-muted shrink-0" />
            <input
              ref={inputRef}
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onFocus={() => setIsFocused(true)}
              onBlur={() => setIsFocused(false)}
              onKeyDown={(e) => {
                if (e.key === "Enter") handleSearch(query);
              }}
              placeholder="Search for products, brands, categories..."
              className="flex-1 text-base bg-transparent outline-none placeholder:text-text-muted"
            />
            {query && (
              <button
                onClick={() => setQuery("")}
                className="p-1 text-text-muted hover:text-text-primary transition"
              >
                <X size={16} />
              </button>
            )}
            <kbd className="hidden sm:inline-flex items-center gap-1 px-2 py-1 rounded bg-paper text-xs text-text-muted font-mono">
              ESC
            </kbd>
          </div>

          {/* Content */}
          <div className="max-h-[60vh] overflow-y-auto p-5">
            {/* Quick suggestions when typing */}
            {query && (
              <div className="mb-4">
                <button
                  onClick={() => handleSearch(query)}
                  className="flex items-center gap-3 w-full px-3 py-2.5 rounded-md hover:bg-paper transition text-left"
                >
                  <Search size={16} className="text-jade" />
                  <span className="text-sm text-text-primary">
                    Search for &quot;<span className="font-medium">{query}</span>&quot;
                  </span>
                  <ArrowRight size={14} className="ml-auto text-text-muted" />
                </button>
              </div>
            )}

            {/* Recent searches */}
            {recentSearches.length > 0 && (
              <div className="mb-5">
                <p className="flex items-center gap-2 text-xs font-medium text-text-muted uppercase tracking-wider mb-3">
                  <Clock size={12} />
                  Recent searches
                </p>
                <div className="flex flex-wrap gap-2">
                  {recentSearches.map((term) => (
                    <button
                      key={term}
                      onClick={() => handleSearch(term)}
                      className="px-3 py-1.5 rounded-full bg-paper text-sm text-text-primary hover:bg-jade/10 hover:text-jade-dark transition"
                    >
                      {term}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Trending searches */}
            <div className="mb-5">
              <p className="flex items-center gap-2 text-xs font-medium text-text-muted uppercase tracking-wider mb-3">
                <TrendingUp size={12} />
                Trending searches
              </p>
              <div className="flex flex-wrap gap-2">
                {TRENDING_SEARCHES.map((term) => (
                  <button
                    key={term}
                    onClick={() => handleSearch(term)}
                    className="px-3 py-1.5 rounded-full border border-line text-sm text-text-primary hover:border-jade hover:text-jade-dark transition"
                  >
                    {term}
                  </button>
                ))}
              </div>
            </div>

            {/* Quick categories */}
            <div>
              <p className="flex items-center gap-2 text-xs font-medium text-text-muted uppercase tracking-wider mb-3">
                <Sparkles size={12} />
                Quick links
              </p>
              <div className="grid grid-cols-2 gap-2">
                {[
                  { label: "New Arrivals", href: "/shop?sort=newest" },
                  { label: "Best Sellers", href: "/shop?filter=bestseller" },
                  { label: "Sale Items", href: "/shop?filter=sale" },
                  { label: "All Products", href: "/shop" },
                ].map((link) => (
                  <button
                    key={link.label}
                    onClick={() => {
                      router.push(link.href);
                      onClose();
                    }}
                    className="flex items-center gap-2 px-3 py-2.5 rounded-md bg-paper hover:bg-jade/5 text-sm text-text-primary transition text-left"
                  >
                    {link.label}
                    <ArrowRight size={12} className="ml-auto text-text-muted" />
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Footer hint */}
          <div className="px-5 py-3 bg-paper/50 border-t border-line flex items-center gap-4 text-xs text-text-muted">
            <span className="flex items-center gap-1">
              <kbd className="px-1.5 py-0.5 rounded bg-white border border-line font-mono text-[10px]">
                ↵
              </kbd>
              to search
            </span>
            <span className="flex items-center gap-1">
              <kbd className="px-1.5 py-0.5 rounded bg-white border border-line font-mono text-[10px]">
                ESC
              </kbd>
              to close
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
