Meteor.publish("supplier_quotation_list", function(limit) {
	var defaultLimit = limit || 25;
	return SupplierQuotation.find({ ownerId: this.userId }, {limit: defaultLimit});
});

Meteor.publish("supplier_quotation_empty", function() {
	return SupplierQuotation.find({ _id: null, ownerId: this.userId }, {});
});

Meteor.publish("supplier_quotation_details", function(supplierQuotationId) {
	return SupplierQuotation.find({ _id: supplierQuotationId, ownerId: this.userId }, {});
});
