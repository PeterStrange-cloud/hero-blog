import Principal "mo:core/Principal";
import Time "mo:core/Time";
import AccessTypes "../types/access";
import ArticleTypes "../types/articles";
import Common "../types/common";
import AccessLib "../lib/access";
import ArticleLib "../lib/articles";

mixin (
  accessStore : AccessLib.AccessStore,
  articleStore : ArticleLib.ArticleStore,
) {

  // ── Public queries ──────────────────────────────────────────────────────────

  /// Returns the full article if caller has access (free article or access granted).
  /// Returns null if not found, not published, or premium without access.
  public shared ({ caller }) func getArticle(id : Common.ArticleId) : async ?ArticleTypes.ArticleFull {
    switch (ArticleLib.getArticle(articleStore, id)) {
      case null null;
      case (?article) {
        if (not article.isPublished) {
          return null;
        };
        if (not article.isPremium) {
          return ?ArticleLib.toFull(article);
        };
        // Premium article — check access
        if (not caller.isAnonymous() and AccessLib.hasArticleAccess(accessStore, caller, id)) {
          ?ArticleLib.toFull(article)
        } else {
          // Return metadata with empty content so frontend can show locked state
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

  /// Returns user's current access state: unlocked articles + subscription info
  public shared query ({ caller }) func getUserAccess() : async AccessTypes.UserAccess {
    if (caller.isAnonymous()) {
      return { unlockedArticleIds = []; subscription = null; isSubscribed = false };
    };
    AccessLib.getUserAccess(accessStore, caller);
  };
};
