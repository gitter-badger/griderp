Meteor.methods({

	removeOperation: function(docIds) {
		Operation.remove({"_id":{"$in":docIds}});
	}

});
