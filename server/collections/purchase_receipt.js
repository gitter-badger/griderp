PurchaseReceipt.allow({
	insert: function (userId, doc) {
		return PurchaseReceipt.userCanInsert(userId, doc);
	},

	update: function (userId, doc, fields, modifier) {
		return PurchaseReceipt.userCanUpdate(userId, doc);
	},

	remove: function (userId, doc) {
		return PurchaseReceipt.userCanRemove(userId, doc);
	}
});

PurchaseReceipt.before.insert(function(userId, doc) {
	doc.createdAt = new Date();
	doc.createdBy = userId;
	doc.modifiedAt = doc.createdAt;
	doc.modifiedBy = doc.createdBy;

	
	if(!doc.ownerId) doc.ownerId = userId;
});

PurchaseReceipt.before.update(function(userId, doc, fieldNames, modifier, options) {
	modifier.$set = modifier.$set || {};
	modifier.$set.modifiedAt = new Date();
	modifier.$set.modifiedBy = userId;

	
});

PurchaseReceipt.before.remove(function(userId, doc) {
	
});

PurchaseReceipt.after.insert(function(userId, doc) {
	
});

PurchaseReceipt.after.update(function(userId, doc, fieldNames, modifier, options) {
	
});

PurchaseReceipt.after.remove(function(userId, doc) {
	
});
