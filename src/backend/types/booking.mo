import Common "common";
module {
  public type BookingId = Nat;
  public type SlotId = Nat;

  public type BookingDuration = {
    #Thirty;
    #Sixty;
  };

  public type SlotStatus = {
    #Available;
    #Booked;
    #Completed;
  };

  public type BookingStatus = {
    #Pending;
    #Confirmed;
    #Cancelled;
    #Completed;
  };

  public type BookingSlot = {
    id         : SlotId;
    startTime  : Int;
    duration   : BookingDuration;
    status     : SlotStatus;
  };

  public type Booking = {
    id          : BookingId;
    slotId      : SlotId;
    userId      : Principal;
    amountE8s   : Nat;
    status      : BookingStatus;
    createdAt   : Int;
    email       : ?Text;
    firstName   : ?Text;
    lastName    : ?Text;
    notes       : ?Text;
  };
};
