PurchaseOrderItemSupplied.allow({
	insert: function (userId, doc) {
		return PurchaseOrderItemSupplied.userCanInsert(userId, doc);
	},

	update: function (userId, doc, fields, modifier) {
		return PurchaseOrderItemSupplied.userCanUpdate(userId, doc);
	},

	remove: function (userId, doc) {
		return PurchaseOrderItemSupplied.userCanRemove(userId, doc);
	}
});

PurchaseOrderItemSupplied.before.insert(function(userId, doc) {
	doc.createdAt = new Date();
	doc.createdBy = userId;
	doc.modifiedAt = doc.createdAt;
	doc.modifiedBy = doc.createdBy;

	
	if(!doc.ownerId) doc.ownerId = userId;
});

PurchaseOrderItemSupplied.before.update(function(userId, doc, fieldNames, modifier, options) {
	modifier.$set = modifier.$set || {};
	modifier.$set.modifiedAt = new Date();
	modifier.$set.modifiedBy = userId;

	
});

PurchaseOrderItemSupplied.before.remove(function(userId, doc) {
	
});

PurchaseOrderItemSupplied.after.insert(function(userId, doc) {
	
});

PurchaseOrderItemSupplied.after.update(function(userId, doc, fieldNames, modifier, options) {
	
});

PurchaseOrderItemSupplied.after.remove(function(userId, doc) {
	
});
