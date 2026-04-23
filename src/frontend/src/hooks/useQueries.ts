import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import type {
  AdminResult,
  InviteResult,
  PaymentRequest,
  PaymentType,
  Role,
  SettingsResult,
  SiteSettings,
  UserRole,
} from "../backend";
import type {
  ArticleCard,
  ArticleFull,
  ArticleId,
  ArticleInput,
  InvitedUser,
  UserAccess,
  UserId,
} from "../types";
import { useBackend } from "./useBackend";

// ─── Article queries ────────────────────────────────────────────────────────

export function usePublishedArticles() {
  const { actor, isFetching } = useBackend();
  return useQuery<ArticleCard[]>({
    queryKey: ["articles", "published"],
    queryFn: async () => {
      if (!actor) throw new Error("Actor not ready");
      return actor.getPublishedArticles();
    },
    enabled: !!actor && !isFetching,
    retry: 3,
    retryDelay: (attemptIndex: number) =>
      Math.min(1000 * 2 ** attemptIndex, 10000),
    staleTime: 30_000,
    gcTime: 5 * 60_000,
    refetchOnWindowFocus: false,
  });
}

export function useAllArticlesAdmin() {
  const { actor, isFetching } = useBackend();
  return useQuery<ArticleCard[]>({
    queryKey: ["articles", "admin"],
    queryFn: async () => {
      if (!actor) throw new Error("Actor not ready");
      return actor.getAllArticlesAdmin();
    },
    enabled: !!actor && !isFetching,
    retry: 3,
    retryDelay: (attemptIndex: number) =>
      Math.min(1000 * 2 ** attemptIndex, 10000),
    staleTime: 30_000,
    gcTime: 5 * 60_000,
    refetchOnWindowFocus: false,
  });
}

export function useArticle(id: ArticleId | null) {
  const { actor, isFetching } = useBackend();
  return useQuery<ArticleFull | null>({
    queryKey: ["article", id?.toString()],
    queryFn: async () => {
      if (!actor || id === null) throw new Error("Actor not ready");
      const result = await actor.getArticle(id);
      return result;
    },
    enabled: !!actor && !isFetching && id !== null,
    retry: 3,
    retryDelay: (attemptIndex: number) =>
      Math.min(1000 * 2 ** attemptIndex, 10000),
    staleTime: 30_000,
    gcTime: 5 * 60_000,
    refetchOnWindowFocus: false,
  });
}

export function useArticleCard(id: ArticleId | null) {
  const { actor, isFetching } = useBackend();
  return useQuery<ArticleCard | null>({
    queryKey: ["articleCard", id?.toString()],
    queryFn: async () => {
      if (!actor || id === null) throw new Error("Actor not ready");
      return actor.getArticleCard(id);
    },
    enabled: !!actor && !isFetching && id !== null,
    retry: 3,
    retryDelay: (attemptIndex: number) =>
      Math.min(1000 * 2 ** attemptIndex, 10000),
    staleTime: 30_000,
    gcTime: 5 * 60_000,
    refetchOnWindowFocus: false,
  });
}

// ─── User access ────────────────────────────────────────────────────────────

export function useUserAccess() {
  const { actor, isFetching } = useBackend();
  return useQuery<UserAccess | null>({
    queryKey: ["userAccess"],
    queryFn: async () => {
      if (!actor) throw new Error("Actor not ready");
      return actor.getUserAccess();
    },
    enabled: !!actor && !isFetching,
    retry: 3,
    retryDelay: (attemptIndex: number) =>
      Math.min(1000 * 2 ** attemptIndex, 10000),
    staleTime: 30_000,
    refetchOnWindowFocus: false,
  });
}

// ─── Role & authorization ────────────────────────────────────────────────────

/**
 * hasSuperadmin() is a query — no auth needed. Always refetch on mount so the
 * bootstrap screen reacts immediately after initSuperadmin().
 */
