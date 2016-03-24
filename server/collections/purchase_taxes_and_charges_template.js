PurchaseTaxesAndChargesTemplate.allow({
	insert: function (userId, doc) {
		return PurchaseTaxesAndChargesTemplate.userCanInsert(userId, doc);
	},

	update: function (userId, doc, fields, modifier) {
		return PurchaseTaxesAndChargesTemplate.userCanUpdate(userId, doc);
	},

	remove: function (userId, doc) {
		return PurchaseTaxesAndChargesTemplate.userCanRemove(userId, doc);
	}
});

PurchaseTaxesAndChargesTemplate.before.insert(function(userId, doc) {
	doc.createdAt = new Date();
	doc.createdBy = userId;
	doc.modifiedAt = doc.createdAt;
	doc.modifiedBy = doc.createdBy;

	
	if(!doc.ownerId) doc.ownerId = userId;
});

PurchaseTaxesAndChargesTemplate.before.update(function(userId, doc, fieldNames, modifier, options) {
	modifier.$set = modifier.$set || {};
	modifier.$set.modifiedAt = new Date();
	modifier.$set.modifiedBy = userId;

	
});

PurchaseTaxesAndChargesTemplate.before.remove(function(userId, doc) {
	
});

PurchaseTaxesAndChargesTemplate.after.insert(function(userId, doc) {
	
});

PurchaseTaxesAndChargesTemplate.after.update(function(userId, doc, fieldNames, modifier, options) {
	
});

PurchaseTaxesAndChargesTemplate.after.remove(function(userId, doc) {
	
});
