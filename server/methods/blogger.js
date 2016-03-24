Meteor.methods({

	removeBlogger: function(docIds) {
		Blogger.remove({"_id":{"$in":docIds}});
	}

});
