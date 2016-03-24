ShippingRuleCountry.allow({
	insert: function (userId, doc) {
		return ShippingRuleCountry.userCanInsert(userId, doc);
	},

	update: function (userId, doc, fields, modifier) {
		return ShippingRuleCountry.userCanUpdate(userId, doc);
	},

	remove: function (userId, doc) {
		return ShippingRuleCountry.userCanRemove(userId, doc);
	}
});

ShippingRuleCountry.before.insert(function(userId, doc) {
	doc.createdAt = new Date();
	doc.createdBy = userId;
	doc.modifiedAt = doc.createdAt;
	doc.modifiedBy = doc.createdBy;

	
	if(!doc.ownerId) doc.ownerId = userId;
});

ShippingRuleCountry.before.update(function(userId, doc, fieldNames, modifier, options) {
	modifier.$set = modifier.$set || {};
	modifier.$set.modifiedAt = new Date();
	modifier.$set.modifiedBy = userId;

	
});

ShippingRuleCountry.before.remove(function(userId, doc) {
	
});

ShippingRuleCountry.after.insert(function(userId, doc) {
	
});

ShippingRuleCountry.after.update(function(userId, doc, fieldNames, modifier, options) {
	
});

ShippingRuleCountry.after.remove(function(userId, doc) {
	
});
