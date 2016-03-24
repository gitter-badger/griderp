StockReconciliationItem.allow({
	insert: function (userId, doc) {
		return StockReconciliationItem.userCanInsert(userId, doc);
	},

	update: function (userId, doc, fields, modifier) {
		return StockReconciliationItem.userCanUpdate(userId, doc);
	},

	remove: function (userId, doc) {
		return StockReconciliationItem.userCanRemove(userId, doc);
	}
});

StockReconciliationItem.before.insert(function(userId, doc) {
	doc.createdAt = new Date();
	doc.createdBy = userId;
	doc.modifiedAt = doc.createdAt;
	doc.modifiedBy = doc.createdBy;

	
	if(!doc.ownerId) doc.ownerId = userId;
});

StockReconciliationItem.before.update(function(userId, doc, fieldNames, modifier, options) {
	modifier.$set = modifier.$set || {};
	modifier.$set.modifiedAt = new Date();
	modifier.$set.modifiedBy = userId;

	
});

StockReconciliationItem.before.remove(function(userId, doc) {
	
});

StockReconciliationItem.after.insert(function(userId, doc) {
	
});

StockReconciliationItem.after.update(function(userId, doc, fieldNames, modifier, options) {
	
});

StockReconciliationItem.after.remove(function(userId, doc) {
	
});
