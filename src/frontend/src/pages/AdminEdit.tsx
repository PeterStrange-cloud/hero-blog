import { useNavigate, useParams } from "@tanstack/react-router";
import { toast } from "sonner";
import { ExternalBlob } from "../backend";
import { AdminResult } from "../backend";
import { ArticleForm } from "../components/ArticleForm";
import type { ArticleFormValues } from "../components/ArticleForm";
import { ErrorMessage } from "../components/ErrorMessage";
import { PageLoading } from "../components/LoadingSpinner";
import { useIdentity } from "../hooks/useIdentity";
import {
  useArticle,
  useListAdmins,
  usePublishArticle,
  useUpdateArticle,
} from "../hooks/useQueries";

export default function AdminEdit() {
  const navigate = useNavigate();
  const { id } = useParams({ from: "/admin/edit/$id" });
  const articleId = BigInt(id);

  const { isAuthenticated, isInitializing, principal } = useIdentity();
  const adminsQuery = useListAdmins();
  const articleQuery = useArticle(articleId);
  const updateArticle = useUpdateArticle();
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

  if (articleQuery.isLoading) {
    return <PageLoading />;
  }

  if (articleQuery.isError || articleQuery.data === null) {
    return (
      <ErrorMessage
        title="Article not found"
        message="This article could not be loaded."
        onRetry={() => articleQuery.refetch()}
      />
    );
  }

  const article = articleQuery.data;
  if (!article) {
    return (
      <ErrorMessage
        title="Article not found"
        message="This article could not be loaded."
      />
    );
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

    console.log("[AdminEdit] submitting input=", input);
    let result;
    try {
      result = await updateArticle.mutateAsync({ id: articleId, input });
      console.log("[AdminEdit] update result=", result);
    } catch (e) {
      console.error("[AdminEdit] update THREW error=", e);
      toast.error(`Update failed: ${(e as Error)?.message ?? e}`);
      return;
    }

    if (result === AdminResult.ok) {
      // Handle publish toggle if needed
      if (values.publishNow && !article.isPublished) {
        await publishArticle.mutateAsync(articleId);
        toast.success("Article updated and published.");
      } else {
        toast.success("Article updated successfully.");
      }
      navigate({ to: "/admin" });
    } else {
      toast.error(`Failed to update article: ${result}`);
    }
  };

  const defaultValues: ArticleFormValues = {
    title: article.title,
    excerpt: article.excerpt,
    content: article.content,
    category: article.category,
    tags: article.tags.join(", "),
    isPremium: article.isPremium,
    publishNow: article.isPublished,
    coverImage:
      article.coverImage instanceof ExternalBlob
        ? article.coverImage
        : undefined,
  };

  return (
    <div
      className="max-w-3xl mx-auto px-4 sm:px-6 py-10"
      data-ocid="admin_edit.page"
    >
      <div className="mb-8">
        <h1 className="font-display text-3xl font-bold text-foreground">
          Edit Article
        </h1>
        <p
          className="type-meta text-muted-foreground mt-1 truncate max-w-lg"
          title={article.title}
        >
          {article.title}
        </p>
      </div>

      <ArticleForm
        defaultValues={defaultValues}
        onSubmit={handleSubmit}
        isSubmitting={updateArticle.isPending || publishArticle.isPending}
        submitLabel="Save Changes"
        backTo="/admin"
      />
    </div>
  );
}
