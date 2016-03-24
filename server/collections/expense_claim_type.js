ExpenseClaimType.allow({
	insert: function (userId, doc) {
		return ExpenseClaimType.userCanInsert(userId, doc);
	},

	update: function (userId, doc, fields, modifier) {
		return ExpenseClaimType.userCanUpdate(userId, doc);
	},

	remove: function (userId, doc) {
		return ExpenseClaimType.userCanRemove(userId, doc);
	}
});

ExpenseClaimType.before.insert(function(userId, doc) {
	doc.createdAt = new Date();
	doc.createdBy = userId;
	doc.modifiedAt = doc.createdAt;
	doc.modifiedBy = doc.createdBy;

	
	if(!doc.ownerId) doc.ownerId = userId;
});

ExpenseClaimType.before.update(function(userId, doc, fieldNames, modifier, options) {
	modifier.$set = modifier.$set || {};
	modifier.$set.modifiedAt = new Date();
	modifier.$set.modifiedBy = userId;

	
});

ExpenseClaimType.before.remove(function(userId, doc) {
	
});

ExpenseClaimType.after.insert(function(userId, doc) {
	
});

ExpenseClaimType.after.update(function(userId, doc, fieldNames, modifier, options) {
	
});

ExpenseClaimType.after.remove(function(userId, doc) {
	
});
