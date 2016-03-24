Meteor.publish("material_request_list", function(limit) {
	var defaultLimit = limit || 25;
	return MaterialRequest.find({ ownerId: this.userId }, {limit: defaultLimit});
});

Meteor.publish("material_request_empty", function() {
	return MaterialRequest.find({ _id: null, ownerId: this.userId }, {});
});

Meteor.publish("material_request_details", function(materialRequestId) {
	return MaterialRequest.find({ _id: materialRequestId, ownerId: this.userId }, {});
});
