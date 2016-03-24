LeaveBlockListDate.allow({
	insert: function (userId, doc) {
		return LeaveBlockListDate.userCanInsert(userId, doc);
	},

	update: function (userId, doc, fields, modifier) {
		return LeaveBlockListDate.userCanUpdate(userId, doc);
	},

	remove: function (userId, doc) {
		return LeaveBlockListDate.userCanRemove(userId, doc);
	}
});

LeaveBlockListDate.before.insert(function(userId, doc) {
	doc.createdAt = new Date();
	doc.createdBy = userId;
	doc.modifiedAt = doc.createdAt;
	doc.modifiedBy = doc.createdBy;

	
	if(!doc.ownerId) doc.ownerId = userId;
});

LeaveBlockListDate.before.update(function(userId, doc, fieldNames, modifier, options) {
	modifier.$set = modifier.$set || {};
	modifier.$set.modifiedAt = new Date();
	modifier.$set.modifiedBy = userId;

	
});

LeaveBlockListDate.before.remove(function(userId, doc) {
	
});

LeaveBlockListDate.after.insert(function(userId, doc) {
	
});

LeaveBlockListDate.after.update(function(userId, doc, fieldNames, modifier, options) {
	
});

LeaveBlockListDate.after.remove(function(userId, doc) {
	
});
