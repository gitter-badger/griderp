Meteor.publish("operation_list", function(limit) {
	var defaultLimit = limit || 25;
	return Operation.find({ ownerId: this.userId }, {limit: defaultLimit});
});

Meteor.publish("operation_empty", function() {
	return Operation.find({ _id: null, ownerId: this.userId }, {});
});

Meteor.publish("operation_details", function(operationId) {
	return Operation.find({ _id: operationId, ownerId: this.userId }, {});
});
