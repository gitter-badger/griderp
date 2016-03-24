Meteor.methods({

	removeCustomScript: function(docIds) {
		CustomScript.remove({"_id":{"$in":docIds}});
	}

});
