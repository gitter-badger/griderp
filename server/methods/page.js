Meteor.methods({

	removePage: function(docIds) {
		Page.remove({"_id":{"$in":docIds}});
	}

});
