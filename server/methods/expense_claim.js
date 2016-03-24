Meteor.methods({

	removeExpenseClaim: function(docIds) {
		ExpenseClaim.remove({"_id":{"$in":docIds}});
	}

});
