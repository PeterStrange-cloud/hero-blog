import { u as useNavigate, a as useIdentity, b as useHasSuperadmin, c as useGetMyRole, d as useInitSuperadmin, r as reactExports, j as jsxRuntimeExports, P as PageLoading, S as Shield, B as Button, L as LoaderCircle, A as AdminResult } from "./index-BDV_dscL.js";
import { u as ue } from "./index-orfVZPyu.js";
import { C as CircleCheckBig } from "./circle-check-big-DaFrPoSq.js";
import { C as Copy } from "./copy-CHKaqaqN.js";
function AdminBootstrap() {
  const navigate = useNavigate();
  const { isAuthenticated, isInitializing, principal, login } = useIdentity();
  const hasSuperadminQuery = useHasSuperadmin();
  const roleQuery = useGetMyRole();
  const initSuperadmin = useInitSuperadmin();
  const [copied, setCopied] = reactExports.useState(false);
  if (isInitializing) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx(PageLoading, {});
  }
  if (!isAuthenticated || !principal) {
    return /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        className: "max-w-xl mx-auto px-4 py-24 flex flex-col items-center gap-8 text-center",
        "data-ocid": "bootstrap.not_signed_in",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "p-5 rounded-full bg-muted border border-border", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Shield, { className: "size-10 text-muted-foreground" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display text-2xl font-bold text-foreground", children: "Sign In Required" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "type-body text-muted-foreground", children: "You must sign in with Internet Identity before initializing the superadmin." })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { onClick: login, "data-ocid": "bootstrap.sign_in_button", children: "Sign In with Internet Identity" })
        ]
      }
    );
  }
  if (hasSuperadminQuery.data === true) {
    const userRole = roleQuery.data;
    if (userRole !== void 0 && userRole !== null) {
      navigate({ to: "/admin" });
      return null;
    }
    const principalStr2 = principal.toText();
    return /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        className: "max-w-xl mx-auto px-4 py-24 flex flex-col items-center gap-8 text-center",
        "data-ocid": "bootstrap.already_exists",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "p-5 rounded-full bg-muted border border-border", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Shield, { className: "size-10 text-muted-foreground" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display text-2xl font-bold text-foreground", children: "Superadmin Already Exists" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "type-body text-muted-foreground", children: "A superadmin has already been initialized for this site. Contact your administrator to request access." })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "w-full max-w-md bg-card border border-border rounded-lg p-4 text-left space-y-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "type-label text-xs text-muted-foreground uppercase tracking-wide", children: "Your Principal" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "p",
              {
                className: "font-mono text-xs text-foreground break-all",
                "data-ocid": "bootstrap.blocked_principal",
                children: principalStr2
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { variant: "outline", asChild: true, children: /* @__PURE__ */ jsxRuntimeExports.jsx("a", { href: "/", children: "Return to Blog" }) })
        ]
      }
    );
  }
  const principalStr = principal.toText();
  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(principalStr);
      setCopied(true);
      setTimeout(() => setCopied(false), 2e3);
      ue.success("Principal copied to clipboard");
    } catch {
      ue.error("Could not copy to clipboard");
    }
  };
  const handleInit = async () => {
    try {
      const result = await initSuperadmin.mutateAsync();
      if (result === AdminResult.ok) {
        ue.success("Superadmin initialized! Redirecting to dashboard…");
        setTimeout(() => navigate({ to: "/admin" }), 800);
      } else if (result === AdminResult.alreadyExists) {
        ue.info("A superadmin already exists. Redirecting to dashboard…");
        setTimeout(() => navigate({ to: "/admin" }), 800);
      } else {
        ue.error("Initialization failed. Please try again.");
      }
    } catch {
      ue.error("An error occurred. Please try again.");
    }
  };
  const isLoading = hasSuperadminQuery.isLoading || initSuperadmin.isPending;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: "max-w-xl mx-auto px-4 py-20 flex flex-col items-center gap-8",
      "data-ocid": "bootstrap.page",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "p-5 rounded-full bg-amber-500/10 border border-amber-500/30", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Shield, { className: "size-12 text-amber-500" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center space-y-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display text-3xl font-bold text-foreground", children: "Initialize Superadmin" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "type-body text-muted-foreground max-w-md", children: "No superadmin exists yet. Click the button below to permanently bind your signed-in principal as the first superadmin. This action can only be performed once." })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            className: "w-full bg-card border border-border rounded-lg p-5 space-y-3",
            "data-ocid": "bootstrap.principal_card",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "type-label text-xs text-muted-foreground uppercase tracking-wide", children: "Your Internet Identity Principal" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start gap-3", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "p",
                  {
                    className: "font-mono text-sm text-foreground break-all flex-1 leading-relaxed",
                    "data-ocid": "bootstrap.principal_text",
                    children: principalStr
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  Button,
                  {
                    variant: "ghost",
                    size: "sm",
                    onClick: handleCopy,
                    className: "shrink-0 mt-0.5 gap-1.5 text-muted-foreground hover:text-foreground",
                    "aria-label": "Copy principal",
                    "data-ocid": "bootstrap.copy_principal_button",
                    children: [
                      copied ? /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheckBig, { className: "size-4 text-green-500" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Copy, { className: "size-4" }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs", children: copied ? "Copied" : "Copy" })
                    ]
                  }
                )
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "type-meta text-xs text-muted-foreground", children: "This principal will become the permanent superadmin of HERO BLOG." })
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-full bg-amber-500/5 border border-amber-500/20 rounded-lg px-4 py-3", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "type-meta text-sm text-amber-600 dark:text-amber-400", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: "Important:" }),
          " Make sure this is the correct Internet Identity. Once initialized, only this principal (and admins it assigns) can access the dashboard."
        ] }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Button,
          {
            size: "lg",
            onClick: handleInit,
            disabled: isLoading,
            className: "w-full gap-2 bg-amber-500 text-white hover:bg-amber-600 border-0",
            "data-ocid": "bootstrap.init_button",
            children: initSuperadmin.isPending ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "size-5 animate-spin" }),
              "Initializing…"
            ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Shield, { className: "size-5" }),
              "Initialize Superadmin"
            ] })
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "type-meta text-xs text-muted-foreground text-center", children: "This button will disappear once a superadmin is set. If you signed in with the wrong identity, sign out and sign in again with the correct one." })
      ]
    }
  );
}
export {
  AdminBootstrap as default
};
