Meteor.methods({

	removeSystemUser: function(docIds) {
		Users.remove({"_id":{"$in":docIds}});
	}

});
