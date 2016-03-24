WorkflowDocumentState.allow({
	insert: function (userId, doc) {
		return WorkflowDocumentState.userCanInsert(userId, doc);
	},

	update: function (userId, doc, fields, modifier) {
		return WorkflowDocumentState.userCanUpdate(userId, doc);
	},

	remove: function (userId, doc) {
		return WorkflowDocumentState.userCanRemove(userId, doc);
	}
});

WorkflowDocumentState.before.insert(function(userId, doc) {
	doc.createdAt = new Date();
	doc.createdBy = userId;
	doc.modifiedAt = doc.createdAt;
	doc.modifiedBy = doc.createdBy;

	
	if(!doc.ownerId) doc.ownerId = userId;
});

WorkflowDocumentState.before.update(function(userId, doc, fieldNames, modifier, options) {
	modifier.$set = modifier.$set || {};
	modifier.$set.modifiedAt = new Date();
	modifier.$set.modifiedBy = userId;

	
});

WorkflowDocumentState.before.remove(function(userId, doc) {
	
});

WorkflowDocumentState.after.insert(function(userId, doc) {
	
});

WorkflowDocumentState.after.update(function(userId, doc, fieldNames, modifier, options) {
	
});

WorkflowDocumentState.after.remove(function(userId, doc) {
	
});
