Meteor.publish("expense_claim_type_list", function(limit) {
	var defaultLimit = limit || 25;
	return ExpenseClaimType.find({ ownerId: this.userId }, {limit: defaultLimit});
});

Meteor.publish("expense_claim_type_empty", function() {
	return ExpenseClaimType.find({ _id: null, ownerId: this.userId }, {});
});

Meteor.publish("expense_claim_type_details", function(expenseClaimTypeId) {
	return ExpenseClaimType.find({ _id: expenseClaimTypeId, ownerId: this.userId }, {});
});
