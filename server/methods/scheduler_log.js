Meteor.methods({

	removeSchedulerLog: function(docIds) {
		SchedulerLog.remove({"_id":{"$in":docIds}});
	}

});
