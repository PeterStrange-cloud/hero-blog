import { cn } from "@/lib/utils";
import { Lock, Sparkles } from "lucide-react";

type BadgeVariant =
  | "free"
  | "premium"
  | "category"
  | "draft"
  | "published"
  | "tag";

interface BadgeProps {
  variant?: BadgeVariant;
  children: React.ReactNode;
  className?: string;
}

const variantStyles: Record<BadgeVariant, string> = {
  free: "badge-live",
  premium: "badge-premium",
  category: "bg-sunken text-muted border-subtle px-2 py-0.5 rounded border type-label text-[10px] inline-flex items-center",
  draft: "bg-sunken text-muted border-subtle px-2 py-0.5 rounded border type-label text-[10px] inline-flex items-center",
  published: "badge-live",
  tag: "bg-sunken text-muted border-subtle px-2 py-0.5 rounded border type-label text-[10px] inline-flex items-center",
};

export function Badge({
  variant = "category",
  children,
  className,
}: BadgeProps) {
  return (
    <span
      className={cn(variantStyles[variant], className)}
    >
      {children}
    </span>
  );
}

export function PremiumBadge({ className }: { className?: string }) {
  return (
    <Badge variant="premium" className={className}>
      <Sparkles className="size-2.5" />
      PREMIUM
    </Badge>
  );
}

export function FreeBadge({ className }: { className?: string }) {
  return (
    <Badge variant="free" className={className}>
      FREE
    </Badge>
  );
}

export function CategoryBadge({
  category,
  className,
}: {
  category: string;
  className?: string;
}) {
  return (
    <Badge variant="category" className={className}>
      {category.toUpperCase()}
    </Badge>
  );
}

export function TagBadge({
  tag,
  className,
}: { tag: string; className?: string }) {
  return (
    <Badge variant="tag" className={className}>
      #{tag}
    </Badge>
  );
}

/** Overlay lock icon shown on premium card thumbnails */
export function PremiumLockOverlay({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "absolute inset-0 flex flex-col items-center justify-center gap-2",
        "bg-background/60 backdrop-blur-sm",
        className,
      )}
    >
      <div className="p-2 rounded-full bg-primary/10 border border-primary/30">
        <Lock className="size-5 text-primary" />
      </div>
      <span className="type-label text-primary text-[10px]">PREMIUM</span>
    </div>
  );
}

export function DraftBadge({ className }: { className?: string }) {
  return (
    <Badge variant="draft" className={className}>
      DRAFT
    </Badge>
  );
}

export function PublishedBadge({ className }: { className?: string }) {
  return (
    <Badge variant="published" className={className}>
      PUBLISHED
    </Badge>
  );
}
