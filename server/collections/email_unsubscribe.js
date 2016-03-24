EmailUnsubscribe.allow({
	insert: function (userId, doc) {
		return EmailUnsubscribe.userCanInsert(userId, doc);
	},

	update: function (userId, doc, fields, modifier) {
		return EmailUnsubscribe.userCanUpdate(userId, doc);
	},

	remove: function (userId, doc) {
		return EmailUnsubscribe.userCanRemove(userId, doc);
	}
});

EmailUnsubscribe.before.insert(function(userId, doc) {
	doc.createdAt = new Date();
	doc.createdBy = userId;
	doc.modifiedAt = doc.createdAt;
	doc.modifiedBy = doc.createdBy;

	
	if(!doc.ownerId) doc.ownerId = userId;
});

EmailUnsubscribe.before.update(function(userId, doc, fieldNames, modifier, options) {
	modifier.$set = modifier.$set || {};
	modifier.$set.modifiedAt = new Date();
	modifier.$set.modifiedBy = userId;

	
});

EmailUnsubscribe.before.remove(function(userId, doc) {
	
});

EmailUnsubscribe.after.insert(function(userId, doc) {
	
});

EmailUnsubscribe.after.update(function(userId, doc, fieldNames, modifier, options) {
	
});

EmailUnsubscribe.after.remove(function(userId, doc) {
	
});
