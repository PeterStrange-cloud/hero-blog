import { CategoryBadge, FreeBadge, PremiumBadge } from "@/components/Badge";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { usePublishedArticles, useUserAccess } from "@/hooks/useQueries";
import { formatTimestampShort } from "@/types";
import type { ArticleCard } from "@/types";
import { useNavigate } from "@tanstack/react-router";
import { ArrowRight, Zap } from "lucide-react";

function ArchiveRow({ article, unlocked }: { article: ArticleCard; unlocked: boolean }) {
  const navigate = useNavigate();
  const goto = () => navigate({ to: "/article/$id", params: { id: String(article.id) } });
  return (
    <div
      className="flex items-center justify-between gap-4 px-4 py-3 bg-card hover:bg-muted/30 cursor-pointer transition-colors duration-200 group"
      onClick={goto}
    >
      <div className="flex items-center gap-3 min-w-0">
        <span className="type-meta text-muted-foreground shrink-0">{formatTimestampShort(article.createdAt)}</span>
        <CategoryBadge category={article.category} />
        {article.isPremium ? <PremiumBadge /> : <FreeBadge />}
        <h3 className="font-display font-semibold text-sm text-foreground truncate group-hover:text-primary transition-colors duration-200">{article.title}</h3>
      </div>
      <div className="shrink-0">
        {article.isPremium && !unlocked ? (
          <Button size="sm" className="btn-primary h-7 px-2 text-xs gap-1" onClick={(e) => { e.stopPropagation(); goto(); }}>
            <Zap className="size-3" />Unlock
          </Button>
        ) : (
          <Button size="sm" className="btn-accent h-7 px-2 text-xs gap-1" onClick={(e) => { e.stopPropagation(); goto(); }}>
            Read<ArrowRight className="size-3" />
          </Button>
        )}
      </div>
    </div>
  );
}

export default function ArchivePage() {
  const { data: articles, isLoading, isError, refetch } = usePublishedArticles();
  const { data: userAccess } = useUserAccess();

  const unlockedSet = new Set<string>();
  if (userAccess) {
    for (const uid of userAccess.unlockedArticleIds) {
      unlockedSet.add(uid.toString());
    }
  }
  const isUnlocked = (a: ArticleCard) =>
    !!userAccess?.isSubscribed || unlockedSet.has(a.id.toString());

  return (
    <div className="min-h-screen bg-background">
      <section className="border-b border-subtle py-16 md:py-20 hero-glow">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="flex flex-col gap-3 max-w-2xl">
            <div className="flex items-center gap-2">
              <div className="h-px w-8 bg-primary" />
              <span className="type-label text-white">ALL ARTICLES</span>
            </div>
            <h1 className="font-display text-5xl md:text-6xl font-bold tracking-tight leading-tight">
              <span className="text-foreground">Archive</span>
            </h1>
          </div>
        </div>
      </section>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-10">
        {isLoading && (
          <div className="flex flex-col gap-2">
            {Array.from({ length: 8 }, (_, i) => (
              <Skeleton key={i} className="h-12 w-full rounded-lg" />
            ))}
          </div>
        )}
        {isError && (
          <p className="type-body text-muted-foreground text-center py-20">
            Failed to load.{" "}
            <button type="button" className="text-primary underline" onClick={() => refetch()}>Try again</button>
          </p>
        )}
        {!isLoading && !isError && articles && articles.length === 0 && (
          <p className="type-body text-muted-foreground text-center py-20">No articles yet.</p>
        )}
        {!isLoading && !isError && articles && articles.length > 0 && (
          <div className="flex flex-col divide-y divide-border border border-border rounded-lg overflow-hidden">
            {articles.map((article) => (
              <ArchiveRow key={String(article.id)} article={article} unlocked={isUnlocked(article)} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
