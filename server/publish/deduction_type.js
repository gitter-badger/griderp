Meteor.publish("deduction_type_list", function(limit) {
	var defaultLimit = limit || 25;
	return DeductionType.find({ ownerId: this.userId }, {limit: defaultLimit});
});

Meteor.publish("deduction_type_empty", function() {
	return DeductionType.find({ _id: null, ownerId: this.userId }, {});
});

Meteor.publish("deduction_type_details", function(deductionTypeId) {
	return DeductionType.find({ _id: deductionTypeId, ownerId: this.userId }, {});
});
