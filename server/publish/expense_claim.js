Meteor.publish("expense_claim_list", function(limit) {
	var defaultLimit = limit || 25;
	return ExpenseClaim.find({ ownerId: this.userId }, {limit: defaultLimit});
});

Meteor.publish("expense_claim_empty", function() {
	return ExpenseClaim.find({ _id: null, ownerId: this.userId }, {});
});

Meteor.publish("expense_claim_details", function(expenseClaimId) {
	return ExpenseClaim.find({ _id: expenseClaimId, ownerId: this.userId }, {});
});
