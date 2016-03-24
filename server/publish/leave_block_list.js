Meteor.publish("leave_block_list_list", function(limit) {
	var defaultLimit = limit || 25;
	return LeaveBlockList.find({ ownerId: this.userId }, {limit: defaultLimit});
});

Meteor.publish("leave_block_list_empty", function() {
	return LeaveBlockList.find({ _id: null, ownerId: this.userId }, {});
});

Meteor.publish("leave_block_list_details", function(leaveBlockListId) {
	return LeaveBlockList.find({ _id: leaveBlockListId, ownerId: this.userId }, {});
});
