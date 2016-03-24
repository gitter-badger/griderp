PurchaseInvoiceAdvance.allow({
	insert: function (userId, doc) {
		return PurchaseInvoiceAdvance.userCanInsert(userId, doc);
	},

	update: function (userId, doc, fields, modifier) {
		return PurchaseInvoiceAdvance.userCanUpdate(userId, doc);
	},

	remove: function (userId, doc) {
		return PurchaseInvoiceAdvance.userCanRemove(userId, doc);
	}
});

PurchaseInvoiceAdvance.before.insert(function(userId, doc) {
	doc.createdAt = new Date();
	doc.createdBy = userId;
	doc.modifiedAt = doc.createdAt;
	doc.modifiedBy = doc.createdBy;

	
	if(!doc.ownerId) doc.ownerId = userId;
});

PurchaseInvoiceAdvance.before.update(function(userId, doc, fieldNames, modifier, options) {
	modifier.$set = modifier.$set || {};
	modifier.$set.modifiedAt = new Date();
	modifier.$set.modifiedBy = userId;

	
});

PurchaseInvoiceAdvance.before.remove(function(userId, doc) {
	
});

PurchaseInvoiceAdvance.after.insert(function(userId, doc) {
	
});

PurchaseInvoiceAdvance.after.update(function(userId, doc, fieldNames, modifier, options) {
	
});

PurchaseInvoiceAdvance.after.remove(function(userId, doc) {
	
});
