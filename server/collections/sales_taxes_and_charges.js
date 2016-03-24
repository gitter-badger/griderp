SalesTaxesAndCharges.allow({
	insert: function (userId, doc) {
		return SalesTaxesAndCharges.userCanInsert(userId, doc);
	},

	update: function (userId, doc, fields, modifier) {
		return SalesTaxesAndCharges.userCanUpdate(userId, doc);
	},

	remove: function (userId, doc) {
		return SalesTaxesAndCharges.userCanRemove(userId, doc);
	}
});

SalesTaxesAndCharges.before.insert(function(userId, doc) {
	doc.createdAt = new Date();
	doc.createdBy = userId;
	doc.modifiedAt = doc.createdAt;
	doc.modifiedBy = doc.createdBy;

	
	if(!doc.ownerId) doc.ownerId = userId;
});

SalesTaxesAndCharges.before.update(function(userId, doc, fieldNames, modifier, options) {
	modifier.$set = modifier.$set || {};
	modifier.$set.modifiedAt = new Date();
	modifier.$set.modifiedBy = userId;

	
});

SalesTaxesAndCharges.before.remove(function(userId, doc) {
	
});

SalesTaxesAndCharges.after.insert(function(userId, doc) {
	
});

SalesTaxesAndCharges.after.update(function(userId, doc, fieldNames, modifier, options) {
	
});

SalesTaxesAndCharges.after.remove(function(userId, doc) {
	
});
