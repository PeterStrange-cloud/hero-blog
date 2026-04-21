import Map "mo:core/Map";
import Set "mo:core/Set";
import Time "mo:core/Time";
import Principal "mo:core/Principal";
import Nat "mo:core/Nat";
import Types "../types/access";
import Common "../types/common";

module {
  public type AccessStore = {
    unlocks : Map.Map<Common.UserId, Set.Set<Common.ArticleId>>;
    subscriptions : Map.Map<Common.UserId, Types.Subscription>;
    linkedWallets : Map.Map<Common.UserId, Common.UserId>;
  };

  public func newStore() : AccessStore {
    {
      unlocks = Map.empty<Common.UserId, Set.Set<Common.ArticleId>>();
      subscriptions = Map.empty<Common.UserId, Types.Subscription>();
      linkedWallets = Map.empty<Common.UserId, Common.UserId>();
    };
  };

  public func isSubscribed(store : AccessStore, userId : Common.UserId) : Bool {
    switch (Map.get(store.subscriptions, Principal.compare, userId)) {
      case null false;
      case (?sub) { Time.now() < sub.expiryTime };
    };
  };

  public func hasArticleAccess(
    store : AccessStore,
    userId : Common.UserId,
    articleId : Common.ArticleId,
  ) : Bool {
    if (isSubscribed(store, userId)) return true;
    switch (Map.get(store.unlocks, Principal.compare, userId)) {
      case null false;
      case (?userUnlocks) {
        Set.contains(userUnlocks, Nat.compare, articleId);
      };
    };
  };

  public func grantUnlock(
    store : AccessStore,
    userId : Common.UserId,
    articleId : Common.ArticleId,
  ) : () {
    let userUnlocks = switch (Map.get(store.unlocks, Principal.compare, userId)) {
      case null {
        let s = Set.empty<Common.ArticleId>();
        Map.add(store.unlocks, Principal.compare, userId, s);
        s;
      };
      case (?s) s;
    };
    Set.add(userUnlocks, Nat.compare, articleId);
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
    Map.add(store.subscriptions, Principal.compare, userId, sub);
  };

  public func linkWallet(
    store : AccessStore,
    userId : Common.UserId,
    walletPrincipal : Common.UserId,
  ) : () {
    Map.add(store.linkedWallets, Principal.compare, userId, walletPrincipal);
  };

  public func getLinkedWallet(
    store : AccessStore,
    userId : Common.UserId,
  ) : ?Common.UserId {
    Map.get(store.linkedWallets, Principal.compare, userId);
  };

  public func getUserAccess(
    store : AccessStore,
    userId : Common.UserId,
  ) : Types.UserAccess {
    let unlockedIds = switch (Map.get(store.unlocks, Principal.compare, userId)) {
      case null [];
      case (?s) Set.toArray(s);
    };
    let sub = Map.get(store.subscriptions, Principal.compare, userId);
    let subscribed = switch (sub) {
      case null false;
      case (?s) Time.now() < s.expiryTime;
    };
    let linkedWallet = Map.get(store.linkedWallets, Principal.compare, userId);
    {
      unlockedArticleIds = unlockedIds;
      subscription = sub;
      isSubscribed = subscribed;
      linkedWallet;
    };
  };
};
