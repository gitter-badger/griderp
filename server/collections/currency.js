Currency.allow({
	insert: function (userId, doc) {
		return Currency.userCanInsert(userId, doc);
	},

	update: function (userId, doc, fields, modifier) {
		return Currency.userCanUpdate(userId, doc);
	},

	remove: function (userId, doc) {
		return Currency.userCanRemove(userId, doc);
	}
});

Currency.before.insert(function(userId, doc) {
	doc.createdAt = new Date();
	doc.createdBy = userId;
	doc.modifiedAt = doc.createdAt;
	doc.modifiedBy = doc.createdBy;

	
	if(!doc.ownerId) doc.ownerId = userId;
});

Currency.before.update(function(userId, doc, fieldNames, modifier, options) {
	modifier.$set = modifier.$set || {};
	modifier.$set.modifiedAt = new Date();
	modifier.$set.modifiedBy = userId;

	
});

Currency.before.remove(function(userId, doc) {
	
});

Currency.after.insert(function(userId, doc) {
	
});

Currency.after.update(function(userId, doc, fieldNames, modifier, options) {
	
});

Currency.after.remove(function(userId, doc) {
	
});
