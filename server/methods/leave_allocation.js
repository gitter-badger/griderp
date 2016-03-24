Meteor.methods({

	removeLeaveAllocation: function(docIds) {
		LeaveAllocation.remove({"_id":{"$in":docIds}});
	}

});
