Meteor.methods({

	removeTermsAndConditions: function(docIds) {
		TermsAndConditions.remove({"_id":{"$in":docIds}});
	}

});
