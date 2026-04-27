import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { useQueryClient } from "@tanstack/react-query";
import { Link, useParams } from "@tanstack/react-router";
import {
  AlertCircle,
  ArrowLeft,
  CalendarDays,
  Crown,
  Lock,
  Tag,
  Unlock,
} from "lucide-react";
import { motion } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { CategoryBadge, FreeBadge, PremiumBadge } from "../components/Badge";
import { PaymentDialog } from "../components/PaymentDialog";
import { useIdentity } from "../hooks/useIdentity";
import { useArticle, useUserAccess } from "../hooks/useQueries";
import { type ArticleFull, type UserAccess, formatTimestamp } from "../types";

// ─── Article skeleton ────────────────────────────────────────────────────────
function ArticleSkeleton() {
  return (
    <div className="animate-pulse" data-ocid="article.loading_state">
      <div className="w-full aspect-[21/9] bg-muted mb-10" />
      <div className="max-w-[760px] mx-auto px-4 sm:px-6 space-y-4">
        <div className="h-3 w-20 bg-muted rounded" />
        <div className="h-10 w-4/5 bg-muted rounded" />
        <div className="h-6 w-3/4 bg-muted rounded" />
        <div className="h-3 w-32 bg-muted rounded" />
        <Separator className="my-6" />
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="h-4 w-full bg-muted rounded" />
        ))}
      </div>
    </div>
  );
}

// ─── Cover image ─────────────────────────────────────────────────────────────
function CoverImage({ article }: { article: ArticleFull }) {
  const imgSrc = article.coverImage ? article.coverImage.getDirectURL() : null;

  if (!imgSrc) {
    return (
      <div className="w-full aspect-[21/9] bg-muted flex items-center justify-center">
        <span className="text-muted-foreground text-sm font-medium uppercase tracking-wider">
          NO COVER IMAGE
        </span>
      </div>
    );
  }

  return (
    <div className="w-full aspect-[21/9] overflow-hidden bg-muted">
      <img
        src={imgSrc}
        alt={article.title}
        className="w-full h-full object-cover"
      />
    </div>
  );
}

// ─── Access status banner ────────────────────────────────────────────────────
function AccessBanner({ access }: { access: UserAccess }) {
  if (access.isSubscribed && access.subscription) {
    const expiry = formatTimestamp(access.subscription.expiryTime);
    return (
      <div
        className="flex items-center gap-2 px-3 py-1.5 rounded border border-primary/30 bg-primary/10 text-primary text-[10px] font-medium uppercase tracking-wider"
        data-ocid="article.subscription_status"
      >
        <Crown className="size-3" />
        SUBSCRIBED · ACTIVE UNTIL {expiry.toUpperCase()}
      </div>
    );
  }
  return null;
}

// ─── Paywall section ──────────────────────────────────────────────────────────
interface PaywallProps {
  isAuthenticated: boolean;
  onLogin: () => void;
  onUnlock: () => void;
}

function Paywall({
  isAuthenticated,
  onLogin,
  onUnlock,
}: PaywallProps) {
  return (
    <div
      className="mt-8 rounded-lg border border-border bg-card overflow-hidden"
      data-ocid="article.paywall_section"
    >
      {/* Gradient fade */}
      <div className="h-24 bg-gradient-to-b from-transparent to-card -mt-24 relative z-10 pointer-events-none" />

      <div className="px-6 py-8 space-y-6">
        <div className="flex flex-col items-center text-center gap-3">
          <div className="p-3 rounded-full bg-primary/10 border border-primary/30">
            <Lock className="size-6 text-primary" />
          </div>
          <div>
            <h3 className="font-display text-xl text-foreground mb-1">
              This is a Premium Article
            </h3>
            <p className="text-sm text-muted-foreground max-w-sm">
              This article is available to HERO token holders. Sign in to check
              your access.
            </p>
          </div>
        </div>

        {!isAuthenticated && (
          <div
            className="rounded border border-primary/20 bg-primary/5 px-4 py-3 text-center"
            data-ocid="article.login_prompt"
          >
            <p className="text-sm text-foreground mb-3">
              Sign in with Internet Identity to access premium content.
            </p>
            <Button
              onClick={onLogin}
              className="bg-primary text-primary-foreground hover:bg-primary/90"
              data-ocid="article.login_button"
            >
              Sign In to Continue
            </Button>
          </div>
        )}

        <div className="flex justify-center">
          {/* Unlock article option */}
          <div
            className="card-red p-6 flex flex-col gap-4 w-full max-w-sm"
            data-ocid="article.unlock_option_card"
          >
            <div>
              <p className="text-accent-red text-xs mb-1 font-bold uppercase tracking-wider">
                ONE-TIME ACCESS
              </p>
              <p className="font-display text-3xl font-bold text-accent-red">1 HERO</p>
              <p className="text-xs text-muted-foreground mt-1">
                Permanently unlock this article for your account.
              </p>
            </div>
            <Button
              disabled={!isAuthenticated}
              className="btn-primary w-full disabled:opacity-40 text-base font-semibold h-11"
              onClick={onUnlock}
              data-ocid="article.unlock_article_button"
            >
              <Unlock className="size-4 mr-2" />
              Unlock for 1 HERO
            </Button>
          </div>

        </div>

        <p className="text-center text-muted-foreground/60 text-xs">
          Payments use HERO token (ICRC-1) on the Internet Computer.
        </p>
      </div>
    </div>
  );
}

// ─── Article teaser (paywall preview) ────────────────────────────────────────
function ArticleTeaser({ content }: { content: string }) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (ref.current) ref.current.innerHTML = content.slice(0, 800);
  }, [content]);
  return (
    <div className="relative">
      <div
        ref={ref}
        className="line-clamp-4 text-foreground/70 leading-relaxed font-body text-base"
      />
      <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-background to-transparent pointer-events-none" />
    </div>
  );
}

