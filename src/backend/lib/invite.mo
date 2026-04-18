import Map "mo:core/Map";
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
    if (store.invites.containsKey(email)) {
      return #alreadyExists;
    };
    let invite : InviteTypes.InvitedUser = {
      email;
      intendedRole = role;
      addedAt = Time.now();
      boundPrincipal = null;
      boundAt = null;
    };
    store.invites.add(email, invite);
    #ok;
  };

  public func removeInvite(store : InviteStore, email : Text) : InviteTypes.InviteResult {
    if (not store.invites.containsKey(email)) {
      return #notFound;
    };
    store.invites.remove(email);
    #ok;
  };

  public func listInvites(store : InviteStore) : [InviteTypes.InvitedUser] {
    store.invites.values().toArray();
  };

  /// Bind a principal to an invited email (called after first sign-in)
  public func bindPrincipal(
    store : InviteStore,
    email : Text,
    principal : Principal,
  ) : InviteTypes.InviteResult {
    switch (store.invites.get(email)) {
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
        store.invites.add(email, updated);
        #ok;
      };
    };
  };

  /// Get invited user by email
  public func getInviteByEmail(store : InviteStore, email : Text) : ?InviteTypes.InvitedUser {
    store.invites.get(email);
  };

  /// Find invite by bound principal
  public func getInviteByPrincipal(store : InviteStore, p : Principal) : ?InviteTypes.InvitedUser {
    store.invites.values().find(func(inv : InviteTypes.InvitedUser) : Bool {
      switch (inv.boundPrincipal) {
        case (?bp) Principal.equal(bp, p);
        case null false;
      };
    });
  };
};
