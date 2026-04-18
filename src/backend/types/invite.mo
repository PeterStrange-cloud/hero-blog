import Common "common";
import AdminTypes "admin";

module {
  public type Role = AdminTypes.Role;
  public type Timestamp = Common.Timestamp;

  public type InvitedUser = {
    email : Text;
    intendedRole : Role;
    addedAt : Timestamp;
    boundPrincipal : ?Principal;
    boundAt : ?Timestamp;
  };

  public type InviteResult = {
    #ok;
    #notFound;
    #alreadyExists;
    #notAuthorized;
    #alreadyBound;
  };
};
