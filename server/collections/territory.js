Territory.allow({
	insert: function (userId, doc) {
		return Territory.userCanInsert(userId, doc);
	},

	update: function (userId, doc, fields, modifier) {
		return Territory.userCanUpdate(userId, doc);
	},

	remove: function (userId, doc) {
		return Territory.userCanRemove(userId, doc);
	}
});

Territory.before.insert(function(userId, doc) {
	doc.createdAt = new Date();
	doc.createdBy = userId;
	doc.modifiedAt = doc.createdAt;
	doc.modifiedBy = doc.createdBy;

	
	if(!doc.ownerId) doc.ownerId = userId;
});

Territory.before.update(function(userId, doc, fieldNames, modifier, options) {
	modifier.$set = modifier.$set || {};
	modifier.$set.modifiedAt = new Date();
	modifier.$set.modifiedBy = userId;

	
});

Territory.before.remove(function(userId, doc) {
	
});

Territory.after.insert(function(userId, doc) {
	
});

Territory.after.update(function(userId, doc, fieldNames, modifier, options) {
	
});

Territory.after.remove(function(userId, doc) {
	
});
