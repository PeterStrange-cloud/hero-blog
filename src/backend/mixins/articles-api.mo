import Runtime "mo:core/Runtime";
import ArticleTypes "../types/articles";
import AdminTypes "../types/admin";
import Common "../types/common";
import ArticleLib "../lib/articles";
import AdminLib "../lib/admin";

mixin (
  articleStore : ArticleLib.ArticleStore,
  adminStore : AdminLib.AdminStore,
) {

  // ── Public queries ──────────────────────────────────────────────────────────

  /// Returns article cards for all published articles (no content field)
  public query func getPublishedArticles() : async [ArticleTypes.ArticleCard] {
    ArticleLib.getPublishedArticles(articleStore);
  };

  /// Returns all articles (published and unpublished) — admin only
  public shared ({ caller }) func getAllArticlesAdmin() : async [ArticleTypes.ArticleCard] {
    if (not AdminLib.isAdmin(adminStore, caller)) {
      Runtime.trap("Unauthorized: admin only");
    };
    ArticleLib.getAllArticles(articleStore);
  };

  /// Returns the article card (no content) for any published article.
  /// Used by the public listing.
  public query ({ caller = _ }) func getArticleCard(id : Common.ArticleId) : async ?ArticleTypes.ArticleCard {
    switch (ArticleLib.getArticle(articleStore, id)) {
      case null null;
      case (?article) {
        if (not article.isPublished) null
        else ?ArticleLib.toCard(article);
      };
    };
  };

  // ── Admin updates ───────────────────────────────────────────────────────────

  /// Create a new article draft (admin only)
  public shared ({ caller }) func createArticle(input : ArticleTypes.ArticleInput) : async ArticleTypes.ArticleCard {
    if (not AdminLib.isAdmin(adminStore, caller)) {
      Runtime.trap("Unauthorized: admin only");
    };
    ArticleLib.createArticle(articleStore, input, caller);
  };

  /// Update an existing article (admin only)
  public shared ({ caller }) func updateArticle(
    id : Common.ArticleId,
    input : ArticleTypes.ArticleInput,
  ) : async AdminTypes.AdminResult {
    if (not AdminLib.isAdmin(adminStore, caller)) {
      return #notAdmin;
    };
    switch (ArticleLib.updateArticle(articleStore, id, input)) {
      case null #notFound;
      case (?_) #ok;
    };
  };

  /// Delete an article permanently (admin only)
  public shared ({ caller }) func deleteArticle(id : Common.ArticleId) : async AdminTypes.AdminResult {
    if (not AdminLib.isAdmin(adminStore, caller)) {
      return #notAdmin;
    };
    if (ArticleLib.deleteArticle(articleStore, id)) #ok else #notFound;
  };

  /// Publish an article (admin only)
  public shared ({ caller }) func publishArticle(id : Common.ArticleId) : async AdminTypes.AdminResult {
    if (not AdminLib.isAdmin(adminStore, caller)) {
      return #notAdmin;
    };
    if (ArticleLib.publishArticle(articleStore, id)) #ok else #notFound;
  };

  /// Unpublish an article (admin only)
  public shared ({ caller }) func unpublishArticle(id : Common.ArticleId) : async AdminTypes.AdminResult {
    if (not AdminLib.isAdmin(adminStore, caller)) {
      return #notAdmin;
    };
    if (ArticleLib.unpublishArticle(articleStore, id)) #ok else #notFound;
  };
};
