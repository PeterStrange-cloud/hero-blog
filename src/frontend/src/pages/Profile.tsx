import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Link, useNavigate } from "@tanstack/react-router";
import { ChevronLeft, Wallet, CheckCircle2, Copy } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { ErrorMessage } from "../components/ErrorMessage";
import { PageLoading } from "../components/LoadingSpinner";
import { useIdentity } from "../hooks/useIdentity";
import { useUserAccess, useLinkWallet, useGetLinkedWallet, useGetDisplayName, useSetDisplayName } from "../hooks/useQueries";

export default function Profile() {
  const navigate = useNavigate();
  const { isAuthenticated, isInitializing, principal } = useIdentity();
  const userAccessQuery = useUserAccess();
  const linkedWalletQuery = useGetLinkedWallet();
  const linkWallet = useLinkWallet();

  const [walletInput, setWalletInput] = useState("");
  const [nameInput, setNameInput] = useState("");
  const displayNameQuery = useGetDisplayName();
  const setDisplayName = useSetDisplayName();

  if (!isInitializing && !isAuthenticated) {
    navigate({ to: "/" });
    return null;
  }

  if (isInitializing || userAccessQuery.isLoading) {
    return <PageLoading />;
  }

  if (userAccessQuery.isError) {
    return (
      <ErrorMessage
        title="Failed to load profile"
        onRetry={() => userAccessQuery.refetch()}
      />
    );
  }

  const userAccess = userAccessQuery.data;
  const linkedWallet = linkedWalletQuery.data ?? null;
  const myPrincipal = principal?.toString() ?? "";

  const handleLinkWallet = async () => {
    const trimmed = walletInput.trim();
    if (!trimmed) {
      toast.error("Please enter a wallet principal");
      return;
    }
    try {
      await linkWallet.mutateAsync(trimmed);
      toast.success("Wallet linked successfully");
      setWalletInput("");
    } catch (err) {
      toast.error(
        err instanceof Error ? err.message : "Failed to link wallet",
      );
    }
  };

  const handleCopyPrincipal = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      toast.success("Copied");
    } catch {
      toast.error("Could not copy");
    }
  };

  return (
    <div
      className="max-w-2xl mx-auto px-4 sm:px-6 py-10 space-y-8"
      data-ocid="profile.page"
    >
      {/* Header */}
      <div className="flex items-center gap-4">
        <Button
          variant="ghost"
          size="sm"
          asChild
          className="gap-2 text-muted-foreground"
        >
          <Link to="/">
            <ChevronLeft className="size-4" />
            Home
          </Link>
        </Button>
        <div>
          <h1 className="font-display text-3xl font-bold text-foreground">
            My Profile
          </h1>
          <p className="type-meta text-muted-foreground mt-1">
            Manage your account and linked wallet
          </p>
        </div>
      </div>

      {/* Internet Identity principal (read-only) */}
      <section className="card-dark p-6 space-y-3">
        <h2 className="font-display font-semibold text-foreground">
          Your Internet Identity
        </h2>
        <p className="type-meta text-muted-foreground text-sm">
          This is the principal you use to sign in to this blog.
        </p>
        <div className="flex items-start gap-2 p-3 bg-muted/20 rounded-lg border border-border">
          <p className="font-mono text-xs text-foreground break-all flex-1">
            {myPrincipal}
          </p>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => handleCopyPrincipal(myPrincipal)}
            className="shrink-0 text-muted-foreground hover:text-foreground h-6 w-6 p-0"
            aria-label="Copy principal"
          >
            <Copy className="size-3" />
          </Button>
        </div>
      </section>

      {/* Display Name */}
      <section className="card-dark p-6 space-y-3">
        <h2 className="font-display font-semibold text-foreground">Display Name</h2>
        <p className="type-meta text-muted-foreground text-sm">
          This name appears in the navigation bar next to Sign out.
        </p>
        {displayNameQuery.data && (
          <p className="text-sm text-green-400 font-medium">Current: {displayNameQuery.data}</p>
        )}
        <div className="flex flex-col sm:flex-row gap-2">
          <Input
            placeholder="Enter your name or nickname"
            value={nameInput}
            onChange={(e) => setNameInput(e.target.value)}
            className="input-dark text-sm px-3 py-2"
          />
          <Button
            onClick={async () => {
              if (!nameInput.trim()) return;
              await setDisplayName.mutateAsync(nameInput.trim());
              setNameInput("");
            }}
            disabled={setDisplayName.isPending}
            className="btn-primary"
          >
            {setDisplayName.isPending ? "Saving…" : "Save"}
          </Button>
        </div>
      </section>

      {/* Linked wallet */}
      <section className="card-dark p-6 space-y-4">
        <div className="flex items-center gap-2">
          <Wallet className="size-4 text-muted-foreground" />
          <h2 className="font-display font-semibold text-foreground">
            Linked Wallet
          </h2>
        </div>
        <p className="type-meta text-muted-foreground text-sm">
          Link your NNS wallet principal so you can pay HERO tokens to
          unlock premium articles. Payments must come from this wallet to be
          recognized.
        </p>

        {linkedWallet ? (
          <div className="space-y-3">
            <div className="flex items-center gap-2 text-sm text-green-600 dark:text-green-400">
              <CheckCircle2 className="size-4" />
              <span>Wallet linked</span>
            </div>
            <div className="flex items-start gap-2 p-3 bg-muted/20 rounded-lg border border-border">
              <p className="font-mono text-xs break-all flex-1 glow-green">
                {linkedWallet.toString()}
              </p>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => handleCopyPrincipal(linkedWallet.toString())}
                className="shrink-0 text-muted-foreground hover:text-foreground h-6 w-6 p-0"
                aria-label="Copy wallet principal"
              >
                <Copy className="size-3" />
              </Button>
            </div>
            <div className="pt-2">
              <p className="type-meta text-muted-foreground text-xs mb-2">
                Change linked wallet:
              </p>
              <div className="flex flex-col sm:flex-row gap-2">
                <Input
                  placeholder="Paste new NNS principal"
                  value={walletInput}
                  onChange={(e) => setWalletInput(e.target.value)}
                  className="input-dark font-mono text-xs px-3 py-2"
                />
                <Button
                  onClick={handleLinkWallet}
                  disabled={linkWallet.isPending}
                  className="btn-primary"
                >
                  {linkWallet.isPending ? "Linking…" : "Update"}
                </Button>
              </div>
            </div>
          </div>
        ) : (
          <div className="flex flex-col sm:flex-row gap-2">
            <Input
              placeholder="Paste your NNS principal"
              value={walletInput}
              onChange={(e) => setWalletInput(e.target.value)}
              className="input-dark font-mono text-xs px-3 py-2"
            />
            <Button
              onClick={handleLinkWallet}
              disabled={linkWallet.isPending}
              className="btn-primary"
            >
              {linkWallet.isPending ? "Linking…" : "Link Wallet"}
            </Button>
          </div>
        )}
      </section>
    </div>
  );
}
