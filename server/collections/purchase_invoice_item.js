PurchaseInvoiceItem.allow({
	insert: function (userId, doc) {
		return PurchaseInvoiceItem.userCanInsert(userId, doc);
	},

	update: function (userId, doc, fields, modifier) {
		return PurchaseInvoiceItem.userCanUpdate(userId, doc);
	},

	remove: function (userId, doc) {
		return PurchaseInvoiceItem.userCanRemove(userId, doc);
	}
});

PurchaseInvoiceItem.before.insert(function(userId, doc) {
	doc.createdAt = new Date();
	doc.createdBy = userId;
	doc.modifiedAt = doc.createdAt;
	doc.modifiedBy = doc.createdBy;

	
	if(!doc.ownerId) doc.ownerId = userId;
});

PurchaseInvoiceItem.before.update(function(userId, doc, fieldNames, modifier, options) {
	modifier.$set = modifier.$set || {};
	modifier.$set.modifiedAt = new Date();
	modifier.$set.modifiedBy = userId;

	
});

PurchaseInvoiceItem.before.remove(function(userId, doc) {
	
});

PurchaseInvoiceItem.after.insert(function(userId, doc) {
	
});

PurchaseInvoiceItem.after.update(function(userId, doc, fieldNames, modifier, options) {
	
});

PurchaseInvoiceItem.after.remove(function(userId, doc) {
	
});