export function useHasSuperadmin() {
  const { actor, isFetching } = useBackend();
  return useQuery<boolean>({
    queryKey: ["hasSuperadmin"],
    queryFn: async () => {
      if (!actor) throw new Error("Actor not ready");
      return actor.hasSuperadmin();
    },
    enabled: !!actor && !isFetching,
    retry: 3,
    retryDelay: (attemptIndex: number) =>
      Math.min(1000 * 2 ** attemptIndex, 10000),
    staleTime: 30_000,
    refetchOnWindowFocus: false,
    refetchOnMount: true,
  });
}

/**
 * getMyRole() is an UPDATE call on the backend (not a query), so we use
 * useMutation semantics but expose it query-style via a manual trigger.
 * We cache the result in React Query so components can read it reactively.
 *
 * Implementation: use useQuery with staleTime:0 so it always re-fetches,
 * and retry:0 so it fails fast when not authorized.
 */
export function useGetMyRole() {
  const { actor, isFetching } = useBackend();
  return useQuery<Role | null>({
    queryKey: ["myRole"],
    queryFn: async () => {
      if (!actor) throw new Error("Actor not ready");
      // getMyRole is an update call — still callable from useQuery's queryFn
      return actor.getMyRole();
    },
    enabled: !!actor && !isFetching,
    staleTime: 30_000,
    retry: 3,
    retryDelay: (attemptIndex: number) =>
      Math.min(1000 * 2 ** attemptIndex, 10000),
    refetchOnWindowFocus: false,
  });
}

export function useIsAuthorized() {
  const { actor, isFetching } = useBackend();
  return useQuery<boolean>({
    queryKey: ["isAuthorized"],
    queryFn: async () => {
      if (!actor) throw new Error("Actor not ready");
      return actor.isAuthorized();
    },
    enabled: !!actor && !isFetching,
    retry: 3,
    retryDelay: (attemptIndex: number) =>
      Math.min(1000 * 2 ** attemptIndex, 10000),
    staleTime: 30_000,
    refetchOnWindowFocus: false,
  });
}

export function useListUserRoles() {
  const { actor, isFetching } = useBackend();
  return useQuery<UserRole[]>({
    queryKey: ["userRoles"],
    queryFn: async () => {
      if (!actor) throw new Error("Actor not ready");
      return actor.listUserRoles();
    },
    enabled: !!actor && !isFetching,
    retry: 3,
    retryDelay: 2000,
    staleTime: 30_000,
    refetchOnWindowFocus: false,
  });
}

/**
 * listTrackedPrincipals() — superadmin only. Returns all principals that have
 * interacted with the backend (for user management).
 */
export function useListTrackedPrincipals() {
  const { actor, isFetching } = useBackend();
  return useQuery<UserId[]>({
    queryKey: ["trackedPrincipals"],
    queryFn: async () => {
      if (!actor) throw new Error("Actor not ready");
      return actor.listTrackedPrincipals();
    },
    enabled: !!actor && !isFetching,
    retry: 3,
    retryDelay: 2000,
    staleTime: 30_000,
    refetchOnWindowFocus: false,
  });
}

// ─── Invites ─────────────────────────────────────────────────────────────────

export function useListInvites() {
  const { actor, isFetching } = useBackend();
  return useQuery<InvitedUser[]>({
    queryKey: ["invites"],
    queryFn: async () => {
      if (!actor) throw new Error("Actor not ready");
      return actor.listInvites();
    },
    enabled: !!actor && !isFetching,
    retry: 3,
    retryDelay: 2000,
    staleTime: 30_000,
    refetchOnWindowFocus: false,
  });
}

// ─── Settings ────────────────────────────────────────────────────────────────

export function useGetSettings() {
  const { actor, isFetching } = useBackend();
  return useQuery<SiteSettings | null>({
    queryKey: ["settings"],
    queryFn: async () => {
      if (!actor) throw new Error("Actor not ready");
      return actor.getSettings();
    },
    enabled: !!actor && !isFetching,
    retry: 3,
    retryDelay: (attemptIndex: number) =>
      Math.min(1000 * 2 ** attemptIndex, 10000),
    staleTime: 30_000,
    refetchOnWindowFocus: false,
  });
}

