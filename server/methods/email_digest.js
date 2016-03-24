Meteor.methods({

	removeEmailDigest: function(docIds) {
		EmailDigest.remove({"_id":{"$in":docIds}});
	}

});
