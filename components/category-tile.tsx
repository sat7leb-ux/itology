import Link from "next/link";
import type { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

export function CategoryTile({
  name,
  slug,
  icon: Icon,
  className,
}: {
  name: string;
  slug: string;
  icon: LucideIcon;
  className?: string;
}) {
  return (
    <Link
      href={`/shop/${slug}`}
      className={cn(
        "group flex flex-col items-center justify-center gap-3 rounded-xl border border-line bg-white p-4 sm:p-5 transition-all duration-300 hover:border-jade hover:shadow-card-hover hover:-translate-y-0.5",
        className
      )}
    >
      <div className="w-12 h-12 rounded-xl bg-jade/10 flex items-center justify-center group-hover:bg-jade group-hover:text-white transition-all duration-300">
        <Icon
          size={22}
          strokeWidth={1.5}
          className="text-jade group-hover:text-white transition-colors"
        />
      </div>
      <span className="text-xs sm:text-sm font-medium text-text-primary text-center leading-tight">
        {name}
      </span>
    </Link>
  );
}
