Meteor.methods({

	removeWebPage: function(docIds) {
		WebPage.remove({"_id":{"$in":docIds}});
	}

});
