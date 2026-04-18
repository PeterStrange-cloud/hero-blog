import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Link, useNavigate } from "@tanstack/react-router";
import {
  CheckCircle,
  Copy,
  Edit,
  Eye,
  EyeOff,
  FileText,
  Loader2,
  PlusCircle,
  RefreshCw,
  Settings,
  Shield,
  Trash2,
  Users,
} from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { AdminResult, Role } from "../backend";
import {
  DraftBadge,
  FreeBadge,
  PremiumBadge,
  PublishedBadge,
} from "../components/Badge";
import { EmptyState, ErrorMessage } from "../components/ErrorMessage";
import { PageLoading } from "../components/LoadingSpinner";
import { useIdentity } from "../hooks/useIdentity";
import {
  useAllArticlesAdmin,
  useDeleteArticle,
  useGetMyRole,
  useHasSuperadmin,
  useInitSuperadmin,
  usePublishArticle,
  useUnpublishArticle,
} from "../hooks/useQueries";
import { formatTimestamp } from "../types";
import type { ArticleCard, ArticleId } from "../types";

function roleBadgeVariant(
  role: Role,
): "default" | "secondary" | "destructive" | "outline" {
  if (role === Role.superadmin) return "destructive";
  if (role === Role.admin) return "default";
  return "secondary";
}

function roleLabel(role: Role): string {
  if (role === Role.superadmin) return "Superadmin";
  if (role === Role.admin) return "Admin";
  return "Editor";
}

