Meteor.methods({

	removeAppraisal: function(docIds) {
		Appraisal.remove({"_id":{"$in":docIds}});
	}

});
