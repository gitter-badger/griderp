EmailAccount.allow({
	insert: function (userId, doc) {
		return EmailAccount.userCanInsert(userId, doc);
	},

	update: function (userId, doc, fields, modifier) {
		return EmailAccount.userCanUpdate(userId, doc);
	},

	remove: function (userId, doc) {
		return EmailAccount.userCanRemove(userId, doc);
	}
});

EmailAccount.before.insert(function(userId, doc) {
	doc.createdAt = new Date();
	doc.createdBy = userId;
	doc.modifiedAt = doc.createdAt;
	doc.modifiedBy = doc.createdBy;

	
	if(!doc.ownerId) doc.ownerId = userId;
});

EmailAccount.before.update(function(userId, doc, fieldNames, modifier, options) {
	modifier.$set = modifier.$set || {};
	modifier.$set.modifiedAt = new Date();
	modifier.$set.modifiedBy = userId;

	
});

EmailAccount.before.remove(function(userId, doc) {
	
});

EmailAccount.after.insert(function(userId, doc) {
	
});

EmailAccount.after.update(function(userId, doc, fieldNames, modifier, options) {
	
});

EmailAccount.after.remove(function(userId, doc) {
	
});