// ─── Article body ─────────────────────────────────────────────────────────────
function ArticleBody({ content }: { content: string }) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (ref.current) ref.current.innerHTML = content;
  }, [content]);
  return (
    <div
      ref={ref}
      className="prose prose-sm sm:prose-base max-w-none
        prose-headings:font-display prose-headings:text-foreground
        prose-p:text-foreground prose-p:leading-relaxed
        prose-a:text-primary prose-a:no-underline hover:prose-a:underline
        prose-strong:text-foreground
        prose-code:text-primary prose-code:bg-muted prose-code:px-1 prose-code:py-0.5 prose-code:rounded
        prose-pre:bg-card prose-pre:border prose-pre:border-border
        prose-blockquote:border-primary/40 prose-blockquote:text-muted-foreground
        prose-img:rounded-lg prose-img:border prose-img:border-border
        prose-hr:border-border"
      data-ocid="article.body"
    />
  );
}

// ─── Main component ────────────────────────────────────────────────────────────
export default function Article() {
  const { id } = useParams({ from: "/article/$id" });
  const articleId = BigInt(id);

  const { isAuthenticated, login } = useIdentity();
  const queryClient = useQueryClient();

  const [paymentModal, setPaymentModal] = useState<{
    type: "unlock" | "subscribe";
    articleId?: bigint;
  } | null>(null);

  const {
    data: article,
    isLoading: articleLoading,
    error: articleError,
  } = useArticle(articleId);

  const { data: userAccess, isLoading: accessLoading } = useUserAccess();

  const isLoading = articleLoading || (isAuthenticated && accessLoading);

  function hasAccess(): boolean {
    if (!article?.isPremium) return true;
    if (!userAccess) return false;
    if (userAccess.isSubscribed) return true;
    return userAccess.unlockedArticleIds.some((uid) => uid === articleId);
  }

  if (isLoading) return <ArticleSkeleton />;

  if (articleError || !article) {
    return (
      <div
        className="max-w-[760px] mx-auto px-4 sm:px-6 py-24 text-center"
        data-ocid="article.error_state"
      >
        <AlertCircle className="size-10 text-destructive mx-auto mb-4" />
        <h2 className="font-display text-xl text-foreground mb-2">
          Article Not Found
        </h2>
        <p className="text-sm text-muted-foreground mb-6">
          This article could not be loaded or does not exist.
        </p>
        <Link to="/">
          <Button variant="outline" data-ocid="article.back_button">
            <ArrowLeft className="size-4 mr-2" />
            Back to Blog
          </Button>
        </Link>
      </div>
    );
  }

  const canRead = hasAccess();
  const isPremium = article.isPremium;

  return (
    <article data-ocid="article.page">
      {/* Cover image — full width */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
      >
        <CoverImage article={article} />
      </motion.div>

      {/* Article header + body */}
      <div className="max-w-[760px] mx-auto px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.15 }}
          className="pt-8 pb-4"
        >
          {/* Back link */}
          <Link
            to="/"
            className="inline-flex items-center gap-1.5 text-muted-foreground hover:text-foreground transition-colors duration-200 mb-6 text-xs font-medium"
            data-ocid="article.back_link"
          >
            <ArrowLeft className="size-3.5" />
            Back to Blog
          </Link>

          {/* Meta row */}
          <div className="flex flex-wrap items-center gap-2 mb-4">
            <CategoryBadge category={article.category} />
            {isPremium ? <PremiumBadge /> : <FreeBadge />}
            {isAuthenticated && userAccess && (
              <AccessBanner access={userAccess} />
            )}
          </div>

          {/* Title */}
          <h1
            className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground leading-tight tracking-tight mb-4"
            data-ocid="article.title"
          >
            {article.title}
          </h1>

          {/* Excerpt */}
          {article.excerpt && (
            <p className="text-lg text-muted-foreground leading-relaxed mb-5 font-body">
              {article.excerpt}
            </p>
          )}

          {/* Date + tags row */}
          <div className="flex flex-wrap items-center gap-4 text-muted-foreground mb-8">
            <span className="flex items-center gap-1.5 text-xs">
              <CalendarDays className="size-3.5" />
              {formatTimestamp(article.createdAt)}
            </span>
            {article.tags.length > 0 && (
              <span className="flex items-center gap-1.5 text-xs">
                <Tag className="size-3.5" />
                {article.tags.join(", ")}
              </span>
            )}
          </div>

          <Separator className="mb-8" />
        </motion.div>

        {/* Article content or paywall */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="pb-16"
        >
          {canRead ? (
            <ArticleBody content={article.content} />
          ) : (
            <>
              {/* Teaser — stripped HTML preview */}
              {article.content && <ArticleTeaser content={article.content} />}

              <Paywall
                isAuthenticated={isAuthenticated}
                onLogin={login}
                onUnlock={() => setPaymentModal({ type: "unlock", articleId })}
              />
            </>
          )}
        </motion.div>
      </div>

      {/* Payment modal */}
      {paymentModal && (
        <PaymentDialog
          open={true}
          onClose={() => setPaymentModal(null)}
          paymentType={paymentModal.type}
          articleId={paymentModal.articleId}
          onSuccess={() => {
            setPaymentModal(null);
            queryClient.invalidateQueries({ queryKey: ["userAccess"] });
            queryClient.invalidateQueries({ queryKey: ["article"] });
            queryClient.invalidateQueries({ queryKey: ["articleCard"] });
          }}
        />
      )}
    </article>
  );
}
