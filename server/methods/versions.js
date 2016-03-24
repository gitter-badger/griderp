Meteor.methods({

	removeVersions: function(docIds) {
		Versions.remove({"_id":{"$in":docIds}});
	}

});
