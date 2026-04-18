import Runtime "mo:core/Runtime";
import AdminTypes "../types/admin";
import Common "../types/common";
import AdminLib "../lib/admin";

mixin (adminStore : AdminLib.AdminStore) {

  /// Add a new admin principal (admin only) — sets #admin role
  public shared ({ caller }) func addAdmin(newAdmin : Common.UserId) : async AdminTypes.AdminResult {
    if (not AdminLib.isAdmin(adminStore, caller)) {
      return #notAdmin;
    };
    if (AdminLib.isAdmin(adminStore, newAdmin)) {
      return #alreadyExists;
    };
    AdminLib.addAdmin(adminStore, newAdmin);
    #ok;
  };

  /// Remove a principal's role (admin only)
  public shared ({ caller }) func removeAdmin(target : Common.UserId) : async AdminTypes.AdminResult {
    if (not AdminLib.isAdmin(adminStore, caller)) {
      return #notAdmin;
    };
    if (not AdminLib.hasAnyRole(adminStore, target)) {
      return #notFound;
    };
    AdminLib.removeAdmin(adminStore, target);
    #ok;
  };

  /// List principals with admin or superadmin roles (admin only)
  public shared ({ caller }) func listAdmins() : async [Common.UserId] {
    if (not AdminLib.isAdmin(adminStore, caller)) {
      Runtime.trap("Unauthorized: admin only");
    };
    AdminLib.listAdmins(adminStore);
  };

  /// Set a role for a principal (superadmin only)
  public shared ({ caller }) func setUserRole(
    target : Common.UserId,
    role : AdminTypes.Role,
  ) : async AdminTypes.AdminResult {
    if (not AdminLib.isSuperAdmin(adminStore, caller)) {
      return #notAuthorized;
    };
    AdminLib.setRole(adminStore, target, role);
    #ok;
  };

  /// Remove a principal's role (superadmin only)
  public shared ({ caller }) func removeUserRole(target : Common.UserId) : async AdminTypes.AdminResult {
    if (not AdminLib.isSuperAdmin(adminStore, caller)) {
      return #notAuthorized;
    };
    if (not AdminLib.hasAnyRole(adminStore, target)) {
      return #notFound;
    };
    AdminLib.removeRole(adminStore, target);
    #ok;
  };

  /// List all principals with their roles (admin only)
  public shared ({ caller }) func listUserRoles() : async [AdminTypes.UserRole] {
    if (not AdminLib.isAdmin(adminStore, caller)) {
      Runtime.trap("Unauthorized: admin only");
    };
    AdminLib.listUserRoles(adminStore);
  };

  /// Get the role of the calling principal (public).
  /// Also passively tracks the caller as having appeared in the system,
  /// unless they are anonymous. Never traps — returns null on any error.
  public shared ({ caller }) func getMyRole() : async ?AdminTypes.Role {
    try {
      if (not caller.isAnonymous()) {
        AdminLib.trackPrincipal(adminStore, caller);
      };
      AdminLib.getRole(adminStore, caller);
    } catch (_) {
      null;
    };
  };

  /// Returns true if the caller has any role (public)
  public shared query ({ caller }) func isAuthorized() : async Bool {
    AdminLib.hasAnyRole(adminStore, caller);
  };

  /// Public query: returns true if at least one superadmin exists.
  /// Safe to call by any caller including anonymous.
  public query func hasSuperadmin() : async Bool {
    AdminLib.hasSuperadmin(adminStore);
  };

  /// List all principals that have appeared (signed in) in the system.
  /// Superadmin only — used for user management UI.
  public shared ({ caller }) func listTrackedPrincipals() : async [Common.UserId] {
    if (not AdminLib.isSuperAdmin(adminStore, caller)) {
      Runtime.trap("Unauthorized: superadmin only");
    };
    AdminLib.listTrackedPrincipals(adminStore);
  };

  /// One-time initialization: seeds the caller as superadmin.
  /// Can only be called once. After that returns #notAuthorized.
  /// Callable by ANY authenticated principal (not anonymous).
  public shared ({ caller }) func initSuperadmin() : async AdminTypes.AdminResult {
    if (caller.isAnonymous()) {
      return #notAuthorized;
    };
    if (AdminLib.hasSuperadmin(adminStore)) {
      return #alreadyExists;
    };
    AdminLib.setRole(adminStore, caller, #superadmin);
    AdminLib.trackPrincipal(adminStore, caller);
    #ok;
  };
};
