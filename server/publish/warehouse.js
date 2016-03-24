Meteor.publish("warehouse_list", function(limit) {
	var defaultLimit = limit || 25;
	return Warehouse.find({ ownerId: this.userId }, {limit: defaultLimit});
});

Meteor.publish("warehouse_empty", function() {
	return Warehouse.find({ _id: null, ownerId: this.userId }, {});
});

Meteor.publish("warehouse_details", function(warehouseId) {
	return Warehouse.find({ _id: warehouseId, ownerId: this.userId }, {});
});
