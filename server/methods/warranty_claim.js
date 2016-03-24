Meteor.methods({

	removeWarrantyClaim: function(docIds) {
		WarrantyClaim.remove({"_id":{"$in":docIds}});
	}

});
