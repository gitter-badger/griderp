Meteor.methods({

	removeBranch: function(docIds) {
		Branch.remove({"_id":{"$in":docIds}});
	}

});
