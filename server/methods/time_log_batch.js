Meteor.methods({

	removeTimeLogBatch: function(docIds) {
		TimeLogBatch.remove({"_id":{"$in":docIds}});
	}

});
