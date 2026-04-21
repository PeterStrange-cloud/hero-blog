import Map "mo:core/Map";
import Iter "mo:core/Iter";
import Text "mo:core/Text";
import Time "mo:core/Time";
import Principal "mo:core/Principal";
import InviteTypes "../types/invite";
import Common "../types/common";

module {
  public type InviteStore = {
    invites : Map.Map<Text, InviteTypes.InvitedUser>;
  };

  public func newStore() : InviteStore {
    {
      invites = Map.empty<Text, InviteTypes.InvitedUser>();
    };
  };

  public func addInvite(
    store : InviteStore,
    email : Text,
    role : InviteTypes.Role,
  ) : InviteTypes.InviteResult {
    if (Map.containsKey(store.invites, Text.compare, email)) {
      return #alreadyExists;
    };
    let invite : InviteTypes.InvitedUser = {
      email;
      intendedRole = role;
      addedAt = Time.now();
      boundPrincipal = null;
      boundAt = null;
    };
    Map.add(store.invites, Text.compare, email, invite);
    #ok;
  };

  public func removeInvite(store : InviteStore, email : Text) : InviteTypes.InviteResult {
    if (not Map.containsKey(store.invites, Text.compare, email)) {
      return #notFound;
    };
    Map.remove(store.invites, Text.compare, email);
    #ok;
  };

  public func listInvites(store : InviteStore) : [InviteTypes.InvitedUser] {
    Iter.toArray(Map.values(store.invites));
  };

  /// Bind a principal to an invited email (called after first sign-in)
  public func bindPrincipal(
    store : InviteStore,
    email : Text,
    principal : Principal,
  ) : InviteTypes.InviteResult {
    switch (Map.get(store.invites, Text.compare, email)) {
      case null { #notFound };
      case (?invite) {
        if (invite.boundPrincipal != null) {
          return #alreadyBound;
        };
        let updated : InviteTypes.InvitedUser = {
          invite with
          boundPrincipal = ?principal;
          boundAt = ?Time.now();
        };
        Map.add(store.invites, Text.compare, email, updated);
        #ok;
      };
    };
  };

  /// Get invited user by email
  public func getInviteByEmail(store : InviteStore, email : Text) : ?InviteTypes.InvitedUser {
    Map.get(store.invites, Text.compare, email);
  };

  /// Find invite by bound principal
  public func getInviteByPrincipal(store : InviteStore, p : Principal) : ?InviteTypes.InvitedUser {
    Iter.find(Map.values(store.invites), func(inv : InviteTypes.InvitedUser) : Bool {
      switch (inv.boundPrincipal) {
        case (?bp) Principal.equal(bp, p);
        case null false;
      };
    });
  };
};
