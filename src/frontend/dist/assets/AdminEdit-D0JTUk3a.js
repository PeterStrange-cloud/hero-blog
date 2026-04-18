import { s as useNavigate, d as useParams, e as useIdentity, M as useListAdmins, g as useArticle, O as useUpdateArticle, y as usePublishArticle, j as jsxRuntimeExports, D as PageLoading, G as ErrorMessage, Q as ExternalBlob, I as AdminResult } from "./index-CIbPl6dp.js";
import { u as ue } from "./index-DyInPUeQ.js";
import { A as ArticleForm } from "./ArticleForm-Esw1Gw_C.js";
import "./label-CrEZy3qO.js";
import "./index-CV2_8MkX.js";
import "./index-CZHUVU-n.js";
import "./index-D8udsm2Y.js";
import "./x-Fj8MNVJs.js";
import "./upload-C0aRWqeE.js";
function AdminEdit() {
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
    return /* @__PURE__ */ jsxRuntimeExports.jsx(PageLoading, {});
  }
  const admins = adminsQuery.data ?? [];
  const isAdmin = principal !== null && admins.some((a) => a.toString() === principal.toString());
  if (!isAdmin) {
    navigate({ to: "/" });
    return null;
  }
  if (articleQuery.isLoading) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx(PageLoading, {});
  }
  if (articleQuery.isError || articleQuery.data === null) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx(
      ErrorMessage,
      {
        title: "Article not found",
        message: "This article could not be loaded.",
        onRetry: () => articleQuery.refetch()
      }
    );
  }
  const article = articleQuery.data;
  if (!article) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx(
      ErrorMessage,
      {
        title: "Article not found",
        message: "This article could not be loaded."
      }
    );
  }
  const handleSubmit = async (values) => {
    const input = {
      title: values.title,
      excerpt: values.excerpt,
      content: values.content,
      category: values.category,
      tags: values.tags.split(",").map((t) => t.trim()).filter(Boolean),
      isPremium: values.isPremium,
      coverImage: values.coverImage ?? void 0
    };
    const result = await updateArticle.mutateAsync({ id: articleId, input });
    if (result === AdminResult.ok) {
      if (values.publishNow && !article.isPublished) {
        await publishArticle.mutateAsync(articleId);
        ue.success("Article updated and published.");
      } else {
        ue.success("Article updated successfully.");
      }
      navigate({ to: "/admin" });
    } else {
      ue.error(`Failed to update article: ${result}`);
    }
  };
  const defaultValues = {
    title: article.title,
    excerpt: article.excerpt,
    content: article.content,
    category: article.category,
    tags: article.tags.join(", "),
    isPremium: article.isPremium,
    publishNow: article.isPublished,
    coverImage: article.coverImage instanceof ExternalBlob ? article.coverImage : void 0
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: "max-w-3xl mx-auto px-4 sm:px-6 py-10",
      "data-ocid": "admin_edit.page",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-8", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display text-3xl font-bold text-foreground", children: "Edit Article" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "p",
            {
              className: "type-meta text-muted-foreground mt-1 truncate max-w-lg",
              title: article.title,
              children: article.title
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          ArticleForm,
          {
            defaultValues,
            onSubmit: handleSubmit,
            isSubmitting: updateArticle.isPending || publishArticle.isPending,
            submitLabel: "Save Changes",
            backTo: "/admin"
          }
        )
      ]
    }
  );
}
export {
  AdminEdit as default
};
