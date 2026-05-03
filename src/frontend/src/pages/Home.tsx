import { CategoryBadge, FreeBadge, PremiumBadge } from "@/components/Badge";
import { EmptyState } from "@/components/ErrorMessage";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { usePublishedArticles, useUserAccess } from "@/hooks/useQueries";
import { formatTimestampShort } from "@/types";
import type { ArticleCard } from "@/types";
import { useLocation, useNavigate } from "@tanstack/react-router";
import { ArrowRight, BookOpen, Lock, Zap } from "lucide-react";
import { motion } from "motion/react";

// ─── Cover image helper ───────────────────────────────────────────────────────

const GRADIENT_PALETTE = [
  "from-primary/30 via-background to-muted",
  "from-muted via-card to-primary/20",
  "from-secondary via-muted to-primary/15",
  "from-primary/20 via-muted to-secondary",
  "from-card via-primary/10 to-muted",
  "from-muted/80 via-card to-primary/25",
];

function getGradient(id: bigint) {
  return GRADIENT_PALETTE[Number(id) % GRADIENT_PALETTE.length];
}
// ─── Latest YouTube Video Panel ──────────────────────────────────────────────
// Update LATEST_VIDEO_ID when Fabio posts a new video
const LATEST_VIDEO_ID = "VdI99jtbGwo";

function LatestVideoPanel() {
  return (
    <div style={{ flexBasis: '35%', minWidth: '280px' }}>
      <p className="text-xs font-semibold uppercase tracking-widest mb-2" style={{ color: 'oklch(0.62 0.20 145)' }}>Latest Video</p>
      <div style={{ border: '1px solid oklch(0.62 0.20 145 / 0.4)', borderRadius: '8px', overflow: 'hidden', position: 'relative', paddingBottom: '56.25%' }}>
        <iframe
          src={`https://www.youtube.com/embed/${LATEST_VIDEO_ID}`}
          style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', border: 'none' }}
          title="Latest Video"
          allowFullScreen
        />
      </div>
    </div>
  );
}
// ─── Featured hero card ───────────────────────────────────────────────────────

function FeaturedCard({ article, unlocked }: { article: ArticleCard; unlocked: boolean }) {
  const navigate = useNavigate();
  const goto = () =>
    navigate({ to: "/article/$id", params: { id: String(article.id) } });

  const imageUrl = article.coverImage
    ? article.coverImage.getDirectURL()
    : null;

  return (
    <motion.article
      className="card-red relative w-full overflow-hidden cursor-pointer group transition-smooth"
      style={{ minHeight: 420 }}
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      onClick={goto}
      data-ocid="featured.card"
    >
      {/* Background image / gradient */}
      <div className="absolute inset-0">
        {imageUrl ? (
          <img
            src={imageUrl}
            alt={article.title}
            className="w-full h-full object-cover transition-smooth group-hover:scale-105"
          />
        ) : (
          <div
            className={`w-full h-full bg-gradient-to-br ${getGradient(article.id)} transition-smooth group-hover:opacity-90`}
          />
        )}
        {/* dark overlay for text legibility */}
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/85 to-background/30" />
      </div>

      {/* Lock icon for premium */}
      {article.isPremium && (
        <div className="absolute top-4 right-4 z-10 p-1.5 rounded-full bg-background/70 backdrop-blur-sm border border-primary/30">
          <Lock className="size-4 text-primary" />
        </div>
      )}

      {/* Content overlay */}
      <div
        className="relative z-10 flex flex-col justify-end h-full p-6 md:p-10 gap-4"
        style={{ minHeight: 420 }}
      >
        <div className="flex items-center gap-2 flex-wrap">
          <CategoryBadge category={article.category} />
          {article.isPremium ? <PremiumBadge /> : <FreeBadge />}
        </div>

        <h1
          className="font-display text-2xl md:text-4xl font-bold leading-tight text-foreground max-w-2xl"
          style={{ textShadow: "0 2px 12px oklch(0.16 0.020 50 / 0.9), 0 1px 4px oklch(0.16 0.020 50 / 0.9)" }}
        >
          {article.title}
        </h1>

        <p className="type-body-lg text-muted-foreground max-w-xl line-clamp-2 hidden sm:block">
          {article.excerpt}
        </p>

        <div className="flex items-center gap-4 mt-1">
          <span className="type-meta">
            {formatTimestampShort(article.createdAt)}
          </span>
          {article.tags.length > 0 && (
            <span className="type-meta opacity-60">
              {article.tags.slice(0, 2).join(" · ")}
            </span>
          )}
        </div>

        <div className="flex items-center gap-3">
          {article.isPremium && !unlocked ? (
            <Button
              variant="default"
              className="btn-primary gap-2 font-semibold"
              onClick={(e) => {
                e.stopPropagation();
                goto();
              }}
              data-ocid="featured.unlock_button"
            >
              <Zap className="size-4" />
              Unlock with HERO
            </Button>
          ) : (
            <Button
              className="btn-accent gap-2 font-semibold"
              onClick={(e) => {
                e.stopPropagation();
                goto();
              }}
              data-ocid="featured.read_button"
            >
              <BookOpen className="size-4" />
              Read Article
              <ArrowRight className="size-4 ml-1" />
            </Button>
          )}
        </div>
      </div>
    </motion.article>
  );
}

