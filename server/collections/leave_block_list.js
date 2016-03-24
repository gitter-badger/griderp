LeaveBlockList.allow({
	insert: function (userId, doc) {
		return LeaveBlockList.userCanInsert(userId, doc);
	},

	update: function (userId, doc, fields, modifier) {
		return LeaveBlockList.userCanUpdate(userId, doc);
	},

	remove: function (userId, doc) {
		return LeaveBlockList.userCanRemove(userId, doc);
	}
});

LeaveBlockList.before.insert(function(userId, doc) {
	doc.createdAt = new Date();
	doc.createdBy = userId;
	doc.modifiedAt = doc.createdAt;
	doc.modifiedBy = doc.createdBy;

	
	if(!doc.ownerId) doc.ownerId = userId;
});

LeaveBlockList.before.update(function(userId, doc, fieldNames, modifier, options) {
	modifier.$set = modifier.$set || {};
	modifier.$set.modifiedAt = new Date();
	modifier.$set.modifiedBy = userId;

	
});

LeaveBlockList.before.remove(function(userId, doc) {
	
});

LeaveBlockList.after.insert(function(userId, doc) {
	
});

LeaveBlockList.after.update(function(userId, doc, fieldNames, modifier, options) {
	
});

LeaveBlockList.after.remove(function(userId, doc) {
	
});
