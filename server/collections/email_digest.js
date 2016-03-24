EmailDigest.allow({
	insert: function (userId, doc) {
		return EmailDigest.userCanInsert(userId, doc);
	},

	update: function (userId, doc, fields, modifier) {
		return EmailDigest.userCanUpdate(userId, doc);
	},

	remove: function (userId, doc) {
		return EmailDigest.userCanRemove(userId, doc);
	}
});

EmailDigest.before.insert(function(userId, doc) {
	doc.createdAt = new Date();
	doc.createdBy = userId;
	doc.modifiedAt = doc.createdAt;
	doc.modifiedBy = doc.createdBy;

	
	if(!doc.ownerId) doc.ownerId = userId;
});

EmailDigest.before.update(function(userId, doc, fieldNames, modifier, options) {
	modifier.$set = modifier.$set || {};
	modifier.$set.modifiedAt = new Date();
	modifier.$set.modifiedBy = userId;

	
});

EmailDigest.before.remove(function(userId, doc) {
	
});

EmailDigest.after.insert(function(userId, doc) {
	
});

EmailDigest.after.update(function(userId, doc, fieldNames, modifier, options) {
	
});

EmailDigest.after.remove(function(userId, doc) {
	
});
