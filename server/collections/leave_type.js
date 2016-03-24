LeaveType.allow({
	insert: function (userId, doc) {
		return LeaveType.userCanInsert(userId, doc);
	},

	update: function (userId, doc, fields, modifier) {
		return LeaveType.userCanUpdate(userId, doc);
	},

	remove: function (userId, doc) {
		return LeaveType.userCanRemove(userId, doc);
	}
});

LeaveType.before.insert(function(userId, doc) {
	doc.createdAt = new Date();
	doc.createdBy = userId;
	doc.modifiedAt = doc.createdAt;
	doc.modifiedBy = doc.createdBy;

	
	if(!doc.ownerId) doc.ownerId = userId;
});

LeaveType.before.update(function(userId, doc, fieldNames, modifier, options) {
	modifier.$set = modifier.$set || {};
	modifier.$set.modifiedAt = new Date();
	modifier.$set.modifiedBy = userId;

	
});

LeaveType.before.remove(function(userId, doc) {
	
});

LeaveType.after.insert(function(userId, doc) {
	
});

LeaveType.after.update(function(userId, doc, fieldNames, modifier, options) {
	
});

LeaveType.after.remove(function(userId, doc) {
	
});
