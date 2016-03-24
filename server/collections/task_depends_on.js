TaskDependsOn.allow({
	insert: function (userId, doc) {
		return TaskDependsOn.userCanInsert(userId, doc);
	},

	update: function (userId, doc, fields, modifier) {
		return TaskDependsOn.userCanUpdate(userId, doc);
	},

	remove: function (userId, doc) {
		return TaskDependsOn.userCanRemove(userId, doc);
	}
});

TaskDependsOn.before.insert(function(userId, doc) {
	doc.createdAt = new Date();
	doc.createdBy = userId;
	doc.modifiedAt = doc.createdAt;
	doc.modifiedBy = doc.createdBy;

	
	if(!doc.ownerId) doc.ownerId = userId;
});

TaskDependsOn.before.update(function(userId, doc, fieldNames, modifier, options) {
	modifier.$set = modifier.$set || {};
	modifier.$set.modifiedAt = new Date();
	modifier.$set.modifiedBy = userId;

	
});

TaskDependsOn.before.remove(function(userId, doc) {
	
});

TaskDependsOn.after.insert(function(userId, doc) {
	
});

TaskDependsOn.after.update(function(userId, doc, fieldNames, modifier, options) {
	
});

TaskDependsOn.after.remove(function(userId, doc) {
	
});
