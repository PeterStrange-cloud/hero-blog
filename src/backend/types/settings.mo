module {
  public type SiteSettings = {
    logoUrl : ?Text;
  };

  public type SettingsResult = {
    #ok;
    #notAuthorized;
  };
};
