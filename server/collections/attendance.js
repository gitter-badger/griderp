Attendance.allow({
	insert: function (userId, doc) {
		return Attendance.userCanInsert(userId, doc);
	},

	update: function (userId, doc, fields, modifier) {
		return Attendance.userCanUpdate(userId, doc);
	},

	remove: function (userId, doc) {
		return Attendance.userCanRemove(userId, doc);
	}
});

Attendance.before.insert(function(userId, doc) {
	doc.createdAt = new Date();
	doc.createdBy = userId;
	doc.modifiedAt = doc.createdAt;
	doc.modifiedBy = doc.createdBy;

	
	if(!doc.ownerId) doc.ownerId = userId;
});

Attendance.before.update(function(userId, doc, fieldNames, modifier, options) {
	modifier.$set = modifier.$set || {};
	modifier.$set.modifiedAt = new Date();
	modifier.$set.modifiedBy = userId;

	
});

Attendance.before.remove(function(userId, doc) {
	
});

Attendance.after.insert(function(userId, doc) {
	
});

Attendance.after.update(function(userId, doc, fieldNames, modifier, options) {
	
});

Attendance.after.remove(function(userId, doc) {
	
});
