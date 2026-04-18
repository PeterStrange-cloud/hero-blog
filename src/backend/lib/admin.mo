import Map "mo:core/Map";
import Set "mo:core/Set";
import Common "../types/common";
import AdminTypes "../types/admin";

module {
  public type Role = AdminTypes.Role;
  public type UserRole = AdminTypes.UserRole;

  public type AdminStore = {
    roles : Map.Map<Common.UserId, Role>;
    trackedPrincipals : Set.Set<Common.UserId>;
  };

  public func newStore() : AdminStore {
    {
      roles = Map.empty<Common.UserId, Role>();
      trackedPrincipals = Set.empty<Common.UserId>();
    };
  };

  // Returns true for superadmin and admin (both have admin-level access)
  public func isAdmin(store : AdminStore, caller : Common.UserId) : Bool {
    switch (store.roles.get(caller)) {
      case (?(#superadmin)) true;
      case (?(#admin)) true;
      case (_) false;
    };
  };

  public func isSuperAdmin(store : AdminStore, caller : Common.UserId) : Bool {
    switch (store.roles.get(caller)) {
      case (?(#superadmin)) true;
      case (_) false;
    };
  };

  public func hasAnyRole(store : AdminStore, caller : Common.UserId) : Bool {
    switch (store.roles.get(caller)) {
      case null false;
      case (?_) true;
    };
  };

  public func getRole(store : AdminStore, p : Common.UserId) : ?Role {
    store.roles.get(p);
  };

  public func setRole(store : AdminStore, p : Common.UserId, role : Role) : () {
    store.roles.add(p, role);
  };

  public func removeRole(store : AdminStore, p : Common.UserId) : () {
    store.roles.remove(p);
  };

  // Backward-compat: addAdmin sets #admin role
  public func addAdmin(store : AdminStore, newAdmin : Common.UserId) : () {
    store.roles.add(newAdmin, #admin);
  };

  // Backward-compat: removeAdmin removes the role
  public func removeAdmin(store : AdminStore, target : Common.UserId) : () {
    store.roles.remove(target);
  };

  // Lists principals with superadmin or admin roles
  public func listAdmins(store : AdminStore) : [Common.UserId] {
    store.roles.entries()
      .filter(func((_, role) : (Common.UserId, Role)) : Bool {
        switch (role) {
          case (#superadmin) true;
          case (#admin) true;
          case (_) false;
        };
      })
      .map(func((p, _) : (Common.UserId, Role)) : Common.UserId { p })
      .toArray();
  };

  public func listUserRoles(store : AdminStore) : [UserRole] {
    store.roles.entries()
      .map(func((p, r) : (Common.UserId, Role)) : UserRole {
        { principal = p; role = r };
      })
      .toArray();
  };

  /// Returns true if at least one superadmin is registered
  public func hasSuperadmin(store : AdminStore) : Bool {
    store.roles.entries()
      .any(func((_, role) : (Common.UserId, Role)) : Bool {
        switch (role) {
          case (#superadmin) true;
          case (_) false;
        };
      });
  };

  /// Record a principal as having appeared in the system (passive tracking)
  public func trackPrincipal(store : AdminStore, p : Common.UserId) : () {
    store.trackedPrincipals.add(p);
  };

  /// Returns all principals that have appeared in the system
  public func listTrackedPrincipals(store : AdminStore) : [Common.UserId] {
    store.trackedPrincipals.values().toArray();
  };
};
