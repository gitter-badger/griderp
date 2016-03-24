Task.allow({
	insert: function (userId, doc) {
		return Task.userCanInsert(userId, doc);
	},

	update: function (userId, doc, fields, modifier) {
		return Task.userCanUpdate(userId, doc);
	},

	remove: function (userId, doc) {
		return Task.userCanRemove(userId, doc);
	}
});

Task.before.insert(function(userId, doc) {
	doc.createdAt = new Date();
	doc.createdBy = userId;
	doc.modifiedAt = doc.createdAt;
	doc.modifiedBy = doc.createdBy;

	
	if(!doc.ownerId) doc.ownerId = userId;
});

Task.before.update(function(userId, doc, fieldNames, modifier, options) {
	modifier.$set = modifier.$set || {};
	modifier.$set.modifiedAt = new Date();
	modifier.$set.modifiedBy = userId;

	
});

Task.before.remove(function(userId, doc) {
	
});

Task.after.insert(function(userId, doc) {
	
});

Task.after.update(function(userId, doc, fieldNames, modifier, options) {
	
});

Task.after.remove(function(userId, doc) {
	
});
