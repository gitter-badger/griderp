Meteor.methods({

	removeMonthlyDistribution: function(docIds) {
		MonthlyDistribution.remove({"_id":{"$in":docIds}});
	}

});
