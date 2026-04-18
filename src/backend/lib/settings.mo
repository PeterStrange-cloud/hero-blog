import SettingsTypes "../types/settings";

module {
  public type SettingsStore = {
    var settings : SettingsTypes.SiteSettings;
  };

  public func newStore(initial : SettingsTypes.SiteSettings) : SettingsStore {
    { var settings = initial };
  };

  public func getSettings(store : SettingsStore) : SettingsTypes.SiteSettings {
    store.settings;
  };

  public func updateSettings(
    store : SettingsStore,
    updated : SettingsTypes.SiteSettings,
  ) : () {
    store.settings := updated;
  };

  public func getLogoUrl(store : SettingsStore) : ?Text {
    store.settings.logoUrl;
  };
};
