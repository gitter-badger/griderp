Meteor.publish("department_list", function(limit) {
	var defaultLimit = limit || 25;
	return Department.find({ ownerId: this.userId }, {limit: defaultLimit});
});

Meteor.publish("department_empty", function() {
	return Department.find({ _id: null, ownerId: this.userId }, {});
});

Meteor.publish("department_details", function(departmentId) {
	return Department.find({ _id: departmentId, ownerId: this.userId }, {});
});
