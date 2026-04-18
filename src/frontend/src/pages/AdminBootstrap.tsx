import { Button } from "@/components/ui/button";
import { useNavigate } from "@tanstack/react-router";
import { CheckCircle, Copy, Loader2, Shield } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { AdminResult } from "../backend";
import { PageLoading } from "../components/LoadingSpinner";
import { useIdentity } from "../hooks/useIdentity";
import {
  useGetMyRole,
  useHasSuperadmin,
  useInitSuperadmin,
} from "../hooks/useQueries";

export default function AdminBootstrap() {
  const navigate = useNavigate();
  const { isAuthenticated, isInitializing, principal, login } = useIdentity();
  const hasSuperadminQuery = useHasSuperadmin();
  const roleQuery = useGetMyRole();
  const initSuperadmin = useInitSuperadmin();
  const [copied, setCopied] = useState(false);

  // Redirect if identity initializing
  if (isInitializing) {
    return <PageLoading />;
  }

  // Must be signed in to use this page
  if (!isAuthenticated || !principal) {
    return (
      <div
        className="max-w-xl mx-auto px-4 py-24 flex flex-col items-center gap-8 text-center"
        data-ocid="bootstrap.not_signed_in"
      >
        <div className="p-5 rounded-full bg-muted border border-border">
          <Shield className="size-10 text-muted-foreground" />
        </div>
        <div className="space-y-2">
          <h1 className="font-display text-2xl font-bold text-foreground">
            Sign In Required
          </h1>
          <p className="type-body text-muted-foreground">
            You must sign in with Internet Identity before initializing the
            superadmin.
          </p>
        </div>
        <Button onClick={login} data-ocid="bootstrap.sign_in_button">
          Sign In with Internet Identity
        </Button>
      </div>
    );
  }

  // If superadmin already exists, check if THIS user already has a role.
  // If they do → redirect to admin dashboard.
  // If they don't → show "already exists" message (not a redirect loop).
  if (hasSuperadminQuery.data === true) {
    const userRole = roleQuery.data;
    if (userRole !== undefined && userRole !== null) {
      // User has a role — send them to the dashboard
      navigate({ to: "/admin" });
      return null;
    }
    // No role for this user and superadmin already set — show blocked message
    const principalStr = principal.toText();
    return (
      <div
        className="max-w-xl mx-auto px-4 py-24 flex flex-col items-center gap-8 text-center"
        data-ocid="bootstrap.already_exists"
      >
        <div className="p-5 rounded-full bg-muted border border-border">
          <Shield className="size-10 text-muted-foreground" />
        </div>
        <div className="space-y-2">
          <h1 className="font-display text-2xl font-bold text-foreground">
            Superadmin Already Exists
          </h1>
          <p className="type-body text-muted-foreground">
            A superadmin has already been initialized for this site. Contact
            your administrator to request access.
          </p>
        </div>
        <div className="w-full max-w-md bg-card border border-border rounded-lg p-4 text-left space-y-2">
          <p className="type-label text-xs text-muted-foreground uppercase tracking-wide">
            Your Principal
          </p>
          <p
            className="font-mono text-xs text-foreground break-all"
            data-ocid="bootstrap.blocked_principal"
          >
            {principalStr}
          </p>
        </div>
        <Button variant="outline" asChild>
          <a href="/">Return to Blog</a>
        </Button>
      </div>
    );
  }

  const principalStr = principal.toText();

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(principalStr);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
      toast.success("Principal copied to clipboard");
    } catch {
      toast.error("Could not copy to clipboard");
    }
  };

  const handleInit = async () => {
    try {
      const result = await initSuperadmin.mutateAsync();
      if (result === AdminResult.ok) {
        toast.success("Superadmin initialized! Redirecting to dashboard…");
        // Small delay to let queries invalidate before navigating
        setTimeout(() => navigate({ to: "/admin" }), 800);
      } else if (result === AdminResult.alreadyExists) {
        toast.info("A superadmin already exists. Redirecting to dashboard…");
        setTimeout(() => navigate({ to: "/admin" }), 800);
      } else {
        toast.error("Initialization failed. Please try again.");
      }
    } catch {
      toast.error("An error occurred. Please try again.");
    }
  };

  const isLoading = hasSuperadminQuery.isLoading || initSuperadmin.isPending;

  return (
    <div
      className="max-w-xl mx-auto px-4 py-20 flex flex-col items-center gap-8"
      data-ocid="bootstrap.page"
    >
      {/* Icon */}
      <div className="p-5 rounded-full bg-amber-500/10 border border-amber-500/30">
        <Shield className="size-12 text-amber-500" />
      </div>

      {/* Title */}
      <div className="text-center space-y-3">
        <h1 className="font-display text-3xl font-bold text-foreground">
          Initialize Superadmin
        </h1>
        <p className="type-body text-muted-foreground max-w-md">
          No superadmin exists yet. Click the button below to permanently bind
          your signed-in principal as the first superadmin. This action can only
          be performed once.
        </p>
      </div>

      {/* Principal display */}
      <div
        className="w-full bg-card border border-border rounded-lg p-5 space-y-3"
        data-ocid="bootstrap.principal_card"
      >
        <p className="type-label text-xs text-muted-foreground uppercase tracking-wide">
          Your Internet Identity Principal
        </p>
        <div className="flex items-start gap-3">
          <p
            className="font-mono text-sm text-foreground break-all flex-1 leading-relaxed"
            data-ocid="bootstrap.principal_text"
          >
            {principalStr}
          </p>
          <Button
            variant="ghost"
            size="sm"
            onClick={handleCopy}
            className="shrink-0 mt-0.5 gap-1.5 text-muted-foreground hover:text-foreground"
            aria-label="Copy principal"
            data-ocid="bootstrap.copy_principal_button"
          >
            {copied ? (
              <CheckCircle className="size-4 text-green-500" />
            ) : (
              <Copy className="size-4" />
            )}
            <span className="text-xs">{copied ? "Copied" : "Copy"}</span>
          </Button>
        </div>
        <p className="type-meta text-xs text-muted-foreground">
          This principal will become the permanent superadmin of HERO BLOG.
        </p>
      </div>

      {/* Warning note */}
      <div className="w-full bg-amber-500/5 border border-amber-500/20 rounded-lg px-4 py-3">
        <p className="type-meta text-sm text-amber-600 dark:text-amber-400">
          <strong>Important:</strong> Make sure this is the correct Internet
          Identity. Once initialized, only this principal (and admins it
          assigns) can access the dashboard.
        </p>
      </div>

      {/* Init button */}
      <Button
        size="lg"
        onClick={handleInit}
        disabled={isLoading}
        className="w-full gap-2 bg-amber-500 text-white hover:bg-amber-600 border-0"
        data-ocid="bootstrap.init_button"
      >
        {initSuperadmin.isPending ? (
          <>
            <Loader2 className="size-5 animate-spin" />
            Initializing…
          </>
        ) : (
          <>
            <Shield className="size-5" />
            Initialize Superadmin
          </>
        )}
      </Button>

      <p className="type-meta text-xs text-muted-foreground text-center">
        This button will disappear once a superadmin is set. If you signed in
        with the wrong identity, sign out and sign in again with the correct
        one.
      </p>
    </div>
  );
}
