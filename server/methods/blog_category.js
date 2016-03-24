Meteor.methods({

	removeBlogCategory: function(docIds) {
		BlogCategory.remove({"_id":{"$in":docIds}});
	}

});
