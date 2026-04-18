import Map "mo:core/Map";
import Set "mo:core/Set";
import Time "mo:core/Time";
import Types "../types/access";
import Common "../types/common";

module {
  public type AccessStore = {
    // Map from userId -> Set of unlockedArticleIds
    unlocks : Map.Map<Common.UserId, Set.Set<Common.ArticleId>>;
    // Map from userId -> Subscription
    subscriptions : Map.Map<Common.UserId, Types.Subscription>;
  };

  public func newStore() : AccessStore {
    {
      unlocks = Map.empty<Common.UserId, Set.Set<Common.ArticleId>>();
      subscriptions = Map.empty<Common.UserId, Types.Subscription>();
    };
  };

  public func isSubscribed(store : AccessStore, userId : Common.UserId) : Bool {
    switch (store.subscriptions.get(userId)) {
      case null false;
      case (?sub) {
        Time.now() < sub.expiryTime;
      };
    };
  };

  public func hasArticleAccess(
    store : AccessStore,
    userId : Common.UserId,
    articleId : Common.ArticleId,
  ) : Bool {
    if (isSubscribed(store, userId)) return true;
    switch (store.unlocks.get(userId)) {
      case null false;
      case (?userUnlocks) {
        userUnlocks.contains(articleId);
      };
    };
  };

  public func grantUnlock(
    store : AccessStore,
    userId : Common.UserId,
    articleId : Common.ArticleId,
  ) : () {
    let userUnlocks = switch (store.unlocks.get(userId)) {
      case null {
        let s = Set.empty<Common.ArticleId>();
        store.unlocks.add(userId, s);
        s;
      };
      case (?s) s;
    };
    userUnlocks.add(articleId);
  };

  public func grantSubscription(
    store : AccessStore,
    userId : Common.UserId,
    startTime : Common.Timestamp,
    expiryTime : Common.Timestamp,
  ) : () {
    let sub : Types.Subscription = {
      userId;
      startTime;
      expiryTime;
    };
    store.subscriptions.add(userId, sub);
  };

  public func getUserAccess(
    store : AccessStore,
    userId : Common.UserId,
  ) : Types.UserAccess {
    let unlockedIds = switch (store.unlocks.get(userId)) {
      case null [];
      case (?s) s.toArray();
    };
    let sub = store.subscriptions.get(userId);
    let subscribed = switch (sub) {
      case null false;
      case (?s) Time.now() < s.expiryTime;
    };
    {
      unlockedArticleIds = unlockedIds;
      subscription = sub;
      isSubscribed = subscribed;
    };
  };
};
