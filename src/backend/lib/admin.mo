import Map "mo:core/Map";
import Set "mo:core/Set";
import Iter "mo:core/Iter";
import Principal "mo:core/Principal";
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

  public func isAdmin(store : AdminStore, caller : Common.UserId) : Bool {
    switch (Map.get(store.roles, Principal.compare, caller)) {
      case (?(#superadmin)) true;
      case (?(#admin)) true;
      case (_) false;
    };
  };

  public func isSuperAdmin(store : AdminStore, caller : Common.UserId) : Bool {
    switch (Map.get(store.roles, Principal.compare, caller)) {
      case (?(#superadmin)) true;
      case (_) false;
    };
  };

  public func hasAnyRole(store : AdminStore, caller : Common.UserId) : Bool {
    switch (Map.get(store.roles, Principal.compare, caller)) {
      case null false;
      case (?_) true;
    };
  };

  public func getRole(store : AdminStore, p : Common.UserId) : ?Role {
    Map.get(store.roles, Principal.compare, p);
  };

  public func setRole(store : AdminStore, p : Common.UserId, role : Role) : () {
    Map.add(store.roles, Principal.compare, p, role);
  };

  public func removeRole(store : AdminStore, p : Common.UserId) : () {
    Map.remove(store.roles, Principal.compare, p);
  };

  public func addAdmin(store : AdminStore, newAdmin : Common.UserId) : () {
    Map.add(store.roles, Principal.compare, newAdmin, #admin);
  };

  public func removeAdmin(store : AdminStore, target : Common.UserId) : () {
    Map.remove(store.roles, Principal.compare, target);
  };

  public func listAdmins(store : AdminStore) : [Common.UserId] {
    Iter.toArray(
      Iter.map(
        Iter.filter(
          Map.entries(store.roles),
          func((_, role) : (Common.UserId, Role)) : Bool {
            switch (role) {
              case (#superadmin) true;
              case (#admin) true;
              case (_) false;
            };
          }
        ),
        func((p, _) : (Common.UserId, Role)) : Common.UserId { p }
      )
    );
  };

  public func listUserRoles(store : AdminStore) : [UserRole] {
    Iter.toArray(
      Iter.map(
        Map.entries(store.roles),
        func((p, r) : (Common.UserId, Role)) : UserRole {
          { principal = p; role = r }
        }
      )
    );
  };

  public func hasSuperadmin(store : AdminStore) : Bool {
    for ((_, role) in Map.entries(store.roles)) {
      switch (role) {
        case (#superadmin) return true;
        case (_) {};
      };
    };
    false;
  };

  public func trackPrincipal(store : AdminStore, p : Common.UserId) : () {
    Set.add(store.trackedPrincipals, Principal.compare, p);
  };

  public func listTrackedPrincipals(store : AdminStore) : [Common.UserId] {
    Iter.toArray(Set.values(store.trackedPrincipals));
  };
};
