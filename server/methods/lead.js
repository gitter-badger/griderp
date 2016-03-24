Meteor.methods({

	removeLead: function(docIds) {
		Lead.remove({"_id":{"$in":docIds}});
	}

});
