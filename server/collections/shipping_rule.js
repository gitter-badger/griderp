ShippingRule.allow({
	insert: function (userId, doc) {
		return ShippingRule.userCanInsert(userId, doc);
	},

	update: function (userId, doc, fields, modifier) {
		return ShippingRule.userCanUpdate(userId, doc);
	},

	remove: function (userId, doc) {
		return ShippingRule.userCanRemove(userId, doc);
	}
});

ShippingRule.before.insert(function(userId, doc) {
	doc.createdAt = new Date();
	doc.createdBy = userId;
	doc.modifiedAt = doc.createdAt;
	doc.modifiedBy = doc.createdBy;

	
	if(!doc.ownerId) doc.ownerId = userId;
});

ShippingRule.before.update(function(userId, doc, fieldNames, modifier, options) {
	modifier.$set = modifier.$set || {};
	modifier.$set.modifiedAt = new Date();
	modifier.$set.modifiedBy = userId;

	
});

ShippingRule.before.remove(function(userId, doc) {
	
});

ShippingRule.after.insert(function(userId, doc) {
	
});

ShippingRule.after.update(function(userId, doc, fieldNames, modifier, options) {
	
});

ShippingRule.after.remove(function(userId, doc) {
	
});