// ─── Regular article card ──────────────────────────────────────────────────────

function ArticleGridCard({
  article,
  index,
  unlocked,
}: { article: ArticleCard; index: number; unlocked: boolean }) {
  const navigate = useNavigate();
  const goto = () =>
    navigate({ to: "/article/$id", params: { id: String(article.id) } });

  const imageUrl = article.coverImage
    ? article.coverImage.getDirectURL()
    : null;

  return (
    <motion.article
      className="flex flex-col overflow-hidden rounded-lg border border-border bg-card cursor-pointer group transition-smooth  hover:-translate-y-0.5"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay: index * 0.07, ease: "easeOut" }}
      onClick={goto}
      data-ocid={`article.item.${index + 1}`}
    >
      {/* Cover */}
      <div className="relative aspect-[16/9] overflow-hidden bg-muted">
        {imageUrl ? (
          <img
            src={imageUrl}
            alt={article.title}
            className="w-full h-full object-cover transition-smooth group-hover:scale-105"
          />
        ) : (
          <div
            className={`w-full h-full bg-gradient-to-br ${getGradient(article.id)}`}
          />
        )}
        {article.isPremium && (
          <div className="absolute inset-0 bg-background/40 backdrop-blur-[2px] flex items-center justify-center opacity-0 group-hover:opacity-100 transition-smooth">
            <div className="p-2 rounded-full bg-primary/15 border border-primary/40">
              <Lock className="size-5 text-primary" />
            </div>
          </div>
        )}
      </div>

      {/* Body */}
      <div className="flex flex-col flex-1 p-4 gap-3">
        <div className="flex items-center gap-2 flex-wrap">
          <CategoryBadge category={article.category} />
          {article.isPremium ? <PremiumBadge /> : <FreeBadge />}
        </div>

        <div className="flex-1 min-w-0">
          <h2 className="font-display font-bold text-base leading-snug text-foreground line-clamp-2 group-hover:text-primary transition-colors duration-200">
            {article.title}
          </h2>
          <p className="type-body text-muted-foreground line-clamp-2 mt-1.5 leading-relaxed">
            {article.excerpt}
          </p>
        </div>

        <div className="flex items-center justify-between gap-2 pt-2 border-t border-border/50">
          <span className="type-meta">
            {formatTimestampShort(article.createdAt)}
          </span>
          {article.isPremium && !unlocked ? (
            <Button
              size="sm"
              className="btn-primary h-8 px-3 text-xs gap-1.5 shrink-0"
              onClick={(e) => {
                e.stopPropagation();
                goto();
              }}
              data-ocid={`article.unlock_button.${index + 1}`}
            >
              <Zap className="size-3" />
              Unlock with HERO
            </Button>
          ) : (
            <Button
              size="sm"
              className="btn-accent h-8 px-3 text-xs gap-1.5 shrink-0"
              onClick={(e) => {
                e.stopPropagation();
                goto();
              }}
              data-ocid={`article.read_button.${index + 1}`}
            >
              Read Article
              <ArrowRight className="size-3" />
            </Button>
          )}
        </div>
      </div>
    </motion.article>
  );
}

