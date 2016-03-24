Meteor.publish("leave_application_list", function(limit) {
	var defaultLimit = limit || 25;
	return LeaveApplication.find({ ownerId: this.userId }, {limit: defaultLimit});
});

Meteor.publish("leave_application_empty", function() {
	return LeaveApplication.find({ _id: null, ownerId: this.userId }, {});
});

Meteor.publish("leave_application_details", function(leaveApplicationId) {
	return LeaveApplication.find({ _id: leaveApplicationId, ownerId: this.userId }, {});
});
