import Common "common";

module {
  public type UserId = Common.UserId;
  public type ArticleId = Common.ArticleId;
  public type Timestamp = Common.Timestamp;

  // A one-time unlock record: user unlocked a specific article
  public type ArticleUnlock = {
    userId : UserId;
    articleId : ArticleId;
    grantedAt : Timestamp;
  };

  // A monthly subscription record
  public type Subscription = {
    userId : UserId;
    startTime : Timestamp;
    expiryTime : Timestamp;
  };

  // Summary of a user's access state (returned to frontend)
  public type UserAccess = {
    unlockedArticleIds : [ArticleId];
    subscription : ?Subscription;
    isSubscribed : Bool;
  };

  public type PaymentRequestId = Nat;

  public type PaymentType = {
    #ArticleUnlock : ArticleId;
    #Subscription;
  };

  public type PaymentStatus = {
    #Pending;
    #Verified;
    #Expired;
    #Consumed;
  };

  public type PaymentRequest = {
    id             : PaymentRequestId;
    userId         : Principal;
    paymentType    : PaymentType;
    amountE8s      : Nat;
    subaccount     : Blob;
    ownerPrincipal : Text;
    createdAt      : Int;
    expiresAt      : Int;
    status         : PaymentStatus;
  };
};
