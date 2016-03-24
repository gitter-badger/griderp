Meteor.publish("purchase_receipt_list", function(limit) {
	var defaultLimit = limit || 25;
	return PurchaseReceipt.find({ ownerId: this.userId }, {limit: defaultLimit});
});

Meteor.publish("purchase_receipt_empty", function() {
	return PurchaseReceipt.find({ _id: null, ownerId: this.userId }, {});
});

Meteor.publish("purchase_receipt_details", function(purchaseReceiptId) {
	return PurchaseReceipt.find({ _id: purchaseReceiptId, ownerId: this.userId }, {});
});
