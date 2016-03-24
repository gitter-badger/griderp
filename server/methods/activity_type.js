Meteor.methods({

	removeActivityType: function(docIds) {
		ActivityType.remove({"_id":{"$in":docIds}});
	}

});
