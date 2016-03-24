Meteor.methods({

	removeMaterialRequest: function(docIds) {
		MaterialRequest.remove({"_id":{"$in":docIds}});
	}

});