export function useGetLogoUrl() {
  const { actor, isFetching } = useBackend();
  return useQuery<string | null>({
    queryKey: ["logoUrl"],
    queryFn: async () => {
      if (!actor) throw new Error("Actor not ready");
      return actor.getLogoUrl();
    },
    enabled: !!actor && !isFetching,
    retry: 3,
    retryDelay: (attemptIndex: number) =>
      Math.min(1000 * 2 ** attemptIndex, 10000),
    staleTime: 30_000,
    refetchOnWindowFocus: false,
  });
}

// ─── Mutations ───────────────────────────────────────────────────────────────

export function useCreateArticle() {
  const { actor } = useBackend();
  const qc = useQueryClient();
  return useMutation<ArticleCard, Error, ArticleInput>({
    mutationFn: async (input) => {
      if (!actor) throw new Error("Not connected");
      return actor.createArticle(input);
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["articles"] });
    },
  });
}

export function useUpdateArticle() {
  const { actor } = useBackend();
  const qc = useQueryClient();
  return useMutation<
    AdminResult,
    Error,
    { id: ArticleId; input: ArticleInput }
  >({
    mutationFn: async ({ id, input }) => {
      if (!actor) throw new Error("Not connected");
      return actor.updateArticle(id, input);
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["articles"] });
    },
  });
}

export function useDeleteArticle() {
  const { actor } = useBackend();
  const qc = useQueryClient();
  return useMutation<AdminResult, Error, ArticleId>({
    mutationFn: async (id) => {
      if (!actor) throw new Error("Not connected");
      return actor.deleteArticle(id);
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["articles"] });
    },
  });
}

export function usePublishArticle() {
  const { actor } = useBackend();
  const qc = useQueryClient();
  return useMutation<AdminResult, Error, ArticleId>({
    mutationFn: async (id) => {
      if (!actor) throw new Error("Not connected");
      return actor.publishArticle(id);
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["articles"] });
    },
  });
}

export function useUnpublishArticle() {
  const { actor } = useBackend();
  const qc = useQueryClient();
  return useMutation<AdminResult, Error, ArticleId>({
    mutationFn: async (id) => {
      if (!actor) throw new Error("Not connected");
      return actor.unpublishArticle(id);
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["articles"] });
    },
  });
}

export function useListAdmins() {
  const { actor, isFetching } = useBackend();
  return useQuery<UserId[]>({
    queryKey: ["admins"],
    queryFn: async () => {
      if (!actor) throw new Error("Actor not ready");
      return actor.listAdmins();
    },
    enabled: !!actor && !isFetching,
    retry: 3,
    retryDelay: 2000,
    staleTime: 30_000,
    refetchOnWindowFocus: false,
  });
}

export function useSetUserRole() {
  const { actor } = useBackend();
  const qc = useQueryClient();
  return useMutation<AdminResult, Error, { target: UserId; role: Role }>({
    mutationFn: async ({ target, role }) => {
      if (!actor) throw new Error("Not connected");
      return actor.setUserRole(target, role);
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["userRoles"] });
      qc.invalidateQueries({ queryKey: ["trackedPrincipals"] });
    },
  });
}

export function useRemoveUserRole() {
  const { actor } = useBackend();
  const qc = useQueryClient();
  return useMutation<AdminResult, Error, UserId>({
    mutationFn: async (target) => {
      if (!actor) throw new Error("Not connected");
      return actor.removeUserRole(target);
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["userRoles"] });
      qc.invalidateQueries({ queryKey: ["trackedPrincipals"] });
    },
  });
}

/**
 * initSuperadmin() — one-time bootstrap. Invalidates hasSuperadmin and myRole
 * so the dashboard and bootstrap screen both react immediately.
 */
