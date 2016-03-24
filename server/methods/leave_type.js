Meteor.methods({

	removeLeaveType: function(docIds) {
		LeaveType.remove({"_id":{"$in":docIds}});
	}

});
