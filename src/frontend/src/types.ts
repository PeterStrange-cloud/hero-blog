import type { Principal } from "@icp-sdk/core/principal";
import { AdminResult } from "./backend";
import type {
  ArticleCard,
  ArticleFull,
  ArticleId,
  ArticleInput,
  ExternalBlob,
  InvitedUser,
  Role,
  SiteSettings,
  Subscription,
  Timestamp,
  UserAccess,
  UserId,
  UserRole,
} from "./backend";

// Re-export backend types for convenience
export { AdminResult };
export type {
  ArticleCard,
  ArticleFull,
  ArticleId,
  ArticleInput,
  ExternalBlob,
  InvitedUser,
  Principal,
  Role,
  SiteSettings,
  Subscription,
  Timestamp,
  UserAccess,
  UserId,
  UserRole,
};

// Derived / UI-specific types
export type ArticleStatus = "published" | "draft";
export type ArticleAccessType = "free" | "premium";

export interface ArticleWithStatus extends ArticleCard {
  status: ArticleStatus;
  accessType: ArticleAccessType;
}

export function formatTimestamp(ts: Timestamp): string {
  const ms = Number(ts / 1_000_000n);
  return new Date(ms).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export function formatTimestampShort(ts: Timestamp): string {
  const ms = Number(ts / 1_000_000n);
  return new Date(ms).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}
