PurchaseReceiptItem.allow({
	insert: function (userId, doc) {
		return PurchaseReceiptItem.userCanInsert(userId, doc);
	},

	update: function (userId, doc, fields, modifier) {
		return PurchaseReceiptItem.userCanUpdate(userId, doc);
	},

	remove: function (userId, doc) {
		return PurchaseReceiptItem.userCanRemove(userId, doc);
	}
});

PurchaseReceiptItem.before.insert(function(userId, doc) {
	doc.createdAt = new Date();
	doc.createdBy = userId;
	doc.modifiedAt = doc.createdAt;
	doc.modifiedBy = doc.createdBy;

	
	if(!doc.ownerId) doc.ownerId = userId;
});

PurchaseReceiptItem.before.update(function(userId, doc, fieldNames, modifier, options) {
	modifier.$set = modifier.$set || {};
	modifier.$set.modifiedAt = new Date();
	modifier.$set.modifiedBy = userId;

	
});

PurchaseReceiptItem.before.remove(function(userId, doc) {
	
});

PurchaseReceiptItem.after.insert(function(userId, doc) {
	
});

PurchaseReceiptItem.after.update(function(userId, doc, fieldNames, modifier, options) {
	
});

PurchaseReceiptItem.after.remove(function(userId, doc) {
	
});
