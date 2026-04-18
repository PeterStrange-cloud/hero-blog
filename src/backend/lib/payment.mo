import Map "mo:core/Map";
import Set "mo:core/Set";
import Nat "mo:core/Nat";
import Nat8 "mo:core/Nat8";
import Blob "mo:core/Blob";
import Time "mo:core/Time";
import Principal "mo:core/Principal";
import AccessTypes "../types/access";

module {

  // ── Constants ────────────────────────────────────────────────────────────────

  public let HERO_CANISTER_ID : Text = "zm3la-fqaaa-aaaaa-qg2ma-cai";
  public let ARTICLE_UNLOCK_PRICE : Nat = 100_000_000;    // 1 HERO
  public let SUBSCRIPTION_PRICE   : Nat = 1_000_000_000;  // 10 HERO
  public let PAYMENT_DESTINATION_OWNER : Text =
    "7ipgs-pmuew-kn3oz-4am7i-j6qth-hk7fo-tb3hc-rk32c-pnef2-ys2cd-rqe";

  // ── ICRC-3 value type ────────────────────────────────────────────────────────

  public type Value = {
    #Nat   : Nat;
    #Int   : Int;
    #Text  : Text;
    #Blob  : Blob;
    #Bool  : Bool;
    #Array : [Value];
    #Map   : [(Text, Value)];
  };

  public type GetBlocksArgs = { start : Nat; length : Nat };

  public type BlockRange = { blocks : [Value] };

  public type GetBlocksResult = {
    log_length      : Nat;
    blocks          : [{ id : Nat; block : Value }];
    archived_blocks : [{
      args     : [GetBlocksArgs];
      callback : shared query ([GetBlocksArgs]) -> async BlockRange;
    }];
  };

  public type HeroActor = actor {
    icrc3_get_blocks : query ([GetBlocksArgs]) -> async GetBlocksResult;
  };

  // ── Store types ───────────────────────────────────────────────────────────────

  public type PaymentStore    = Map.Map<AccessTypes.PaymentRequestId, AccessTypes.PaymentRequest>;
  public type ConsumedPayments = Set.Set<Nat>;

  public func newStore() : PaymentStore {
    Map.empty<AccessTypes.PaymentRequestId, AccessTypes.PaymentRequest>()
  };

  public func newConsumedSet() : ConsumedPayments {
    Set.empty<Nat>()
  };

  // ── Subaccount encoding ───────────────────────────────────────────────────────

  /// Encode a Nat as a 32-byte big-endian Blob (ICRC-1 subaccount format).
  public func natToSubaccount(n : Nat) : Blob {
    let bytes : [var Nat8] = [var
      0,0,0,0,0,0,0,0,
      0,0,0,0,0,0,0,0,
      0,0,0,0,0,0,0,0,
      0,0,0,0,0,0,0,0
    ];
    var remaining = n;
    var idx : Nat = 31;
    label enc while (remaining > 0) {
      bytes[idx] := Nat8.fromNat(remaining % 256);
      remaining  := remaining / 256;
      if (idx == 0) { break enc };
      idx := Nat.sub(idx, 1);
    };
    Blob.fromVarArray(bytes)
  };

  // ── Create payment request ────────────────────────────────────────────────────

  public func createPaymentRequest(
    store       : PaymentStore,
    caller      : Principal,
    paymentType : AccessTypes.PaymentType,
    nextId      : Nat,
  ) : AccessTypes.PaymentRequest {
    let amountE8s : Nat = switch (paymentType) {
      case (#ArticleUnlock(_)) ARTICLE_UNLOCK_PRICE;
      case (#Subscription)     SUBSCRIPTION_PRICE;
    };
    let now = Time.now();
    let thirtyMinutesNs : Int = 1_800_000_000_000;
    let req : AccessTypes.PaymentRequest = {
      id             = nextId;
      userId         = caller;
      paymentType;
      amountE8s;
      subaccount     = natToSubaccount(nextId);
      ownerPrincipal = PAYMENT_DESTINATION_OWNER;
      createdAt      = now;
      expiresAt      = now + thirtyMinutesNs;
      status         = #Pending;
    };
    store.add(nextId, req);
    req
  };

  // ── Query helpers ─────────────────────────────────────────────────────────────

  public func getMyRequests(store : PaymentStore, caller : Principal) : [AccessTypes.PaymentRequest] {
    let results = Map.empty<AccessTypes.PaymentRequestId, AccessTypes.PaymentRequest>();
    store.forEach(func(k, v) {
      if (Principal.equal(v.userId, caller)) {
        results.add(k, v);
      };
    });
    results.values().toArray()
  };

  // ── Block parsing helpers ─────────────────────────────────────────────────────

  func findField(fields : [(Text, Value)], name : Text) : ?Value {
    var result : ?Value = null;
    for ((k, v) in fields.vals()) {
      if (k == name) { result := ?v };
    };
    result
  };

  type Account = { owner : Principal; subaccount : ?Blob };

  func decodeAccount(v : Value) : ?Account {
    switch (v) {
      case (#Array(arr)) {
        if (arr.size() == 0) return null;
        switch (arr[0]) {
          case (#Blob(ownerBlob)) {
            let owner = ownerBlob.fromBlob();
            let sub : ?Blob = if (arr.size() > 1) {
              switch (arr[1]) {
                case (#Blob(b)) ?b;
                case (_)        null;
              }
            } else null;
            ?{ owner; subaccount = sub }
          };
          case (_) null;
        }
      };
      case (_) null;
    }
  };

  func matchInvoiceBlock(
    entry           : { id : Nat; block : Value },
    ownerPrincipal  : Principal,
    expectedSubacct : Blob,
    expectedAmount  : Nat,
    consumed        : ConsumedPayments,
  ) : ?Nat {
    if (consumed.contains(entry.id)) return null;

    let topFields = switch (entry.block) {
      case (#Map(m)) m;
      case (_)        return null;
    };

    let txValue = switch (findField(topFields, "tx")) {
      case (?v)  v;
      case null  return null;
    };

    let txFields = switch (txValue) {
      case (#Map(m)) m;
      case (_)        return null;
    };

    switch (findField(txFields, "op")) {
      case (?(#Text(op))) { if (op != "xfer") return null };
      case (_)            return null;
    };

    switch (findField(txFields, "amt")) {
      case (?(#Nat(amt))) { if (amt < expectedAmount) return null };
      case (_)            return null;
    };

    let toAccount = switch (findField(txFields, "to")) {
      case (?v)  { switch (decodeAccount(v)) { case (?a) a; case null return null } };
      case null  return null;
    };
    if (not Principal.equal(toAccount.owner, ownerPrincipal)) return null;
    switch (toAccount.subaccount) {
      case null    return null;
      case (?sub)  { if (sub != expectedSubacct) return null };
    };

    ?entry.id
  };

  // ── Verify invoice payment ────────────────────────────────────────────────────

  public func verifyInvoicePayment(
    store      : PaymentStore,
    consumed   : ConsumedPayments,
    reqId      : AccessTypes.PaymentRequestId,
    caller     : Principal,
    scanWindow : Nat,
  ) : async* { #ok : AccessTypes.PaymentRequest; #err : Text } {
    let req = switch (store.get(reqId)) {
      case null     { return #err("not found") };
      case (?r)     r;
    };

    if (not Principal.equal(req.userId, caller)) {
      return #err("unauthorized");
    };

    if (Time.now() > req.expiresAt) {
      return #err("expired");
    };

    if (req.status == #Consumed) {
      return #err("already consumed");
    };

    let heroActor : HeroActor = actor(HERO_CANISTER_ID);
    let ownerPrincipal = Principal.fromText(PAYMENT_DESTINATION_OWNER);

    // Get tip
    let tipResult = await heroActor.icrc3_get_blocks([{ start = 0; length = 0 }]);
    let tip = tipResult.log_length;

    if (tip == 0) {
      return #err("payment not found");
    };

    let window     = if (scanWindow < tip) scanWindow else tip;
    let startBlock = Nat.sub(tip, window);

    let result = await heroActor.icrc3_get_blocks([{ start = startBlock; length = window }]);

    let blocks = result.blocks;
    var count  = blocks.size();
    var matchedBlock : ?Nat = null;
    label scan while (count > 0) {
      count := Nat.sub(count, 1);
      switch (matchInvoiceBlock(blocks[count], ownerPrincipal, req.subaccount, req.amountE8s, consumed)) {
        case (?blockIndex) {
          matchedBlock := ?blockIndex;
          break scan;
        };
        case null {};
      };
    };

    switch (matchedBlock) {
      case null { #err("payment not found") };
      case (?blockIdx) {
        consumed.add(blockIdx);
        let updated : AccessTypes.PaymentRequest = { req with status = #Verified };
        store.add(reqId, updated);
        #ok(updated)
      };
    }
  };
};
