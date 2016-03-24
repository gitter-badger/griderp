Meteor.publish("supplier_list", function(limit) {
	var defaultLimit = limit || 25;
	return Supplier.find({ ownerId: this.userId }, {limit: defaultLimit});
});

Meteor.publish("supplier_empty", function() {
	return Supplier.find({ _id: null, ownerId: this.userId }, {});
});

Meteor.publish("supplier_details", function(supplierId) {
	return Supplier.find({ _id: supplierId, ownerId: this.userId }, {});
});
