PurchaseReceiptItemSupplied.allow({
	insert: function (userId, doc) {
		return PurchaseReceiptItemSupplied.userCanInsert(userId, doc);
	},

	update: function (userId, doc, fields, modifier) {
		return PurchaseReceiptItemSupplied.userCanUpdate(userId, doc);
	},

	remove: function (userId, doc) {
		return PurchaseReceiptItemSupplied.userCanRemove(userId, doc);
	}
});

PurchaseReceiptItemSupplied.before.insert(function(userId, doc) {
	doc.createdAt = new Date();
	doc.createdBy = userId;
	doc.modifiedAt = doc.createdAt;
	doc.modifiedBy = doc.createdBy;

	
	if(!doc.ownerId) doc.ownerId = userId;
});

PurchaseReceiptItemSupplied.before.update(function(userId, doc, fieldNames, modifier, options) {
	modifier.$set = modifier.$set || {};
	modifier.$set.modifiedAt = new Date();
	modifier.$set.modifiedBy = userId;

	
});

PurchaseReceiptItemSupplied.before.remove(function(userId, doc) {
	
});

PurchaseReceiptItemSupplied.after.insert(function(userId, doc) {
	
});

PurchaseReceiptItemSupplied.after.update(function(userId, doc, fieldNames, modifier, options) {
	
});

PurchaseReceiptItemSupplied.after.remove(function(userId, doc) {
	
});
