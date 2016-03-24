Meteor.methods({

	removeItemAttribute: function(docIds) {
		ItemAttribute.remove({"_id":{"$in":docIds}});
	}

});
