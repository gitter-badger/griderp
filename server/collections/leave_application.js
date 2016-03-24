LeaveApplication.allow({
	insert: function (userId, doc) {
		return LeaveApplication.userCanInsert(userId, doc);
	},

	update: function (userId, doc, fields, modifier) {
		return LeaveApplication.userCanUpdate(userId, doc);
	},

	remove: function (userId, doc) {
		return LeaveApplication.userCanRemove(userId, doc);
	}
});

LeaveApplication.before.insert(function(userId, doc) {
	doc.createdAt = new Date();
	doc.createdBy = userId;
	doc.modifiedAt = doc.createdAt;
	doc.modifiedBy = doc.createdBy;

	
	if(!doc.ownerId) doc.ownerId = userId;
});

LeaveApplication.before.update(function(userId, doc, fieldNames, modifier, options) {
	modifier.$set = modifier.$set || {};
	modifier.$set.modifiedAt = new Date();
	modifier.$set.modifiedBy = userId;

	
});

LeaveApplication.before.remove(function(userId, doc) {
	
});

LeaveApplication.after.insert(function(userId, doc) {
	
});

LeaveApplication.after.update(function(userId, doc, fieldNames, modifier, options) {
	
});

LeaveApplication.after.remove(function(userId, doc) {
	
});
