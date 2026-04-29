export const idlFactory = ({ IDL }) => {
  const UserId = IDL.Principal;
  const AdminResult = IDL.Variant({
    'ok' : IDL.Null,
    'notAuthorized' : IDL.Null,
    'alreadyExists' : IDL.Null,
    'notFound' : IDL.Null,
    'notAdmin' : IDL.Null,
  });
  const Role = IDL.Variant({
    'admin' : IDL.Null,
    'editor' : IDL.Null,
    'superadmin' : IDL.Null,
  });
  const InviteResult = IDL.Variant({
    'ok' : IDL.Null,
    'notAuthorized' : IDL.Null,
    'alreadyExists' : IDL.Null,
    'notFound' : IDL.Null,
    'alreadyBound' : IDL.Null,
  });
  const ExternalBlob = IDL.Vec(IDL.Nat8);
  const ArticleInput = IDL.Record({
    'title' : IDL.Text,
    'content' : IDL.Text,
    'isPremium' : IDL.Bool,
    'tags' : IDL.Vec(IDL.Text),
    'coverImage' : IDL.Opt(ExternalBlob),
    'excerpt' : IDL.Text,
    'category' : IDL.Text,
  });
  const ArticleId = IDL.Nat;
  const Timestamp = IDL.Int;
  const ArticleCard = IDL.Record({
    'id' : ArticleId,
    'title' : IDL.Text,
    'isPublished' : IDL.Bool,
    'isPremium' : IDL.Bool,
    'createdAt' : Timestamp,
    'tags' : IDL.Vec(IDL.Text),
    'coverImage' : IDL.Opt(ExternalBlob),
    'updatedAt' : Timestamp,
    'excerpt' : IDL.Text,
    'category' : IDL.Text,
    'authorPrincipal' : UserId,
  });
  const PaymentType = IDL.Variant({
    'ArticleUnlock' : ArticleId,
    'Subscription' : IDL.Null,
  });
  const PaymentRequestId = IDL.Nat;
  const PaymentStatus = IDL.Variant({
    'Consumed' : IDL.Null,
    'Verified' : IDL.Null,
    'Expired' : IDL.Null,
    'Pending' : IDL.Null,
  });
  const PaymentRequest = IDL.Record({
    'id' : PaymentRequestId,
    'status' : PaymentStatus,
    'expiresAt' : IDL.Int,
    'userId' : IDL.Principal,
    'ownerPrincipal' : IDL.Text,
    'createdAt' : IDL.Int,
    'subaccount' : IDL.Vec(IDL.Nat8),
    'paymentType' : PaymentType,
    'amountE8s' : IDL.Nat,
  });
  const ArticleFull = IDL.Record({
    'id' : ArticleId,
    'title' : IDL.Text,
    'content' : IDL.Text,
    'isPublished' : IDL.Bool,
    'isPremium' : IDL.Bool,
    'createdAt' : Timestamp,
    'tags' : IDL.Vec(IDL.Text),
    'coverImage' : IDL.Opt(ExternalBlob),
    'updatedAt' : Timestamp,
    'excerpt' : IDL.Text,
    'category' : IDL.Text,
    'authorPrincipal' : UserId,
  });
  const InvitedUser = IDL.Record({
    'boundPrincipal' : IDL.Opt(IDL.Principal),
    'email' : IDL.Text,
    'addedAt' : Timestamp,
    'intendedRole' : Role,
    'boundAt' : IDL.Opt(Timestamp),
  });
  const SiteSettings = IDL.Record({ 'logoUrl' : IDL.Opt(IDL.Text) });
  const Subscription = IDL.Record({
    'startTime' : Timestamp,
    'userId' : UserId,
    'expiryTime' : Timestamp,
  });
  const UserAccess = IDL.Record({
    'linkedWallet' : IDL.Opt(UserId),
    'subscription' : IDL.Opt(Subscription),
    'isSubscribed' : IDL.Bool,
    'unlockedArticleIds' : IDL.Vec(ArticleId),
  });
  const UserRole = IDL.Record({ 'principal' : UserId, 'role' : Role });
  const SettingsResult = IDL.Variant({
    'ok' : IDL.Null,
    'notAuthorized' : IDL.Null,
  });
  return IDL.Service({
    'addAdmin' : IDL.Func([UserId], [AdminResult], []),
    'addInvite' : IDL.Func([IDL.Text, Role], [InviteResult], []),
    'bindInvitePrincipal' : IDL.Func([IDL.Text], [InviteResult], []),
    'createArticle' : IDL.Func([ArticleInput], [ArticleCard], []),
    'createPaymentRequest' : IDL.Func([PaymentType], [PaymentRequest], []),
    'deleteArticle' : IDL.Func([ArticleId], [AdminResult], []),
    'getAllArticlesAdmin' : IDL.Func([], [IDL.Vec(ArticleCard)], []),
    'getArticle' : IDL.Func([ArticleId], [IDL.Opt(ArticleFull)], []),
    'getArticleCard' : IDL.Func([ArticleId], [IDL.Opt(ArticleCard)], ['query']),
    'getDisplayName' : IDL.Func([IDL.Principal], [IDL.Opt(IDL.Text)], ['query']),
    'getInviteByEmail' : IDL.Func([IDL.Text], [IDL.Opt(InvitedUser)], []),
    'getLinkedWallet' : IDL.Func([], [IDL.Opt(IDL.Principal)], ['query']),
    'getLogoUrl' : IDL.Func([], [IDL.Opt(IDL.Text)], ['query']),
    'getMyPaymentRequests' : IDL.Func([], [IDL.Vec(PaymentRequest)], ['query']),
    'getMyRole' : IDL.Func([], [IDL.Opt(Role)], []),
    'getPublishedArticles' : IDL.Func([], [IDL.Vec(ArticleCard)], ['query']),
    'getSettings' : IDL.Func([], [SiteSettings], ['query']),
    'getUserAccess' : IDL.Func([], [UserAccess], ['query']),
    'hasSuperadmin' : IDL.Func([], [IDL.Bool], ['query']),
    'initSuperadmin' : IDL.Func([], [AdminResult], []),
    'isAuthorized' : IDL.Func([], [IDL.Bool], ['query']),
    'linkWallet' : IDL.Func(
        [IDL.Principal],
        [IDL.Variant({ 'ok' : IDL.Null, 'err' : IDL.Text })],
        [],
      ),
    'listAdmins' : IDL.Func([], [IDL.Vec(UserId)], []),
    'listInvites' : IDL.Func([], [IDL.Vec(InvitedUser)], []),
    'listTrackedPrincipals' : IDL.Func([], [IDL.Vec(UserId)], []),
    'listUserRoles' : IDL.Func([], [IDL.Vec(UserRole)], []),
    'publishArticle' : IDL.Func([ArticleId], [AdminResult], []),
    'removeAdmin' : IDL.Func([UserId], [AdminResult], []),
    'removeInvite' : IDL.Func([IDL.Text], [InviteResult], []),
    'removeUserRole' : IDL.Func([UserId], [AdminResult], []),
    'setDisplayName' : IDL.Func([IDL.Text], [], []),
    'setUserRole' : IDL.Func([UserId, Role], [AdminResult], []),
    'unpublishArticle' : IDL.Func([ArticleId], [AdminResult], []),
    'updateArticle' : IDL.Func([ArticleId, ArticleInput], [AdminResult], []),
    'updateSettings' : IDL.Func([SiteSettings], [SettingsResult], []),
    'verifyPaymentRequest' : IDL.Func(
        [PaymentRequestId],
        [IDL.Variant({ 'ok' : IDL.Null, 'err' : IDL.Text })],
        [],
      ),
  });
};
export const init = ({ IDL }) => { return []; };
