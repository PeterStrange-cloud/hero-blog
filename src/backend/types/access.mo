import Common "common";
module {
  public type UserId = Common.UserId;
  public type ArticleId = Common.ArticleId;
  public type Timestamp = Common.Timestamp;

  public type ArticleUnlock = {
    userId : UserId;
    articleId : ArticleId;
    grantedAt : Timestamp;
  };

  public type Subscription = {
    userId : UserId;
    startTime : Timestamp;
    expiryTime : Timestamp;
  };

  public type UserAccess = {
    unlockedArticleIds : [ArticleId];
    subscription : ?Subscription;
    isSubscribed : Bool;
    linkedWallet : ?UserId;
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