// ─── Skeleton states ──────────────────────────────────────────────────────────

function FeaturedSkeleton() {
  return (
    <div
      className="w-full rounded-lg border border-border bg-card overflow-hidden"
      data-ocid="home.loading_state"
    >
      <Skeleton className="w-full" style={{ minHeight: 420 }} />
    </div>
  );
}

function GridSkeleton() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
      {Array.from({ length: 6 }, (_, i) => i).map((i) => (
        <div
          key={`skeleton-${i}`}
          className="flex flex-col rounded-lg border border-border bg-card overflow-hidden"
        >
          <Skeleton className="aspect-[16/9] w-full" />
          <div className="p-4 flex flex-col gap-3">
            <div className="flex gap-2">
              <Skeleton className="h-4 w-16 rounded" />
              <Skeleton className="h-4 w-12 rounded" />
            </div>
            <Skeleton className="h-5 w-full rounded" />
            <Skeleton className="h-4 w-4/5 rounded" />
            <div className="flex justify-between mt-1">
              <Skeleton className="h-3 w-20 rounded" />
              <Skeleton className="h-7 w-28 rounded" />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}


// ─── Archive row ──────────────────────────────────────────────────────────────

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

// ─── Home page ─────────────────────────────────────────────────────────────────

export default function HomePage() {
  const {
    data: articles,
    isLoading,
    isFetching,
    isError,
    refetch,
    failureCount,
  } = usePublishedArticles();

  // Show skeleton while loading OR while auto-retrying (failureCount > 0 but still under 3)
  const showSkeleton =
    isLoading || (isFetching && !articles && failureCount < 3);

  const { data: userAccess } = useUserAccess();
  const unlockedSet = new Set<string>();
  if (userAccess) {
    for (const uid of userAccess.unlockedArticleIds) {
      unlockedSet.add(uid.toString());
    }
  }
  const isUnlocked = (a: ArticleCard) =>
    !!userAccess?.isSubscribed || unlockedSet.has(a.id.toString());

  const location = useLocation();
  const rawSearch = new URLSearchParams(location.searchStr ?? "").get("search") ?? "";
  const searchTerm = rawSearch.toLowerCase().trim();

  const filteredArticles = searchTerm
    ? (articles ?? []).filter((a) =>
        a.title.toLowerCase().includes(searchTerm) ||
        a.excerpt.toLowerCase().includes(searchTerm) ||
        a.category.toLowerCase().includes(searchTerm) ||
        a.tags.some((t) => t.toLowerCase().includes(searchTerm))
      )
    : articles;

  const featured = searchTerm ? null : (filteredArticles?.[0] ?? null);
  const rest = searchTerm ? (filteredArticles ?? []).slice(0, 3) : (filteredArticles?.slice(1, 4) ?? []);
  const archive = searchTerm ? (filteredArticles ?? []).slice(3) : (filteredArticles?.slice(4) ?? []);

  return (
    <div className="min-h-screen bg-background" data-ocid="home.page">
      {/* Dashboard banner */}
      <div className="mx-auto px-4 py-4" style={{ maxWidth: '1200px' }}>
        <p className="text-xs font-semibold uppercase tracking-widest mb-2" style={{ color: 'oklch(0.62 0.20 145)' }}>Token Dashboard</p>
        <div style={{ height: '250px', border: '1px solid oklch(0.62 0.20 145 / 0.4)', borderRadius: '8px', overflow: 'hidden' }}>
          <iframe
            src="https://coinhero.trading/"
            style={{ width: '100%', height: '100%', border: 'none', display: 'block' }}
            title="CoinHero Dashboard"
          />
        </div>
      </div>
      {/* Page header band */}
      <section className="border-b border-subtle py-16 md:py-24 hero-glow relative overflow-hidden">
        {/* Left flame */}
        <div className="pointer-events-none absolute bottom-0 left-0 w-32 md:w-48 h-3/4" style={{
          background: "linear-gradient(to right, oklch(0.30 0.15 28 / 0.30) 0%, oklch(0.40 0.18 35 / 0.12) 50%, transparent 100%)",
          filter: "blur(24px)",
        }} />
        {/* Right flame */}
        <div className="pointer-events-none absolute bottom-0 right-0 w-32 md:w-48 h-3/4" style={{
          background: "linear-gradient(to left, oklch(0.30 0.15 28 / 0.30) 0%, oklch(0.40 0.18 35 / 0.12) 50%, transparent 100%)",
          filter: "blur(24px)",
        }} />
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <motion.div
            className="flex flex-col gap-3 max-w-2xl"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="flex items-center gap-2">
              <div className="h-px w-8 bg-primary" />
              <span className="type-label text-white">
                DECENTRALIZED PUBLISHING
              </span>
            </div>
            <h1 className="font-display text-5xl md:text-7xl font-bold tracking-tight leading-tight">
              <span className="hero-logo-hero">HERO</span>{" "}
              <span className="hero-logo-blog">BLOG</span>
            </h1>
            <p className="type-body-lg text-muted-foreground">
              Decentralized insights on ICP and Web3 — exclusive research,
              tutorials, and ecosystem news powered by the HERO token.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Search results banner */}
      {searchTerm && (
        <div className="max-w-6xl mx-auto px-4 sm:px-6 pt-6">
          <div className="flex items-center gap-3">
            <span className="type-label text-muted-foreground">
              SEARCH RESULTS FOR "{rawSearch}"
            </span>
            <div className="flex-1 h-px bg-border" />
            <a href="/" className="type-meta text-primary hover:underline">Clear</a>
          </div>
          {!showSkeleton && !isError && (filteredArticles ?? []).length === 0 && (
            <p className="type-body text-muted-foreground mt-4">No articles found.</p>
          )}
        </div>
      )}

      {/* Main content area */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-10 flex flex-col gap-12">
        {/* Loading state */}
        {showSkeleton && (
          <div className="flex flex-col gap-8">
            <FeaturedSkeleton />
            <GridSkeleton />
          </div>
        )}

        {/* Error state */}
        {isError && !showSkeleton && (
          <div className="py-20 text-center" data-ocid="home.error_state">
            <p className="type-body text-muted-foreground">
              Failed to load articles.{" "}
              <button
                type="button"
                className="text-primary underline underline-offset-4 hover:opacity-80 transition-smooth"
                onClick={() => refetch()}
                data-ocid="home.error_retry_button"
              >
                Try again
              </button>
            </p>
          </div>
        )}

        {/* Empty state */}
        {!showSkeleton && !isError && articles?.length === 0 && (
          <EmptyState
            title="No articles yet"
            description="Check back soon for the latest ICP and Web3 insights."
            icon={<BookOpen className="size-6" />}
          />
        )}

        {/* Featured article + Latest Video */}
        {!showSkeleton && !isError && featured && (
          <section data-ocid="home.featured.section">
            <div className="flex items-center gap-3 mb-5">
              <span className="type-label text-muted-foreground">FEATURED</span>
              <div className="flex-1 h-px bg-border" />
            </div>
            <div className="flex gap-5 items-stretch">
              <div className="flex-1 min-w-0" style={{ flexBasis: '65%' }}>
                <FeaturedCard article={featured} unlocked={isUnlocked(featured)} />
              </div>
              <LatestVideoPanel />
            </div>
          </section>
        )}

        {/* Articles grid */}
        {!showSkeleton && !isError && rest.length > 0 && (
          <section data-ocid="home.articles.section">
            <div className="flex items-center gap-3 mb-5">
              <span className="type-label text-muted-foreground">
                LATEST ARTICLES
              </span>
              <div className="flex-1 h-px bg-border" />
            </div>
            <div
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5"
              data-ocid="article.list"
            >
              {rest.map((article, i) => (
                <ArticleGridCard
                  key={String(article.id)}
                  article={article}
                  index={i}
                  unlocked={isUnlocked(article)}
                />
              ))}
            </div>
          </section>
        )}


      </div>
    </div>
  );
}
