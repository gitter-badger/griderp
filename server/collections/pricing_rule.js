PricingRule.allow({
	insert: function (userId, doc) {
		return PricingRule.userCanInsert(userId, doc);
	},

	update: function (userId, doc, fields, modifier) {
		return PricingRule.userCanUpdate(userId, doc);
	},

	remove: function (userId, doc) {
		return PricingRule.userCanRemove(userId, doc);
	}
});

PricingRule.before.insert(function(userId, doc) {
	doc.createdAt = new Date();
	doc.createdBy = userId;
	doc.modifiedAt = doc.createdAt;
	doc.modifiedBy = doc.createdBy;

	
	if(!doc.ownerId) doc.ownerId = userId;
});

PricingRule.before.update(function(userId, doc, fieldNames, modifier, options) {
	modifier.$set = modifier.$set || {};
	modifier.$set.modifiedAt = new Date();
	modifier.$set.modifiedBy = userId;

	
});

PricingRule.before.remove(function(userId, doc) {
	
});

PricingRule.after.insert(function(userId, doc) {
	
});

PricingRule.after.update(function(userId, doc, fieldNames, modifier, options) {
	
});

PricingRule.after.remove(function(userId, doc) {
	
});
