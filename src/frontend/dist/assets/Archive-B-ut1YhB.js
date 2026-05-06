import { q as usePublishedArticles, s as useUserAccess, j as jsxRuntimeExports, t as Skeleton, u as useNavigate, v as formatTimestampShort, C as CategoryBadge, w as PremiumBadge, F as FreeBadge, B as Button, Z as Zap, x as ArrowRight } from "./index-TiwocVgQ.js";
function ArchiveRow({ article, unlocked }) {
  const navigate = useNavigate();
  const goto = () => navigate({ to: "/article/$id", params: { id: String(article.id) } });
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: "flex items-center justify-between gap-4 px-4 py-3 bg-card hover:bg-muted/30 cursor-pointer transition-colors duration-200 group",
      onClick: goto,
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 min-w-0", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "type-meta text-muted-foreground shrink-0", children: formatTimestampShort(article.createdAt) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(CategoryBadge, { category: article.category }),
          article.isPremium ? /* @__PURE__ */ jsxRuntimeExports.jsx(PremiumBadge, {}) : /* @__PURE__ */ jsxRuntimeExports.jsx(FreeBadge, {}),
          /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display font-semibold text-sm text-foreground truncate group-hover:text-primary transition-colors duration-200", children: article.title })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "shrink-0", children: article.isPremium && !unlocked ? /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { size: "sm", className: "btn-primary h-7 px-2 text-xs gap-1", onClick: (e) => {
          e.stopPropagation();
          goto();
        }, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Zap, { className: "size-3" }),
          "Unlock"
        ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { size: "sm", className: "btn-accent h-7 px-2 text-xs gap-1", onClick: (e) => {
          e.stopPropagation();
          goto();
        }, children: [
          "Read",
          /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowRight, { className: "size-3" })
        ] }) })
      ]
    }
  );
}
function ArchivePage() {
  const { data: articles, isLoading, isError, refetch } = usePublishedArticles();
  const { data: userAccess } = useUserAccess();
  const unlockedSet = /* @__PURE__ */ new Set();
  if (userAccess) {
    for (const uid of userAccess.unlockedArticleIds) {
      unlockedSet.add(uid.toString());
    }
  }
  const isUnlocked = (a) => !!(userAccess == null ? void 0 : userAccess.isSubscribed) || unlockedSet.has(a.id.toString());
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-h-screen bg-background", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "border-b border-subtle py-16 md:py-20 hero-glow", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "max-w-6xl mx-auto px-4 sm:px-6", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col gap-3 max-w-2xl", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-px w-8 bg-primary" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "type-label text-white", children: "ALL ARTICLES" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display text-5xl md:text-6xl font-bold tracking-tight leading-tight", children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-foreground", children: "Archive" }) })
    ] }) }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-6xl mx-auto px-4 sm:px-6 py-10", children: [
      isLoading && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-col gap-2", children: Array.from({ length: 8 }, (_, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-12 w-full rounded-lg" }, i)) }),
      isError && /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "type-body text-muted-foreground text-center py-20", children: [
        "Failed to load.",
        " ",
        /* @__PURE__ */ jsxRuntimeExports.jsx("button", { type: "button", className: "text-primary underline", onClick: () => refetch(), children: "Try again" })
      ] }),
      !isLoading && !isError && articles && articles.length === 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "type-body text-muted-foreground text-center py-20", children: "No articles yet." }),
      !isLoading && !isError && articles && articles.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-col divide-y divide-border border border-border rounded-lg overflow-hidden", children: articles.map((article) => /* @__PURE__ */ jsxRuntimeExports.jsx(ArchiveRow, { article, unlocked: isUnlocked(article) }, String(article.id))) })
    ] })
  ] });
}
export {
  ArchivePage as default
};
