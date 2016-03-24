Meteor.methods({

	removeJobOpening: function(docIds) {
		JobOpening.remove({"_id":{"$in":docIds}});
	}

});
