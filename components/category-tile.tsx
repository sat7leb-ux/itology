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
        "group relative flex flex-col items-center justify-center rounded-xl overflow-hidden border border-line bg-ink aspect-square transition-all duration-300 hover:border-jade hover:shadow-card-hover hover:-translate-y-0.5",
        className
      )}
    >
      {/* Background image - full bleed */}
      {image && (
        <div
          className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-110"
          style={{ backgroundImage: `url(${image.url})` }}
        />
      )}

      {/* Gradient overlay - dark with jade tint on hover */}
      <div className="absolute inset-0 bg-gradient-to-t from-ink/90 via-ink/60 to-ink/40 group-hover:from-jade/80 group-hover:via-jade/50 group-hover:to-jade/30 transition-all duration-300" />

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center justify-center gap-2 p-4">
        <div className="w-12 h-12 rounded-xl bg-white/10 backdrop-blur-sm flex items-center justify-center group-hover:bg-jade/30 transition-all duration-300">
          <Icon
            size={22}
            strokeWidth={1.5}
            className="text-white group-hover:text-jade-light transition-colors"
          />
        </div>
        <span className="text-sm font-medium text-white text-center leading-tight drop-shadow-sm">
          {name}
        </span>
      </div>
    </Link>
  );
}
