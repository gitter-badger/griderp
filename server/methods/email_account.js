Meteor.methods({

	removeEmailAccount: function(docIds) {
		EmailAccount.remove({"_id":{"$in":docIds}});
	}

});