export default function Admin() {
  const navigate = useNavigate();
  const { isAuthenticated, isInitializing, principal } = useIdentity();
  const hasSuperadminQuery = useHasSuperadmin();
  const roleQuery = useGetMyRole();
  const articlesQuery = useAllArticlesAdmin();
  const deleteArticle = useDeleteArticle();
  const publishArticle = usePublishArticle();
  const unpublishArticle = useUnpublishArticle();
  const initSuperadmin = useInitSuperadmin();

  const [deleteTarget, setDeleteTarget] = useState<ArticleId | null>(null);
  const [deleteTitle, setDeleteTitle] = useState("");
  const [copied, setCopied] = useState(false);

  // Redirect to home if not authenticated
  if (!isInitializing && !isAuthenticated) {
    navigate({ to: "/" });
    return null;
  }

  // Wait for identity to initialize
  if (isInitializing) {
    return <PageLoading />;
  }

  // Wait for hasSuperadmin check — this is fast (no auth needed)
  if (hasSuperadminQuery.isLoading) {
    return <PageLoading />;
  }

  // Superadmin status known — now check current user's role
  // Show spinner while loading OR while re-fetching after an error
  if (roleQuery.isLoading || (isAuthenticated && roleQuery.isFetching)) {
    return <PageLoading />;
  }

  // Role fetch error — branch based on whether a superadmin exists
  if (roleQuery.isError) {
    const noSuperadminYet = hasSuperadminQuery.data === false;

    // No superadmin at all → show the bootstrap form (same as role===null path)
    if (noSuperadminYet) {
      // Fall through to the role===null block below by treating role as null
      // We achieve this by not returning here and letting the role===null branch handle it
    } else {
      // Superadmin exists but we couldn't load the role — transient error
      return (
        <div
          className="max-w-2xl mx-auto px-4 py-24 flex flex-col items-center gap-6 text-center"
          data-ocid="admin.error_state"
        >
          <div className="p-4 rounded-full bg-destructive/10 border border-destructive/20">
            <Shield className="size-8 text-destructive" />
          </div>
          <div className="space-y-2">
            <h1 className="font-display text-2xl font-bold text-foreground">
              Could not load your role
            </h1>
            <p className="type-body text-muted-foreground">
              Click Retry to try again. If the problem persists, sign out and
              sign back in.
            </p>
          </div>
          <Button
            onClick={() => roleQuery.refetch()}
            className="gap-2"
            data-ocid="admin.retry_button"
          >
            <RefreshCw className="size-4" />
            Retry
          </Button>
        </div>
      );
    }
  }

  const role = roleQuery.data ?? null;

  // Not authorized — either role is null or error fell through (no superadmin yet)
  if (
    role === null ||
    (roleQuery.isError && hasSuperadminQuery.data === false)
  ) {
    const principalStr = principal?.toText() ?? "";
    const noSuperadminYet = hasSuperadminQuery.data === false;

    const handleCopyPrincipal = async () => {
      try {
        await navigator.clipboard.writeText(principalStr);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
        toast.success("Principal copied to clipboard");
      } catch {
        toast.error("Could not copy to clipboard");
      }
    };

    const handleInitSuperadmin = async () => {
      try {
        const result = await initSuperadmin.mutateAsync();
        if (result === AdminResult.ok) {
          toast.success("Superadmin initialized! Opening dashboard…");
          setTimeout(() => navigate({ to: "/admin" }), 800);
        } else if (result === AdminResult.alreadyExists) {
          toast.info("Superadmin already exists.");
        } else {
          toast.error("Initialization failed. Please try again.");
        }
      } catch {
        toast.error("An error occurred. Please try again.");
      }
    };

    // Bootstrap state: no superadmin exists yet — show init button
    if (noSuperadminYet) {
      return (
        <div
          className="max-w-xl mx-auto px-4 py-20 flex flex-col items-center gap-8"
          data-ocid="admin.bootstrap_inline"
        >
          <div className="p-5 rounded-full bg-amber-500/10 border border-amber-500/30">
            <Shield className="size-12 text-amber-500" />
          </div>
          <div className="text-center space-y-3">
            <h1 className="font-display text-3xl font-bold text-foreground">
              Initialize Superadmin
            </h1>
            <p className="type-body text-muted-foreground max-w-md">
              No superadmin exists yet. Click the button below to permanently
              bind your signed-in principal as the first superadmin.
            </p>
          </div>

          {principalStr && (
            <div
              className="w-full bg-card border border-border rounded-lg p-5 space-y-3"
              data-ocid="admin.bootstrap_principal_card"
            >
              <p className="type-label text-xs text-muted-foreground uppercase tracking-wide">
                Your Internet Identity Principal
              </p>
              <div className="flex items-start gap-3">
                <p
                  className="font-mono text-sm text-foreground break-all flex-1 leading-relaxed"
                  data-ocid="admin.bootstrap_principal_text"
                >
                  {principalStr}
                </p>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleCopyPrincipal}
                  className="shrink-0 mt-0.5 gap-1.5 text-muted-foreground hover:text-foreground"
                  aria-label="Copy principal"
                  data-ocid="admin.bootstrap_copy_button"
                >
                  {copied ? (
                    <CheckCircle className="size-4 text-green-500" />
                  ) : (
                    <Copy className="size-4" />
                  )}
                  <span className="text-xs">{copied ? "Copied" : "Copy"}</span>
                </Button>
              </div>
            </div>
          )}

          <div className="w-full bg-amber-500/5 border border-amber-500/20 rounded-lg px-4 py-3">
            <p className="type-meta text-sm text-amber-600 dark:text-amber-400">
              <strong>Important:</strong> Make sure this is the correct Internet
              Identity. Once initialized, only this principal (and admins it
              assigns) can access the dashboard.
            </p>
          </div>

          <Button
            size="lg"
            onClick={handleInitSuperadmin}
            disabled={initSuperadmin.isPending}
            className="w-full gap-2 bg-amber-500 text-white hover:bg-amber-600 border-0"
            data-ocid="admin.bootstrap_init_button"
          >
            {initSuperadmin.isPending ? (
              <>
                <Loader2 className="size-5 animate-spin" />
                Initializing…
              </>
            ) : (
              <>
                <Shield className="size-5" />
                Initialize Superadmin
              </>
            )}
          </Button>
        </div>
      );
    }

    // Normal Not Authorized: superadmin exists but user has no role
    return (
      <div
        className="max-w-2xl mx-auto px-4 py-24 flex flex-col items-center gap-6 text-center"
        data-ocid="admin.not_authorized_state"
      >
        <div className="p-4 rounded-full bg-muted border border-border">
          <Shield className="size-8 text-muted-foreground" />
        </div>
        <div className="space-y-2">
          <h1 className="font-display text-2xl font-bold text-foreground">
            Not Authorized
          </h1>
          <p className="type-body text-muted-foreground">
            Your account does not have access to the admin dashboard. Share your
            principal with the site administrator to request access.
          </p>
        </div>
        {principalStr && (
          <div className="w-full max-w-md bg-card border border-border rounded-lg p-4 text-left space-y-2">
            <p className="type-label text-xs text-muted-foreground uppercase tracking-wide">
              Your Principal
            </p>
            <p
              className="font-mono text-xs text-foreground break-all"
              data-ocid="admin.not_authorized_principal"
            >
              {principalStr}
            </p>
          </div>
        )}
        <Button variant="outline" asChild>
          <Link to="/">Return to Blog</Link>
        </Button>
      </div>
    );
  }

  const isSuperadmin = role === Role.superadmin;
  const isAdmin = role === Role.admin || isSuperadmin;

  const articles = articlesQuery.data ?? [];

  const handleDelete = (article: ArticleCard) => {
    setDeleteTarget(article.id);
    setDeleteTitle(article.title);
  };

  const confirmDelete = async () => {
    if (deleteTarget === null) return;
    try {
      await deleteArticle.mutateAsync(deleteTarget);
      toast.success("Article deleted");
    } catch {
      toast.error("Failed to delete article");
    } finally {
      setDeleteTarget(null);
      setDeleteTitle("");
    }
  };

  const handleTogglePublish = async (article: ArticleCard) => {
    try {
      if (article.isPublished) {
        await unpublishArticle.mutateAsync(article.id);
        toast.success("Article unpublished");
      } else {
        await publishArticle.mutateAsync(article.id);
        toast.success("Article published");
      }
    } catch {
      toast.error("Failed to update publish status");
    }
  };

  return (
    <div
      className="max-w-6xl mx-auto px-4 sm:px-6 py-10"
      data-ocid="admin.page"
    >
      {/* Header bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div className="space-y-1">
          <div className="flex items-center gap-3">
            <h1 className="font-display text-3xl font-bold text-foreground">
              Admin Dashboard
            </h1>
            <Badge
              variant={roleBadgeVariant(role)}
              data-ocid="admin.role_badge"
            >
              {roleLabel(role)}
            </Badge>
          </div>
          <p className="type-meta text-muted-foreground">
            Manage articles and content
          </p>
        </div>
        <div className="flex items-center gap-2 flex-wrap">
          {isSuperadmin && (
            <>
              <Button
                variant="outline"
                size="sm"
                asChild
                data-ocid="admin.invites_link"
              >
                <Link to="/admin/invites" className="flex items-center gap-2">
                  <Users className="size-4" />
                  Invites
                </Link>
              </Button>
              <Button
                variant="outline"
                size="sm"
                asChild
                data-ocid="admin.settings_link"
              >
                <Link to="/admin/settings" className="flex items-center gap-2">
                  <Settings className="size-4" />
                  Settings
                </Link>
              </Button>
            </>
          )}
          {isAdmin && (
            <Button asChild data-ocid="admin.create_new_button">
              <Link to="/admin/new" className="flex items-center gap-2">
                <PlusCircle className="size-4" />
                Create New Post
              </Link>
            </Button>
          )}
        </div>
      </div>

      {/* Stats bar */}
      <div className="grid grid-cols-3 gap-3 mb-8">
        {[
          {
            label: "Total",
            value: articles.length,
            ocid: "admin.stat_total",
          },
          {
            label: "Published",
            value: articles.filter((a) => a.isPublished).length,
            ocid: "admin.stat_published",
          },
          {
            label: "Drafts",
            value: articles.filter((a) => !a.isPublished).length,
            ocid: "admin.stat_drafts",
          },
        ].map((stat) => (
          <div
            key={stat.label}
            className="bg-card border border-border rounded-lg px-4 py-3"
            data-ocid={stat.ocid}
          >
            <p className="type-label text-muted-foreground text-[10px]">
              {stat.label}
            </p>
            <p className="font-display text-2xl font-bold text-foreground mt-0.5">
              {stat.value}
            </p>
          </div>
        ))}
      </div>

      {/* Article list */}
      {articlesQuery.isLoading ? (
        <PageLoading />
      ) : articlesQuery.isError ? (
        <ErrorMessage
          title="Failed to load articles"
          onRetry={() => articlesQuery.refetch()}
        />
      ) : articles.length === 0 ? (
        <EmptyState
          title="No articles yet"
          description="Create your first post to get started."
          icon={<FileText className="size-6" />}
          action={
            isAdmin ? (
              <Button asChild data-ocid="admin.empty_create_button">
                <Link to="/admin/new">
                  <PlusCircle className="size-4 mr-2" />
                  Create First Post
                </Link>
              </Button>
            ) : undefined
          }
        />
      ) : (
        <div
          className="bg-card border border-border rounded-lg overflow-hidden"
          data-ocid="admin.articles_list"
        >
          {/* Table header */}
          <div className="hidden md:grid grid-cols-[1fr_auto_auto_auto_auto] gap-4 px-5 py-3 border-b border-border bg-muted/30">
            <span className="type-label text-muted-foreground text-[10px]">
              Title
            </span>
            <span className="type-label text-muted-foreground text-[10px]">
              Status
            </span>
            <span className="type-label text-muted-foreground text-[10px]">
              Access
            </span>
            <span className="type-label text-muted-foreground text-[10px]">
              Date
            </span>
            <span className="type-label text-muted-foreground text-[10px]">
              Actions
            </span>
          </div>

          {articles.map((article, index) => (
            <ArticleRow
              key={article.id.toString()}
              article={article}
              index={index + 1}
              isLast={index === articles.length - 1}
              canDelete={isAdmin}
              canPublish={isAdmin}
              onDelete={handleDelete}
              onTogglePublish={handleTogglePublish}
            />
          ))}
        </div>
      )}

      {/* Delete confirmation dialog */}
      <AlertDialog
        open={deleteTarget !== null}
        onOpenChange={(open) => {
          if (!open) {
            setDeleteTarget(null);
            setDeleteTitle("");
          }
        }}
      >
        <AlertDialogContent data-ocid="admin.delete_dialog">
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Article</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete{" "}
              <span className="font-semibold text-foreground">
                &ldquo;{deleteTitle}&rdquo;
              </span>
              ? This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel data-ocid="admin.delete_cancel_button">
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={confirmDelete}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
              data-ocid="admin.delete_confirm_button"
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}

