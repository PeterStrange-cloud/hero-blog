import Principal "mo:core/Principal";
import Runtime "mo:core/Runtime";
import InviteTypes "../types/invite";
import AdminLib "../lib/admin";
import InviteLib "../lib/invite";

mixin (
  inviteStore : InviteLib.InviteStore,
  adminStore : AdminLib.AdminStore,
) {

  /// Add an invited user (admin or superadmin only)
  public shared ({ caller }) func addInvite(
    email : Text,
    role : InviteTypes.Role,
  ) : async InviteTypes.InviteResult {
    if (not AdminLib.isAdmin(adminStore, caller)) {
      return #notAuthorized;
    };
    InviteLib.addInvite(inviteStore, email, role);
  };

  /// Remove an invited user (admin or superadmin only)
  public shared ({ caller }) func removeInvite(email : Text) : async InviteTypes.InviteResult {
    if (not AdminLib.isAdmin(adminStore, caller)) {
      return #notAuthorized;
    };
    InviteLib.removeInvite(inviteStore, email);
  };

  /// List all invited users (admin or superadmin only)
  public shared ({ caller }) func listInvites() : async [InviteTypes.InvitedUser] {
    if (not AdminLib.isAdmin(adminStore, caller)) {
      Runtime.trap("Unauthorized: admin only");
    };
    InviteLib.listInvites(inviteStore);
  };

  /// Bind a principal to an invited email.
  /// Any authenticated caller can bind themselves to an email they were invited with.
  public shared ({ caller }) func bindInvitePrincipal(email : Text) : async InviteTypes.InviteResult {
    if (Principal.isAnonymous(caller)) {
      return #notAuthorized;
    };
    InviteLib.bindPrincipal(inviteStore, email, caller);
  };

  /// Get invite details by email (admin only)
  public shared ({ caller }) func getInviteByEmail(email : Text) : async ?InviteTypes.InvitedUser {
    if (not AdminLib.isAdmin(adminStore, caller)) {
      Runtime.trap("Unauthorized: admin only");
    };
    InviteLib.getInviteByEmail(inviteStore, email);
  };
};
