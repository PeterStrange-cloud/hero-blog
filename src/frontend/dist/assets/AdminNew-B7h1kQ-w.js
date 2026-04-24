import { u as useNavigate, a as useIdentity, f as useListAdmins, g as useCreateArticle, h as usePublishArticle, j as jsxRuntimeExports, P as PageLoading } from "./index-O-_GLR_l.js";
import { u as ue } from "./index-B2ForU1D.js";
import { A as ArticleForm } from "./ArticleForm-CSWOfKPY.js";
import "./input-D7_cFaNt.js";
import "./label-DzCjfIvm.js";
import "./index-DGHoyZWf.js";
import "./index-D8TSb4Ib.js";
import "./index-NOkKOG1S.js";
import "./x-Dku5evrj.js";
import "./upload-BU7u0O5D.js";
function AdminNew() {
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
    return /* @__PURE__ */ jsxRuntimeExports.jsx(PageLoading, {});
  }
  const admins = adminsQuery.data ?? [];
  const isAdmin = principal !== null && admins.some((a) => a.toString() === principal.toString());
  if (!isAdmin) {
    navigate({ to: "/" });
    return null;
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
    const article = await createArticle.mutateAsync(input);
    const newId = article.id.toString();
    if (values.publishNow) {
      try {
        await publishArticle.mutateAsync(article.id);
        ue.success("Article created and published!");
      } catch {
        ue.warning(
          "Article created but failed to publish. Edit it to publish manually."
        );
      }
      navigate({ to: "/admin/edit/$id", params: { id: newId } });
    } else {
      ue.success("Draft saved successfully.");
      navigate({ to: "/admin" });
    }
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: "max-w-3xl mx-auto px-4 sm:px-6 py-10",
      "data-ocid": "admin_new.page",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-8", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display text-3xl font-bold text-foreground", children: "Create New Post" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "type-meta text-muted-foreground mt-1", children: "Write and publish a new article" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          ArticleForm,
          {
            onSubmit: handleSubmit,
            isSubmitting: createArticle.isPending,
            submitLabel: "Create Article",
            backTo: "/admin"
          }
        )
      ]
    }
  );
}
export {
  AdminNew as default
};