interface ArticleRowProps {
  article: ArticleCard;
  index: number;
  isLast: boolean;
  canDelete: boolean;
  canPublish: boolean;
  onDelete: (article: ArticleCard) => void;
  onTogglePublish: (article: ArticleCard) => void;
}

function ArticleRow({
  article,
  index,
  isLast,
  canDelete,
  canPublish,
  onDelete,
  onTogglePublish,
}: ArticleRowProps) {
  return (
    <div
      className={`px-5 py-4 flex flex-col md:grid md:grid-cols-[1fr_auto_auto_auto_auto] md:items-center gap-3 md:gap-4 ${!isLast ? "border-b border-border" : ""} hover:bg-muted/20 transition-colors duration-150`}
      data-ocid={`admin.article.item.${index}`}
    >
      {/* Title + category */}
      <div className="min-w-0">
        <p
          className="font-display font-semibold text-foreground truncate"
          title={article.title}
        >
          {article.title}
        </p>
        {article.category && (
          <p className="type-meta text-muted-foreground mt-0.5">
            {article.category}
          </p>
        )}
      </div>

      {/* Status badge */}
      <div className="flex items-center gap-2">
        <span className="md:hidden type-label text-muted-foreground text-[10px]">
          Status:
        </span>
        {article.isPublished ? <PublishedBadge /> : <DraftBadge />}
      </div>

      {/* Access badge */}
      <div className="flex items-center gap-2">
        <span className="md:hidden type-label text-muted-foreground text-[10px]">
          Access:
        </span>
        {article.isPremium ? <PremiumBadge /> : <FreeBadge />}
      </div>

      {/* Date */}
      <div className="flex items-center gap-2">
        <span className="md:hidden type-label text-muted-foreground text-[10px]">
          Date:
        </span>
        <span className="type-meta whitespace-nowrap">
          {formatTimestamp(article.createdAt)}
        </span>
      </div>

      {/* Actions */}
      <div className="flex items-center gap-1.5">
        {canPublish && (
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onTogglePublish(article)}
            className="gap-1.5 text-muted-foreground hover:text-foreground h-8 px-2.5"
            title={article.isPublished ? "Unpublish" : "Publish"}
            aria-label={article.isPublished ? "Unpublish" : "Publish"}
            data-ocid={`admin.article.toggle_publish.${index}`}
          >
            {article.isPublished ? (
              <EyeOff className="size-3.5" />
            ) : (
              <Eye className="size-3.5" />
            )}
            <span className="hidden lg:inline text-xs">
              {article.isPublished ? "Unpublish" : "Publish"}
            </span>
          </Button>
        )}

        <Button
          variant="ghost"
          size="sm"
          asChild
          className="gap-1.5 text-muted-foreground hover:text-foreground h-8 px-2.5"
          aria-label="Edit"
          data-ocid={`admin.article.edit_button.${index}`}
        >
          <Link to="/admin/edit/$id" params={{ id: article.id.toString() }}>
            <Edit className="size-3.5" />
            <span className="hidden lg:inline text-xs">Edit</span>
          </Link>
        </Button>

        {canDelete && (
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onDelete(article)}
            className="gap-1.5 text-destructive hover:text-destructive hover:bg-destructive/10 h-8 px-2.5"
            aria-label="Delete"
            data-ocid={`admin.article.delete_button.${index}`}
          >
            <Trash2 className="size-3.5" />
            <span className="hidden lg:inline text-xs">Delete</span>
          </Button>
        )}
      </div>
    </div>
  );
}
