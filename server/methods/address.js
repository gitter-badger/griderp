Meteor.methods({

	removeAddress: function(docIds) {
		Address.remove({"_id":{"$in":docIds}});
	}

});
