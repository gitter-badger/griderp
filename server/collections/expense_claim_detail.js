ExpenseClaimDetail.allow({
	insert: function (userId, doc) {
		return ExpenseClaimDetail.userCanInsert(userId, doc);
	},

	update: function (userId, doc, fields, modifier) {
		return ExpenseClaimDetail.userCanUpdate(userId, doc);
	},

	remove: function (userId, doc) {
		return ExpenseClaimDetail.userCanRemove(userId, doc);
	}
});

ExpenseClaimDetail.before.insert(function(userId, doc) {
	doc.createdAt = new Date();
	doc.createdBy = userId;
	doc.modifiedAt = doc.createdAt;
	doc.modifiedBy = doc.createdBy;

	
	if(!doc.ownerId) doc.ownerId = userId;
});

ExpenseClaimDetail.before.update(function(userId, doc, fieldNames, modifier, options) {
	modifier.$set = modifier.$set || {};
	modifier.$set.modifiedAt = new Date();
	modifier.$set.modifiedBy = userId;

	
});

ExpenseClaimDetail.before.remove(function(userId, doc) {
	
});

ExpenseClaimDetail.after.insert(function(userId, doc) {
	
});

ExpenseClaimDetail.after.update(function(userId, doc, fieldNames, modifier, options) {
	
});

ExpenseClaimDetail.after.remove(function(userId, doc) {
	
});
