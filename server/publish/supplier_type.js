Meteor.publish("supplier_type_list", function(limit) {
	var defaultLimit = limit || 25;
	return SupplierType.find({ ownerId: this.userId }, {limit: defaultLimit});
});

Meteor.publish("supplier_type_empty", function() {
	return SupplierType.find({ _id: null, ownerId: this.userId }, {});
});

Meteor.publish("supplier_type_details", function(supplierTypeId) {
	return SupplierType.find({ _id: supplierTypeId, ownerId: this.userId }, {});
});
