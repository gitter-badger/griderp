Meteor.methods({

	removeActivityCost: function(docIds) {
		ActivityCost.remove({"_id":{"$in":docIds}});
	}

});
