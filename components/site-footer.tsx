"use client";

import Link from "next/link";
import { Mail, Phone, MapPin, ArrowRight, Facebook, Twitter, Linkedin, Instagram } from "lucide-react";
import { useState } from "react";

const COLUMNS = [
  {
    heading: "Shop",
    links: [
      { label: "Computers", href: "/shop/computers" },
      { label: "Networking", href: "/shop/networking" },
      { label: "Cybersecurity", href: "/shop/cybersecurity" },
      { label: "Servers & Storage", href: "/shop/servers-storage" },
      { label: "All Products", href: "/shop" },
    ],
  },
  {
    heading: "Services",
    links: [
      { label: "IT Consulting", href: "/services/it-consulting" },
      { label: "Managed IT", href: "/services/managed-it" },
      { label: "Cloud Solutions", href: "/services/cloud" },
      { label: "Support", href: "/services/support" },
    ],
  },
  {
    heading: "Company",
    links: [
      { label: "About ITOLOGY", href: "/about" },
      { label: "Contact", href: "/contact" },
      { label: "Careers", href: "/careers" },
      { label: "Blog", href: "/blog" },
    ],
  },
  {
    heading: "Support",
    links: [
      { label: "Help Center", href: "/help" },
      { label: "Shipping Info", href: "/shipping" },
      { label: "Returns", href: "/returns" },
      { label: "Warranty", href: "/warranty" },
    ],
  },
];

export function SiteFooter() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      setSubscribed(true);
      setEmail("");
    }
  };

  return (
    <footer className="bg-ink text-text-onDark">
      {/* Newsletter section */}
      <div className="border-b border-white/10">
        <div className="container-page py-12">
          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
            <div>
              <h3 className="font-display text-xl font-semibold">Stay in the loop</h3>
              <p className="mt-1 text-sm text-text-onDark/60">
                Get product drops, deals, and tech insights delivered to your inbox.
              </p>
            </div>
            {subscribed ? (
              <p className="text-jade-light font-medium">Thanks for subscribing!</p>
            ) : (
              <form className="flex w-full max-w-md gap-2" onSubmit={handleSubscribe}>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  className="flex-1 px-4 py-2.5 rounded-md bg-white/10 border border-white/10 text-sm text-text-onDark placeholder:text-text-onDark/40 focus:outline-none focus:border-jade transition"
                />
                <button
                  type="submit"
                  className="px-5 py-2.5 rounded-md bg-jade text-ink text-sm font-semibold hover:bg-jade-light transition flex items-center gap-1.5"
                >
                  Subscribe
                  <ArrowRight size={14} />
                </button>
              </form>
            )}
          </div>
        </div>
      </div>

      {/* Main footer */}
      <div className="container-page py-12">
        <div className="grid gap-10 lg:grid-cols-6">
          {/* Brand column */}
          <div className="lg:col-span-2">
            <p className="font-display text-xl font-bold">ITOLOGY</p>
            <p className="mt-3 text-sm text-text-onDark/60 max-w-[28ch] leading-relaxed">
              Technology hardware and IT expertise from a single trusted source. Your infrastructure partner.
            </p>

            {/* Contact info */}
            <div className="mt-6 space-y-3">
              <a href="mailto:eliekhachane@gmail.com" className="flex items-center gap-2.5 text-sm text-text-onDark/60 hover:text-jade-light transition">
                <Mail size={15} />
                eliekhachane@gmail.com
              </a>
              <a href="tel:+96176784433" className="flex items-center gap-2.5 text-sm text-text-onDark/60 hover:text-jade-light transition">
                <Phone size={15} />
                +961 76 784 433
              </a>
              <p className="flex items-center gap-2.5 text-sm text-text-onDark/60">
                <MapPin size={15} />
                Lebanon, Middle East
              </p>
            </div>

            {/* Social links */}
            <div className="flex items-center gap-3 mt-6">
              {[Facebook, Twitter, Linkedin, Instagram].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  className="w-9 h-9 rounded-lg bg-white/5 flex items-center justify-center text-text-onDark/60 hover:bg-jade hover:text-ink transition-all"
                >
                  <Icon size={16} />
                </a>
              ))}
            </div>
          </div>

          {/* Link columns */}
          {COLUMNS.map((col) => (
            <div key={col.heading}>
              <p className="text-sm font-semibold text-text-onDark/90 mb-4">{col.heading}</p>
              <ul className="space-y-2.5">
                {col.links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm text-text-onDark/55 hover:text-jade-light transition"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/10">
        <div className="container-page py-5 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-text-onDark/40">
          <p>&copy; {new Date().getFullYear()} ITOLOGY. All rights reserved.</p>
          <div className="flex items-center gap-5">
            <Link href="/privacy" className="hover:text-jade-light transition">Privacy Policy</Link>
            <Link href="/terms" className="hover:text-jade-light transition">Terms of Service</Link>
            <Link href="/cookies" className="hover:text-jade-light transition">Cookie Policy</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
