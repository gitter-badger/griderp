Meteor.publish("sales_order_list", function(limit) {
	var defaultLimit = limit || 25;
	return SalesOrder.find({ ownerId: this.userId }, {limit: defaultLimit});
});

Meteor.publish("sales_order_empty", function() {
	return SalesOrder.find({ _id: null, ownerId: this.userId }, {});
});

Meteor.publish("sales_order_details", function(salesOrderId) {
	return SalesOrder.find({ _id: salesOrderId, ownerId: this.userId }, {});
});
