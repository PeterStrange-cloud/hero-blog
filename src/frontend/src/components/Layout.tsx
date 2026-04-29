import { Link } from "@tanstack/react-router";
import { LogIn, LogOut, Search, Shield, User, X } from "lucide-react";
import { useRef, useState } from "react";
import { useIdentity } from "../hooks/useIdentity";
import { useGetDisplayName } from "../hooks/useQueries";
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
  const displayNameQuery = useGetDisplayName();
  const logoUrl = logoQuery.data ?? null;

  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const searchInputRef = useRef<HTMLInputElement>(null);

  const handleSearchOpen = () => {
    setSearchOpen(true);
    setTimeout(() => searchInputRef.current?.focus(), 50);
  };

  const handleSearchClose = () => {
    setSearchOpen(false);
    setSearchQuery("");
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      window.location.href = "/?search=" + encodeURIComponent(searchQuery.trim());
      handleSearchClose();
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <header className="sticky top-0 z-50 nav-dark">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-4">

          <Link to="/" className="flex items-center gap-2 group shrink-0" data-ocid="nav.logo_link">
            {logoUrl ? (
              <img src={logoUrl} alt="HERO BLOG" className="h-8 max-w-[140px] object-contain" />
            ) : (
              <span className="font-display text-xl font-bold tracking-tight flex items-center gap-2">
                <img src="/hero-coin.svg" alt="HERO" className="h-7 w-7" />
                <span className="hero-logo-hero">HERO</span>
                <span className="ml-1 hero-logo-blog">BLOG</span>
              </span>
            )}
          </Link>

          {!searchOpen && (
            <nav className="hidden sm:flex items-center gap-6">
              <a href="/" className="type-label text-[oklch(0.72_0.20_145)] hover:text-white transition-colors duration-200" data-ocid="nav.blog_link">
                Blog
              </a>
              <Link to="/archive" className="type-label text-[oklch(0.72_0.20_145)] hover:text-white transition-colors duration-200" data-ocid="nav.archive_link">
                Archive
              </Link>
            </nav>
          )}

          {searchOpen && (
            <form onSubmit={handleSearchSubmit} className="hidden sm:flex flex-1 max-w-md items-center gap-2 bg-card border border-border rounded-md px-3 py-1.5">
              <Search className="size-4 text-muted-foreground shrink-0" />
              <input
                ref={searchInputRef}
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search articles..."
                className="flex-1 bg-transparent text-sm outline-none text-foreground placeholder:text-muted-foreground"
              />
              <button type="button" onClick={handleSearchClose}>
                <X className="size-4 text-muted-foreground hover:text-white transition-colors" />
              </button>
            </form>
          )}

          <div className="flex items-center gap-3 shrink-0">
            {displayNameQuery.data && isAuthenticated && (
              <span className="text-sm font-medium hidden sm:inline">{displayNameQuery.data}</span>
            )}
            {isAuthenticated && (
              <Link to="/profile" className="hidden sm:flex type-label text-[oklch(0.72_0.20_145)] hover:text-white transition-colors duration-200 items-center gap-1.5" data-ocid="nav.profile_link">
                <User className="size-3.5" />
                Profile
              </Link>
            )}
            {isAuthenticated ? (
              <Button variant="ghost" size="sm" onClick={() => logout()} className="gap-2 text-[oklch(0.72_0.20_145)] hover:text-white" data-ocid="nav.logout_button">
                <LogOut className="size-4" />
                <span className="hidden sm:inline">Sign out</span>
              </Button>
            ) : (
              <Button variant="outline" size="sm" onClick={() => login()} disabled={isInitializing || isLoggingIn} className="gap-2 border-border" data-ocid="nav.login_button">
                <LogIn className="size-4" />
                {isLoggingIn ? "Signing in..." : "Sign in"}
              </Button>
            )}
            {!searchOpen && (
              <button onClick={handleSearchOpen} className="ml-4 text-[oklch(0.72_0.20_145)] hover:text-white transition-colors duration-200" aria-label="Search" data-ocid="nav.search_button">
                <Search className="size-4" />
              </button>
            )}
          </div>
        </div>

        <div className="sm:hidden border-t border-border px-4 py-2 flex gap-4 bg-card">
          <a href="/" className="type-label text-[oklch(0.72_0.20_145)] hover:text-white transition-colors duration-200" data-ocid="nav.mobile_blog_link">
            Blog
          </a>
          <Link to="/archive" className="type-label text-[oklch(0.72_0.20_145)] hover:text-white transition-colors duration-200" data-ocid="nav.mobile_archive_link">
            Archive
          </Link>
          {isAuthenticated && (
            <Link to="/profile" className="type-label text-[oklch(0.72_0.20_145)] hover:text-white transition-colors duration-200 flex items-center gap-1" data-ocid="nav.mobile_profile_link">
              <User className="size-3" />
              Profile
            </Link>
          )}
        </div>
      </header>

      <main className="flex-1 bg-background">{children}</main>

      <footer className="bg-black border-t border-[oklch(0.25_0.000_0)] mt-auto">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="font-display font-bold text-sm">
              <span className="hero-logo-hero">HERO</span>
              <span className="hero-logo-blog">BLOG</span>
            </span>
            <span className="text-muted-foreground text-xs">· Decentralized publishing on ICP</span>
          </div>
          {isAuthenticated && (
            <Link to="/admin" className="type-label text-muted-foreground hover:text-white transition-colors duration-200 flex items-center gap-1.5">
              <Shield className="size-3.5" />
              Admin
            </Link>
          )}
          <p className="type-meta text-center">
            {String.fromCharCode(169)} {new Date().getFullYear()}. Built by Pietro Striano
          </p>
        </div>
      </footer>
    </div>
  );
}
