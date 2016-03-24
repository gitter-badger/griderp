StockReconciliation.allow({
	insert: function (userId, doc) {
		return StockReconciliation.userCanInsert(userId, doc);
	},

	update: function (userId, doc, fields, modifier) {
		return StockReconciliation.userCanUpdate(userId, doc);
	},

	remove: function (userId, doc) {
		return StockReconciliation.userCanRemove(userId, doc);
	}
});

StockReconciliation.before.insert(function(userId, doc) {
	doc.createdAt = new Date();
	doc.createdBy = userId;
	doc.modifiedAt = doc.createdAt;
	doc.modifiedBy = doc.createdBy;

	
	if(!doc.ownerId) doc.ownerId = userId;
});

StockReconciliation.before.update(function(userId, doc, fieldNames, modifier, options) {
	modifier.$set = modifier.$set || {};
	modifier.$set.modifiedAt = new Date();
	modifier.$set.modifiedBy = userId;

	
});

StockReconciliation.before.remove(function(userId, doc) {
	
});

StockReconciliation.after.insert(function(userId, doc) {
	
});

StockReconciliation.after.update(function(userId, doc, fieldNames, modifier, options) {
	
});

StockReconciliation.after.remove(function(userId, doc) {
	
});
