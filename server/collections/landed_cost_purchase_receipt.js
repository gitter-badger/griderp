LandedCostPurchaseReceipt.allow({
	insert: function (userId, doc) {
		return LandedCostPurchaseReceipt.userCanInsert(userId, doc);
	},

	update: function (userId, doc, fields, modifier) {
		return LandedCostPurchaseReceipt.userCanUpdate(userId, doc);
	},

	remove: function (userId, doc) {
		return LandedCostPurchaseReceipt.userCanRemove(userId, doc);
	}
});

LandedCostPurchaseReceipt.before.insert(function(userId, doc) {
	doc.createdAt = new Date();
	doc.createdBy = userId;
	doc.modifiedAt = doc.createdAt;
	doc.modifiedBy = doc.createdBy;

	
	if(!doc.ownerId) doc.ownerId = userId;
});

LandedCostPurchaseReceipt.before.update(function(userId, doc, fieldNames, modifier, options) {
	modifier.$set = modifier.$set || {};
	modifier.$set.modifiedAt = new Date();
	modifier.$set.modifiedBy = userId;

	
});

LandedCostPurchaseReceipt.before.remove(function(userId, doc) {
	
});

LandedCostPurchaseReceipt.after.insert(function(userId, doc) {
	
});

LandedCostPurchaseReceipt.after.update(function(userId, doc, fieldNames, modifier, options) {
	
});

LandedCostPurchaseReceipt.after.remove(function(userId, doc) {
	
});
