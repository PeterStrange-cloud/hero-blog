import { cn } from "@/lib/utils";
import { Loader2 } from "lucide-react";

interface LoadingSpinnerProps {
  size?: "sm" | "md" | "lg";
  className?: string;
  label?: string;
}

const sizeMap = {
  sm: "size-4",
  md: "size-6",
  lg: "size-8",
};

export function LoadingSpinner({
  size = "md",
  className,
  label,
}: LoadingSpinnerProps) {
  return (
    <div
      className={cn("flex items-center gap-2", className)}
      aria-label={label ?? "Loading"}
      aria-busy="true"
    >
      <Loader2
        className={cn("animate-spin text-muted-foreground", sizeMap[size])}
      />
      {label && <span className="type-meta">{label}</span>}
      <span className="sr-only">{label ?? "Loading…"}</span>
    </div>
  );
}

interface PageLoadingProps {
  label?: string;
}

export function PageLoading({ label = "Loading…" }: PageLoadingProps) {
  return (
    <div
      className="flex flex-col items-center justify-center py-24 gap-4"
      data-ocid="page.loading_state"
      aria-busy="true"
      aria-label={label}
    >
      <Loader2 className="size-8 animate-spin text-muted-foreground" />
      <p className="type-meta text-muted-foreground">{label}</p>
    </div>
  );
}

/** Skeleton line for text placeholders */
export function SkeletonLine({ className }: { className?: string }) {
  return (
    <div
      className={cn("h-4 rounded bg-muted animate-pulse", className)}
      aria-hidden="true"
    />
  );
}

/** Card skeleton for article grid loading states */
export function ArticleCardSkeleton() {
  return (
    <div
      className="flex flex-col gap-3 rounded-lg border border-border bg-card overflow-hidden"
      aria-hidden="true"
    >
      <div className="aspect-[16/9] bg-muted animate-pulse" />
      <div className="p-4 flex flex-col gap-2">
        <SkeletonLine className="w-16" />
        <SkeletonLine className="w-full" />
        <SkeletonLine className="w-4/5" />
        <SkeletonLine className="w-2/3" />
        <div className="flex gap-2 mt-2">
          <SkeletonLine className="w-12 h-3" />
          <SkeletonLine className="w-20 h-3" />
        </div>
      </div>
    </div>
  );
}
