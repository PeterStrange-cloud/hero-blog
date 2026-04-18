import { Button } from "@/components/ui/button";
import { CheckCircle, Copy, Loader2, X } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";
import type { PaymentRequest, PaymentType } from "../backend";
import {
  useCreatePaymentRequest,
  useVerifyPaymentRequest,
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

function subaccountToHex(subaccount: Uint8Array): string {
  return Array.from(subaccount)
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}

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

  // Stable refs so useEffect/useCallback don't re-fire on every render
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

  // Create invoice when modal opens (run once per open)
  useEffect(() => {
    if (!open) {
      setReq(null);
      setCreateError(null);
      setPollingStatus("idle");
      stopPolling();
      return;
    }

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
  }, [open, stopPolling]);

  // Clean up polling on unmount
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
  const title =
    paymentType === "unlock" ? "Unlock with HERO" : "Subscribe with HERO";
  const amountLabel =
    paymentType === "unlock"
      ? "1 HERO (100,000,000 e8s)"
      : "10 HERO (1,000,000,000 e8s)";
  const amountE8s = paymentType === "unlock" ? "100000000" : "1000000000";
  const subaccountHex = req ? subaccountToHex(req.subaccount) : "";

  const isPolling =
    typeof pollingStatus === "object" && "attempt" in pollingStatus;
  const isGranted = pollingStatus === "granted";

  let statusText = "";
  if (pollingStatus === "pending") statusText = "Pending…";
  else if (isPolling)
    statusText = `Checking (attempt ${(pollingStatus as { attempt: number }).attempt} of ${MAX_ATTEMPTS})…`;
  else if (isGranted) statusText = "Access Granted!";
  else if (pollingStatus === "not_found")
    statusText = "Payment not detected. Click to try again.";

  return (
    <dialog
      aria-label={title}
      open
      className="fixed inset-0 z-50 flex items-center justify-center p-4 w-full h-full max-w-none m-0 bg-transparent border-0 outline-none"
      style={{ background: "rgba(0,0,0,0.7)" }}
      data-ocid="payment.dialog"
    >
      <div className="relative w-full max-w-md rounded-xl border border-border bg-card shadow-2xl">
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
          {isCreating && (
            <div
              className="flex items-center gap-3 text-muted-foreground"
              data-ocid="payment.loading_state"
            >
              <Loader2 className="size-4 animate-spin shrink-0" />
              <span className="text-sm">Preparing payment address…</span>
            </div>
          )}

          {createError && (
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

          {req && !createError && (
            <>
              {/* Instruction */}
              <p className="text-sm text-foreground/80 leading-relaxed">
                Open NNS (nns.ic0.app), go to your HERO tokens, and send a
                transfer to this address:
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

              {/* Subaccount */}
              <div className="space-y-1.5">
                <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
                  Subaccount (hex)
                </p>
                <div className="flex items-start gap-2">
                  <code
                    className="flex-1 min-w-0 break-all text-xs bg-muted border border-border rounded px-3 py-2 text-foreground font-mono leading-relaxed"
                    data-ocid="payment.subaccount_hex"
                  >
                    {subaccountHex}
                  </code>
                  <CopyButton value={subaccountHex} label="subaccount" />
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
                      ? "border-primary/40 bg-primary/10 text-primary"
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

              {/* Check Payment button */}
              <Button
                className="w-full bg-primary text-primary-foreground hover:bg-primary/90"
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
