Meteor.methods({

	removeIssue: function(docIds) {
		Issue.remove({"_id":{"$in":docIds}});
	}

});
