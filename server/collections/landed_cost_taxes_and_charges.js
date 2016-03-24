LandedCostTaxesAndCharges.allow({
	insert: function (userId, doc) {
		return LandedCostTaxesAndCharges.userCanInsert(userId, doc);
	},

	update: function (userId, doc, fields, modifier) {
		return LandedCostTaxesAndCharges.userCanUpdate(userId, doc);
	},

	remove: function (userId, doc) {
		return LandedCostTaxesAndCharges.userCanRemove(userId, doc);
	}
});

LandedCostTaxesAndCharges.before.insert(function(userId, doc) {
	doc.createdAt = new Date();
	doc.createdBy = userId;
	doc.modifiedAt = doc.createdAt;
	doc.modifiedBy = doc.createdBy;

	
	if(!doc.ownerId) doc.ownerId = userId;
});

LandedCostTaxesAndCharges.before.update(function(userId, doc, fieldNames, modifier, options) {
	modifier.$set = modifier.$set || {};
	modifier.$set.modifiedAt = new Date();
	modifier.$set.modifiedBy = userId;

	
});

LandedCostTaxesAndCharges.before.remove(function(userId, doc) {
	
});

LandedCostTaxesAndCharges.after.insert(function(userId, doc) {
	
});

LandedCostTaxesAndCharges.after.update(function(userId, doc, fieldNames, modifier, options) {
	
});

LandedCostTaxesAndCharges.after.remove(function(userId, doc) {
	
});
