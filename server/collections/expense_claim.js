ExpenseClaim.allow({
	insert: function (userId, doc) {
		return ExpenseClaim.userCanInsert(userId, doc);
	},

	update: function (userId, doc, fields, modifier) {
		return ExpenseClaim.userCanUpdate(userId, doc);
	},

	remove: function (userId, doc) {
		return ExpenseClaim.userCanRemove(userId, doc);
	}
});

ExpenseClaim.before.insert(function(userId, doc) {
	doc.createdAt = new Date();
	doc.createdBy = userId;
	doc.modifiedAt = doc.createdAt;
	doc.modifiedBy = doc.createdBy;

	
	if(!doc.ownerId) doc.ownerId = userId;
});

ExpenseClaim.before.update(function(userId, doc, fieldNames, modifier, options) {
	modifier.$set = modifier.$set || {};
	modifier.$set.modifiedAt = new Date();
	modifier.$set.modifiedBy = userId;

	
});

ExpenseClaim.before.remove(function(userId, doc) {
	
});

ExpenseClaim.after.insert(function(userId, doc) {
	
});

ExpenseClaim.after.update(function(userId, doc, fieldNames, modifier, options) {
	
});

ExpenseClaim.after.remove(function(userId, doc) {
	
});
