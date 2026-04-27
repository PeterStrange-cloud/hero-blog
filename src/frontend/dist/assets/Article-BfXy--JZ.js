import { e as createLucideIcon, r as reactExports, j as jsxRuntimeExports, o as cn, D as useUserAccess, F as useGetLinkedWallet, T as useCreatePaymentRequest, U as useVerifyPaymentRequest, B as Button, z as Link, L as LoaderCircle, i as useParams, a as useIdentity, V as useQueryClient, k as useArticle, W as CircleAlert, X as motion, Y as CategoryBadge, Z as PremiumBadge, _ as FreeBadge, M as formatTimestamp, $ as Lock } from "./index-DFD0n_pv.js";
import { P as Primitive } from "./index-i1TDyaTn.js";
import { X, A as ArrowLeft } from "./x-BNp8OIQ4.js";
import { W as Wallet } from "./wallet-B-EkxO5P.js";
import { C as CircleCheckBig } from "./circle-check-big-CZL7lB6-.js";
import { C as Copy } from "./copy-jzeettck.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$4 = [
  ["path", { d: "M8 2v4", key: "1cmpym" }],
  ["path", { d: "M16 2v4", key: "4m81vk" }],
  ["rect", { width: "18", height: "18", x: "3", y: "4", rx: "2", key: "1hopcy" }],
  ["path", { d: "M3 10h18", key: "8toen8" }],
  ["path", { d: "M8 14h.01", key: "6423bh" }],
  ["path", { d: "M12 14h.01", key: "1etili" }],
  ["path", { d: "M16 14h.01", key: "1gbofw" }],
  ["path", { d: "M8 18h.01", key: "lrp35t" }],
  ["path", { d: "M12 18h.01", key: "mhygvu" }],
  ["path", { d: "M16 18h.01", key: "kzsmim" }]
];
const CalendarDays = createLucideIcon("calendar-days", __iconNode$4);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$3 = [
  [
    "path",
    {
      d: "M11.562 3.266a.5.5 0 0 1 .876 0L15.39 8.87a1 1 0 0 0 1.516.294L21.183 5.5a.5.5 0 0 1 .798.519l-2.834 10.246a1 1 0 0 1-.956.734H5.81a1 1 0 0 1-.957-.734L2.02 6.02a.5.5 0 0 1 .798-.519l4.276 3.664a1 1 0 0 0 1.516-.294z",
      key: "1vdc57"
    }
  ],
  ["path", { d: "M5 21h14", key: "11awu3" }]
];
const Crown = createLucideIcon("crown", __iconNode$3);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$2 = [
  ["path", { d: "M15 3h6v6", key: "1q9fwt" }],
  ["path", { d: "M10 14 21 3", key: "gplh6r" }],
  ["path", { d: "M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6", key: "a6xqqp" }]
];
const ExternalLink = createLucideIcon("external-link", __iconNode$2);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$1 = [
  ["rect", { width: "18", height: "11", x: "3", y: "11", rx: "2", ry: "2", key: "1w4ew1" }],
  ["path", { d: "M7 11V7a5 5 0 0 1 9.9-1", key: "1mm8w8" }]
];
const LockOpen = createLucideIcon("lock-open", __iconNode$1);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  [
    "path",
    {
      d: "M12.586 2.586A2 2 0 0 0 11.172 2H4a2 2 0 0 0-2 2v7.172a2 2 0 0 0 .586 1.414l8.704 8.704a2.426 2.426 0 0 0 3.42 0l6.58-6.58a2.426 2.426 0 0 0 0-3.42z",
      key: "vktsd0"
    }
  ],
  ["circle", { cx: "7.5", cy: "7.5", r: ".5", fill: "currentColor", key: "kqv944" }]
];
const Tag = createLucideIcon("tag", __iconNode);
var NAME = "Separator";
var DEFAULT_ORIENTATION = "horizontal";
var ORIENTATIONS = ["horizontal", "vertical"];
var Separator$1 = reactExports.forwardRef((props, forwardedRef) => {
  const { decorative, orientation: orientationProp = DEFAULT_ORIENTATION, ...domProps } = props;
  const orientation = isValidOrientation(orientationProp) ? orientationProp : DEFAULT_ORIENTATION;
  const ariaOrientation = orientation === "vertical" ? orientation : void 0;
  const semanticProps = decorative ? { role: "none" } : { "aria-orientation": ariaOrientation, role: "separator" };
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    Primitive.div,
    {
      "data-orientation": orientation,
      ...semanticProps,
      ...domProps,
      ref: forwardedRef
    }
  );
});
Separator$1.displayName = NAME;
function isValidOrientation(orientation) {
  return ORIENTATIONS.includes(orientation);
}
var Root = Separator$1;
function Separator({
  className,
  orientation = "horizontal",
  decorative = true,
  ...props
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    Root,
    {
      "data-slot": "separator",
      decorative,
      orientation,
      className: cn(
        "bg-border shrink-0 data-[orientation=horizontal]:h-px data-[orientation=horizontal]:w-full data-[orientation=vertical]:h-full data-[orientation=vertical]:w-px",
        className
      ),
      ...props
    }
  );
}
const DESTINATION_PRINCIPAL = "7ipgs-pmuew-kn3oz-4am7i-j6qth-hk7fo-tb3hc-rk32c-pnef2-ys2cd-rqe";
const MAX_ATTEMPTS = 24;
const POLL_INTERVAL_MS = 5e3;
function CopyButton({ value, label }) {
  const [copied, setCopied] = reactExports.useState(false);
  const handleCopy = () => {
    navigator.clipboard.writeText(value).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    });
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "button",
    {
      type: "button",
      onClick: handleCopy,
      className: "inline-flex items-center gap-1 text-xs px-2 py-1 rounded border border-border bg-muted hover:bg-muted/70 text-muted-foreground hover:text-foreground transition-colors duration-200 shrink-0",
      "aria-label": `Copy ${label}`,
      "data-ocid": `payment.copy_${label.toLowerCase().replace(/\s/g, "_")}`,
      children: [
        copied ? /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheckBig, { className: "size-3 text-primary" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Copy, { className: "size-3" }),
        copied ? "Copied" : "Copy"
      ]
    }
  );
}
function PaymentDialog({
  open,
  onClose,
  paymentType,
  articleId,
  onSuccess
}) {
  const [req, setReq] = reactExports.useState(null);
  const [createError, setCreateError] = reactExports.useState(null);
  const [pollingStatus, setPollingStatus] = reactExports.useState("idle");
  const [showContinue, setShowContinue] = reactExports.useState(false);
  const pollingRef = reactExports.useRef(null);
  const attemptRef = reactExports.useRef(0);
  useUserAccess();
  const linkedWalletQuery = useGetLinkedWallet();
  const linkedWallet = linkedWalletQuery.data ?? null;
  const paymentTypeRef = reactExports.useRef(paymentType);
  const articleIdRef = reactExports.useRef(articleId);
  paymentTypeRef.current = paymentType;
  articleIdRef.current = articleId;
  const createMutation = useCreatePaymentRequest();
  const verifyMutation = useVerifyPaymentRequest();
  const stopPolling = reactExports.useCallback(() => {
    if (pollingRef.current !== null) {
      clearInterval(pollingRef.current);
      pollingRef.current = null;
    }
    attemptRef.current = 0;
  }, []);
  const createMutateRef = reactExports.useRef(createMutation.mutate);
  createMutateRef.current = createMutation.mutate;
  const reqRef = reactExports.useRef(null);
  reqRef.current = req;
  const hasLinkedWallet = !!linkedWallet;
  reactExports.useEffect(() => {
    if (!open) {
      setReq(null);
      setCreateError(null);
      setPollingStatus("idle");
      setShowContinue(false);
      stopPolling();
      return;
    }
    if (!hasLinkedWallet) return;
    if (reqRef.current) return;
    let cancelled = false;
    const pt = paymentTypeRef.current;
    const aid = articleIdRef.current;
    const payType = pt === "unlock" && aid !== void 0 ? { __kind__: "ArticleUnlock", ArticleUnlock: aid } : { __kind__: "Subscription", Subscription: null };
    createMutateRef.current(payType, {
      onSuccess: (data) => {
        if (!cancelled) setReq(data);
      },
      onError: (err) => {
        if (!cancelled) setCreateError(err.message);
      }
    });
    return () => {
      cancelled = true;
    };
  }, [open, stopPolling, hasLinkedWallet]);
  reactExports.useEffect(() => {
    return () => stopPolling();
  }, [stopPolling]);
  const verifyMutateRef = reactExports.useRef(verifyMutation.mutate);
  verifyMutateRef.current = verifyMutation.mutate;
  const verifyMutateAsyncRef = reactExports.useRef(verifyMutation.mutateAsync);
  verifyMutateAsyncRef.current = verifyMutation.mutateAsync;
  const onSuccessRef = reactExports.useRef(onSuccess);
  onSuccessRef.current = onSuccess;
  const onCloseRef = reactExports.useRef(onClose);
  onCloseRef.current = onClose;
  const doVerify = reactExports.useCallback(() => {
    if (!req) return;
    setPollingStatus("pending");
    attemptRef.current = 0;
    const tick = async () => {
      attemptRef.current += 1;
      const attempt = attemptRef.current;
      setPollingStatus({ attempt });
      console.log("[PaymentDialog] polling verify for reqId=", req.id, "attempt=", attempt);
      try {
        const result = await verifyMutateAsyncRef.current(req.id);
        console.log("[PaymentDialog] verify result for reqId=", req.id, "result=", result);
        stopPolling();
        setPollingStatus("granted");
        setShowContinue(true);
      } catch (err) {
        console.log("[PaymentDialog] verify error for reqId=", req.id, "err=", err);
        if (attempt >= MAX_ATTEMPTS) {
          stopPolling();
          setPollingStatus("not_found");
        }
      }
    };
    tick();
    pollingRef.current = setInterval(tick, POLL_INTERVAL_MS);
  }, [req, stopPolling]);
  if (!open) return null;
  const isCreating = createMutation.isPending;
  const title = "Unlock with HERO";
  const amountLabel = "1 HERO (100,000,000 e8s)";
  const amountE8s = "100000000";
  const isPolling = typeof pollingStatus === "object" && "attempt" in pollingStatus;
  const isGranted = pollingStatus === "granted";
  let statusText = "";
  if (pollingStatus === "pending") statusText = "Pending…";
  else if (isPolling)
    statusText = `Checking (attempt ${pollingStatus.attempt} of ${MAX_ATTEMPTS})…`;
  else if (isGranted) statusText = "Article unlocked — Thank you!";
  else if (pollingStatus === "not_found")
    statusText = "Payment not detected yet. Make sure you sent from your linked wallet. Click to try again.";
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "dialog",
    {
      "aria-label": title,
      open: true,
      className: "fixed inset-0 z-50 flex items-center justify-center p-4 w-full h-full max-w-none m-0 bg-transparent border-0 outline-none",
      style: { background: "rgba(0,0,0,0.7)" },
      "data-ocid": "payment.dialog",
      children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "dialog-dark relative w-full max-w-md p-0", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between px-5 py-4 border-b border-border", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display text-lg font-semibold text-foreground", children: title }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "button",
            {
              type: "button",
              onClick: onClose,
              className: "p-1.5 rounded-md text-muted-foreground hover:text-foreground hover:bg-muted transition-colors duration-200",
              "aria-label": "Close dialog",
              "data-ocid": "payment.close_button",
              children: /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "size-4" })
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "px-5 py-5 space-y-5", children: [
          !linkedWalletQuery.isLoading && !linkedWallet && /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "div",
            {
              className: "flex flex-col items-center text-center py-6 px-2 space-y-5",
              "data-ocid": "payment.link_wallet_prompt",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "div",
                  {
                    className: "p-5 rounded-full",
                    style: {
                      background: "var(--color-red-subtle)",
                      border: "1px solid var(--color-border-red)",
                      boxShadow: "0 0 24px var(--color-red-glow)"
                    },
                    children: /* @__PURE__ */ jsxRuntimeExports.jsx(Wallet, { className: "size-10 text-accent-red" })
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-3 max-w-xs", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("h3", { className: "font-display text-2xl font-bold text-foreground", children: [
                    "Link Your ",
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-accent-red", children: "Wallet" }),
                    " First"
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground leading-relaxed", children: "To buy articles, connect your NNS wallet in your profile. Payments are verified by which wallet sends them." })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Button,
                  {
                    asChild: true,
                    style: {
                      backgroundColor: "oklch(0.7 0.18 145)",
                      color: "oklch(0.08 0 0)",
                      boxShadow: "0 0 24px -6px oklch(0.7 0.18 145 / 0.6)"
                    },
                    className: "w-full max-w-xs hover:opacity-90 font-semibold h-12 text-base",
                    children: /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/profile", onClick: onClose, children: "Go to Profile →" })
                  }
                )
              ]
            }
          ),
          linkedWalletQuery.isLoading && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 text-muted-foreground", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "size-4 animate-spin shrink-0" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm", children: "Checking your account…" })
          ] }),
          linkedWallet && isCreating && /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "div",
            {
              className: "flex items-center gap-3 text-muted-foreground",
              "data-ocid": "payment.loading_state",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "size-4 animate-spin shrink-0" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm", children: "Preparing payment…" })
              ]
            }
          ),
          linkedWallet && createError && /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "div",
            {
              className: "rounded-lg border border-destructive/40 bg-destructive/10 px-4 py-3 space-y-3",
              "data-ocid": "payment.error_state",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-destructive", children: createError }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Button,
                  {
                    size: "sm",
                    variant: "outline",
                    onClick: () => {
                      setCreateError(null);
                      const pt = paymentTypeRef.current;
                      const aid = articleIdRef.current;
                      const payType = pt === "unlock" && aid !== void 0 ? { __kind__: "ArticleUnlock", ArticleUnlock: aid } : { __kind__: "Subscription", Subscription: null };
                      createMutateRef.current(payType, {
                        onSuccess: (data) => setReq(data),
                        onError: (err) => setCreateError(err.message)
                      });
                    },
                    "data-ocid": "payment.retry_button",
                    children: "Try Again"
                  }
                )
              ]
            }
          ),
          linkedWallet && req && !createError && /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-lg border border-accent/40 bg-accent/5 px-3 py-2 flex items-center gap-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheckBig, { className: "size-4 text-accent shrink-0" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0 flex-1", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs font-medium text-muted-foreground", children: "Paying from linked wallet" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs font-mono text-foreground break-all", children: linkedWallet.toString() })
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm text-foreground/80 leading-relaxed", children: [
              "From your linked NNS wallet, send the amount below to this address. Then click ",
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-medium", children: "Check Payment" }),
              "."
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs font-medium text-muted-foreground uppercase tracking-wider", children: "Destination Principal" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start gap-2", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "code",
                  {
                    className: "flex-1 min-w-0 break-all text-xs bg-muted border border-border rounded px-3 py-2 text-foreground font-mono leading-relaxed",
                    "data-ocid": "payment.destination_principal",
                    children: DESTINATION_PRINCIPAL
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(CopyButton, { value: DESTINATION_PRINCIPAL, label: "principal" })
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs font-medium text-muted-foreground uppercase tracking-wider", children: "Amount" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "span",
                  {
                    className: "flex-1 text-sm text-foreground font-medium",
                    "data-ocid": "payment.amount_label",
                    children: amountLabel
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(CopyButton, { value: amountE8s, label: "amount" })
              ] })
            ] }),
            statusText && /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "div",
              {
                className: `text-sm font-medium text-center py-2 px-3 rounded-lg border ${isGranted ? "border-accent/40 bg-accent/10 text-accent" : pollingStatus === "not_found" ? "border-destructive/40 bg-destructive/10 text-destructive" : "border-border bg-muted text-muted-foreground"}`,
                "data-ocid": "payment.status_text",
                children: [
                  isGranted && /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheckBig, { className: "size-4 inline mr-1.5 -mt-0.5" }),
                  statusText
                ]
              }
            ),
            showContinue && /* @__PURE__ */ jsxRuntimeExports.jsx(
              "button",
              {
                type: "button",
                className: "btn-accent w-full h-11 text-base font-semibold",
                onClick: () => {
                  onSuccessRef.current();
                  onCloseRef.current();
                },
                children: "Read Article →"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              Button,
              {
                type: "button",
                onClick: () => window.open(
                  "https://nns.ic0.app",
                  "_blank",
                  "noopener,noreferrer"
                ),
                className: "btn-ghost-red w-full h-11",
                "data-ocid": "payment.open_nns_button",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(ExternalLink, { className: "size-4 mr-2" }),
                  "Open NNS Wallet"
                ]
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground text-center -mt-2", children: "Opens in a new tab. Paste the destination and amount, send, then come back here." }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Button,
              {
                className: "btn-primary w-full h-11",
                disabled: isPolling || pollingStatus === "pending" || isGranted,
                onClick: doVerify,
                "data-ocid": "payment.check_button",
                children: isPolling || pollingStatus === "pending" ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "size-4 mr-2 animate-spin" }),
                  "Checking…"
                ] }) : "Check Payment"
              }
            )
          ] })
        ] })
      ] })
    }
  );
}
function ArticleSkeleton() {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "animate-pulse", "data-ocid": "article.loading_state", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-full aspect-[21/9] bg-muted mb-10" }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-[760px] mx-auto px-4 sm:px-6 space-y-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-3 w-20 bg-muted rounded" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-10 w-4/5 bg-muted rounded" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-6 w-3/4 bg-muted rounded" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-3 w-32 bg-muted rounded" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Separator, { className: "my-6" }),
      [1, 2, 3, 4].map((i) => /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-4 w-full bg-muted rounded" }, i))
    ] })
  ] });
}
function CoverImage({ article }) {
  const imgSrc = article.coverImage ? article.coverImage.getDirectURL() : null;
  if (!imgSrc) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-full aspect-[21/9] bg-muted flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground text-sm font-medium uppercase tracking-wider", children: "NO COVER IMAGE" }) });
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-full aspect-[21/9] overflow-hidden bg-muted", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
    "img",
    {
      src: imgSrc,
      alt: article.title,
      className: "w-full h-full object-cover"
    }
  ) });
}
function AccessBanner({ access }) {
  if (access.isSubscribed && access.subscription) {
    const expiry = formatTimestamp(access.subscription.expiryTime);
    return /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        className: "flex items-center gap-2 px-3 py-1.5 rounded border border-primary/30 bg-primary/10 text-primary text-[10px] font-medium uppercase tracking-wider",
        "data-ocid": "article.subscription_status",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Crown, { className: "size-3" }),
          "SUBSCRIBED · ACTIVE UNTIL ",
          expiry.toUpperCase()
        ]
      }
    );
  }
  return null;
}
function Paywall({
  isAuthenticated,
  onLogin,
  onUnlock
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: "mt-8 rounded-lg border border-border bg-card overflow-hidden",
      "data-ocid": "article.paywall_section",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-24 bg-gradient-to-b from-transparent to-card -mt-24 relative z-10 pointer-events-none" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "px-6 py-8 space-y-6", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col items-center text-center gap-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "p-3 rounded-full bg-primary/10 border border-primary/30", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Lock, { className: "size-6 text-primary" }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display text-xl text-foreground mb-1", children: "This is a Premium Article" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground max-w-sm", children: "This article is available to HERO token holders. Sign in to check your access." })
            ] })
          ] }),
          !isAuthenticated && /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "div",
            {
              className: "rounded border border-primary/20 bg-primary/5 px-4 py-3 text-center",
              "data-ocid": "article.login_prompt",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-foreground mb-3", children: "Sign in with Internet Identity to access premium content." }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Button,
                  {
                    onClick: onLogin,
                    className: "bg-primary text-primary-foreground hover:bg-primary/90",
                    "data-ocid": "article.login_button",
                    children: "Sign In to Continue"
                  }
                )
              ]
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "div",
            {
              className: "card-red p-6 flex flex-col gap-4 w-full max-w-sm",
              "data-ocid": "article.unlock_option_card",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-accent-red text-xs mb-1 font-bold uppercase tracking-wider", children: "ONE-TIME ACCESS" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-display text-3xl font-bold text-accent-red", children: "1 HERO" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mt-1", children: "Permanently unlock this article for your account." })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  Button,
                  {
                    disabled: !isAuthenticated,
                    className: "btn-primary w-full disabled:opacity-40 text-base font-semibold h-11",
                    onClick: onUnlock,
                    "data-ocid": "article.unlock_article_button",
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(LockOpen, { className: "size-4 mr-2" }),
                      "Unlock for 1 HERO"
                    ]
                  }
                )
              ]
            }
          ) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-center text-muted-foreground/60 text-xs", children: "Payments use HERO token (ICRC-1) on the Internet Computer." })
        ] })
      ]
    }
  );
}
function ArticleTeaser({ content }) {
  const ref = reactExports.useRef(null);
  reactExports.useEffect(() => {
    if (ref.current) ref.current.innerHTML = content.slice(0, 800);
  }, [content]);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "div",
      {
        ref,
        className: "line-clamp-4 text-foreground/70 leading-relaxed font-body text-base"
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-background to-transparent pointer-events-none" })
  ] });
}
function ArticleBody({ content }) {
  const ref = reactExports.useRef(null);
  reactExports.useEffect(() => {
    if (ref.current) ref.current.innerHTML = content;
  }, [content]);
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "div",
    {
      ref,
      className: "prose prose-sm sm:prose-base max-w-none\n        prose-headings:font-display prose-headings:text-foreground\n        prose-p:text-foreground prose-p:leading-relaxed\n        prose-a:text-primary prose-a:no-underline hover:prose-a:underline\n        prose-strong:text-foreground\n        prose-code:text-primary prose-code:bg-muted prose-code:px-1 prose-code:py-0.5 prose-code:rounded\n        prose-pre:bg-card prose-pre:border prose-pre:border-border\n        prose-blockquote:border-primary/40 prose-blockquote:text-muted-foreground\n        prose-img:rounded-lg prose-img:border prose-img:border-border\n        prose-hr:border-border",
      "data-ocid": "article.body"
    }
  );
}
function Article() {
  const { id } = useParams({ from: "/article/$id" });
  const articleId = BigInt(id);
  const { isAuthenticated, login } = useIdentity();
  const queryClient = useQueryClient();
  const [paymentModal, setPaymentModal] = reactExports.useState(null);
  const {
    data: article,
    isLoading: articleLoading,
    error: articleError
  } = useArticle(articleId);
  const { data: userAccess, isLoading: accessLoading } = useUserAccess();
  const isLoading = articleLoading || isAuthenticated && accessLoading;
  function hasAccess() {
    if (!(article == null ? void 0 : article.isPremium)) return true;
    if (!userAccess) return false;
    if (userAccess.isSubscribed) return true;
    return userAccess.unlockedArticleIds.some((uid) => uid === articleId);
  }
  if (isLoading) return /* @__PURE__ */ jsxRuntimeExports.jsx(ArticleSkeleton, {});
  if (articleError || !article) {
    return /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        className: "max-w-[760px] mx-auto px-4 sm:px-6 py-24 text-center",
        "data-ocid": "article.error_state",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(CircleAlert, { className: "size-10 text-destructive mx-auto mb-4" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display text-xl text-foreground mb-2", children: "Article Not Found" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground mb-6", children: "This article could not be loaded or does not exist." }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { variant: "outline", "data-ocid": "article.back_button", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowLeft, { className: "size-4 mr-2" }),
            "Back to Blog"
          ] }) })
        ]
      }
    );
  }
  const canRead = hasAccess();
  const isPremium = article.isPremium;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("article", { "data-ocid": "article.page", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      motion.div,
      {
        initial: { opacity: 0 },
        animate: { opacity: 1 },
        transition: { duration: 0.6 },
        children: /* @__PURE__ */ jsxRuntimeExports.jsx(CoverImage, { article })
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-[760px] mx-auto px-4 sm:px-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        motion.div,
        {
          initial: { opacity: 0, y: 20 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.5, delay: 0.15 },
          className: "pt-8 pb-4",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              Link,
              {
                to: "/",
                className: "inline-flex items-center gap-1.5 text-muted-foreground hover:text-foreground transition-colors duration-200 mb-6 text-xs font-medium",
                "data-ocid": "article.back_link",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowLeft, { className: "size-3.5" }),
                  "Back to Blog"
                ]
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap items-center gap-2 mb-4", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(CategoryBadge, { category: article.category }),
              isPremium ? /* @__PURE__ */ jsxRuntimeExports.jsx(PremiumBadge, {}) : /* @__PURE__ */ jsxRuntimeExports.jsx(FreeBadge, {}),
              isAuthenticated && userAccess && /* @__PURE__ */ jsxRuntimeExports.jsx(AccessBanner, { access: userAccess })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "h1",
              {
                className: "font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground leading-tight tracking-tight mb-4",
                "data-ocid": "article.title",
                children: article.title
              }
            ),
            article.excerpt && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-lg text-muted-foreground leading-relaxed mb-5 font-body", children: article.excerpt }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap items-center gap-4 text-muted-foreground mb-8", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-1.5 text-xs", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(CalendarDays, { className: "size-3.5" }),
                formatTimestamp(article.createdAt)
              ] }),
              article.tags.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-1.5 text-xs", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Tag, { className: "size-3.5" }),
                article.tags.join(", ")
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Separator, { className: "mb-8" })
          ]
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        motion.div,
        {
          initial: { opacity: 0, y: 16 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.5, delay: 0.3 },
          className: "pb-16",
          children: canRead ? /* @__PURE__ */ jsxRuntimeExports.jsx(ArticleBody, { content: article.content }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
            article.content && /* @__PURE__ */ jsxRuntimeExports.jsx(ArticleTeaser, { content: article.content }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Paywall,
              {
                isAuthenticated,
                onLogin: login,
                onUnlock: () => setPaymentModal({ type: "unlock", articleId })
              }
            )
          ] })
        }
      )
    ] }),
    paymentModal && /* @__PURE__ */ jsxRuntimeExports.jsx(
      PaymentDialog,
      {
        open: true,
        onClose: () => setPaymentModal(null),
        paymentType: paymentModal.type,
        articleId: paymentModal.articleId,
        onSuccess: () => {
          setPaymentModal(null);
          queryClient.invalidateQueries({ queryKey: ["userAccess"] });
          queryClient.invalidateQueries({ queryKey: ["article"] });
          queryClient.invalidateQueries({ queryKey: ["articleCard"] });
        }
      }
    )
  ] });
}
export {
  Article as default
};
