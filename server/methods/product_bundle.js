Meteor.methods({

	removeProductBundle: function(docIds) {
		ProductBundle.remove({"_id":{"$in":docIds}});
	}

});
