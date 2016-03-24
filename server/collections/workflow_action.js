WorkflowAction.allow({
	insert: function (userId, doc) {
		return WorkflowAction.userCanInsert(userId, doc);
	},

	update: function (userId, doc, fields, modifier) {
		return WorkflowAction.userCanUpdate(userId, doc);
	},

	remove: function (userId, doc) {
		return WorkflowAction.userCanRemove(userId, doc);
	}
});

WorkflowAction.before.insert(function(userId, doc) {
	doc.createdAt = new Date();
	doc.createdBy = userId;
	doc.modifiedAt = doc.createdAt;
	doc.modifiedBy = doc.createdBy;

	
	if(!doc.ownerId) doc.ownerId = userId;
});

WorkflowAction.before.update(function(userId, doc, fieldNames, modifier, options) {
	modifier.$set = modifier.$set || {};
	modifier.$set.modifiedAt = new Date();
	modifier.$set.modifiedBy = userId;

	
});

WorkflowAction.before.remove(function(userId, doc) {
	
});

WorkflowAction.after.insert(function(userId, doc) {
	
});

WorkflowAction.after.update(function(userId, doc, fieldNames, modifier, options) {
	
});

WorkflowAction.after.remove(function(userId, doc) {
	
});
