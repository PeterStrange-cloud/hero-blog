import Principal "mo:core/Principal";
import Time "mo:core/Time";
import Map "mo:core/Map";
import Nat "mo:core/Nat";
import Set "mo:core/Set";
import AccessLib "../lib/access";
import AccessTypes "../types/access";
import PaymentLib "../lib/payment";
import AdminLib "../lib/admin";

mixin (
  accessStore : AccessLib.AccessStore,
  paymentRequestStore : PaymentLib.PaymentStore,
  consumedPayments : PaymentLib.ConsumedPayments,
  adminStore : AdminLib.AdminStore,
) {

  public shared ({ caller }) func createPaymentRequest(
    paymentType : AccessTypes.PaymentType,
  ) : async AccessTypes.PaymentRequest {
    if (Principal.isAnonymous(caller)) { assert false };
    PaymentLib.createPaymentRequest(paymentRequestStore, caller, paymentType)
  };

  public shared ({ caller }) func verifyPaymentRequest(
    reqId : AccessTypes.PaymentRequestId,
  ) : async { #ok; #err : Text } {
    if (Principal.isAnonymous(caller)) return #err("Must be signed in");

    let reqOpt = Map.get(paymentRequestStore.requests, Nat.compare, reqId);
    switch (reqOpt) {
      case null { return #err("Payment request not found") };
      case (?req) {
        if (not Principal.equal(req.userId, caller)) return #err("Not authorized");
        if (req.status != #Pending) return #err("Payment request is not pending");

        let now = Time.now();
        if (now > req.expiresAt) return #err("Payment request has expired");

        let heroActor = actor(PaymentLib.HERO_CANISTER_ID) : PaymentLib.HeroActor;
        let linkedWallet = AccessLib.getLinkedWallet(accessStore, caller);

        let verifyResult = await* PaymentLib.verifyPaymentWithWallet(
          heroActor,
          req,
          consumedPayments,
          500,
          linkedWallet,
        );

        switch (verifyResult) {
          case (#err(e)) { #err(e) };
          case (#ok(blockIndex)) {
            Set.add(consumedPayments, Nat.compare, blockIndex);
            switch (req.paymentType) {
              case (#ArticleUnlock(articleId)) {
                AccessLib.grantUnlock(accessStore, caller, articleId);
              };
              case (#Subscription) {
                let start = now;
                let expiry = start + 2_592_000_000_000_000;
                AccessLib.grantSubscription(accessStore, caller, start, expiry);
              };
            };
            #ok
          };
        };
      };
    };
  };

  public shared query ({ caller }) func getMyPaymentRequests() : async [AccessTypes.PaymentRequest] {
    if (Principal.isAnonymous(caller)) return [];
    PaymentLib.getMyRequests(paymentRequestStore, caller)
  };

  public shared ({ caller }) func debugVerify(reqId : AccessTypes.PaymentRequestId) : async Text {
    if (Principal.isAnonymous(caller)) return "anonymous caller";
    let reqOpt = Map.get(paymentRequestStore.requests, Nat.compare, reqId);
    switch (reqOpt) {
      case null { return "request " # Nat.toText(reqId) # " not found" };
      case (?req) {
        let linkedWallet = AccessLib.getLinkedWallet(accessStore, req.userId);
        let linkedText = switch (linkedWallet) {
          case null "null";
          case (?p) Principal.toText(p);
        };
        let heroActor = actor(PaymentLib.HERO_CANISTER_ID) : PaymentLib.HeroActor;
        let tipResult = await heroActor.icrc3_get_blocks([{ start = 0; length = 0 }]);
        let tip = tipResult.log_length;
        let window : Nat = if (500 < tip) 500 else tip;
        let startBlock = Nat.sub(tip, window);
        let result = await heroActor.icrc3_get_blocks([{ start = startBlock; length = window }]);
        var report = "reqId=" # Nat.toText(req.id)
          # " caller=" # Principal.toText(caller)
          # " reqUserId=" # Principal.toText(req.userId)
          # " linkedWallet=" # linkedText
          # " expectedAmount=" # Nat.toText(req.amountE8s)
          # " expectedOwner=" # req.ownerPrincipal
          # " ledgerTip=" # Nat.toText(tip)
          # " scannedBlocks=" # Nat.toText(result.blocks.size())
          # "
";
        var count = result.blocks.size();
        var shown = 0;
        while (count > 0 and shown < 5) {
          count := Nat.sub(count, 1);
          let entry = result.blocks[count];
          let isConsumed = Set.contains(consumedPayments, Nat.compare, entry.id);
          let consumedTag = if (isConsumed) " [CONSUMED]" else "";
          let verdict = PaymentLib.explainMatch(entry.block, Principal.fromText(req.ownerPrincipal), req.amountE8s, linkedWallet);
          report := report # "block " # Nat.toText(entry.id) # consumedTag # ": " # PaymentLib.describeBlock(entry.block) # " => " # verdict # "
";
          shown := shown + 1;
        };
        report
      };
    };
  };
};
