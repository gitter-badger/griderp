WorkflowTransition.allow({
	insert: function (userId, doc) {
		return WorkflowTransition.userCanInsert(userId, doc);
	},

	update: function (userId, doc, fields, modifier) {
		return WorkflowTransition.userCanUpdate(userId, doc);
	},

	remove: function (userId, doc) {
		return WorkflowTransition.userCanRemove(userId, doc);
	}
});

WorkflowTransition.before.insert(function(userId, doc) {
	doc.createdAt = new Date();
	doc.createdBy = userId;
	doc.modifiedAt = doc.createdAt;
	doc.modifiedBy = doc.createdBy;

	
	if(!doc.ownerId) doc.ownerId = userId;
});

WorkflowTransition.before.update(function(userId, doc, fieldNames, modifier, options) {
	modifier.$set = modifier.$set || {};
	modifier.$set.modifiedAt = new Date();
	modifier.$set.modifiedBy = userId;

	
});

WorkflowTransition.before.remove(function(userId, doc) {
	
});

WorkflowTransition.after.insert(function(userId, doc) {
	
});

WorkflowTransition.after.update(function(userId, doc, fieldNames, modifier, options) {
	
});

WorkflowTransition.after.remove(function(userId, doc) {
	
});
