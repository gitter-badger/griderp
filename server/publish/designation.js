Meteor.publish("designation_list", function(limit) {
	var defaultLimit = limit || 25;
	return Designation.find({ ownerId: this.userId }, {limit: defaultLimit});
});

Meteor.publish("designation_empty", function() {
	return Designation.find({ _id: null, ownerId: this.userId }, {});
});

Meteor.publish("designation_details", function(designationId) {
	return Designation.find({ _id: designationId, ownerId: this.userId }, {});
});
