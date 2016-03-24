Meteor.methods({

	removeExpenseClaimType: function(docIds) {
		ExpenseClaimType.remove({"_id":{"$in":docIds}});
	}

});
