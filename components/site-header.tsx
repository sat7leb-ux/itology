"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Search,
  ShoppingCart,
  User,
  Menu,
  X,
  ChevronDown,
  Laptop,
  Cpu,
  Router,
  ShieldCheck,
  Server,
  Monitor,
  Keyboard,
  Smartphone,
  Wrench,
  Cloud,
  LifeBuoy,
  Headset,
} from "lucide-react";
import { useState, useEffect, useRef } from "react";
import { cn } from "@/lib/utils";
import { SearchOverlay } from "./search-overlay";
import { CartDrawer } from "./cart-drawer";

const CATEGORIES = [
  { name: "Computers", slug: "computers", icon: Laptop },
  { name: "Components", slug: "components", icon: Cpu },
  { name: "Networking", slug: "networking", icon: Router },
  { name: "Cybersecurity", slug: "cybersecurity", icon: ShieldCheck },
  { name: "Servers & Storage", slug: "servers-storage", icon: Server },
  { name: "Displays", slug: "displays", icon: Monitor },
  { name: "Accessories", slug: "accessories", icon: Keyboard },
  { name: "Gadgets", slug: "gadgets", icon: Smartphone },
];

const SERVICES = [
  { name: "IT Consulting", slug: "it-consulting", icon: Headset },
  { name: "Managed IT", slug: "managed-it", icon: ShieldCheck },
  { name: "Cloud", slug: "cloud", icon: Cloud },
  { name: "Support", slug: "support", icon: LifeBuoy },
];

