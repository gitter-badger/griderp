Meteor.publish("employment_type_list", function(limit) {
	var defaultLimit = limit || 25;
	return EmploymentType.find({ ownerId: this.userId }, {limit: defaultLimit});
});

Meteor.publish("employment_type_empty", function() {
	return EmploymentType.find({ _id: null, ownerId: this.userId }, {});
});

Meteor.publish("employment_type_details", function(employmentTypeId) {
	return EmploymentType.find({ _id: employmentTypeId, ownerId: this.userId }, {});
});
