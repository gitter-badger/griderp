Meteor.publish("employee_list", function(limit) {
	var defaultLimit = limit || 25;
	return Employee.find({ ownerId: this.userId }, {limit: defaultLimit});
});

Meteor.publish("employee_empty", function() {
	return Employee.find({ _id: null, ownerId: this.userId }, {});
});

Meteor.publish("employee_details", function(employeeId) {
	return Employee.find({ _id: employeeId, ownerId: this.userId }, {});
});
