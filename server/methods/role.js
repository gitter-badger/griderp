Meteor.methods({

	removeRole: function(docIds) {
		Role.remove({"_id":{"$in":docIds}});
	}

});
