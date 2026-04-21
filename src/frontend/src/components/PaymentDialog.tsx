import { Button } from "@/components/ui/button";
import { CheckCircle, Copy, ExternalLink, Loader2, Wallet, X } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";
import { Link } from "@tanstack/react-router";
import type { PaymentRequest, PaymentType } from "../backend";
import {
  useCreatePaymentRequest,
  useVerifyPaymentRequest,
  useUserAccess,
  useGetLinkedWallet,
} from "../hooks/useQueries";

const DESTINATION_PRINCIPAL =
  "7ipgs-pmuew-kn3oz-4am7i-j6qth-hk7fo-tb3hc-rk32c-pnef2-ys2cd-rqe";
const MAX_ATTEMPTS = 24;
const POLL_INTERVAL_MS = 5_000;

interface PaymentDialogProps {
  open: boolean;
  onClose: () => void;
  paymentType: "unlock" | "subscribe";
  articleId?: bigint;
  onSuccess: () => void;
}

type PollingStatus =
  | "idle"
  | "pending"
  | { attempt: number }
  | "granted"
  | "not_found";

function CopyButton({ value, label }: { value: string; label: string }) {
  const [copied, setCopied] = useState(false);
  const handleCopy = () => {
    navigator.clipboard.writeText(value).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    });
  };
  return (
    <button
      type="button"
      onClick={handleCopy}
      className="inline-flex items-center gap-1 text-xs px-2 py-1 rounded border border-border bg-muted hover:bg-muted/70 text-muted-foreground hover:text-foreground transition-colors duration-200 shrink-0"
      aria-label={`Copy ${label}`}
      data-ocid={`payment.copy_${label.toLowerCase().replace(/\s/g, "_")}`}
    >
      {copied ? (
        <CheckCircle className="size-3 text-primary" />
      ) : (
        <Copy className="size-3" />
      )}
      {copied ? "Copied" : "Copy"}
    </button>
  );
}

