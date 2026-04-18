import Principal "mo:core/Principal";
import Time "mo:core/Time";
import AccessLib "../lib/access";
import PaymentLib "../lib/payment";
import AdminLib "../lib/admin";
import AccessTypes "../types/access";

mixin (
  accessStore      : AccessLib.AccessStore,
  paymentStore     : PaymentLib.PaymentStore,
  consumedPayments : PaymentLib.ConsumedPayments,
  _adminStore      : AdminLib.AdminStore,
  nextPaymentId    : { var value : Nat },
) {

  /// Create a new payment request for the authenticated caller.
  /// Returns the full PaymentRequest record including unique subaccount.
  public shared ({ caller }) func createPaymentRequest(
    paymentType : AccessTypes.PaymentType,
  ) : async AccessTypes.PaymentRequest {
    assert not caller.isAnonymous();
    let req = PaymentLib.createPaymentRequest(
      paymentStore, caller, paymentType, nextPaymentId.value
    );
    nextPaymentId.value += 1;
    req
  };

  /// Verify a payment request by scanning the HERO ledger for a matching transfer.
  /// If found, grants the corresponding access (article unlock or subscription).
  public shared ({ caller }) func verifyPaymentRequest(
    reqId : Nat,
  ) : async { #ok; #err : Text } {
    assert not caller.isAnonymous();
    let result = await* PaymentLib.verifyInvoicePayment(
      paymentStore, consumedPayments, reqId, caller, 500
    );
    switch (result) {
      case (#err(msg)) { #err(msg) };
      case (#ok(req)) {
        switch (req.paymentType) {
          case (#ArticleUnlock(articleId)) {
            AccessLib.grantUnlock(accessStore, caller, articleId);
          };
          case (#Subscription) {
            let thirtyDaysNs : Int = 2_592_000_000_000_000;
            let now = Time.now();
            AccessLib.grantSubscription(accessStore, caller, now, now + thirtyDaysNs);
          };
        };
        #ok
      };
    }
  };

  /// Return all pending payment requests for the authenticated caller.
  public shared query ({ caller }) func getMyPaymentRequests() : async [AccessTypes.PaymentRequest] {
    if (caller.isAnonymous()) { return [] };
    PaymentLib.getMyRequests(paymentStore, caller)
  };
};
