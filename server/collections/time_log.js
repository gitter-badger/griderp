TimeLog.allow({
	insert: function (userId, doc) {
		return TimeLog.userCanInsert(userId, doc);
	},

	update: function (userId, doc, fields, modifier) {
		return TimeLog.userCanUpdate(userId, doc);
	},

	remove: function (userId, doc) {
		return TimeLog.userCanRemove(userId, doc);
	}
});

TimeLog.before.insert(function(userId, doc) {
	doc.createdAt = new Date();
	doc.createdBy = userId;
	doc.modifiedAt = doc.createdAt;
	doc.modifiedBy = doc.createdBy;

	
	if(!doc.ownerId) doc.ownerId = userId;
});

TimeLog.before.update(function(userId, doc, fieldNames, modifier, options) {
	modifier.$set = modifier.$set || {};
	modifier.$set.modifiedAt = new Date();
	modifier.$set.modifiedBy = userId;

	
});

TimeLog.before.remove(function(userId, doc) {
	
});

TimeLog.after.insert(function(userId, doc) {
	
});

TimeLog.after.update(function(userId, doc, fieldNames, modifier, options) {
	
});

TimeLog.after.remove(function(userId, doc) {
	
});
