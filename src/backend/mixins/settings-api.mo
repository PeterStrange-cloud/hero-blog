import Principal "mo:core/Principal";
import Runtime "mo:core/Runtime";
import SettingsTypes "../types/settings";
import AdminLib "../lib/admin";
import SettingsLib "../lib/settings";

mixin (
  settingsStore : SettingsLib.SettingsStore,
  adminStore : AdminLib.AdminStore,
) {

  /// Get current site settings (public query)
  public query func getSettings() : async SettingsTypes.SiteSettings {
    SettingsLib.getSettings(settingsStore);
  };

  /// Update site settings (superadmin only)
  public shared ({ caller }) func updateSettings(
    updated : SettingsTypes.SiteSettings,
  ) : async SettingsTypes.SettingsResult {
    if (not AdminLib.isSuperAdmin(adminStore, caller)) {
      return #notAuthorized;
    };
    SettingsLib.updateSettings(settingsStore, updated);
    #ok;
  };

  /// Get the current logo URL (public query)
  public query func getLogoUrl() : async ?Text {
    SettingsLib.getLogoUrl(settingsStore);
  };
};
