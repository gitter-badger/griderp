Meteor.methods({

	removeNewsletterList: function(docIds) {
		NewsletterList.remove({"_id":{"$in":docIds}});
	}

});
