Meteor.methods({

	removeCurrency: function(docIds) {
		Currency.remove({"_id":{"$in":docIds}});
	}

});
