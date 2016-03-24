Meteor.publish("leave_type_list", function(limit) {
	var defaultLimit = limit || 25;
	return LeaveType.find({ ownerId: this.userId }, {limit: defaultLimit});
});

Meteor.publish("leave_type_empty", function() {
	return LeaveType.find({ _id: null, ownerId: this.userId }, {});
});

Meteor.publish("leave_type_details", function(leaveTypeId) {
	return LeaveType.find({ _id: leaveTypeId, ownerId: this.userId }, {});
});
