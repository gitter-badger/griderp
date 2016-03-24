PurchaseTaxesAndCharges.allow({
	insert: function (userId, doc) {
		return PurchaseTaxesAndCharges.userCanInsert(userId, doc);
	},

	update: function (userId, doc, fields, modifier) {
		return PurchaseTaxesAndCharges.userCanUpdate(userId, doc);
	},

	remove: function (userId, doc) {
		return PurchaseTaxesAndCharges.userCanRemove(userId, doc);
	}
});

PurchaseTaxesAndCharges.before.insert(function(userId, doc) {
	doc.createdAt = new Date();
	doc.createdBy = userId;
	doc.modifiedAt = doc.createdAt;
	doc.modifiedBy = doc.createdBy;

	
	if(!doc.ownerId) doc.ownerId = userId;
});

PurchaseTaxesAndCharges.before.update(function(userId, doc, fieldNames, modifier, options) {
	modifier.$set = modifier.$set || {};
	modifier.$set.modifiedAt = new Date();
	modifier.$set.modifiedBy = userId;

	
});

PurchaseTaxesAndCharges.before.remove(function(userId, doc) {
	
});

PurchaseTaxesAndCharges.after.insert(function(userId, doc) {
	
});

PurchaseTaxesAndCharges.after.update(function(userId, doc, fieldNames, modifier, options) {
	
});

PurchaseTaxesAndCharges.after.remove(function(userId, doc) {
	
});
