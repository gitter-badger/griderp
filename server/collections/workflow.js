Workflow.allow({
	insert: function (userId, doc) {
		return Workflow.userCanInsert(userId, doc);
	},

	update: function (userId, doc, fields, modifier) {
		return Workflow.userCanUpdate(userId, doc);
	},

	remove: function (userId, doc) {
		return Workflow.userCanRemove(userId, doc);
	}
});

Workflow.before.insert(function(userId, doc) {
	doc.createdAt = new Date();
	doc.createdBy = userId;
	doc.modifiedAt = doc.createdAt;
	doc.modifiedBy = doc.createdBy;

	
	if(!doc.ownerId) doc.ownerId = userId;
});

Workflow.before.update(function(userId, doc, fieldNames, modifier, options) {
	modifier.$set = modifier.$set || {};
	modifier.$set.modifiedAt = new Date();
	modifier.$set.modifiedBy = userId;

	
});

Workflow.before.remove(function(userId, doc) {
	
});

Workflow.after.insert(function(userId, doc) {
	
});

Workflow.after.update(function(userId, doc, fieldNames, modifier, options) {
	
});

Workflow.after.remove(function(userId, doc) {
	
});
