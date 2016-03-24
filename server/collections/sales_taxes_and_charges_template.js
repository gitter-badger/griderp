SalesTaxesAndChargesTemplate.allow({
	insert: function (userId, doc) {
		return SalesTaxesAndChargesTemplate.userCanInsert(userId, doc);
	},

	update: function (userId, doc, fields, modifier) {
		return SalesTaxesAndChargesTemplate.userCanUpdate(userId, doc);
	},

	remove: function (userId, doc) {
		return SalesTaxesAndChargesTemplate.userCanRemove(userId, doc);
	}
});

SalesTaxesAndChargesTemplate.before.insert(function(userId, doc) {
	doc.createdAt = new Date();
	doc.createdBy = userId;
	doc.modifiedAt = doc.createdAt;
	doc.modifiedBy = doc.createdBy;

	
	if(!doc.ownerId) doc.ownerId = userId;
});

SalesTaxesAndChargesTemplate.before.update(function(userId, doc, fieldNames, modifier, options) {
	modifier.$set = modifier.$set || {};
	modifier.$set.modifiedAt = new Date();
	modifier.$set.modifiedBy = userId;

	
});

SalesTaxesAndChargesTemplate.before.remove(function(userId, doc) {
	
});

SalesTaxesAndChargesTemplate.after.insert(function(userId, doc) {
	
});

SalesTaxesAndChargesTemplate.after.update(function(userId, doc, fieldNames, modifier, options) {
	
});

SalesTaxesAndChargesTemplate.after.remove(function(userId, doc) {
	
});
