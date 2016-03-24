Meteor.publish("leave_allocation_list", function(limit) {
	var defaultLimit = limit || 25;
	return LeaveAllocation.find({ ownerId: this.userId }, {limit: defaultLimit});
});

Meteor.publish("leave_allocation_empty", function() {
	return LeaveAllocation.find({ _id: null, ownerId: this.userId }, {});
});

Meteor.publish("leave_allocation_details", function(leaveAllocationId) {
	return LeaveAllocation.find({ _id: leaveAllocationId, ownerId: this.userId }, {});
});
