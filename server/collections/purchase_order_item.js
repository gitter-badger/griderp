PurchaseOrderItem.allow({
	insert: function (userId, doc) {
		return PurchaseOrderItem.userCanInsert(userId, doc);
	},

	update: function (userId, doc, fields, modifier) {
		return PurchaseOrderItem.userCanUpdate(userId, doc);
	},

	remove: function (userId, doc) {
		return PurchaseOrderItem.userCanRemove(userId, doc);
	}
});

PurchaseOrderItem.before.insert(function(userId, doc) {
	doc.createdAt = new Date();
	doc.createdBy = userId;
	doc.modifiedAt = doc.createdAt;
	doc.modifiedBy = doc.createdBy;

	
	if(!doc.ownerId) doc.ownerId = userId;
});

PurchaseOrderItem.before.update(function(userId, doc, fieldNames, modifier, options) {
	modifier.$set = modifier.$set || {};
	modifier.$set.modifiedAt = new Date();
	modifier.$set.modifiedBy = userId;

	
});

PurchaseOrderItem.before.remove(function(userId, doc) {
	
});

PurchaseOrderItem.after.insert(function(userId, doc) {
	
});

PurchaseOrderItem.after.update(function(userId, doc, fieldNames, modifier, options) {
	
});

PurchaseOrderItem.after.remove(function(userId, doc) {
	
});
