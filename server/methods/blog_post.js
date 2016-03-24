Meteor.methods({

	removeBlogPost: function(docIds) {
		BlogPost.remove({"_id":{"$in":docIds}});
	}

});
