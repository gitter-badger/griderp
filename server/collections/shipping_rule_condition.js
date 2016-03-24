ShippingRuleCondition.allow({
	insert: function (userId, doc) {
		return ShippingRuleCondition.userCanInsert(userId, doc);
	},

	update: function (userId, doc, fields, modifier) {
		return ShippingRuleCondition.userCanUpdate(userId, doc);
	},

	remove: function (userId, doc) {
		return ShippingRuleCondition.userCanRemove(userId, doc);
	}
});

ShippingRuleCondition.before.insert(function(userId, doc) {
	doc.createdAt = new Date();
	doc.createdBy = userId;
	doc.modifiedAt = doc.createdAt;
	doc.modifiedBy = doc.createdBy;

	
	if(!doc.ownerId) doc.ownerId = userId;
});

ShippingRuleCondition.before.update(function(userId, doc, fieldNames, modifier, options) {
	modifier.$set = modifier.$set || {};
	modifier.$set.modifiedAt = new Date();
	modifier.$set.modifiedBy = userId;

	
});

ShippingRuleCondition.before.remove(function(userId, doc) {
	
});

ShippingRuleCondition.after.insert(function(userId, doc) {
	
});

ShippingRuleCondition.after.update(function(userId, doc, fieldNames, modifier, options) {
	
});

ShippingRuleCondition.after.remove(function(userId, doc) {
	
});
