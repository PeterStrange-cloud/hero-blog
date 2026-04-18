import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export class ExternalBlob {
    getBytes(): Promise<Uint8Array<ArrayBuffer>>;
    getDirectURL(): string;
    static fromURL(url: string): ExternalBlob;
    static fromBytes(blob: Uint8Array<ArrayBuffer>): ExternalBlob;
    withUploadProgress(onProgress: (percentage: number) => void): ExternalBlob;
}
export interface ArticleFull {
    id: ArticleId;
    title: string;
    content: string;
    isPublished: boolean;
    isPremium: boolean;
    createdAt: Timestamp;
    tags: Array<string>;
    coverImage?: ExternalBlob;
    updatedAt: Timestamp;
    excerpt: string;
    category: string;
    authorPrincipal: UserId;
}
export interface ArticleCard {
    id: ArticleId;
    title: string;
    isPublished: boolean;
    isPremium: boolean;
    createdAt: Timestamp;
    tags: Array<string>;
    coverImage?: ExternalBlob;
    updatedAt: Timestamp;
    excerpt: string;
    category: string;
    authorPrincipal: UserId;
}
export type Timestamp = bigint;
export interface UserAccess {
    subscription?: Subscription;
    isSubscribed: boolean;
    unlockedArticleIds: Array<ArticleId>;
}
export interface UserRole {
    principal: UserId;
    role: Role;
}
export type PaymentType = {
    __kind__: "ArticleUnlock";
    ArticleUnlock: ArticleId;
} | {
    __kind__: "Subscription";
    Subscription: null;
};
export type ArticleId = bigint;
export interface Subscription {
    startTime: Timestamp;
    userId: UserId;
    expiryTime: Timestamp;
}
export type UserId = Principal;
export interface SiteSettings {
    logoUrl?: string;
}
export type PaymentRequestId = bigint;
export interface InvitedUser {
    boundPrincipal?: Principal;
    email: string;
    addedAt: Timestamp;
    intendedRole: Role;
    boundAt?: Timestamp;
}
export interface PaymentRequest {
    id: PaymentRequestId;
    status: PaymentStatus;
    expiresAt: bigint;
    userId: Principal;
    ownerPrincipal: string;
    createdAt: bigint;
    subaccount: Uint8Array;
    paymentType: PaymentType;
    amountE8s: bigint;
}
export interface ArticleInput {
    title: string;
    content: string;
    isPremium: boolean;
    tags: Array<string>;
    coverImage?: ExternalBlob;
    excerpt: string;
    category: string;
}
export enum AdminResult {
    ok = "ok",
    notAuthorized = "notAuthorized",
    alreadyExists = "alreadyExists",
    notFound = "notFound",
    notAdmin = "notAdmin"
}
export enum InviteResult {
    ok = "ok",
    notAuthorized = "notAuthorized",
    alreadyExists = "alreadyExists",
    notFound = "notFound",
    alreadyBound = "alreadyBound"
}
export enum PaymentStatus {
    Consumed = "Consumed",
    Verified = "Verified",
    Expired = "Expired",
    Pending = "Pending"
}
export enum Role {
    admin = "admin",
    editor = "editor",
    superadmin = "superadmin"
}
export enum SettingsResult {
    ok = "ok",
    notAuthorized = "notAuthorized"
}
export interface backendInterface {
    addAdmin(newAdmin: UserId): Promise<AdminResult>;
    addInvite(email: string, role: Role): Promise<InviteResult>;
    bindInvitePrincipal(email: string): Promise<InviteResult>;
    createArticle(input: ArticleInput): Promise<ArticleCard>;
    createPaymentRequest(paymentType: PaymentType): Promise<PaymentRequest>;
    deleteArticle(id: ArticleId): Promise<AdminResult>;
    getAllArticlesAdmin(): Promise<Array<ArticleCard>>;
    getArticle(id: ArticleId): Promise<ArticleFull | null>;
    getArticleCard(id: ArticleId): Promise<ArticleCard | null>;
    getInviteByEmail(email: string): Promise<InvitedUser | null>;
    getLogoUrl(): Promise<string | null>;
    getMyPaymentRequests(): Promise<Array<PaymentRequest>>;
    getMyRole(): Promise<Role | null>;
    getPublishedArticles(): Promise<Array<ArticleCard>>;
    getSettings(): Promise<SiteSettings>;
    getUserAccess(): Promise<UserAccess>;
    hasSuperadmin(): Promise<boolean>;
    initSuperadmin(): Promise<AdminResult>;
    isAuthorized(): Promise<boolean>;
    listAdmins(): Promise<Array<UserId>>;
    listInvites(): Promise<Array<InvitedUser>>;
    listTrackedPrincipals(): Promise<Array<UserId>>;
    listUserRoles(): Promise<Array<UserRole>>;
    publishArticle(id: ArticleId): Promise<AdminResult>;
    removeAdmin(target: UserId): Promise<AdminResult>;
    removeInvite(email: string): Promise<InviteResult>;
    removeUserRole(target: UserId): Promise<AdminResult>;
    setUserRole(target: UserId, role: Role): Promise<AdminResult>;
    unpublishArticle(id: ArticleId): Promise<AdminResult>;
    updateArticle(id: ArticleId, input: ArticleInput): Promise<AdminResult>;
    updateSettings(updated: SiteSettings): Promise<SettingsResult>;
    verifyPaymentRequest(reqId: bigint): Promise<{
        __kind__: "ok";
        ok: null;
    } | {
        __kind__: "err";
        err: string;
    }>;
}
