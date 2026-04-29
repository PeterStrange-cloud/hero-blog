import { e as createLucideIcon, r as reactExports, j as jsxRuntimeExports, o as cn, a as useIdentity, N as useGetLinkedWallet, a9 as useCreatePaymentRequest, aa as useVerifyPaymentRequest, ab as X, B as Button, K as Link, L as LoaderCircle, ac as CircleAlert, i as useParams, ad as useQueryClient, k as useArticle, s as useUserAccess, ae as motion, C as CategoryBadge, w as PremiumBadge, F as FreeBadge, Y as formatTimestamp, af as Lock } from "./index-DWdWli5p.js";
import { P as Primitive } from "./index-kA6Ma8LT.js";
import { W as Wallet } from "./wallet-C_iGbKZW.js";
import { C as CircleCheckBig } from "./circle-check-big-8SGyceix.js";
import { C as Copy } from "./copy-DAAXMIcC.js";
import { A as ArrowLeft } from "./arrow-left-gh1Ywqa3.js";
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
class EmailJSResponseStatus {
  constructor(_status = 0, _text = "Network Error") {
    this.status = _status;
    this.text = _text;
  }
}
const createWebStorage = () => {
  if (typeof localStorage === "undefined")
    return;
  return {
    get: (key) => Promise.resolve(localStorage.getItem(key)),
    set: (key, value) => Promise.resolve(localStorage.setItem(key, value)),
    remove: (key) => Promise.resolve(localStorage.removeItem(key))
  };
};
const store = {
  origin: "https://api.emailjs.com",
  blockHeadless: false,
  storageProvider: createWebStorage()
};
const buildOptions = (options) => {
  if (!options)
    return {};
  if (typeof options === "string") {
    return {
      publicKey: options
    };
  }
  if (options.toString() === "[object Object]") {
    return options;
  }
  return {};
};
const init = (options, origin = "https://api.emailjs.com") => {
  if (!options)
    return;
  const opts = buildOptions(options);
  store.publicKey = opts.publicKey;
  store.blockHeadless = opts.blockHeadless;
  store.storageProvider = opts.storageProvider;
  store.blockList = opts.blockList;
  store.limitRate = opts.limitRate;
  store.origin = opts.origin || origin;
};
const sendPost = async (url, data, headers = {}) => {
  const response = await fetch(store.origin + url, {
    method: "POST",
    headers,
    body: data
  });
  const message = await response.text();
  const responseStatus = new EmailJSResponseStatus(response.status, message);
  if (response.ok) {
    return responseStatus;
  }
  throw responseStatus;
};
const validateParams = (publicKey, serviceID, templateID) => {
  if (!publicKey || typeof publicKey !== "string") {
    throw "The public key is required. Visit https://dashboard.emailjs.com/admin/account";
  }
  if (!serviceID || typeof serviceID !== "string") {
    throw "The service ID is required. Visit https://dashboard.emailjs.com/admin";
  }
  if (!templateID || typeof templateID !== "string") {
    throw "The template ID is required. Visit https://dashboard.emailjs.com/admin/templates";
  }
};
const validateTemplateParams = (templateParams) => {
  if (templateParams && templateParams.toString() !== "[object Object]") {
    throw "The template params have to be the object. Visit https://www.emailjs.com/docs/sdk/send/";
  }
};
const isHeadless = (navigator2) => {
  return navigator2.webdriver || !navigator2.languages || navigator2.languages.length === 0;
};
const headlessError = () => {
  return new EmailJSResponseStatus(451, "Unavailable For Headless Browser");
};
const validateBlockListParams = (list, watchVariable) => {
  if (!Array.isArray(list)) {
    throw "The BlockList list has to be an array";
  }
  if (typeof watchVariable !== "string") {
    throw "The BlockList watchVariable has to be a string";
  }
};
const isBlockListDisabled = (options) => {
  var _a;
  return !((_a = options.list) == null ? void 0 : _a.length) || !options.watchVariable;
};
const getValue = (data, name) => {
  return data instanceof FormData ? data.get(name) : data[name];
};
const isBlockedValueInParams = (options, params) => {
  if (isBlockListDisabled(options))
    return false;
  validateBlockListParams(options.list, options.watchVariable);
  const value = getValue(params, options.watchVariable);
  if (typeof value !== "string")
    return false;
  return options.list.includes(value);
};
const blockedEmailError = () => {
  return new EmailJSResponseStatus(403, "Forbidden");
};
const validateLimitRateParams = (throttle, id) => {
  if (typeof throttle !== "number" || throttle < 0) {
    throw "The LimitRate throttle has to be a positive number";
  }
  if (id && typeof id !== "string") {
    throw "The LimitRate ID has to be a non-empty string";
  }
};
const getLeftTime = async (id, throttle, storage) => {
  const lastTime = Number(await storage.get(id) || 0);
  return throttle - Date.now() + lastTime;
};
const isLimitRateHit = async (defaultID, options, storage) => {
  if (!options.throttle || !storage) {
    return false;
  }
  validateLimitRateParams(options.throttle, options.id);
  const id = options.id || defaultID;
  const leftTime = await getLeftTime(id, options.throttle, storage);
  if (leftTime > 0) {
    return true;
  }
  await storage.set(id, Date.now().toString());
  return false;
};
const limitRateError = () => {
  return new EmailJSResponseStatus(429, "Too Many Requests");
};
const send = async (serviceID, templateID, templateParams, options) => {
  const opts = buildOptions(options);
  const publicKey = opts.publicKey || store.publicKey;
  const blockHeadless = opts.blockHeadless || store.blockHeadless;
  const storageProvider = opts.storageProvider || store.storageProvider;
  const blockList = { ...store.blockList, ...opts.blockList };
  const limitRate = { ...store.limitRate, ...opts.limitRate };
  if (blockHeadless && isHeadless(navigator)) {
    return Promise.reject(headlessError());
  }
  validateParams(publicKey, serviceID, templateID);
  validateTemplateParams(templateParams);
  if (templateParams && isBlockedValueInParams(blockList, templateParams)) {
    return Promise.reject(blockedEmailError());
  }
  if (await isLimitRateHit(location.pathname, limitRate, storageProvider)) {
    return Promise.reject(limitRateError());
  }
  const params = {
    lib_version: "4.4.1",
    user_id: publicKey,
    service_id: serviceID,
    template_id: templateID,
    template_params: templateParams
  };
  return sendPost("/api/v1.0/email/send", JSON.stringify(params), {
    "Content-type": "application/json"
  });
};
const validateForm = (form) => {
  if (!form || form.nodeName !== "FORM") {
    throw "The 3rd parameter is expected to be the HTML form element or the style selector of the form";
  }
};
const findHTMLForm = (form) => {
  return typeof form === "string" ? document.querySelector(form) : form;
};
const sendForm = async (serviceID, templateID, form, options) => {
  const opts = buildOptions(options);
  const publicKey = opts.publicKey || store.publicKey;
  const blockHeadless = opts.blockHeadless || store.blockHeadless;
  const storageProvider = store.storageProvider || opts.storageProvider;
  const blockList = { ...store.blockList, ...opts.blockList };
  const limitRate = { ...store.limitRate, ...opts.limitRate };
  if (blockHeadless && isHeadless(navigator)) {
    return Promise.reject(headlessError());
  }
  const currentForm = findHTMLForm(form);
  validateParams(publicKey, serviceID, templateID);
  validateForm(currentForm);
  const formData = new FormData(currentForm);
  if (isBlockedValueInParams(blockList, formData)) {
    return Promise.reject(blockedEmailError());
  }
  if (await isLimitRateHit(location.pathname, limitRate, storageProvider)) {
    return Promise.reject(limitRateError());
  }
  formData.append("lib_version", "4.4.1");
  formData.append("service_id", serviceID);
  formData.append("template_id", templateID);
  formData.append("user_id", publicKey);
  return sendPost("/api/v1.0/email/send-form", formData);
};
const emailjs = {
  init,
  send,
  sendForm,
  EmailJSResponseStatus
};
const DESTINATION_PRINCIPAL = "7ipgs-pmuew-kn3oz-4am7i-j6qth-hk7fo-tb3hc-rk32c-pnef2-ys2cd-rqe";
const MAX_ATTEMPTS = 6;
const POLL_INTERVAL_MS = 5e3;
const EMAILJS_SERVICE_ID = "service_3u7y69m";
const EMAILJS_TEMPLATE_ID = "template_g28r8kh";
const EMAILJS_PUBLIC_KEY = "xyn0cRGcP8ycI5x6Z";
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
      "aria-label": "Copy " + label,
      children: [
        copied ? /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheckBig, { className: "size-3 text-primary" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Copy, { className: "size-3" }),
        copied ? "Copied" : "Copy"
      ]
    }
  );
}
function IssueForm({ principalStr, onClose }) {
  const [nnsWallet, setNnsWallet] = reactExports.useState("");
  const [userEmail, setUserEmail] = reactExports.useState("");
  const [issue, setIssue] = reactExports.useState("");
  const [sending, setSending] = reactExports.useState(false);
  const [sent, setSent] = reactExports.useState(false);
  const [error, setError] = reactExports.useState(null);
  const handleSend = async () => {
    if (!issue.trim() || !nnsWallet.trim()) return;
    setSending(true);
    setError(null);
    try {
      await emailjs.send(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        { name: principalStr || "Unknown", username: principalStr || "Unknown", principal: principalStr || "Unknown", message: "NNS Wallet: " + nnsWallet + " | Email: " + (userEmail || "not provided") + " | Issue: " + issue, email: userEmail || "noreply@heroblog.io", title: "Payment Issue" },
        EMAILJS_PUBLIC_KEY
      );
      setSent(true);
    } catch {
      setError("Failed to send. Please try again.");
    } finally {
      setSending(false);
    }
  };
  if (sent) {
    return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center py-6 space-y-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheckBig, { className: "size-10 text-primary mx-auto" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-display text-lg font-semibold text-foreground", children: "Message sent" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: "We will review your issue and get back to you." }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { className: "btn-primary w-full", onClick: onClose, children: "Close" })
    ] });
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs font-medium text-muted-foreground uppercase tracking-wider mb-1", children: "Your Blog Principal (auto-filled)" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs font-mono text-foreground bg-muted border border-border rounded px-3 py-2 break-all", children: principalStr || "Not available" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs font-medium text-muted-foreground uppercase tracking-wider mb-1", children: [
        "Your Email (so we can reply) ",
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-destructive", children: "*" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "input",
        {
          type: "email",
          value: userEmail,
          onChange: (e) => setUserEmail(e.target.value),
          placeholder: "your@email.com",
          className: "w-full text-sm bg-muted border border-border rounded px-3 py-2 text-foreground placeholder:text-muted-foreground outline-none focus:border-primary"
        }
      )
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs font-medium text-muted-foreground uppercase tracking-wider mb-1", children: [
        "Your NNS Wallet Principal ",
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-destructive", children: "*" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "input",
        {
          type: "text",
          value: nnsWallet,
          onChange: (e) => setNnsWallet(e.target.value),
          placeholder: "Paste your NNS wallet principal",
          className: "w-full text-xs font-mono bg-muted border border-border rounded px-3 py-2 text-foreground placeholder:text-muted-foreground outline-none focus:border-primary"
        }
      )
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs font-medium text-muted-foreground uppercase tracking-wider mb-1", children: [
        "Describe your issue ",
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-destructive", children: "*" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "textarea",
        {
          value: issue,
          onChange: (e) => setIssue(e.target.value),
          placeholder: "e.g. I sent 2 HERO instead of 1, transaction block xxxxxx",
          rows: 4,
          className: "w-full text-sm bg-muted border border-border rounded px-3 py-2 text-foreground placeholder:text-muted-foreground outline-none focus:border-primary resize-none"
        }
      )
    ] }),
    error && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-destructive", children: error }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { className: "btn-primary w-full", disabled: sending || !issue.trim() || !nnsWallet.trim() || !userEmail.trim(), onClick: handleSend, children: sending ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "size-4 mr-2 animate-spin" }),
      "Sending..."
    ] }) : "Send Report" })
  ] });
}
function PaymentDialog({ open, onClose, paymentType, articleId, onSuccess }) {
  const [req, setReq] = reactExports.useState(null);
  const [createError, setCreateError] = reactExports.useState(null);
  const [pollingStatus, setPollingStatus] = reactExports.useState("idle");
  const [showContinue, setShowContinue] = reactExports.useState(false);
  const [showIssueForm, setShowIssueForm] = reactExports.useState(false);
  const pollingRef = reactExports.useRef(null);
  const attemptRef = reactExports.useRef(0);
  const { principal } = useIdentity();
  const principalStr = (principal == null ? void 0 : principal.toString()) ?? "";
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
      setShowIssueForm(false);
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
  const verifyMutateAsyncRef = reactExports.useRef(verifyMutation.mutateAsync);
  verifyMutateAsyncRef.current = verifyMutation.mutateAsync;
  const onSuccessRef = reactExports.useRef(onSuccess);
  onSuccessRef.current = onSuccess;
  const onCloseRef = reactExports.useRef(onClose);
  onCloseRef.current = onClose;
  const doVerify = reactExports.useCallback(() => {
    if (!req) return;
    setPollingStatus("pending");
    setShowIssueForm(false);
    attemptRef.current = 0;
    const tick = async () => {
      attemptRef.current += 1;
      const attempt = attemptRef.current;
      setPollingStatus({ attempt });
      try {
        await verifyMutateAsyncRef.current(req.id);
        stopPolling();
        setPollingStatus("granted");
        setShowContinue(true);
      } catch {
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
  const title = showIssueForm ? "Having an issue?" : "Unlock with HERO";
  const amountLabel = "1 HERO (100,000,000 e8s)";
  const amountE8s = "100000000";
  const isPolling = typeof pollingStatus === "object" && "attempt" in pollingStatus;
  const isGranted = pollingStatus === "granted";
  const isFailed = pollingStatus === "not_found";
  let statusText = "";
  if (pollingStatus === "pending") statusText = "Pending...";
  else if (isPolling) statusText = "Checking (attempt " + pollingStatus.attempt + " of " + MAX_ATTEMPTS + ")...";
  else if (isGranted) statusText = "Article unlocked — Thank you!";
  else if (isFailed) statusText = "Payment not detected. Please ensure you sent exactly 1 HERO from your linked wallet.";
  return /* @__PURE__ */ jsxRuntimeExports.jsx("dialog", { "aria-label": title, open: true, className: "fixed inset-0 z-50 flex items-center justify-center p-4 w-full h-full max-w-none m-0 bg-transparent border-0 outline-none", style: { background: "rgba(0,0,0,0.7)" }, children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "dialog-dark relative w-full max-w-md p-0", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between px-5 py-4 border-b border-border", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display text-lg font-semibold text-foreground", children: title }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("button", { type: "button", onClick: onClose, className: "p-1.5 rounded-md text-muted-foreground hover:text-foreground hover:bg-muted transition-colors duration-200", "aria-label": "Close dialog", children: /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "size-4" }) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "px-5 py-5 space-y-5", children: [
      showIssueForm && /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(IssueForm, { principalStr, onClose }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("button", { type: "button", className: "text-xs text-muted-foreground hover:text-foreground underline", onClick: () => setShowIssueForm(false), children: "Back to payment" })
      ] }),
      !showIssueForm && /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
        !linkedWalletQuery.isLoading && !linkedWallet && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col items-center text-center py-6 px-2 space-y-5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "p-5 rounded-full", style: { background: "var(--color-red-subtle)", border: "1px solid var(--color-border-red)" }, children: /* @__PURE__ */ jsxRuntimeExports.jsx(Wallet, { className: "size-10 text-accent-red" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-3 max-w-xs", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("h3", { className: "font-display text-2xl font-bold text-foreground", children: [
              "Link Your ",
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-accent-red", children: "Wallet" }),
              " First"
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground leading-relaxed", children: "To buy articles, connect your NNS wallet in your profile." })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { asChild: true, style: { backgroundColor: "oklch(0.7 0.18 145)", color: "oklch(0.08 0 0)" }, className: "w-full max-w-xs font-semibold h-12 text-base", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/profile", onClick: onClose, children: "Go to Profile" }) })
        ] }),
        linkedWalletQuery.isLoading && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 text-muted-foreground", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "size-4 animate-spin shrink-0" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm", children: "Checking your account..." })
        ] }),
        linkedWallet && createMutation.isPending && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 text-muted-foreground", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "size-4 animate-spin shrink-0" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm", children: "Preparing payment..." })
        ] }),
        linkedWallet && createError && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-lg border border-destructive/40 bg-destructive/10 px-4 py-3 space-y-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-destructive", children: createError }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { size: "sm", variant: "outline", onClick: () => {
            setCreateError(null);
            const pt = paymentTypeRef.current;
            const aid = articleIdRef.current;
            const payType = pt === "unlock" && aid !== void 0 ? { __kind__: "ArticleUnlock", ArticleUnlock: aid } : { __kind__: "Subscription", Subscription: null };
            createMutateRef.current(payType, { onSuccess: (data) => setReq(data), onError: (err) => setCreateError(err.message) });
          }, children: "Try Again" })
        ] }),
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
              /* @__PURE__ */ jsxRuntimeExports.jsx("code", { className: "flex-1 min-w-0 break-all text-xs bg-muted border border-border rounded px-3 py-2 text-foreground font-mono leading-relaxed", children: DESTINATION_PRINCIPAL }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(CopyButton, { value: DESTINATION_PRINCIPAL, label: "principal" })
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs font-medium text-muted-foreground uppercase tracking-wider", children: "Amount" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "flex-1 text-sm text-foreground font-medium", children: amountLabel }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(CopyButton, { value: amountE8s, label: "amount" })
            ] })
          ] }),
          statusText && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-sm font-medium text-center py-2 px-3 rounded-lg border " + (isGranted ? "border-accent/40 bg-accent/10 text-accent" : isFailed ? "border-destructive/40 bg-destructive/10 text-destructive" : "border-border bg-muted text-muted-foreground"), children: [
            isGranted && /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheckBig, { className: "size-4 inline mr-1.5 -mt-0.5" }),
            isFailed && /* @__PURE__ */ jsxRuntimeExports.jsx(CircleAlert, { className: "size-4 inline mr-1.5 -mt-0.5" }),
            statusText
          ] }),
          showContinue && /* @__PURE__ */ jsxRuntimeExports.jsx("button", { type: "button", className: "btn-accent w-full h-11 text-base font-semibold", onClick: () => {
            onSuccessRef.current();
            onCloseRef.current();
          }, children: "Read Article" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { type: "button", onClick: () => window.open("https://nns.ic0.app", "_blank", "noopener,noreferrer"), className: "btn-ghost-red w-full h-11", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(ExternalLink, { className: "size-4 mr-2" }),
            "Open NNS Wallet"
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground text-center -mt-2", children: "Opens in a new tab. Paste the destination and amount, send, then come back here." }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { className: "btn-primary w-full h-11", disabled: isPolling || pollingStatus === "pending" || isGranted, onClick: doVerify, children: isPolling || pollingStatus === "pending" ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "size-4 mr-2 animate-spin" }),
            "Checking..."
          ] }) : "Check Payment" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-center pt-1", children: /* @__PURE__ */ jsxRuntimeExports.jsx("button", { type: "button", onClick: () => setShowIssueForm(true), className: "text-xs underline transition-colors " + (isFailed ? "text-destructive hover:text-destructive/80 font-medium" : "text-muted-foreground hover:text-foreground"), children: "Having an issue with the payment?" }) })
        ] })
      ] })
    ] })
  ] }) });
}
function ArticleSkeleton() {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "animate-pulse", "data-ocid": "article.loading_state", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "max-w-[760px] mx-auto aspect-[4/3] max-h-[360px] bg-muted mb-10" }),
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
    return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "max-w-[760px] mx-auto aspect-[4/3] max-h-[360px] bg-muted flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground text-sm font-medium uppercase tracking-wider", children: "NO COVER IMAGE" }) });
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "max-w-[760px] mx-auto aspect-[4/3] max-h-[360px] overflow-hidden bg-muted rounded-lg", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
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
