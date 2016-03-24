EmailAlertRecipient.allow({
	insert: function (userId, doc) {
		return EmailAlertRecipient.userCanInsert(userId, doc);
	},

	update: function (userId, doc, fields, modifier) {
		return EmailAlertRecipient.userCanUpdate(userId, doc);
	},

	remove: function (userId, doc) {
		return EmailAlertRecipient.userCanRemove(userId, doc);
	}
});

EmailAlertRecipient.before.insert(function(userId, doc) {
	doc.createdAt = new Date();
	doc.createdBy = userId;
	doc.modifiedAt = doc.createdAt;
	doc.modifiedBy = doc.createdBy;

	
	if(!doc.ownerId) doc.ownerId = userId;
});

EmailAlertRecipient.before.update(function(userId, doc, fieldNames, modifier, options) {
	modifier.$set = modifier.$set || {};
	modifier.$set.modifiedAt = new Date();
	modifier.$set.modifiedBy = userId;

	
});

EmailAlertRecipient.before.remove(function(userId, doc) {
	
});

EmailAlertRecipient.after.insert(function(userId, doc) {
	
});

EmailAlertRecipient.after.update(function(userId, doc, fieldNames, modifier, options) {
	
});

EmailAlertRecipient.after.remove(function(userId, doc) {
	
});
