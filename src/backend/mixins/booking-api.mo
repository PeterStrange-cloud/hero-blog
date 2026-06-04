import Principal "mo:core/Principal";
import BookingLib "../lib/booking";
import BookingTypes "../types/booking";
import AdminLib "../lib/admin";

mixin (
  bookingStoreV2 : BookingLib.BookingStore,
  adminStore   : AdminLib.AdminStore,
) {

  public shared ({ caller }) func createSlot(
    startTime : Int,
    duration  : BookingTypes.BookingDuration,
  ) : async { #ok : BookingTypes.BookingSlot; #err : Text } {
    if (not AdminLib.isAdmin(adminStore, caller)) return #err("Not authorized");
    #ok(BookingLib.createSlot(bookingStoreV2, startTime, duration))
  };

  public query func getAvailableSlots() : async [BookingTypes.BookingSlot] {
    BookingLib.getAvailableSlots(bookingStoreV2)
  };

  public shared ({ caller }) func createBooking(
    slotId    : BookingTypes.SlotId,
    duration  : BookingTypes.BookingDuration,
    email     : ?Text,
    firstName : ?Text,
    lastName  : ?Text,
    notes     : ?Text,
  ) : async { #ok : BookingTypes.Booking; #err : Text } {
    if (Principal.isAnonymous(caller)) return #err("Must be signed in");
    BookingLib.createBooking(bookingStoreV2, slotId, caller, duration, email, firstName, lastName, notes)
  };

  public shared ({ caller }) func cancelBooking(
    bookingId : BookingTypes.BookingId,
  ) : async { #ok; #err : Text } {
    if (Principal.isAnonymous(caller)) return #err("Must be signed in");
    BookingLib.cancelBooking(bookingStoreV2, bookingId, caller)
  };

  public shared ({ caller }) func completeBooking(
    bookingId : BookingTypes.BookingId,
  ) : async { #ok; #err : Text } {
    if (not AdminLib.isAdmin(adminStore, caller)) return #err("Not authorized");
    BookingLib.completeBooking(bookingStoreV2, bookingId)
  };

  public shared ({ caller }) func deleteSlot(
    slotId : BookingTypes.SlotId,
  ) : async { #ok; #err : Text } {
    if (not AdminLib.isAdmin(adminStore, caller)) return #err("Not authorized");
    BookingLib.deleteSlot(bookingStoreV2, slotId)
  };

  public shared query ({ caller }) func getMyBookings() : async [BookingTypes.Booking] {
    if (Principal.isAnonymous(caller)) return [];
    BookingLib.getMyBookings(bookingStoreV2, caller)
  };

};
