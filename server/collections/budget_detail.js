BudgetDetail.allow({
	insert: function (userId, doc) {
		return BudgetDetail.userCanInsert(userId, doc);
	},

	update: function (userId, doc, fields, modifier) {
		return BudgetDetail.userCanUpdate(userId, doc);
	},

	remove: function (userId, doc) {
		return BudgetDetail.userCanRemove(userId, doc);
	}
});

BudgetDetail.before.insert(function(userId, doc) {
	doc.createdAt = new Date();
	doc.createdBy = userId;
	doc.modifiedAt = doc.createdAt;
	doc.modifiedBy = doc.createdBy;

	
	if(!doc.ownerId) doc.ownerId = userId;
});

BudgetDetail.before.update(function(userId, doc, fieldNames, modifier, options) {
	modifier.$set = modifier.$set || {};
	modifier.$set.modifiedAt = new Date();
	modifier.$set.modifiedBy = userId;

	
});

BudgetDetail.before.remove(function(userId, doc) {
	
});

BudgetDetail.after.insert(function(userId, doc) {
	
});

BudgetDetail.after.update(function(userId, doc, fieldNames, modifier, options) {
	
});

BudgetDetail.after.remove(function(userId, doc) {
	
});
