Meteor.methods({

	removeComment: function(docIds) {
		Comment.remove({"_id":{"$in":docIds}});
	}

});
