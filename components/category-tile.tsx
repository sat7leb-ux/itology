import Link from "next/link";
import type { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { getCategoryImage } from "@/lib/category-images";

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
  const image = getCategoryImage(slug);

  return (
    <Link
      href={`/shop/${slug}`}
      className={cn(
        "group relative flex flex-col items-center justify-center rounded-xl overflow-hidden border border-line bg-white aspect-square transition-all duration-300 hover:border-jade hover:shadow-card-hover hover:-translate-y-0.5",
        className
      )}
    >
      {/* Background image */}
      {image && (
        <div
          className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-110"
          style={{ backgroundImage: `url(${image.url})` }}
        />
      )}

      {/* Dark overlay for readability */}
      <div className="absolute inset-0 bg-ink/60 group-hover:bg-ink/70 transition-colors duration-300" />

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center justify-center gap-2 p-4">
        <div className="w-12 h-12 rounded-xl bg-jade/20 backdrop-blur-sm flex items-center justify-center group-hover:bg-jade/40 transition-all duration-300">
          <Icon
            size={22}
            strokeWidth={1.5}
            className="text-jade-light group-hover:text-white transition-colors"
          />
        </div>
        <span className="text-sm font-medium text-white text-center leading-tight drop-shadow-sm">
          {name}
        </span>
      </div>
    </Link>
  );
}
