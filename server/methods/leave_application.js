Meteor.methods({

	removeLeaveApplication: function(docIds) {
		LeaveApplication.remove({"_id":{"$in":docIds}});
	}

});
