Meteor.publish("sales_invoice_list", function(limit) {
	var defaultLimit = limit || 25;
	return SalesInvoice.find({ ownerId: this.userId }, {limit: defaultLimit});
});

Meteor.publish("sales_invoice_empty", function() {
	return SalesInvoice.find({ _id: null, ownerId: this.userId }, {});
});

Meteor.publish("sales_invoice_details", function(salesInvoiceId) {
	return SalesInvoice.find({ _id: salesInvoiceId, ownerId: this.userId }, {});
});
