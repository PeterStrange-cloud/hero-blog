import Set "mo:core/Set";
import Nat "mo:core/Nat";
import Principal "mo:core/Principal";
import Time "mo:core/Time";
import AccessTypes "../types/access";
import ArticleTypes "../types/articles";
import Common "../types/common";
import AccessLib "../lib/access";
import ArticleLib "../lib/articles";
import PaymentLib "../lib/payment";

mixin (
  accessStore : AccessLib.AccessStore,
  articleStore : ArticleLib.ArticleStore,
  consumedPayments : Set.Set<Nat>,
  paymentRequestStore : PaymentLib.PaymentStore,
) {

  public shared ({ caller }) func getArticle(id : Common.ArticleId) : async ?ArticleTypes.ArticleFull {
    switch (ArticleLib.getArticle(articleStore, id)) {
      case null null;
      case (?article) {
        if (not article.isPublished) return null;
        if (not article.isPremium) return ?ArticleLib.toFull(article);
        if (not Principal.isAnonymous(caller) and AccessLib.hasArticleAccess(accessStore, caller, id)) {
          ?ArticleLib.toFull(article)
        } else {
          ?{
            id              = article.id;
            title           = article.title;
            excerpt         = article.excerpt;
            content         = "";
            coverImage      = article.coverImage;
            category        = article.category;
            tags            = article.tags;
            isPremium       = article.isPremium;
            isPublished     = article.isPublished;
            authorPrincipal = article.authorPrincipal;
            createdAt       = article.createdAt;
            updatedAt       = article.updatedAt;
          }
        };
      };
    };
  };

  public shared query ({ caller }) func getUserAccess() : async AccessTypes.UserAccess {
    if (Principal.isAnonymous(caller)) {
      return { unlockedArticleIds = []; subscription = null; isSubscribed = false; linkedWallet = null };
    };
    AccessLib.getUserAccess(accessStore, caller);
  };

  public shared ({ caller }) func linkWallet(walletPrincipal : Principal) : async { #ok; #err : Text } {
    if (Principal.isAnonymous(caller)) {
      return #err("Must be signed in to link a wallet");
    };
    AccessLib.linkWallet(accessStore, caller, walletPrincipal);
    #ok
  };

  public shared query ({ caller }) func getLinkedWallet() : async ?Principal {
    if (Principal.isAnonymous(caller)) return null;
    AccessLib.getLinkedWallet(accessStore, caller);
  };
};