export function useInitSuperadmin() {
  const { actor } = useBackend();
  const qc = useQueryClient();
  return useMutation<AdminResult, Error, void>({
    mutationFn: async () => {
      if (!actor) throw new Error("Not connected");
      return actor.initSuperadmin();
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["myRole"] });
      qc.invalidateQueries({ queryKey: ["hasSuperadmin"] });
      qc.invalidateQueries({ queryKey: ["userRoles"] });
    },
  });
}

export function useAddInvite() {
  const { actor } = useBackend();
  const qc = useQueryClient();
  return useMutation<InviteResult, Error, { email: string; role: Role }>({
    mutationFn: async ({ email, role }) => {
      if (!actor) throw new Error("Not connected");
      return actor.addInvite(email, role);
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["invites"] });
    },
  });
}

export function useRemoveInvite() {
  const { actor } = useBackend();
  const qc = useQueryClient();
  return useMutation<InviteResult, Error, string>({
    mutationFn: async (email) => {
      if (!actor) throw new Error("Not connected");
      return actor.removeInvite(email);
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["invites"] });
    },
  });
}

export function useBindInvitePrincipal() {
  const { actor } = useBackend();
  const qc = useQueryClient();
  return useMutation<InviteResult, Error, string>({
    mutationFn: async (email) => {
      if (!actor) throw new Error("Not connected");
      return actor.bindInvitePrincipal(email);
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["invites"] });
    },
  });
}

export function useUpdateSettings() {
  const { actor } = useBackend();
  const qc = useQueryClient();
  return useMutation<SettingsResult, Error, SiteSettings>({
    mutationFn: async (settings) => {
      if (!actor) throw new Error("Not connected");
      return actor.updateSettings(settings);
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["settings"] });
      qc.invalidateQueries({ queryKey: ["logoUrl"] });
    },
  });
}

// ─── Payment mutations ───────────────────────────────────────────────────────

export function useCreatePaymentRequest() {
  const { actor } = useBackend();
  return useMutation<PaymentRequest, Error, PaymentType>({
    mutationFn: async (paymentType) => {
      if (!actor) throw new Error("Actor not ready");
      return actor.createPaymentRequest(paymentType);
    },
  });
}

export function useVerifyPaymentRequest() {
  const { actor } = useBackend();
  return useMutation<null, Error, bigint>({
    mutationFn: async (reqId) => {
      console.log("[verifyHook] START reqId=", reqId, "actor=", !!actor);
      if (!actor) throw new Error("Actor not ready");
      const result = await actor.verifyPaymentRequest(reqId);
      console.log("[verifyHook] RAW result=", result);
      if ("err" in result) throw new Error(result.err as string);
      console.log("[verifyHook] returning null (success)");
      return null;
    },
  });
}

export function useGetLinkedWallet() {
  const { actor, isFetching } = useBackend();
  return useQuery<unknown | null>({
    queryKey: ["linkedWallet"],
    queryFn: async () => {
      if (!actor) throw new Error("Actor not ready");
      const result = await actor.getLinkedWallet();
      return result ?? null;
    },
    enabled: !!actor && !isFetching,
    staleTime: 30_000,
    refetchOnWindowFocus: false,
  });
}

export function useLinkWallet() {
  const { actor } = useBackend();
  const qc = useQueryClient();
  return useMutation<null, Error, string>({
    mutationFn: async (walletPrincipalText) => {
      console.log("[linkWallet] starting with:", walletPrincipalText);
      if (!actor) throw new Error("Actor not ready");
      console.log("[linkWallet] actor exists, type:", typeof actor.linkWallet);
      try {
        const { Principal } = await import("@dfinity/principal");
        const walletPrincipal = Principal.fromText(walletPrincipalText);
        console.log("[linkWallet] principal parsed:", walletPrincipal.toString());
        const result = await actor.linkWallet(walletPrincipal);
        console.log("[linkWallet] result:", result);
        return null;
      } catch (e) {
        console.error("[linkWallet] ERROR:", e);
        throw e;
      }
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["userAccess"] });
      qc.invalidateQueries({ queryKey: ["linkedWallet"] });
    },
    onError: (e) => {
      console.error("[linkWallet] mutation error:", e);
    },
  });
}
