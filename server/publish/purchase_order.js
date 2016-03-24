Meteor.publish("purchase_order_list", function(limit) {
	var defaultLimit = limit || 25;
	return PurchaseOrder.find({ ownerId: this.userId }, {limit: defaultLimit});
});

Meteor.publish("purchase_order_empty", function() {
	return PurchaseOrder.find({ _id: null, ownerId: this.userId }, {});
});

Meteor.publish("purchase_order_details", function(purchaseOrderId) {
	return PurchaseOrder.find({ _id: purchaseOrderId, ownerId: this.userId }, {});
});
