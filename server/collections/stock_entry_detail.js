StockEntryDetail.allow({
	insert: function (userId, doc) {
		return StockEntryDetail.userCanInsert(userId, doc);
	},

	update: function (userId, doc, fields, modifier) {
		return StockEntryDetail.userCanUpdate(userId, doc);
	},

	remove: function (userId, doc) {
		return StockEntryDetail.userCanRemove(userId, doc);
	}
});

StockEntryDetail.before.insert(function(userId, doc) {
	doc.createdAt = new Date();
	doc.createdBy = userId;
	doc.modifiedAt = doc.createdAt;
	doc.modifiedBy = doc.createdBy;

	
	if(!doc.ownerId) doc.ownerId = userId;
});

StockEntryDetail.before.update(function(userId, doc, fieldNames, modifier, options) {
	modifier.$set = modifier.$set || {};
	modifier.$set.modifiedAt = new Date();
	modifier.$set.modifiedBy = userId;

	
});

StockEntryDetail.before.remove(function(userId, doc) {
	
});

StockEntryDetail.after.insert(function(userId, doc) {
	
});

StockEntryDetail.after.update(function(userId, doc, fieldNames, modifier, options) {
	
});

StockEntryDetail.after.remove(function(userId, doc) {
	
});
