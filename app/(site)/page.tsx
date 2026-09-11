import Link from "next/link";
import Image from "next/image";
import {
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
  ArrowRight,
  Truck,
  ShieldCheck as ShieldIcon,
  Clock,
  Star,
  Zap,
  TrendingUp,
  ChevronRight,
} from "lucide-react";
import { CategoryTile } from "@/components/category-tile";
import { ProductCard } from "@/components/product-card";
import { getFeaturedCategories, getFeaturedProducts, getServices } from "@/lib/data";

const CATEGORY_ICONS: Record<string, typeof Laptop> = {
  computers: Laptop,
  components: Cpu,
  networking: Router,
  cybersecurity: ShieldCheck,
  "servers-storage": Server,
  displays: Monitor,
  accessories: Keyboard,
  gadgets: Smartphone,
};

const SERVICE_ICONS: Record<string, typeof Cloud> = {
  "it-consulting": Headset,
  "managed-it": ShieldIcon,
  cloud: Cloud,
  support: LifeBuoy,
};

async function safe<T>(fn: () => Promise<T[]>): Promise<T[]> {
  try {
    return await fn();
  } catch {
    return [];
  }
}

export default async function HomePage() {
  const [categories, products, services] = await Promise.all([
    safe(getFeaturedCategories),
    safe(getFeaturedProducts),
    safe(getServices),
  ]);

  return (
    <>
      {/* Hero - Editorial style with split layout */}
      <section className="relative bg-ink text-text-onDark overflow-hidden">
        {/* Background pattern */}
        <div className="absolute inset-0 opacity-[0.03]">
          <div className="absolute inset-0" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }} />
        </div>

        <div className="container-page relative">
          <div className="grid gap-12 py-16 lg:grid-cols-2 lg:py-24 lg:items-center">
            {/* Left content */}
            <div className="relative z-10">
              {/* Eyebrow */}
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-jade/10 border border-jade/20 text-jade-light text-xs font-medium mb-6">
                <Zap size={12} />
                New: Enterprise server solutions
              </div>

              <h1 className="font-display text-4xl font-bold leading-[1.1] tracking-tight sm:text-5xl lg:text-6xl text-balance">
                Technology infrastructure,{" "}
                <span className="text-jade-light">sourced and supported</span> in one place.
              </h1>

              <p className="mt-6 max-w-[50ch] text-text-onDark/70 text-lg leading-relaxed">
                ITOLOGY supplies the hardware your business runs on and the IT
                expertise to install, secure, and maintain it — from a single
                laptop to a full network build-out.
              </p>

              <div className="mt-8 flex flex-wrap gap-4">
                <Link
                  href="/shop"
                  className="inline-flex items-center gap-2 rounded-md bg-jade px-7 py-3.5 text-sm font-semibold text-ink transition-all hover:bg-jade-light hover:shadow-glow active:scale-[0.98]"
                >
                  Shop hardware
                  <ArrowRight size={16} />
                </Link>
                <Link
                  href="/services"
                  className="inline-flex items-center gap-2 rounded-md border border-white/20 px-7 py-3.5 text-sm font-semibold transition-all hover:border-jade-light hover:text-jade-light hover:bg-white/5"
                >
                  Explore IT services
                </Link>
              </div>

              {/* Trust indicators */}
              <div className="mt-10 flex flex-wrap items-center gap-6 text-sm text-text-onDark/60">
                <span className="flex items-center gap-2">
                  <Truck size={16} className="text-jade-light" />
                  Free shipping $200+
                </span>
                <span className="flex items-center gap-2">
                  <ShieldIcon size={16} className="text-jade-light" />
                  2-year warranty
                </span>
                <span className="flex items-center gap-2">
                  <Clock size={16} className="text-jade-light" />
                  24/7 support
                </span>
              </div>
            </div>

            {/* Right visual - Product showcase */}
            <div className="relative hidden lg:block">
              <div className="relative aspect-[4/3] rounded-2xl overflow-hidden border border-white/10 bg-gradient-to-br from-white/[0.08] to-white/[0.02]">
                {/* Decorative grid */}
                <div className="absolute inset-0 grid grid-cols-2 gap-4 p-6">
                  <div className="rounded-xl bg-white/[0.06] border border-white/10 flex items-center justify-center group/card transition-all hover:bg-white/[0.1] hover:border-jade/30">
                    <Laptop size={48} className="text-jade-light/60 group-hover/card:text-jade-light transition-colors" />
                  </div>
                  <div className="rounded-xl bg-white/[0.06] border border-white/10 flex items-center justify-center mt-6 group/card transition-all hover:bg-white/[0.1] hover:border-jade/30">
                    <Server size={48} className="text-jade-light/60 group-hover/card:text-jade-light transition-colors" />
                  </div>
                  <div className="rounded-xl bg-white/[0.06] border border-white/10 flex items-center justify-center -mt-6 group/card transition-all hover:bg-white/[0.1] hover:border-jade/30">
                    <Router size={48} className="text-jade-light/60 group-hover/card:text-jade-light transition-colors" />
                  </div>
                  <div className="rounded-xl bg-white/[0.06] border border-white/10 flex items-center justify-center group/card transition-all hover:bg-white/[0.1] hover:border-jade/30">
                    <ShieldCheck size={48} className="text-jade-light/60 group-hover/card:text-jade-light transition-colors" />
                  </div>
                </div>

                {/* Floating badge */}
                <div className="absolute bottom-6 left-6 right-6 bg-white/10 backdrop-blur-md rounded-xl p-4 border border-white/10">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-jade/20 flex items-center justify-center">
                      <TrendingUp size={20} className="text-jade-light" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-text-onDark">Trusted by 500+ businesses</p>
                      <p className="text-xs text-text-onDark/60">Across Lebanon and the Middle East</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured categories - horizontal scroll */}
      <section className="py-16 bg-white border-b border-line">
        <div className="container-page">
          <div className="flex items-end justify-between mb-8">
            <div>
              <h2 className="text-2xl font-bold text-text-primary">Shop by category</h2>
              <p className="mt-1 text-text-muted">Find exactly what you need</p>
            </div>
            <Link
              href="/shop"
              className="hidden sm:flex items-center gap-1 text-sm text-jade-dark font-medium hover:text-jade transition"
            >
              View all
              <ChevronRight size={16} />
            </Link>
          </div>

          <div className="grid grid-cols-2 gap-4 sm:grid-cols-4 lg:grid-cols-8">
            {(categories.length ? categories : PLACEHOLDER_CATEGORIES).map((cat) => (
              <CategoryTile
                key={cat.slug}
                name={cat.name}
                slug={cat.slug}
                icon={CATEGORY_ICONS[cat.slug] ?? Laptop}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Featured products - editorial grid */}
      {products.length > 0 && (
        <section className="py-16">
          <div className="container-page">
            <div className="flex items-end justify-between mb-8">
              <div>
                <h2 className="text-2xl font-bold text-text-primary">Featured products</h2>
                <p className="mt-1 text-text-muted">Hand-picked by our team</p>
              </div>
              <Link
                href="/shop"
                className="hidden sm:flex items-center gap-1 text-sm text-jade-dark font-medium hover:text-jade transition"
              >
                View all
                <ChevronRight size={16} />
              </Link>
            </div>

            <div className="grid grid-cols-2 gap-4 sm:gap-6 lg:grid-cols-4">
              {products.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  categorySlug={product.category?.slug ?? "shop"}
                />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Editorial banner - Why ITOLOGY */}
      <section className="py-16 bg-ink text-text-onDark">
        <div className="container-page">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="text-3xl font-bold">Why businesses choose ITOLOGY</h2>
            <p className="mt-3 text-text-onDark/70">
              More than a supplier — we&apos;re your technology partner
            </p>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {WHY_ITOLOGY.map((item, i) => (
              <div
                key={item.title}
                className="group relative p-6 rounded-xl bg-white/[0.05] border border-white/10 hover:bg-white/[0.08] hover:border-jade/30 transition-all duration-300"
              >
                <div className="w-12 h-12 rounded-lg bg-jade/10 flex items-center justify-center mb-4 group-hover:bg-jade/20 transition-colors">
                  <item.icon size={24} className="text-jade-light" />
                </div>
                <h3 className="font-display text-lg font-semibold mb-2">{item.title}</h3>
                <p className="text-sm text-text-onDark/60 leading-relaxed">{item.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* IT Services */}
      <section className="py-16 bg-white border-y border-line">
        <div className="container-page">
          <div className="flex items-end justify-between mb-8">
            <div>
              <h2 className="text-2xl font-bold text-text-primary">IT services</h2>
              <p className="mt-1 text-text-muted">Hardware is half the job. We install, secure, and support.</p>
            </div>
            <Link
              href="/services"
              className="hidden sm:flex items-center gap-1 text-sm text-jade-dark font-medium hover:text-jade transition"
            >
              All services
              <ChevronRight size={16} />
            </Link>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {(services.length ? services : PLACEHOLDER_SERVICES).map((service) => {
              const Icon = SERVICE_ICONS[service.slug] ?? Headset;
              return (
                <Link
                  key={service.slug}
                  href={`/services/${service.slug}`}
                  className="group flex items-start gap-4 p-5 rounded-xl border border-line bg-paper/50 hover:border-jade hover:bg-white hover:shadow-card-hover transition-all duration-300"
                >
                  <div className="w-11 h-11 rounded-lg bg-jade/10 flex items-center justify-center shrink-0 group-hover:bg-jade group-hover:text-white transition-all">
                    <Icon size={20} className="text-jade group-hover:text-white transition-colors" />
                  </div>
                  <div>
                    <p className="font-semibold text-text-primary group-hover:text-jade transition-colors">
                      {service.name}
                    </p>
                    <p className="mt-1 text-sm text-text-muted line-clamp-2">
                      {service.description}
                    </p>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* Testimonials / Social proof */}
      <section className="py-16">
        <div className="container-page">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <h2 className="text-2xl font-bold text-text-primary">What our customers say</h2>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {TESTIMONIALS.map((t, i) => (
              <div key={i} className="p-6 rounded-xl bg-white border border-line shadow-card">
                <div className="flex items-center gap-1 mb-3">
                  {[1, 2, 3, 4, 5].map((s) => (
                    <Star key={s} size={14} className="fill-amber text-amber" />
                  ))}
                </div>
                <p className="text-sm text-text-primary leading-relaxed mb-4">
                  &ldquo;{t.text}&rdquo;
                </p>
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full bg-jade/10 flex items-center justify-center">
                    <span className="text-sm font-semibold text-jade-dark">
                      {t.name[0]}
                    </span>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-text-primary">{t.name}</p>
                    <p className="text-xs text-text-muted">{t.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="bg-jade text-ink">
        <div className="container-page py-16">
          <div className="flex flex-col items-start gap-6 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h2 className="text-2xl font-bold max-w-[28ch]">
                Talk to us before your next infrastructure purchase.
              </h2>
              <p className="mt-2 text-ink/70">
                Our engineers can help you spec the right solution.
              </p>
            </div>
            <Link
              href="/contact"
              className="shrink-0 inline-flex items-center gap-2 rounded-md bg-ink px-7 py-3.5 text-sm font-semibold text-text-onDark transition hover:bg-ink/90 active:scale-[0.98]"
            >
              Contact sales
              <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}

const WHY_ITOLOGY = [
  {
    icon: ShieldCheck,
    title: "Vetted hardware",
    body: "Every product is sourced from authorized distributors with full manufacturer warranty.",
  },
  {
    icon: Headset,
    title: "Engineers, not just sales",
    body: "The people who spec your order are the same ones who can install and support it.",
  },
  {
    icon: ShieldIcon,
    title: "Security-first",
    body: "Every network and cloud engagement is scoped with security as a requirement, not an add-on.",
  },
  {
    icon: Clock,
    title: "Fast response",
    body: "Support requests are triaged by engineers, not a ticket queue that goes nowhere.",
  },
];

const TESTIMONIALS = [
  {
    name: "Sarah Khachane",
    role: "IT Director, TechCorp",
    text: "ITOLOGY transformed our infrastructure deployment. Their team didn't just sell us hardware — they architected a complete solution that scaled with our growth.",
  },
  {
    name: "Michael Saad",
    role: "CTO, StartupHub",
    text: "The support is exceptional. When we had a critical server issue at 2 AM, their engineer had us back online within an hour. That's the kind of partner you need.",
  },
  {
    name: "Rita Haddad",
    role: "Operations Manager, DataFlow",
    text: "We've tried other suppliers, but ITOLOGY's combination of product knowledge, competitive pricing, and after-sales support is unmatched in the region.",
  },
];

const PLACEHOLDER_CATEGORIES = [
  { slug: "computers", name: "Computers" },
  { slug: "components", name: "Components" },
  { slug: "networking", name: "Networking" },
  { slug: "cybersecurity", name: "Cybersecurity" },
  { slug: "servers-storage", name: "Servers & Storage" },
  { slug: "displays", name: "Displays" },
  { slug: "accessories", name: "Accessories" },
  { slug: "gadgets", name: "Gadgets" },
];

const PLACEHOLDER_SERVICES = [
  { slug: "it-consulting", name: "IT Consulting", description: "Architecture and roadmap planning for growing infrastructure." },
  { slug: "managed-it", name: "Managed IT", description: "Ongoing monitoring, maintenance, and support." },
  { slug: "cloud", name: "Cloud", description: "Migration, backup, and cloud infrastructure management." },
  { slug: "support", name: "Support", description: "Direct line to engineers when something breaks." },
];
