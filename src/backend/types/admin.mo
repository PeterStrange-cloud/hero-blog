import Common "common";

module {
  public type UserId = Common.UserId;

  public type Role = {
    #superadmin;
    #admin;
    #editor;
  };

  public type UserRole = {
    principal : UserId;
    role : Role;
  };

  public type AdminResult = {
    #ok;
    #notAdmin;
    #notFound;
    #alreadyExists;
    #notAuthorized;
  };
};
