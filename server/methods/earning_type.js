Meteor.methods({

	removeEarningType: function(docIds) {
		EarningType.remove({"_id":{"$in":docIds}});
	}

});
