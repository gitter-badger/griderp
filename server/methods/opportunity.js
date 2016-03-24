Meteor.methods({

	removeOpportunity: function(docIds) {
		Opportunity.remove({"_id":{"$in":docIds}});
	}

});
