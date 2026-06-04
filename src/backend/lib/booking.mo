import Map "mo:core/Map";
import Nat "mo:core/Nat";
import Time "mo:core/Time";
import Principal "mo:core/Principal";
import Iter "mo:core/Iter";
import Array "mo:core/Array";
import BookingTypes "../types/booking";

module {

  public let BOOKING_30_PRICE : Nat = 10_000_000_000_000;
  public let BOOKING_60_PRICE : Nat = 20_000_000_000_000;

  public type BookingStore = {
    var nextSlotId    : Nat;
    var nextBookingId : Nat;
    slots    : Map.Map<BookingTypes.SlotId, BookingTypes.BookingSlot>;
    bookings : Map.Map<BookingTypes.BookingId, BookingTypes.Booking>;
  };

  public func newStore() : BookingStore {
    {
      var nextSlotId    = 0;
      var nextBookingId = 0;
      slots    = Map.empty<BookingTypes.SlotId, BookingTypes.BookingSlot>();
      bookings = Map.empty<BookingTypes.BookingId, BookingTypes.Booking>();
    }
  };

  public func createSlot(
    store    : BookingStore,
    startTime : Int,
    duration : BookingTypes.BookingDuration,
  ) : BookingTypes.BookingSlot {
    let id = store.nextSlotId;
    store.nextSlotId := id + 1;
    let slot : BookingTypes.BookingSlot = {
      id;
      startTime;
      duration;
      status = #Available;
    };
    Map.add(store.slots, Nat.compare, id, slot);
    slot
  };

  public func getAvailableSlots(store : BookingStore) : [BookingTypes.BookingSlot] {
    let results = Iter.toArray(Map.values(store.slots));
    var available : [BookingTypes.BookingSlot] = [];
    for (slot in results.vals()) {
      if (slot.status == #Available) {
        available := Array.concat(available, [slot]);
      };
    };
    available
  };

  public func createBooking(
    store     : BookingStore,
    slotId    : BookingTypes.SlotId,
    caller    : Principal,
    duration  : BookingTypes.BookingDuration,
    email     : ?Text,
    firstName : ?Text,
    lastName  : ?Text,
    notes     : ?Text,
  ) : { #ok : BookingTypes.Booking; #err : Text } {
    let slotOpt = Map.get(store.slots, Nat.compare, slotId);
    switch (slotOpt) {
      case null { #err("Slot not found") };
      case (?slot) {
        if (slot.status != #Available) return #err("Slot not available");
        let amountE8s = switch (duration) {
          case (#Thirty) BOOKING_30_PRICE;
          case (#Sixty)  BOOKING_60_PRICE;
        };
        let id = store.nextBookingId;
        store.nextBookingId := id + 1;
        let booking : BookingTypes.Booking = {
          id;
          slotId;
          userId    = caller;
          amountE8s;
          status    = #Pending;
          createdAt = Time.now();
          email;
          firstName;
          lastName;
          notes;
        };
        Map.add(store.bookings, Nat.compare, id, booking);
        let updated : BookingTypes.BookingSlot = { slot with status = #Booked };
        Map.add(store.slots, Nat.compare, slotId, updated);
        #ok(booking)
      };
    }
  };

  public func cancelBooking(
    store     : BookingStore,
    bookingId : BookingTypes.BookingId,
    caller    : Principal,
  ) : { #ok; #err : Text } {
    let bookingOpt = Map.get(store.bookings, Nat.compare, bookingId);
    switch (bookingOpt) {
      case null { #err("Booking not found") };
      case (?booking) {
        if (not Principal.equal(booking.userId, caller)) return #err("Not authorized");
        if (booking.status == #Cancelled) return #err("Already cancelled");
        if (booking.status == #Completed) return #err("Call already completed");
        let now = Time.now();
        let fortyEightHours : Int = 172_800_000_000_000;
        if (now > booking.createdAt + fortyEightHours) return #err("Cancellation window expired");
        let updated : BookingTypes.Booking = { booking with status = #Cancelled };
        Map.add(store.bookings, Nat.compare, bookingId, updated);
        let slotOpt = Map.get(store.slots, Nat.compare, booking.slotId);
        switch (slotOpt) {
          case (?slot) {
            let updatedSlot : BookingTypes.BookingSlot = { slot with status = #Available };
            Map.add(store.slots, Nat.compare, booking.slotId, updatedSlot);
          };
          case null {};
        };
        #ok
      };
    }
  };

  public func completeBooking(
    store     : BookingStore,
    bookingId : BookingTypes.BookingId,
  ) : { #ok; #err : Text } {
    let bookingOpt = Map.get(store.bookings, Nat.compare, bookingId);
    switch (bookingOpt) {
      case null { #err("Booking not found") };
      case (?booking) {
        if (booking.status != #Confirmed) return #err("Booking is not confirmed");
        let updated : BookingTypes.Booking = { booking with status = #Completed };
        Map.add(store.bookings, Nat.compare, bookingId, updated);
        let slotOpt = Map.get(store.slots, Nat.compare, booking.slotId);
        switch (slotOpt) {
          case (?slot) {
            let updatedSlot : BookingTypes.BookingSlot = { slot with status = #Completed };
            Map.add(store.slots, Nat.compare, booking.slotId, updatedSlot);
          };
          case null {};
        };
        #ok
      };
    }
  };

  public func deleteSlot(
    store  : BookingStore,
    slotId : BookingTypes.SlotId,
  ) : { #ok; #err : Text } {
    let slotOpt = Map.get(store.slots, Nat.compare, slotId);
    switch (slotOpt) {
      case null { #err("Slot not found") };
      case (?slot) {
        if (slot.status == #Booked) return #err("Cannot delete a booked slot");
        Map.remove(store.slots, Nat.compare, slotId);
        #ok
      };
    }
  };

  public func getMyBookings(store : BookingStore, caller : Principal) : [BookingTypes.Booking] {
    let all = Iter.toArray(Map.values(store.bookings));
    var mine : [BookingTypes.Booking] = [];
    for (b in all.vals()) {
      if (Principal.equal(b.userId, caller)) {
        mine := Array.concat(mine, [b]);
      };
    };
    mine
  };

};
