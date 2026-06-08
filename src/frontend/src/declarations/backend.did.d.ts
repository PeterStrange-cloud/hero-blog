import type { Principal } from '@icp-sdk/core/principal';
import type { ActorMethod } from '@icp-sdk/core/agent';
import type { IDL } from '@icp-sdk/core/candid';

export type AdminResult = { 'ok' : null } |
  { 'notAuthorized' : null } |
  { 'alreadyExists' : null } |
  { 'notFound' : null } |
  { 'notAdmin' : null };
export interface ArticleCard {
  'id' : ArticleId,
  'title' : string,
  'isPublished' : boolean,
  'isPremium' : boolean,
  'createdAt' : Timestamp,
  'tags' : Array<string>,
  'coverImage' : [] | [ExternalBlob],
  'updatedAt' : Timestamp,
  'excerpt' : string,
  'category' : string,
  'authorPrincipal' : UserId,
}
export interface ArticleFull {
  'id' : ArticleId,
  'title' : string,
  'content' : string,
  'isPublished' : boolean,
  'isPremium' : boolean,
  'createdAt' : Timestamp,
  'tags' : Array<string>,
  'coverImage' : [] | [ExternalBlob],
  'updatedAt' : Timestamp,
  'excerpt' : string,
  'category' : string,
  'authorPrincipal' : UserId,
}
export type ArticleId = bigint;
export interface ArticleInput {
  'title' : string,
  'content' : string,
  'isPremium' : boolean,
  'tags' : Array<string>,
  'coverImage' : [] | [ExternalBlob],
  'excerpt' : string,
  'category' : string,
}
export type ExternalBlob = Uint8Array | number[];
export type InviteResult = { 'ok' : null } |
  { 'notAuthorized' : null } |
  { 'alreadyExists' : null } |
  { 'notFound' : null } |
  { 'alreadyBound' : null };
export interface InvitedUser {
  'boundPrincipal' : [] | [Principal],
  'email' : string,
  'addedAt' : Timestamp,
  'intendedRole' : Role,
  'boundAt' : [] | [Timestamp],
}
export interface PaymentRequest {
  'id' : PaymentRequestId,
  'status' : PaymentStatus,
  'expiresAt' : bigint,
  'userId' : Principal,
  'ownerPrincipal' : string,
  'createdAt' : bigint,
  'subaccount' : Uint8Array | number[],
  'paymentType' : PaymentType,
  'amountE8s' : bigint,
}
export type PaymentRequestId = bigint;
export type PaymentStatus = { 'Consumed' : null } |
  { 'Verified' : null } |
  { 'Expired' : null } |
  { 'Pending' : null };
export type PaymentType = { 'ArticleUnlock' : ArticleId } |
  { 'Subscription' : null };
export type Role = { 'admin' : null } |
  { 'editor' : null } |
  { 'superadmin' : null };
export type SettingsResult = { 'ok' : null } |
  { 'notAuthorized' : null };
