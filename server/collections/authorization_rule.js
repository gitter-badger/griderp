AuthorizationRule.allow({
	insert: function (userId, doc) {
		return AuthorizationRule.userCanInsert(userId, doc);
	},

	update: function (userId, doc, fields, modifier) {
		return AuthorizationRule.userCanUpdate(userId, doc);
	},

	remove: function (userId, doc) {
		return AuthorizationRule.userCanRemove(userId, doc);
	}
});

AuthorizationRule.before.insert(function(userId, doc) {
	doc.createdAt = new Date();
	doc.createdBy = userId;
	doc.modifiedAt = doc.createdAt;
	doc.modifiedBy = doc.createdBy;

	
	if(!doc.ownerId) doc.ownerId = userId;
});

AuthorizationRule.before.update(function(userId, doc, fieldNames, modifier, options) {
	modifier.$set = modifier.$set || {};
	modifier.$set.modifiedAt = new Date();
	modifier.$set.modifiedBy = userId;

	
});

AuthorizationRule.before.remove(function(userId, doc) {
	
});

AuthorizationRule.after.insert(function(userId, doc) {
	
});

AuthorizationRule.after.update(function(userId, doc, fieldNames, modifier, options) {
	
});

AuthorizationRule.after.remove(function(userId, doc) {
	
});
