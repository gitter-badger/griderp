Meteor.methods({

	removeWorkstation: function(docIds) {
		Workstation.remove({"_id":{"$in":docIds}});
	}

});
