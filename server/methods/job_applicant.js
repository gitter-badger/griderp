Meteor.methods({

	removeJobApplicant: function(docIds) {
		JobApplicant.remove({"_id":{"$in":docIds}});
	}

});
