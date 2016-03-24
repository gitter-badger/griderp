Todo.allow({
	insert: function (userId, doc) {
		return Todo.userCanInsert(userId, doc);
	},

	update: function (userId, doc, fields, modifier) {
		return Todo.userCanUpdate(userId, doc);
	},

	remove: function (userId, doc) {
		return Todo.userCanRemove(userId, doc);
	}
});

Todo.before.insert(function(userId, doc) {
	doc.createdAt = new Date();
	doc.createdBy = userId;
	doc.modifiedAt = doc.createdAt;
	doc.modifiedBy = doc.createdBy;

	
	if(!doc.ownerId) doc.ownerId = userId;
});

Todo.before.update(function(userId, doc, fieldNames, modifier, options) {
	modifier.$set = modifier.$set || {};
	modifier.$set.modifiedAt = new Date();
	modifier.$set.modifiedBy = userId;

	
});

Todo.before.remove(function(userId, doc) {
	
});

Todo.after.insert(function(userId, doc) {
	
});

Todo.after.update(function(userId, doc, fieldNames, modifier, options) {
	
});

Todo.after.remove(function(userId, doc) {
	
});
