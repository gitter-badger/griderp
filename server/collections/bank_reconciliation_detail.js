BankReconciliationDetail.allow({
	insert: function (userId, doc) {
		return BankReconciliationDetail.userCanInsert(userId, doc);
	},

	update: function (userId, doc, fields, modifier) {
		return BankReconciliationDetail.userCanUpdate(userId, doc);
	},

	remove: function (userId, doc) {
		return BankReconciliationDetail.userCanRemove(userId, doc);
	}
});

BankReconciliationDetail.before.insert(function(userId, doc) {
	doc.createdAt = new Date();
	doc.createdBy = userId;
	doc.modifiedAt = doc.createdAt;
	doc.modifiedBy = doc.createdBy;

	
	if(!doc.ownerId) doc.ownerId = userId;
});

BankReconciliationDetail.before.update(function(userId, doc, fieldNames, modifier, options) {
	modifier.$set = modifier.$set || {};
	modifier.$set.modifiedAt = new Date();
	modifier.$set.modifiedBy = userId;

	
});

BankReconciliationDetail.before.remove(function(userId, doc) {
	
});

BankReconciliationDetail.after.insert(function(userId, doc) {
	
});

BankReconciliationDetail.after.update(function(userId, doc, fieldNames, modifier, options) {
	
});

BankReconciliationDetail.after.remove(function(userId, doc) {
	
});
