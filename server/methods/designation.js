Meteor.methods({

	removeDesignation: function(docIds) {
		Designation.remove({"_id":{"$in":docIds}});
	}

});
