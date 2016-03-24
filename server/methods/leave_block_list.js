Meteor.methods({

	removeLeaveBlockList: function(docIds) {
		LeaveBlockList.remove({"_id":{"$in":docIds}});
	}

});
