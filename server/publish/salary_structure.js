Meteor.publish("salary_structure_list", function(limit) {
	var defaultLimit = limit || 25;
	return SalaryStructure.find({ ownerId: this.userId }, {limit: defaultLimit});
});

Meteor.publish("salary_structure_empty", function() {
	return SalaryStructure.find({ _id: null, ownerId: this.userId }, {});
});

Meteor.publish("salary_structure_details", function(salaryStructureId) {
	return SalaryStructure.find({ _id: salaryStructureId, ownerId: this.userId }, {});
});
