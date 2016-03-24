Meteor.publish("communication_list", function(limit) {
	var defaultLimit = limit || 25;
	return Communication.find({ ownerId: this.userId }, {limit: defaultLimit});
});

Meteor.publish("communication_empty", function() {
	return Communication.find({ _id: null, ownerId: this.userId }, {});
});

Meteor.publish("communication_details", function(communicationId) {
	return Communication.find({ _id: communicationId, ownerId: this.userId }, {});
});
