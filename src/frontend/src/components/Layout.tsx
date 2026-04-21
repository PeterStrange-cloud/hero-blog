import { Link } from "@tanstack/react-router";
import { Check, Copy, LogIn, LogOut, Shield, User } from "lucide-react";
import { useState } from "react";
import { useIdentity } from "../hooks/useIdentity";
import { useGetLogoUrl } from "../hooks/useQueries";
import { Button } from "./ui/button";

interface LayoutProps {
  children: React.ReactNode;
}

export function Layout({ children }: LayoutProps) {
  const {
    isAuthenticated,
    isInitializing,
    isLoggingIn,
    login,
    logout,
    principal,
  } = useIdentity();
  const logoQuery = useGetLogoUrl();
  const logoUrl = logoQuery.data ?? null;

  const [copied, setCopied] = useState(false);

  const principalStr = principal ? principal.toString() : null;

  const handleCopyPrincipal = () => {
    if (!principalStr) return;
    navigator.clipboard.writeText(principalStr).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 nav-dark">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          {/* Logo */}
          <Link
            to="/"
            className="flex items-center gap-2 group"
            data-ocid="nav.logo_link"
          >
            {logoUrl ? (
              <img
                src={logoUrl}
                alt="HERO BLOG"
                className="h-8 max-w-[140px] object-contain"
              />
            ) : (
              <span className="font-display text-xl font-bold tracking-tight text-foreground transition-colors duration-200">
                <span className="glow-red">HERO</span>
                <span className="ml-1">BLOG</span>
              </span>
            )}
          </Link>

          {/* Nav */}
          <nav className="hidden sm:flex items-center gap-6">
            <Link
              to="/"
              className="type-label text-muted-foreground hover:text-foreground transition-colors duration-200"
              data-ocid="nav.blog_link"
            >
              Blog
            </Link>
            {isAuthenticated && (<>
              <Link
                to="/admin"
                className="type-label text-muted-foreground hover:text-foreground transition-colors duration-200 flex items-center gap-1.5"
                data-ocid="nav.admin_link"
              >
                <Shield className="size-3.5" />
                Admin
              </Link>
              <Link
                to="/profile"
                className="type-label text-muted-foreground hover:text-foreground transition-colors duration-200 flex items-center gap-1.5"
                data-ocid="nav.profile_link"
              >
                <User className="size-3.5" />
                Profile
              </Link>
              </>
            )}
          </nav>

          {/* Auth */}
          <div className="flex items-center gap-2">
            {isAuthenticated && principalStr && (
              <div className="hidden sm:flex items-center gap-1">
                <span
                  className="type-meta text-muted-foreground font-mono text-xs break-all"
                  data-ocid="nav.principal_display"
                >
                  {principalStr}
                </span>
                <button
                  type="button"
                  onClick={handleCopyPrincipal}
                  className="flex-shrink-0 p-1 rounded text-muted-foreground hover:text-foreground transition-colors duration-200"
                  aria-label="Copy principal"
                  title="Copy principal"
                  data-ocid="nav.copy_principal_button"
                >
                  {copied ? (
                    <Check className="size-3" />
                  ) : (
                    <Copy className="size-3" />
                  )}
                </button>
              </div>
            )}
            {isAuthenticated ? (
              <Button
                variant="ghost"
                size="sm"
                onClick={() => logout()}
                className="gap-2 text-muted-foreground hover:text-foreground"
                data-ocid="nav.logout_button"
              >
                <LogOut className="size-4" />
                <span className="hidden sm:inline">Sign out</span>
              </Button>
            ) : (
              <Button
                variant="outline"
                size="sm"
                onClick={() => login()}
                disabled={isInitializing || isLoggingIn}
                className="gap-2 border-border"
                data-ocid="nav.login_button"
              >
                <LogIn className="size-4" />
                {isLoggingIn ? "Signing in…" : "Sign in"}
              </Button>
            )}
          </div>
        </div>

        {/* Mobile nav */}
        <div className="sm:hidden border-t border-border px-4 py-2 flex gap-4 bg-card">
          <Link
            to="/"
            className="type-label text-muted-foreground hover:text-foreground transition-colors duration-200"
            data-ocid="nav.mobile_blog_link"
          >
            Blog
          </Link>
          {isAuthenticated && (<>
            <Link
              to="/admin"
              className="type-label text-muted-foreground hover:text-foreground transition-colors duration-200 flex items-center gap-1"
              data-ocid="nav.mobile_admin_link"
            >
              <Shield className="size-3" />
              Admin
            </Link>
            <Link
              to="/profile"
              className="type-label text-muted-foreground hover:text-foreground transition-colors duration-200 flex items-center gap-1"
              data-ocid="nav.mobile_profile_link"
            >
              <User className="size-3" />
              Profile
            </Link>
            </>
          )}
        </div>
      </header>

      {/* Main content */}
      <main className="flex-1 bg-background">{children}</main>

      {/* Footer */}
      <footer className="bg-card border-t border-border mt-auto">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="font-display font-bold text-sm text-foreground">
              HERO<span className="text-primary">BLOG</span>
            </span>
            <span className="text-muted-foreground text-xs">
              · Decentralized publishing on ICP
            </span>
          </div>
          <p className="type-meta text-center">
            © {new Date().getFullYear()}. Built with love using{" "}
            <a
              href={`https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(typeof window !== "undefined" ? window.location.hostname : "")}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary hover:underline transition-colors duration-200"
            >
              caffeine.ai
            </a>
          </p>
        </div>
      </footer>
    </div>
  );
}
