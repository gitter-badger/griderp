Meteor.publish("purchase_invoice_list", function(limit) {
	var defaultLimit = limit || 25;
	return PurchaseInvoice.find({ ownerId: this.userId }, {limit: defaultLimit});
});

Meteor.publish("purchase_invoice_empty", function() {
	return PurchaseInvoice.find({ _id: null, ownerId: this.userId }, {});
});

Meteor.publish("purchase_invoice_details", function(purchaseInvoiceId) {
	return PurchaseInvoice.find({ _id: purchaseInvoiceId, ownerId: this.userId }, {});
});
