import { e as createLucideIcon, u as useNavigate, a as useIdentity, D as useUserAccess, F as useGetLinkedWallet, G as useLinkWallet, r as reactExports, j as jsxRuntimeExports, P as PageLoading, E as ErrorMessage, B as Button, z as Link } from "./index-DFD0n_pv.js";
import { I as Input } from "./input-Crts3Czv.js";
import { u as ue } from "./index-M5-Dcfjn.js";
import { C as ChevronLeft } from "./chevron-left-C0D1FmV5.js";
import { C as Copy } from "./copy-jzeettck.js";
import { W as Wallet } from "./wallet-B-EkxO5P.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  ["circle", { cx: "12", cy: "12", r: "10", key: "1mglay" }],
  ["path", { d: "m9 12 2 2 4-4", key: "dzmm74" }]
];
const CircleCheck = createLucideIcon("circle-check", __iconNode);
function Profile() {
  const navigate = useNavigate();
  const { isAuthenticated, isInitializing, principal } = useIdentity();
  const userAccessQuery = useUserAccess();
  const linkedWalletQuery = useGetLinkedWallet();
  const linkWallet = useLinkWallet();
  const [walletInput, setWalletInput] = reactExports.useState("");
  if (!isInitializing && !isAuthenticated) {
    navigate({ to: "/" });
    return null;
  }
  if (isInitializing || userAccessQuery.isLoading) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx(PageLoading, {});
  }
  if (userAccessQuery.isError) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx(
      ErrorMessage,
      {
        title: "Failed to load profile",
        onRetry: () => userAccessQuery.refetch()
      }
    );
  }
  userAccessQuery.data;
  const linkedWallet = linkedWalletQuery.data ?? null;
  const myPrincipal = (principal == null ? void 0 : principal.toString()) ?? "";
  const handleLinkWallet = async () => {
    const trimmed = walletInput.trim();
    if (!trimmed) {
      ue.error("Please enter a wallet principal");
      return;
    }
    try {
      await linkWallet.mutateAsync(trimmed);
      ue.success("Wallet linked successfully");
      setWalletInput("");
    } catch (err) {
      ue.error(
        err instanceof Error ? err.message : "Failed to link wallet"
      );
    }
  };
  const handleCopyPrincipal = async (text) => {
    try {
      await navigator.clipboard.writeText(text);
      ue.success("Copied");
    } catch {
      ue.error("Could not copy");
    }
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: "max-w-2xl mx-auto px-4 sm:px-6 py-10 space-y-8",
      "data-ocid": "profile.page",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Button,
            {
              variant: "ghost",
              size: "sm",
              asChild: true,
              className: "gap-2 text-muted-foreground",
              children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronLeft, { className: "size-4" }),
                "Home"
              ] })
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display text-3xl font-bold text-foreground", children: "My Profile" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "type-meta text-muted-foreground mt-1", children: "Manage your account and linked wallet" })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "card-dark p-6 space-y-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display font-semibold text-foreground", children: "Your Internet Identity" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "type-meta text-muted-foreground text-sm", children: "This is the principal you use to sign in to this blog." }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start gap-2 p-3 bg-muted/20 rounded-lg border border-border", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-mono text-xs text-foreground break-all flex-1", children: myPrincipal }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Button,
              {
                variant: "ghost",
                size: "sm",
                onClick: () => handleCopyPrincipal(myPrincipal),
                className: "shrink-0 text-muted-foreground hover:text-foreground h-6 w-6 p-0",
                "aria-label": "Copy principal",
                children: /* @__PURE__ */ jsxRuntimeExports.jsx(Copy, { className: "size-3" })
              }
            )
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "card-dark p-6 space-y-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Wallet, { className: "size-4 text-muted-foreground" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display font-semibold text-foreground", children: "Linked Wallet" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "type-meta text-muted-foreground text-sm", children: "Link your NNS wallet principal so you can pay HERO tokens to unlock premium articles. Payments must come from this wallet to be recognized." }),
          linkedWallet ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 text-sm text-green-600 dark:text-green-400", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheck, { className: "size-4" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Wallet linked" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start gap-2 p-3 bg-muted/20 rounded-lg border border-border", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-mono text-xs break-all flex-1 glow-green", children: linkedWallet.toString() }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Button,
                {
                  variant: "ghost",
                  size: "sm",
                  onClick: () => handleCopyPrincipal(linkedWallet.toString()),
                  className: "shrink-0 text-muted-foreground hover:text-foreground h-6 w-6 p-0",
                  "aria-label": "Copy wallet principal",
                  children: /* @__PURE__ */ jsxRuntimeExports.jsx(Copy, { className: "size-3" })
                }
              )
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "pt-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "type-meta text-muted-foreground text-xs mb-2", children: "Change linked wallet:" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col sm:flex-row gap-2", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Input,
                  {
                    placeholder: "Paste new NNS principal",
                    value: walletInput,
                    onChange: (e) => setWalletInput(e.target.value),
                    className: "input-dark font-mono text-xs px-3 py-2"
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Button,
                  {
                    onClick: handleLinkWallet,
                    disabled: linkWallet.isPending,
                    className: "btn-primary",
                    children: linkWallet.isPending ? "Linking…" : "Update"
                  }
                )
              ] })
            ] })
          ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col sm:flex-row gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Input,
              {
                placeholder: "Paste your NNS principal",
                value: walletInput,
                onChange: (e) => setWalletInput(e.target.value),
                className: "input-dark font-mono text-xs px-3 py-2"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Button,
              {
                onClick: handleLinkWallet,
                disabled: linkWallet.isPending,
                className: "btn-primary",
                children: linkWallet.isPending ? "Linking…" : "Link Wallet"
              }
            )
          ] })
        ] })
      ]
    }
  );
}
export {
  Profile as default
};
