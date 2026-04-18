import { useNavigate } from "@tanstack/react-router";
import { toast } from "sonner";
import { ArticleForm } from "../components/ArticleForm";
import type { ArticleFormValues } from "../components/ArticleForm";
import { PageLoading } from "../components/LoadingSpinner";
import { useIdentity } from "../hooks/useIdentity";
import {
  useCreateArticle,
  useListAdmins,
  usePublishArticle,
} from "../hooks/useQueries";

export default function AdminNew() {
  const navigate = useNavigate();
  const { isAuthenticated, isInitializing, principal } = useIdentity();
  const adminsQuery = useListAdmins();
  const createArticle = useCreateArticle();
  const publishArticle = usePublishArticle();

  if (!isInitializing && !isAuthenticated) {
    navigate({ to: "/" });
    return null;
  }

  if (isInitializing || adminsQuery.isLoading) {
    return <PageLoading />;
  }

  const admins = adminsQuery.data ?? [];
  const isAdmin =
    principal !== null &&
    admins.some((a) => a.toString() === principal.toString());

  if (!isAdmin) {
    navigate({ to: "/" });
    return null;
  }

  const handleSubmit = async (values: ArticleFormValues) => {
    const input = {
      title: values.title,
      excerpt: values.excerpt,
      content: values.content,
      category: values.category,
      tags: values.tags
        .split(",")
        .map((t) => t.trim())
        .filter(Boolean),
      isPremium: values.isPremium,
      coverImage: values.coverImage ?? undefined,
    };

    const article = await createArticle.mutateAsync(input);
    const newId = article.id.toString();

    if (values.publishNow) {
      try {
        await publishArticle.mutateAsync(article.id);
        toast.success("Article created and published!");
      } catch {
        toast.warning(
          "Article created but failed to publish. Edit it to publish manually.",
        );
      }
      navigate({ to: "/admin/edit/$id", params: { id: newId } });
    } else {
      toast.success("Draft saved successfully.");
      navigate({ to: "/admin" });
    }
  };

  return (
    <div
      className="max-w-3xl mx-auto px-4 sm:px-6 py-10"
      data-ocid="admin_new.page"
    >
      <div className="mb-8">
        <h1 className="font-display text-3xl font-bold text-foreground">
          Create New Post
        </h1>
        <p className="type-meta text-muted-foreground mt-1">
          Write and publish a new article
        </p>
      </div>

      <ArticleForm
        onSubmit={handleSubmit}
        isSubmitting={createArticle.isPending}
        submitLabel="Create Article"
        backTo="/admin"
      />
    </div>
  );
}
