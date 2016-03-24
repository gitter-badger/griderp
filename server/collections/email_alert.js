EmailAlert.allow({
	insert: function (userId, doc) {
		return EmailAlert.userCanInsert(userId, doc);
	},

	update: function (userId, doc, fields, modifier) {
		return EmailAlert.userCanUpdate(userId, doc);
	},

	remove: function (userId, doc) {
		return EmailAlert.userCanRemove(userId, doc);
	}
});

EmailAlert.before.insert(function(userId, doc) {
	doc.createdAt = new Date();
	doc.createdBy = userId;
	doc.modifiedAt = doc.createdAt;
	doc.modifiedBy = doc.createdBy;

	
	if(!doc.ownerId) doc.ownerId = userId;
});

EmailAlert.before.update(function(userId, doc, fieldNames, modifier, options) {
	modifier.$set = modifier.$set || {};
	modifier.$set.modifiedAt = new Date();
	modifier.$set.modifiedBy = userId;

	
});

EmailAlert.before.remove(function(userId, doc) {
	
});

EmailAlert.after.insert(function(userId, doc) {
	
});

EmailAlert.after.update(function(userId, doc, fieldNames, modifier, options) {
	
});

EmailAlert.after.remove(function(userId, doc) {
	
});
