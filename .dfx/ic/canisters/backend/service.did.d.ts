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
export interface Booking {
  'id' : BookingId,
  'status' : BookingStatus,
  'userId' : Principal,
  'createdAt' : bigint,
  'email' : [] | [string],
  'slotId' : SlotId,
  'notes' : [] | [string],
  'amountE8s' : bigint,
  'lastName' : [] | [string],
  'firstName' : [] | [string],
}
export type BookingDuration = { 'Sixty' : null } |
  { 'Thirty' : null };
export type BookingId = bigint;
export interface BookingSlot {
  'id' : SlotId,
  'startTime' : bigint,
  'status' : SlotStatus,
  'duration' : BookingDuration,
}
export type BookingStatus = { 'Confirmed' : null } |
  { 'Cancelled' : null } |
  { 'Completed' : null } |
  { 'Pending' : null };
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
export type SlotId = bigint;
export type SlotStatus = { 'Available' : null } |
  { 'Booked' : null } |
  { 'Completed' : null };
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
export interface _SERVICE {
  'addAdmin' : ActorMethod<[UserId], AdminResult>,
  'addInvite' : ActorMethod<[string, Role], InviteResult>,
  'bindInvitePrincipal' : ActorMethod<[string], InviteResult>,
  'cancelBooking' : ActorMethod<
    [BookingId],
    { 'ok' : null } |
      { 'err' : string }
  >,
  'completeBooking' : ActorMethod<
    [BookingId],
    { 'ok' : null } |
      { 'err' : string }
  >,
  'confirmBooking' : ActorMethod<
    [BookingId],
    { 'ok' : null } |
      { 'err' : string }
  >,
  'createArticle' : ActorMethod<[ArticleInput], ArticleCard>,
  'createBooking' : ActorMethod<
    [
      SlotId,
      BookingDuration,
      [] | [string],
      [] | [string],
      [] | [string],
      [] | [string],
    ],
    { 'ok' : Booking } |
      { 'err' : string }
  >,
  'createPaymentRequest' : ActorMethod<[PaymentType], PaymentRequest>,
  'createSlot' : ActorMethod<
    [bigint, BookingDuration],
    { 'ok' : BookingSlot } |
      { 'err' : string }
  >,
  'debugVerify' : ActorMethod<[PaymentRequestId], string>,
  'deleteArticle' : ActorMethod<[ArticleId], AdminResult>,
  'deleteSlot' : ActorMethod<[SlotId], { 'ok' : null } | { 'err' : string }>,
  'getAllArticlesAdmin' : ActorMethod<[], Array<ArticleCard>>,
  'getAllBookings' : ActorMethod<[], Array<Booking>>,
  'getAllSlots' : ActorMethod<[], Array<BookingSlot>>,
  'getArticle' : ActorMethod<[ArticleId], [] | [ArticleFull]>,
  'getArticleCard' : ActorMethod<[ArticleId], [] | [ArticleCard]>,
  'getAvailableSlots' : ActorMethod<[], Array<BookingSlot>>,
  'getDisplayName' : ActorMethod<[Principal], [] | [string]>,
  'getInviteByEmail' : ActorMethod<[string], [] | [InvitedUser]>,
  'getLinkedWallet' : ActorMethod<[], [] | [Principal]>,
  'getLogoUrl' : ActorMethod<[], [] | [string]>,
  'getMyBookings' : ActorMethod<[], Array<Booking>>,
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
  'verifyPaymentRequest' : ActorMethod<
    [PaymentRequestId],
    { 'ok' : null } |
      { 'err' : string }
  >,
}
export declare const idlFactory: IDL.InterfaceFactory;
export declare const init: (args: { IDL: typeof IDL }) => IDL.Type[];
