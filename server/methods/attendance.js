Meteor.methods({

	removeAttendance: function(docIds) {
		Attendance.remove({"_id":{"$in":docIds}});
	}

});
