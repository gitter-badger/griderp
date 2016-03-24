Meteor.methods({

	removeWebsiteSlideshow: function(docIds) {
		WebsiteSlideshow.remove({"_id":{"$in":docIds}});
	}

});
