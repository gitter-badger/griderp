Meteor.methods({

	removeEmailAlert: function(docIds) {
		EmailAlert.remove({"_id":{"$in":docIds}});
	}

});
