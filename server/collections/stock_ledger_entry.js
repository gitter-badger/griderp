StockLedgerEntry.allow({
	insert: function (userId, doc) {
		return StockLedgerEntry.userCanInsert(userId, doc);
	},

	update: function (userId, doc, fields, modifier) {
		return StockLedgerEntry.userCanUpdate(userId, doc);
	},

	remove: function (userId, doc) {
		return StockLedgerEntry.userCanRemove(userId, doc);
	}
});

StockLedgerEntry.before.insert(function(userId, doc) {
	doc.createdAt = new Date();
	doc.createdBy = userId;
	doc.modifiedAt = doc.createdAt;
	doc.modifiedBy = doc.createdBy;

	
	if(!doc.ownerId) doc.ownerId = userId;
});

StockLedgerEntry.before.update(function(userId, doc, fieldNames, modifier, options) {
	modifier.$set = modifier.$set || {};
	modifier.$set.modifiedAt = new Date();
	modifier.$set.modifiedBy = userId;

	
});

StockLedgerEntry.before.remove(function(userId, doc) {
	
});

StockLedgerEntry.after.insert(function(userId, doc) {
	
});

StockLedgerEntry.after.update(function(userId, doc, fieldNames, modifier, options) {
	
});

StockLedgerEntry.after.remove(function(userId, doc) {
	
});
