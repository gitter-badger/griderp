Meteor.methods({

	removeItem: function(docIds) {
		Item.remove({"_id":{"$in":docIds}});
	}

});