export function PaymentDialog({
  open,
  onClose,
  paymentType,
  articleId,
  onSuccess,
}: PaymentDialogProps) {
  const [req, setReq] = useState<PaymentRequest | null>(null);
  const [createError, setCreateError] = useState<string | null>(null);
  const [pollingStatus, setPollingStatus] = useState<PollingStatus>("idle");
  const pollingRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const attemptRef = useRef(0);

  const userAccessQuery = useUserAccess();
  const linkedWalletQuery = useGetLinkedWallet();
  const linkedWallet = linkedWalletQuery.data ?? null;

  const paymentTypeRef = useRef(paymentType);
  const articleIdRef = useRef(articleId);
  paymentTypeRef.current = paymentType;
  articleIdRef.current = articleId;

  const createMutation = useCreatePaymentRequest();
  const verifyMutation = useVerifyPaymentRequest();

  const stopPolling = useCallback(() => {
    if (pollingRef.current !== null) {
      clearInterval(pollingRef.current);
      pollingRef.current = null;
    }
    attemptRef.current = 0;
  }, []);

  const createMutateRef = useRef(createMutation.mutate);
  createMutateRef.current = createMutation.mutate;

  const reqRef = useRef<PaymentRequest | null>(null);
  reqRef.current = req;
  const hasLinkedWallet = !!linkedWallet;

  useEffect(() => {
    if (!open) {
      setReq(null);
      setCreateError(null);
      setPollingStatus("idle");
      stopPolling();
      return;
    }
    if (!hasLinkedWallet) return;
    if (reqRef.current) return;
    let cancelled = false;
    const pt = paymentTypeRef.current;
    const aid = articleIdRef.current;
    const payType: PaymentType =
      pt === "unlock" && aid !== undefined
        ? { __kind__: "ArticleUnlock", ArticleUnlock: aid }
        : { __kind__: "Subscription", Subscription: null };
    createMutateRef.current(payType, {
      onSuccess: (data) => {
        if (!cancelled) setReq(data);
      },
      onError: (err) => {
        if (!cancelled) setCreateError(err.message);
      },
    });
    return () => {
      cancelled = true;
    };
  }, [open, stopPolling, hasLinkedWallet]);

  useEffect(() => {
    return () => stopPolling();
  }, [stopPolling]);

  const verifyMutateRef = useRef(verifyMutation.mutate);
  verifyMutateRef.current = verifyMutation.mutate;
  const onSuccessRef = useRef(onSuccess);
  onSuccessRef.current = onSuccess;
  const onCloseRef = useRef(onClose);
  onCloseRef.current = onClose;

  const doVerify = useCallback(() => {
    if (!req) return;
    setPollingStatus("pending");
    attemptRef.current = 0;

    const tick = () => {
      attemptRef.current += 1;
      const attempt = attemptRef.current;
      setPollingStatus({ attempt });

      verifyMutateRef.current(req.id, {
        onSuccess: () => {
          stopPolling();
          setPollingStatus("granted");
          setTimeout(() => {
            onSuccessRef.current();
            onCloseRef.current();
          }, 1500);
        },
        onError: () => {
          if (attempt >= MAX_ATTEMPTS) {
            stopPolling();
            setPollingStatus("not_found");
          }
        },
      });
    };

    tick();
    pollingRef.current = setInterval(tick, POLL_INTERVAL_MS);
  }, [req, stopPolling]);

  if (!open) return null;

  const isCreating = createMutation.isPending;
  const title = "Unlock with HERO";
  const amountLabel = "1 HERO (100,000,000 e8s)";
  const amountE8s = "100000000";

  const isPolling =
    typeof pollingStatus === "object" && "attempt" in pollingStatus;
  const isGranted = pollingStatus === "granted";

  let statusText = "";
  if (pollingStatus === "pending") statusText = "Pending…";
  else if (isPolling)
    statusText = `Checking (attempt ${(pollingStatus as { attempt: number }).attempt} of ${MAX_ATTEMPTS})…`;
  else if (isGranted) statusText = "Article unlocked — Thank you!";
  else if (pollingStatus === "not_found")
    statusText = "Payment not detected yet. Make sure you sent from your linked wallet. Click to try again.";

  return (
    <dialog
      aria-label={title}
      open
      className="fixed inset-0 z-50 flex items-center justify-center p-4 w-full h-full max-w-none m-0 bg-transparent border-0 outline-none"
      style={{ background: "rgba(0,0,0,0.7)" }}
      data-ocid="payment.dialog"
    >
      <div className="dialog-dark relative w-full max-w-md p-0">
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-border">
          <h2 className="font-display text-lg font-semibold text-foreground">
            {title}
          </h2>
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-md text-muted-foreground hover:text-foreground hover:bg-muted transition-colors duration-200"
            aria-label="Close dialog"
            data-ocid="payment.close_button"
          >
            <X className="size-4" />
          </button>
        </div>

        {/* Body */}
        <div className="px-5 py-5 space-y-5">
          {/* No linked wallet state */}
          {!linkedWalletQuery.isLoading && !linkedWallet && (
            <div
              className="flex flex-col items-center text-center py-6 px-2 space-y-5"
              data-ocid="payment.link_wallet_prompt"
            >
              <div
                className="p-5 rounded-full"
                style={{
                  background: "var(--color-red-subtle)",
                  border: "1px solid var(--color-border-red)",
                  boxShadow: "0 0 24px var(--color-red-glow)",
                }}
              >
                <Wallet className="size-10 text-accent-red" />
              </div>
              <div className="space-y-3 max-w-xs">
                <h3 className="font-display text-2xl font-bold text-foreground">
                  Link Your <span className="text-accent-red">Wallet</span> First
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  To buy articles, connect your NNS or Oisy wallet in your profile.
                  Payments are verified by which wallet sends them.
                </p>
              </div>
              <Button
                asChild
                style={{
                  backgroundColor: "oklch(0.7 0.18 145)",
                  color: "oklch(0.08 0 0)",
                  boxShadow: "0 0 24px -6px oklch(0.7 0.18 145 / 0.6)",
                }}
                className="w-full max-w-xs hover:opacity-90 font-semibold h-12 text-base"
              >
                <Link to="/profile" onClick={onClose}>
                  Go to Profile →
                </Link>
              </Button>
            </div>
          )}

          {/* Loading user access */}
          {linkedWalletQuery.isLoading && (
            <div className="flex items-center gap-3 text-muted-foreground">
              <Loader2 className="size-4 animate-spin shrink-0" />
              <span className="text-sm">Checking your account…</span>
            </div>
          )}

          {/* Creating payment request */}
          {linkedWallet && isCreating && (
            <div
              className="flex items-center gap-3 text-muted-foreground"
              data-ocid="payment.loading_state"
            >
              <Loader2 className="size-4 animate-spin shrink-0" />
              <span className="text-sm">Preparing payment…</span>
            </div>
          )}

          {/* Error */}
          {linkedWallet && createError && (
            <div
              className="rounded-lg border border-destructive/40 bg-destructive/10 px-4 py-3 space-y-3"
              data-ocid="payment.error_state"
            >
              <p className="text-sm text-destructive">{createError}</p>
              <Button
                size="sm"
                variant="outline"
                onClick={() => {
                  setCreateError(null);
                  const pt = paymentTypeRef.current;
                  const aid = articleIdRef.current;
                  const payType: PaymentType =
                    pt === "unlock" && aid !== undefined
                      ? { __kind__: "ArticleUnlock", ArticleUnlock: aid }
                      : { __kind__: "Subscription", Subscription: null };
                  createMutateRef.current(payType, {
                    onSuccess: (data) => setReq(data),
                    onError: (err) => setCreateError(err.message),
                  });
                }}
                data-ocid="payment.retry_button"
              >
                Try Again
              </Button>
            </div>
          )}

          {/* Ready to pay */}
          {linkedWallet && req && !createError && (
            <>
              {/* Linked wallet confirmation */}
              <div className="rounded-lg border border-accent/40 bg-accent/5 px-3 py-2 flex items-center gap-2">
                <CheckCircle className="size-4 text-accent shrink-0" />
                <div className="min-w-0 flex-1">
                  <p className="text-xs font-medium text-muted-foreground">
                    Paying from linked wallet
                  </p>
                  <p className="text-xs font-mono text-foreground break-all">
                    {linkedWallet.toString()}
                  </p>
                </div>
              </div>

              {/* Instruction */}
              <p className="text-sm text-foreground/80 leading-relaxed">
                From your linked NNS or Oisy wallet, send the amount below to this
                address. Then click <span className="font-medium">Check Payment</span>.
              </p>

              {/* Destination Principal */}
              <div className="space-y-1.5">
                <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
                  Destination Principal
                </p>
                <div className="flex items-start gap-2">
                  <code
                    className="flex-1 min-w-0 break-all text-xs bg-muted border border-border rounded px-3 py-2 text-foreground font-mono leading-relaxed"
                    data-ocid="payment.destination_principal"
                  >
                    {DESTINATION_PRINCIPAL}
                  </code>
                  <CopyButton value={DESTINATION_PRINCIPAL} label="principal" />
                </div>
              </div>

              {/* Amount */}
              <div className="space-y-1.5">
                <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
                  Amount
                </p>
                <div className="flex items-center gap-2">
                  <span
                    className="flex-1 text-sm text-foreground font-medium"
                    data-ocid="payment.amount_label"
                  >
                    {amountLabel}
                  </span>
                  <CopyButton value={amountE8s} label="amount" />
                </div>
              </div>

              {/* Status */}
              {statusText && (
                <div
                  className={`text-sm font-medium text-center py-2 px-3 rounded-lg border ${
                    isGranted
                      ? "border-accent/40 bg-accent/10 text-accent"
                      : pollingStatus === "not_found"
                        ? "border-destructive/40 bg-destructive/10 text-destructive"
                        : "border-border bg-muted text-muted-foreground"
                  }`}
                  data-ocid="payment.status_text"
                >
                  {isGranted && (
                    <CheckCircle className="size-4 inline mr-1.5 -mt-0.5" />
                  )}
                  {statusText}
                </div>
              )}

              {/* Open NNS Wallet button */}
              <Button
                type="button"
                onClick={() =>
                  window.open(
                    "https://nns.ic0.app",
                    "_blank",
                    "noopener,noreferrer",
                  )
                }
                className="btn-ghost-red w-full h-11"
                data-ocid="payment.open_nns_button"
              >
                <ExternalLink className="size-4 mr-2" />
                Open NNS Wallet
              </Button>
              <p className="text-xs text-muted-foreground text-center -mt-2">
                Opens in a new tab. Paste the destination and amount, send,
                then come back here.
              </p>

              {/* Check Payment button */}
              <Button
                className="btn-primary w-full h-11"
                disabled={isPolling || pollingStatus === "pending" || isGranted}
                onClick={doVerify}
                data-ocid="payment.check_button"
              >
                {isPolling || pollingStatus === "pending" ? (
                  <>
                    <Loader2 className="size-4 mr-2 animate-spin" />
                    Checking…
                  </>
                ) : (
                  "Check Payment"
                )}
              </Button>
            </>
          )}
        </div>
      </div>
    </dialog>
  );
}
