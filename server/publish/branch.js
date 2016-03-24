Meteor.publish("branch_list", function(limit) {
	var defaultLimit = limit || 25;
	return Branch.find({ ownerId: this.userId }, {limit: defaultLimit});
});

Meteor.publish("branch_empty", function() {
	return Branch.find({ _id: null, ownerId: this.userId }, {});
});

Meteor.publish("branch_details", function(branchId) {
	return Branch.find({ _id: branchId, ownerId: this.userId }, {});
});
