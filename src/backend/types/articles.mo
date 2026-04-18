import Storage "mo:caffeineai-object-storage/Storage";
import Common "common";

module {
  public type ArticleId = Common.ArticleId;
  public type UserId = Common.UserId;
  public type Timestamp = Common.Timestamp;

  // Internal mutable article record
  public type Article = {
    id : ArticleId;
    var title : Text;
    var excerpt : Text;
    var content : Text;
    var coverImage : ?Storage.ExternalBlob;
    var category : Text;
    var tags : [Text];
    var isPremium : Bool;
    var isPublished : Bool;
    authorPrincipal : UserId;
    createdAt : Timestamp;
    var updatedAt : Timestamp;
  };

  // Immutable public representation for article card (list, no content)
  public type ArticleCard = {
    id : ArticleId;
    title : Text;
    excerpt : Text;
    coverImage : ?Storage.ExternalBlob;
    category : Text;
    tags : [Text];
    isPremium : Bool;
    isPublished : Bool;
    authorPrincipal : UserId;
    createdAt : Timestamp;
    updatedAt : Timestamp;
  };

  // Immutable public representation for full article
  public type ArticleFull = {
    id : ArticleId;
    title : Text;
    excerpt : Text;
    content : Text;
    coverImage : ?Storage.ExternalBlob;
    category : Text;
    tags : [Text];
    isPremium : Bool;
    isPublished : Bool;
    authorPrincipal : UserId;
    createdAt : Timestamp;
    updatedAt : Timestamp;
  };

  // Input for creating/updating articles
  public type ArticleInput = {
    title : Text;
    excerpt : Text;
    content : Text;
    coverImage : ?Storage.ExternalBlob;
    category : Text;
    tags : [Text];
    isPremium : Bool;
  };
};