export interface SiteSettings { 'logoUrl' : [] | [string] }
export interface Subscription {
  'startTime' : Timestamp,
  'userId' : UserId,
  'expiryTime' : Timestamp,
}
export type Timestamp = bigint;
export interface UserAccess {
  'linkedWallet' : [] | [UserId],
  'subscription' : [] | [Subscription],
  'isSubscribed' : boolean,
  'unlockedArticleIds' : Array<ArticleId>,
}
export type UserId = Principal;
export interface UserRole { 'principal' : UserId, 'role' : Role }
export type BookingDuration = { 'Thirty' : null } | { 'Sixty' : null };
export type SlotStatus = { 'Available' : null } | { 'Booked' : null } | { 'Completed' : null };
export type BookingStatus = { 'Pending' : null } | { 'Confirmed' : null } | { 'Cancelled' : null } | { 'Completed' : null };
export interface BookingSlot { 'id' : bigint; 'startTime' : bigint; 'duration' : BookingDuration; 'status' : SlotStatus; }
export interface Booking { 'id' : bigint; 'slotId' : bigint; 'userId' : Principal; 'amountE8s' : bigint; 'status' : BookingStatus; 'createdAt' : bigint; 'email' : [] | [string]; 'firstName' : [] | [string]; 'lastName' : [] | [string]; 'notes' : [] | [string]; }
export interface _SERVICE {
  'addAdmin' : ActorMethod<[UserId], AdminResult>,
  'addInvite' : ActorMethod<[string, Role], InviteResult>,
  'bindInvitePrincipal' : ActorMethod<[string], InviteResult>,
  'createArticle' : ActorMethod<[ArticleInput], ArticleCard>,
  'createPaymentRequest' : ActorMethod<[PaymentType], PaymentRequest>,
  'deleteArticle' : ActorMethod<[ArticleId], AdminResult>,
  'getAllArticlesAdmin' : ActorMethod<[], Array<ArticleCard>>,
  'getArticle' : ActorMethod<[ArticleId], [] | [ArticleFull]>,
  'getArticleCard' : ActorMethod<[ArticleId], [] | [ArticleCard]>,
  'getDisplayName' : ActorMethod<[Principal], [] | [string]>,
  'getInviteByEmail' : ActorMethod<[string], [] | [InvitedUser]>,
  'getLinkedWallet' : ActorMethod<[], [] | [Principal]>,
  'getLogoUrl' : ActorMethod<[], [] | [string]>,
  'getMyPaymentRequests' : ActorMethod<[], Array<PaymentRequest>>,
  'getMyRole' : ActorMethod<[], [] | [Role]>,
  'getPublishedArticles' : ActorMethod<[], Array<ArticleCard>>,
  'getSettings' : ActorMethod<[], SiteSettings>,
  'getUserAccess' : ActorMethod<[], UserAccess>,
  'hasSuperadmin' : ActorMethod<[], boolean>,
  'initSuperadmin' : ActorMethod<[], AdminResult>,
  'isAuthorized' : ActorMethod<[], boolean>,
  'linkWallet' : ActorMethod<[Principal], { 'ok' : null } | { 'err' : string }>,
  'listAdmins' : ActorMethod<[], Array<UserId>>,
  'listInvites' : ActorMethod<[], Array<InvitedUser>>,
  'listTrackedPrincipals' : ActorMethod<[], Array<UserId>>,
  'listUserRoles' : ActorMethod<[], Array<UserRole>>,
  'publishArticle' : ActorMethod<[ArticleId], AdminResult>,
  'removeAdmin' : ActorMethod<[UserId], AdminResult>,
  'removeInvite' : ActorMethod<[string], InviteResult>,
  'removeUserRole' : ActorMethod<[UserId], AdminResult>,
  'setDisplayName' : ActorMethod<[string], undefined>,
  'setUserRole' : ActorMethod<[UserId, Role], AdminResult>,
  'unpublishArticle' : ActorMethod<[ArticleId], AdminResult>,
  'updateArticle' : ActorMethod<[ArticleId, ArticleInput], AdminResult>,
  'updateSettings' : ActorMethod<[SiteSettings], SettingsResult>,
  'verifyPaymentRequest' : ActorMethod
    [PaymentRequestId],
    { 'ok' : null } |
      { 'err' : string }
  >,
  'createSlot' : ActorMethod<[bigint, BookingDuration], { 'ok' : BookingSlot } | { 'err' : string }>,
  'deleteSlot' : ActorMethod<[bigint], { 'ok' : null } | { 'err' : string }>,
  'getAvailableSlots' : ActorMethod<[], Array<BookingSlot>>,
  'getAllSlots' : ActorMethod<[], Array<BookingSlot>>,
  'getAllBookings' : ActorMethod<[], Array<Booking>>,
  'createBooking' : ActorMethod<[bigint, BookingDuration, [] | [string], [] | [string], [] | [string], [] | [string]], { 'ok' : Booking } | { 'err' : string }>,
  'cancelBooking' : ActorMethod<[bigint], { 'ok' : null } | { 'err' : string }>,
  'confirmBooking' : ActorMethod<[bigint], { 'ok' : null } | { 'err' : string }>,
  'completeBooking' : ActorMethod<[bigint], { 'ok' : null } | { 'err' : string }>,
  'getMyBookings' : ActorMethod<[], Array<Booking>>,
}
export declare const idlFactory: IDL.InterfaceFactory;
export declare const init: (args: { IDL: typeof IDL }) => IDL.Type[];
