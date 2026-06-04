import { Link } from "@tanstack/react-router";
import { Construction } from "lucide-react";

export default function UnderConstructionPage() {
  return (
    <div className="min-h-[80vh] flex flex-col items-center justify-center px-4 text-center">
      <div className="card-dark p-10 max-w-lg w-full flex flex-col items-center gap-6">
        <Construction className="size-12 text-[oklch(0.72_0.20_145)]" />
        <h1 className="font-display text-3xl font-bold">
          <span className="hero-logo-hero">Something</span>{" "}
          <span className="hero-logo-blog">is coming.</span>
        </h1>
        <p className="text-secondary text-base leading-relaxed">
          We are working on something new. Stay tuned — it will be worth it.
        </p>
        <Link to="/" className="btn-secondary mt-2">
          Back to the Blog
        </Link>
      </div>
    </div>
  );
}
