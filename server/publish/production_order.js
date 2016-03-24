Meteor.publish("production_order_list", function(limit) {
	var defaultLimit = limit || 25;
	return ProductionOrder.find({ ownerId: this.userId }, {limit: defaultLimit});
});

Meteor.publish("production_order_empty", function() {
	return ProductionOrder.find({ _id: null, ownerId: this.userId }, {});
});

Meteor.publish("production_order_details", function(productionOrderId) {
	return ProductionOrder.find({ _id: productionOrderId, ownerId: this.userId }, {});
});
