ActivityType.allow({
	insert: function (userId, doc) {
		return ActivityType.userCanInsert(userId, doc);
	},

	update: function (userId, doc, fields, modifier) {
		return ActivityType.userCanUpdate(userId, doc);
	},

	remove: function (userId, doc) {
		return ActivityType.userCanRemove(userId, doc);
	}
});

ActivityType.before.insert(function(userId, doc) {
	doc.createdAt = new Date();
	doc.createdBy = userId;
	doc.modifiedAt = doc.createdAt;
	doc.modifiedBy = doc.createdBy;

	
	if(!doc.ownerId) doc.ownerId = userId;
});

ActivityType.before.update(function(userId, doc, fieldNames, modifier, options) {
	modifier.$set = modifier.$set || {};
	modifier.$set.modifiedAt = new Date();
	modifier.$set.modifiedBy = userId;

	
});

ActivityType.before.remove(function(userId, doc) {
	
});

ActivityType.after.insert(function(userId, doc) {
	
});

ActivityType.after.update(function(userId, doc, fieldNames, modifier, options) {
	
});

ActivityType.after.remove(function(userId, doc) {
	
});
