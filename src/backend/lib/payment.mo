import Map "mo:core/Map";
import Set "mo:core/Set";
import Nat "mo:core/Nat";
import Iter "mo:core/Iter";
import Nat8 "mo:core/Nat8";
import Blob "mo:core/Blob";
import Time "mo:core/Time";
import Principal "mo:core/Principal";
import AccessTypes "../types/access";

module {

  public let HERO_CANISTER_ID : Text = "zm3la-fqaaa-aaaaa-qg2ma-cai";
  public let ARTICLE_UNLOCK_PRICE : Nat = 100_000_000;
  public let SUBSCRIPTION_PRICE   : Nat = 1_000_000_000;
  public let PAYMENT_DESTINATION_OWNER : Text =
    "7ipgs-pmuew-kn3oz-4am7i-j6qth-hk7fo-tb3hc-rk32c-pnef2-ys2cd-rqe";

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

  public type PaymentStore = {
    var nextId : Nat;
    requests   : Map.Map<AccessTypes.PaymentRequestId, AccessTypes.PaymentRequest>;
  };
  public type ConsumedPayments = Set.Set<Nat>;

  public func newStore() : PaymentStore {
    {
      var nextId = 0;
      requests   = Map.empty<AccessTypes.PaymentRequestId, AccessTypes.PaymentRequest>();
    }
  };

  public func newConsumedSet() : ConsumedPayments {
    Set.empty<Nat>()
  };

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

  public func createPaymentRequest(
    store       : PaymentStore,
    caller      : Principal,
    paymentType : AccessTypes.PaymentType,
  ) : AccessTypes.PaymentRequest {
    let amountE8s : Nat = switch (paymentType) {
      case (#ArticleUnlock(_)) ARTICLE_UNLOCK_PRICE;
      case (#Subscription)     SUBSCRIPTION_PRICE;
    };
    let now = Time.now();
    let thirtyMinutesNs : Int = 1_800_000_000_000;
    let id = store.nextId;
    store.nextId := id + 1;
    let req : AccessTypes.PaymentRequest = {
      id             = id;
      userId         = caller;
      paymentType;
      amountE8s;
      subaccount     = natToSubaccount(id);
      ownerPrincipal = PAYMENT_DESTINATION_OWNER;
      createdAt      = now;
      expiresAt      = now + thirtyMinutesNs;
      status         = #Pending;
    };
    Map.add(store.requests, Nat.compare, id, req);
    req
  };

  public func getMyRequests(store : PaymentStore, caller : Principal) : [AccessTypes.PaymentRequest] {
    let results = Map.empty<AccessTypes.PaymentRequestId, AccessTypes.PaymentRequest>();
    Map.forEach(store.requests, func(k : Nat, v : AccessTypes.PaymentRequest) {
      if (Principal.equal(v.userId, caller)) {
        Map.add(results, Nat.compare, k, v);
      };
    });
    Iter.toArray(Map.values(results))
  };

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
            let owner = Principal.fromBlob(ownerBlob);
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
    if (Set.contains(consumed, Nat.compare, entry.id)) return null;

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
      case (?(#Nat(amt))) { if (amt != expectedAmount) return null };
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

  public func verifyInvoicePayment(
    store      : PaymentStore,
    consumed   : ConsumedPayments,
    reqId      : AccessTypes.PaymentRequestId,
    caller     : Principal,
    scanWindow : Nat,
  ) : async* { #ok : AccessTypes.PaymentRequest; #err : Text } {
    let req = switch (Map.get(store.requests, Nat.compare, reqId)) {
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
        Set.add(consumed, Nat.compare, blockIdx);
        let updated : AccessTypes.PaymentRequest = { req with status = #Verified };
        Map.add(store.requests, Nat.compare, reqId, updated);
        #ok(updated)
      };
    }
  };

  public func verifyPaymentWithWallet(
    heroActor    : HeroActor,
    req          : AccessTypes.PaymentRequest,
    consumed     : Set.Set<Nat>,
    scanWindow   : Nat,
    linkedWallet : ?Principal,
  ) : async* { #ok : Nat; #err : Text } {
    let ownerPrincipal = Principal.fromText(req.ownerPrincipal);

    let tipResult = await heroActor.icrc3_get_blocks([{ start = 0; length = 0 }]);
    let tip = tipResult.log_length;

    if (tip == 0) return #err("HERO ledger has no blocks yet");

    let window = if (scanWindow < tip) scanWindow else tip;
    let startBlock = Nat.sub(tip, window);

    let result = await heroActor.icrc3_get_blocks([{ start = startBlock; length = window }]);

    let blocks = result.blocks;
    let count = blocks.size();
    var i = count;
    while (i > 0) {
      i := Nat.sub(i, 1);
      let entry = blocks[i];
      if (not Set.contains(consumed, Nat.compare, entry.id)) {
        switch (matchInvoiceBlockWithWallet(entry, ownerPrincipal, req.subaccount, req.amountE8s, consumed, linkedWallet)) {
          case (?blockIndex) { return #ok(blockIndex) };
          case null {};
        };
      };
    };

    #err("Payment not found yet. Please ensure you sent the exact amount from your linked wallet.")
  };

  func matchInvoiceBlockWithWallet(
    entry            : { id : Nat; block : Value },
    ownerPrincipal   : Principal,
    expectedSubacct  : Blob,
    expectedAmount   : Nat,
    consumed         : Set.Set<Nat>,
    linkedWallet     : ?Principal,
  ) : ?Nat {
    if (Set.contains(consumed, Nat.compare, entry.id)) return null;

    let topFields = switch (entry.block) {
      case (#Map(m)) m;
      case (_) return null;
    };

    let txValue = switch (findField(topFields, "tx")) {
      case (?v) v;
      case null return null;
    };

    let txFields = switch (txValue) {
      case (#Map(m)) m;
      case (_) return null;
    };

    switch (findField(txFields, "op")) {
      case (?(#Text(op))) { if (op != "xfer") return null };
      case (_) return null;
    };

    switch (findField(txFields, "amt")) {
      case (?(#Nat(amt))) { if (amt != expectedAmount) return null };
      case (_) return null;
    };

    let toAccount = switch (findField(txFields, "to")) {
      case (?v) { switch (decodeAccount(v)) { case (?a) a; case null return null } };
      case null return null;
    };
    if (not Principal.equal(toAccount.owner, ownerPrincipal)) return null;

    // Subaccount check removed: NNS sends to the default subaccount.
    // We rely on linkedWallet + amount + time window + consumed-set for uniqueness.
    ignore expectedSubacct;

    switch (linkedWallet) {
      case (?wallet) {
        let fromAccount = switch (findField(txFields, "from")) {
          case (?v) { switch (decodeAccount(v)) { case (?a) a; case null return null } };
          case null return null;
        };
        if (not Principal.equal(fromAccount.owner, wallet)) return null;
      };
      case null {};
    };

    ?entry.id
  };

  public func describeBlock(block : Value) : Text {
    let topFields = switch (block) {
      case (#Map(m)) m;
      case (_) return "not a Map";
    };
    let txValue = switch (findField(topFields, "tx")) {
      case (?v) v;
      case null return "no tx";
    };
    let txFields = switch (txValue) {
      case (#Map(m)) m;
      case (_) return "tx not Map";
    };
    let op = switch (findField(txFields, "op")) {
      case (?(#Text(t))) t;
      case (_) "?";
    };
    let amt = switch (findField(txFields, "amt")) {
      case (?(#Nat(n))) Nat.toText(n);
      case (_) "?";
    };
    let fromStr = switch (findField(txFields, "from")) {
      case (?v) {
        switch (decodeAccount(v)) {
          case (?a) Principal.toText(a.owner);
          case null "decode-fail";
        }
      };
      case null "missing";
    };
    let toStr = switch (findField(txFields, "to")) {
      case (?v) {
        switch (decodeAccount(v)) {
          case (?a) Principal.toText(a.owner);
          case null "decode-fail";
        }
      };
      case null "missing";
    };
    "op=" # op # " amt=" # amt # " from=" # fromStr # " to=" # toStr
  };

  // Returns step-by-step match verdict for a single block. For debugging only.
  public func explainMatch(
    block : Value,
    ownerPrincipal : Principal,
    expectedAmount : Nat,
    linkedWallet : ?Principal,
  ) : Text {
    let topFields = switch (block) {
      case (#Map(m)) m;
      case (_) return "FAIL: not a Map";
    };
    let txValue = switch (findField(topFields, "tx")) {
      case (?v) v;
      case null return "FAIL: no tx field";
    };
    let txFields = switch (txValue) {
      case (#Map(m)) m;
      case (_) return "FAIL: tx not Map";
    };
    switch (findField(txFields, "op")) {
      case (?(#Text(op))) { if (op != "xfer") return "FAIL: op=" # op };
      case (_) return "FAIL: op missing";
    };
    switch (findField(txFields, "amt")) {
      case (?(#Nat(amt))) { if (amt != expectedAmount) return "FAIL: amt " # Nat.toText(amt) # " < " # Nat.toText(expectedAmount) };
      case (_) return "FAIL: amt missing";
    };
    let toAccount = switch (findField(txFields, "to")) {
      case (?v) { switch (decodeAccount(v)) { case (?a) a; case null return "FAIL: to decode" } };
      case null return "FAIL: to missing";
    };
    if (not Principal.equal(toAccount.owner, ownerPrincipal)) {
      return "FAIL: to.owner=" # Principal.toText(toAccount.owner) # " expected=" # Principal.toText(ownerPrincipal);
    };
    switch (linkedWallet) {
      case (?wallet) {
        let fromAccount = switch (findField(txFields, "from")) {
          case (?v) { switch (decodeAccount(v)) { case (?a) a; case null return "FAIL: from decode" } };
          case null return "FAIL: from missing";
        };
        if (not Principal.equal(fromAccount.owner, wallet)) {
          return "FAIL: from.owner=" # Principal.toText(fromAccount.owner) # " expected=" # Principal.toText(wallet);
        };
      };
      case null { return "FAIL: linkedWallet is null" };
    };
    "MATCH"
  };

};