export function SiteHeader() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [cartCount, setCartCount] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Listen for cart updates
  useEffect(() => {
    const handler = () => {
      const cart = JSON.parse(localStorage.getItem("itology_cart") || "[]");
      setCartCount(cart.reduce((sum: number, item: any) => sum + item.qty, 0));
    };
    handler();
    window.addEventListener("cart:updated", handler);
    return () => window.removeEventListener("cart:updated", handler);
  }, []);

  return (
    <>
      <header
        className={cn(
          "sticky top-0 z-50 transition-all duration-300",
          scrolled
            ? "bg-ink/95 backdrop-blur-md shadow-lg"
            : "bg-ink"
        )}
      >
        {/* Announcement bar */}
        <div className="bg-jade text-ink text-center text-xs font-medium py-1.5 px-4">
          <span>Free shipping on orders over $200 — </span>
          <Link href="/shop" className="underline underline-offset-2 hover:no-underline">
            Shop now
          </Link>
        </div>

        <div className="container-page flex h-16 items-center justify-between gap-4">
          {/* Mobile menu button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden text-text-onDark p-2 -ml-2"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>

          {/* Logo */}
          <Link
            href="/"
            className="font-display text-xl font-bold tracking-tight text-text-onDark shrink-0"
          >
            ITOLOGY
          </Link>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-1 text-sm">
            <div className="group relative">
              <Link
                href="/shop"
                className={cn(
                  "flex items-center gap-1 px-4 py-2 rounded-md transition",
                  pathname?.startsWith("/shop")
                    ? "text-jade-light bg-white/5"
                    : "text-text-onDark/80 hover:text-jade-light hover:bg-white/5"
                )}
              >
                Shop
                <ChevronDown size={14} className="transition-transform group-hover:rotate-180" />
              </Link>
              {/* Mega menu */}
              <div className="absolute top-full left-0 pt-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                <div className="bg-white rounded-lg shadow-floating border border-line p-6 w-[420px] animate-slide-down">
                  <div className="grid grid-cols-2 gap-1">
                    {CATEGORIES.map((cat) => (
                      <Link
                        key={cat.slug}
                        href={`/shop/${cat.slug}`}
                        className="flex items-center gap-3 px-3 py-2.5 rounded-md hover:bg-paper transition group/item"
                      >
                        <cat.icon
                          size={18}
                          className="text-jade shrink-0 group-hover/item:scale-110 transition-transform"
                        />
                        <span className="text-sm text-text-primary">{cat.name}</span>
                      </Link>
                    ))}
                  </div>
                  <div className="mt-4 pt-4 border-t border-line">
                    <Link
                      href="/shop"
                      className="text-sm text-jade-dark font-medium hover:text-jade transition"
                    >
                      View all categories →
                    </Link>
                  </div>
                </div>
              </div>
            </div>

            <div className="group relative">
              <Link
                href="/services"
                className={cn(
                  "flex items-center gap-1 px-4 py-2 rounded-md transition",
                  pathname?.startsWith("/services")
                    ? "text-jade-light bg-white/5"
                    : "text-text-onDark/80 hover:text-jade-light hover:bg-white/5"
                )}
              >
                Services
                <ChevronDown size={14} className="transition-transform group-hover:rotate-180" />
              </Link>
              <div className="absolute top-full left-0 pt-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                <div className="bg-white rounded-lg shadow-floating border border-line p-4 w-[260px] animate-slide-down">
                  {SERVICES.map((svc) => (
                    <Link
                      key={svc.slug}
                      href={`/services/${svc.slug}`}
                      className="flex items-center gap-3 px-3 py-2.5 rounded-md hover:bg-paper transition"
                    >
                      <svc.icon size={18} className="text-jade shrink-0" />
                      <span className="text-sm text-text-primary">{svc.name}</span>
                    </Link>
                  ))}
                </div>
              </div>
            </div>

            <Link
              href="/brands"
              className={cn(
                "px-4 py-2 rounded-md transition",
                pathname?.startsWith("/brands")
                  ? "text-jade-light bg-white/5"
                  : "text-text-onDark/80 hover:text-jade-light hover:bg-white/5"
              )}
            >
              Brands
            </Link>
            <Link
              href="/about"
              className={cn(
                "px-4 py-2 rounded-md transition",
                pathname === "/about"
                  ? "text-jade-light bg-white/5"
                  : "text-text-onDark/80 hover:text-jade-light hover:bg-white/5"
              )}
            >
              About
            </Link>
          </nav>

          {/* Actions */}
          <div className="flex items-center gap-1 sm:gap-3">
            <button
              onClick={() => setSearchOpen(true)}
              className="p-2 text-text-onDark/80 hover:text-jade-light transition rounded-md hover:bg-white/5"
              aria-label="Search"
            >
              <Search size={20} strokeWidth={1.75} />
            </button>
            <Link
              href="/account"
              className="p-2 text-text-onDark/80 hover:text-jade-light transition rounded-md hover:bg-white/5"
              aria-label="Account"
            >
              <User size={20} strokeWidth={1.75} />
            </Link>
            <button
              onClick={() => setCartOpen(true)}
              className="relative p-2 text-text-onDark/80 hover:text-jade-light transition rounded-md hover:bg-white/5"
              aria-label="Cart"
            >
              <ShoppingCart size={20} strokeWidth={1.75} />
              {cartCount > 0 && (
                <span className="absolute -top-0.5 -right-0.5 w-5 h-5 rounded-full bg-jade text-ink text-[10px] font-bold flex items-center justify-center animate-scale-in">
                  {cartCount > 99 ? "99+" : cartCount}
                </span>
              )}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {mobileMenuOpen && (
          <div className="md:hidden border-t border-white/10 bg-ink animate-slide-down">
            <nav className="container-page py-4 space-y-1">
              <Link
                href="/shop"
                onClick={() => setMobileMenuOpen(false)}
                className="block px-4 py-3 text-text-onDark hover:bg-white/5 rounded-md"
              >
                Shop
              </Link>
              <Link
                href="/services"
                onClick={() => setMobileMenuOpen(false)}
                className="block px-4 py-3 text-text-onDark hover:bg-white/5 rounded-md"
              >
                Services
              </Link>
              <Link
                href="/brands"
                onClick={() => setMobileMenuOpen(false)}
                className="block px-4 py-3 text-text-onDark hover:bg-white/5 rounded-md"
              >
                Brands
              </Link>
              <Link
                href="/about"
                onClick={() => setMobileMenuOpen(false)}
                className="block px-4 py-3 text-text-onDark hover:bg-white/5 rounded-md"
              >
                About
              </Link>
              <div className="pt-3 border-t border-white/10 mt-3">
                <p className="px-4 py-2 text-xs text-text-onDark/50 uppercase tracking-wider">
                  Categories
                </p>
                {CATEGORIES.map((cat) => (
                  <Link
                    key={cat.slug}
                    href={`/shop/${cat.slug}`}
                    onClick={() => setMobileMenuOpen(false)}
                    className="flex items-center gap-3 px-4 py-2.5 text-text-onDark/80 hover:bg-white/5 rounded-md"
                  >
                    <cat.icon size={16} className="text-jade" />
                    {cat.name}
                  </Link>
                ))}
              </div>
            </nav>
          </div>
        )}
      </header>

      {/* Search overlay */}
      <SearchOverlay open={searchOpen} onClose={() => setSearchOpen(false)} />

      {/* Cart drawer */}
      <CartDrawer open={cartOpen} onClose={() => setCartOpen(false)} />
    </>
  );
}
