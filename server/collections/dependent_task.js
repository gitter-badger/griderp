DependentTask.allow({
	insert: function (userId, doc) {
		return DependentTask.userCanInsert(userId, doc);
	},

	update: function (userId, doc, fields, modifier) {
		return DependentTask.userCanUpdate(userId, doc);
	},

	remove: function (userId, doc) {
		return DependentTask.userCanRemove(userId, doc);
	}
});

DependentTask.before.insert(function(userId, doc) {
	doc.createdAt = new Date();
	doc.createdBy = userId;
	doc.modifiedAt = doc.createdAt;
	doc.modifiedBy = doc.createdBy;

	
	if(!doc.ownerId) doc.ownerId = userId;
});

DependentTask.before.update(function(userId, doc, fieldNames, modifier, options) {
	modifier.$set = modifier.$set || {};
	modifier.$set.modifiedAt = new Date();
	modifier.$set.modifiedBy = userId;

	
});

DependentTask.before.remove(function(userId, doc) {
	
});

DependentTask.after.insert(function(userId, doc) {
	
});

DependentTask.after.update(function(userId, doc, fieldNames, modifier, options) {
	
});

DependentTask.after.remove(function(userId, doc) {
	
});
