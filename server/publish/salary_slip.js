Meteor.publish("salary_slip_list", function(limit) {
	var defaultLimit = limit || 25;
	return SalarySlip.find({ ownerId: this.userId }, {limit: defaultLimit});
});

Meteor.publish("salary_slip_empty", function() {
	return SalarySlip.find({ _id: null, ownerId: this.userId }, {});
});

Meteor.publish("salary_slip_details", function(salarySlipId) {
	return SalarySlip.find({ _id: salarySlipId, ownerId: this.userId }, {});
});
