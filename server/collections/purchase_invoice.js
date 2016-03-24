PurchaseInvoice.allow({
	insert: function (userId, doc) {
		return PurchaseInvoice.userCanInsert(userId, doc);
	},

	update: function (userId, doc, fields, modifier) {
		return PurchaseInvoice.userCanUpdate(userId, doc);
	},

	remove: function (userId, doc) {
		return PurchaseInvoice.userCanRemove(userId, doc);
	}
});

PurchaseInvoice.before.insert(function(userId, doc) {
	doc.createdAt = new Date();
	doc.createdBy = userId;
	doc.modifiedAt = doc.createdAt;
	doc.modifiedBy = doc.createdBy;

	
	if(!doc.ownerId) doc.ownerId = userId;
});

PurchaseInvoice.before.update(function(userId, doc, fieldNames, modifier, options) {
	modifier.$set = modifier.$set || {};
	modifier.$set.modifiedAt = new Date();
	modifier.$set.modifiedBy = userId;

	
});

PurchaseInvoice.before.remove(function(userId, doc) {
	
});

PurchaseInvoice.after.insert(function(userId, doc) {
	
});

PurchaseInvoice.after.update(function(userId, doc, fieldNames, modifier, options) {
	
});

PurchaseInvoice.after.remove(function(userId, doc) {
	
});
