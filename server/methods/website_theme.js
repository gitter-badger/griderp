Meteor.methods({

	removeWebsiteTheme: function(docIds) {
		WebsiteTheme.remove({"_id":{"$in":docIds}});
	}

});
