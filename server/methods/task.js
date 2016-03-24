Meteor.methods({

	removeTask: function(docIds) {
		Task.remove({"_id":{"$in":docIds}});
	}

});
