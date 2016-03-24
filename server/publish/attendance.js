Meteor.publish("attendance_list", function(limit) {
	var defaultLimit = limit || 25;
	return Attendance.find({ ownerId: this.userId }, {limit: defaultLimit});
});

Meteor.publish("attendance_empty", function() {
	return Attendance.find({ _id: null, ownerId: this.userId }, {});
});

Meteor.publish("attendance_details", function(attendanceId) {
	return Attendance.find({ _id: attendanceId, ownerId: this.userId }, {});
});
