LeaveBlockListAllow.allow({
	insert: function (userId, doc) {
		return LeaveBlockListAllow.userCanInsert(userId, doc);
	},

	update: function (userId, doc, fields, modifier) {
		return LeaveBlockListAllow.userCanUpdate(userId, doc);
	},

	remove: function (userId, doc) {
		return LeaveBlockListAllow.userCanRemove(userId, doc);
	}
});

LeaveBlockListAllow.before.insert(function(userId, doc) {
	doc.createdAt = new Date();
	doc.createdBy = userId;
	doc.modifiedAt = doc.createdAt;
	doc.modifiedBy = doc.createdBy;

	
	if(!doc.ownerId) doc.ownerId = userId;
});

LeaveBlockListAllow.before.update(function(userId, doc, fieldNames, modifier, options) {
	modifier.$set = modifier.$set || {};
	modifier.$set.modifiedAt = new Date();
	modifier.$set.modifiedBy = userId;

	
});

LeaveBlockListAllow.before.remove(function(userId, doc) {
	
});

LeaveBlockListAllow.after.insert(function(userId, doc) {
	
});

LeaveBlockListAllow.after.update(function(userId, doc, fieldNames, modifier, options) {
	
});

LeaveBlockListAllow.after.remove(function(userId, doc) {
	
});
