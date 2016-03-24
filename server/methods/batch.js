Meteor.methods({

	removeBatch: function(docIds) {
		Batch.remove({"_id":{"$in":docIds}});
	}

});
