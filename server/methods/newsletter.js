Meteor.methods({

	removeNewsletter: function(docIds) {
		Newsletter.remove({"_id":{"$in":docIds}});
	}

});
