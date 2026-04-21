import Map "mo:core/Map";
import Iter "mo:core/Iter";
import Array "mo:core/Array";
import Time "mo:core/Time";
import Int "mo:core/Int";
import Types "../types/articles";
import Common "../types/common";

module {
  public type ArticleStore = {
    articles : Map.Map<Common.ArticleId, Types.Article>;
    var nextId : Nat;
  };

  public func newStore() : ArticleStore {
    {
      articles = Map.empty<Common.ArticleId, Types.Article>();
      var nextId = 0;
    };
  };

  public func createArticle(
    store : ArticleStore,
    input : Types.ArticleInput,
    author : Common.UserId,
  ) : Types.ArticleCard {
    let id = store.nextId;
    store.nextId += 1;
    let now = Time.now();
    let article : Types.Article = {
      id;
      var title = input.title;
      var excerpt = input.excerpt;
      var content = input.content;
      var coverImage = input.coverImage;
      var category = input.category;
      var tags = input.tags;
      var isPremium = input.isPremium;
      var isPublished = false;
      authorPrincipal = author;
      createdAt = now;
      var updatedAt = now;
    };
    store.articles.add(id, article);
    toCard(article);
  };

  public func updateArticle(
    store : ArticleStore,
    id : Common.ArticleId,
    input : Types.ArticleInput,
  ) : ?Types.ArticleCard {
    switch (store.articles.get(id)) {
      case null null;
      case (?article) {
        article.title := input.title;
        article.excerpt := input.excerpt;
        article.content := input.content;
        article.coverImage := input.coverImage;
        article.category := input.category;
        article.tags := input.tags;
        article.isPremium := input.isPremium;
        article.updatedAt := Time.now();
        ?toCard(article);
      };
    };
  };

  public func deleteArticle(store : ArticleStore, id : Common.ArticleId) : Bool {
    switch (store.articles.get(id)) {
      case null false;
      case (?_) {
        store.articles.remove(id);
        true;
      };
    };
  };

  public func publishArticle(store : ArticleStore, id : Common.ArticleId) : Bool {
    switch (store.articles.get(id)) {
      case null false;
      case (?article) {
        article.isPublished := true;
        article.updatedAt := Time.now();
        true;
      };
    };
  };

  public func unpublishArticle(store : ArticleStore, id : Common.ArticleId) : Bool {
    switch (store.articles.get(id)) {
      case null false;
      case (?article) {
        article.isPublished := false;
        article.updatedAt := Time.now();
        true;
      };
    };
  };

  public func getPublishedArticles(store : ArticleStore) : [Types.ArticleCard] {
    let cards = store.articles.values()
      .filter(func(a : Types.Article) : Bool { a.isPublished })
      .map(func(a : Types.Article) : Types.ArticleCard { toCard(a) })
      .toArray();
    let sorted = Array.sort(cards, func(a : Types.ArticleCard, b : Types.ArticleCard) : { #less; #equal; #greater } {
      Int.compare(b.createdAt, a.createdAt);
    });
    sorted
  };

  public func getAllArticles(store : ArticleStore) : [Types.ArticleCard] {
    let cards = store.articles.values().map(func(a : Types.Article) : Types.ArticleCard { toCard(a) }).toArray();
    let sorted = Array.sort(cards, func(a : Types.ArticleCard, b : Types.ArticleCard) : { #less; #equal; #greater } {
      Int.compare(b.createdAt, a.createdAt);
    });
    sorted
  };

  public func getArticle(store : ArticleStore, id : Common.ArticleId) : ?Types.Article {
    store.articles.get(id);
  };

  public func toCard(a : Types.Article) : Types.ArticleCard {
    {
      id = a.id;
      title = a.title;
      excerpt = a.excerpt;
      coverImage = a.coverImage;
      category = a.category;
      tags = a.tags;
      isPremium = a.isPremium;
      isPublished = a.isPublished;
      authorPrincipal = a.authorPrincipal;
      createdAt = a.createdAt;
      updatedAt = a.updatedAt;
    };
  };

  public func toFull(a : Types.Article) : Types.ArticleFull {
    {
      id = a.id;
      title = a.title;
      excerpt = a.excerpt;
      content = a.content;
      coverImage = a.coverImage;
      category = a.category;
      tags = a.tags;
      isPremium = a.isPremium;
      isPublished = a.isPublished;
      authorPrincipal = a.authorPrincipal;
      createdAt = a.createdAt;
      updatedAt = a.updatedAt;
    };
  };
};
