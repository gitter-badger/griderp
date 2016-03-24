Meteor.methods({

	removeUser: function(docIds) {
		User.remove({"_id":{"$in":docIds}});
	}

});
