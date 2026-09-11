import Link from "next/link";

const LINKS = [
  { href: "/account/orders", label: "Orders", description: "Track and review past orders" },
  { href: "/account/wishlist", label: "Wishlist", description: "Products you've saved" },
  { href: "/account/addresses", label: "Addresses", description: "Manage shipping addresses" },
];

export default function AccountPage() {
  return (
    <div className="container-page py-14">
      <h1 className="text-3xl font-semibold">Account</h1>
      <p className="mt-2 text-text-muted">Sign in to manage your orders, wishlist, and addresses.</p>

      <div className="mt-10 grid gap-6 sm:grid-cols-3">
        {LINKS.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className="rounded-md border border-line bg-white p-6 transition hover:border-jade"
          >
            <p className="text-sm font-medium">{link.label}</p>
            <p className="mt-1.5 text-xs text-text-muted">{link.description}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
