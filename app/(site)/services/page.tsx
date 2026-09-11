import Link from "next/link";
import { Headset, ShieldCheck, Cloud, LifeBuoy } from "lucide-react";
import { getServices } from "@/lib/data";

export const metadata = { title: "IT Services" };

const ICONS: Record<string, typeof Headset> = {
  "it-consulting": Headset,
  "managed-it": ShieldCheck,
  cloud: Cloud,
  support: LifeBuoy,
};

const PLACEHOLDER = [
  { slug: "it-consulting", name: "IT Consulting", description: "Architecture and roadmap planning for growing infrastructure." },
  { slug: "managed-it", name: "Managed IT", description: "Ongoing monitoring, maintenance, and support for your environment." },
  { slug: "cybersecurity", name: "Cybersecurity", description: "Endpoint, network, and backup security built around your risk profile." },
  { slug: "networking", name: "Network Installation", description: "Structured cabling, wireless, and network hardware deployment." },
  { slug: "cloud", name: "Cloud", description: "Migration, backup, and cloud infrastructure management." },
  { slug: "support", name: "Support", description: "Direct line to engineers when something breaks." },
];

export default async function ServicesPage() {
  const services = await getServices().catch(() => []);
  const list = services.length ? services : PLACEHOLDER;

  return (
    <div className="container-page py-14">
      <h1 className="text-3xl font-semibold">IT Services</h1>
      <p className="mt-2 max-w-prose text-text-muted">
        The people who spec your hardware are the same ones who install,
        secure, and support it.
      </p>

      <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {list.map((service) => {
          const Icon = ICONS[service.slug] ?? Headset;
          return (
            <Link
              key={service.slug}
              href={`/services/${service.slug}`}
              className="rounded-md border border-line bg-white p-6 transition hover:border-jade"
            >
              <Icon size={22} strokeWidth={1.5} className="text-jade" />
              <p className="mt-5 text-base font-medium">{service.name}</p>
              <p className="mt-2 text-sm text-text-muted">{service.description}</p>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
