PurchaseOrder.allow({
	insert: function (userId, doc) {
		return PurchaseOrder.userCanInsert(userId, doc);
	},

	update: function (userId, doc, fields, modifier) {
		return PurchaseOrder.userCanUpdate(userId, doc);
	},

	remove: function (userId, doc) {
		return PurchaseOrder.userCanRemove(userId, doc);
	}
});

PurchaseOrder.before.insert(function(userId, doc) {
	doc.createdAt = new Date();
	doc.createdBy = userId;
	doc.modifiedAt = doc.createdAt;
	doc.modifiedBy = doc.createdBy;

	
	if(!doc.ownerId) doc.ownerId = userId;
});

PurchaseOrder.before.update(function(userId, doc, fieldNames, modifier, options) {
	modifier.$set = modifier.$set || {};
	modifier.$set.modifiedAt = new Date();
	modifier.$set.modifiedBy = userId;

	
});

PurchaseOrder.before.remove(function(userId, doc) {
	
});

PurchaseOrder.after.insert(function(userId, doc) {
	
});

PurchaseOrder.after.update(function(userId, doc, fieldNames, modifier, options) {
	
});

PurchaseOrder.after.remove(function(userId, doc) {
	
});
