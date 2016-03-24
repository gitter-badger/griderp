Meteor.methods({

	removeTimeLog: function(docIds) {
		TimeLog.remove({"_id":{"$in":docIds}});
	}

});
