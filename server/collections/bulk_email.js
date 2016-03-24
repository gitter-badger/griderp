BulkEmail.allow({
	insert: function (userId, doc) {
		return BulkEmail.userCanInsert(userId, doc);
	},

	update: function (userId, doc, fields, modifier) {
		return BulkEmail.userCanUpdate(userId, doc);
	},

	remove: function (userId, doc) {
		return BulkEmail.userCanRemove(userId, doc);
	}
});

BulkEmail.before.insert(function(userId, doc) {
	doc.createdAt = new Date();
	doc.createdBy = userId;
	doc.modifiedAt = doc.createdAt;
	doc.modifiedBy = doc.createdBy;

	
	if(!doc.ownerId) doc.ownerId = userId;
});

BulkEmail.before.update(function(userId, doc, fieldNames, modifier, options) {
	modifier.$set = modifier.$set || {};
	modifier.$set.modifiedAt = new Date();
	modifier.$set.modifiedBy = userId;

	
});

BulkEmail.before.remove(function(userId, doc) {
	
});

BulkEmail.after.insert(function(userId, doc) {
	
});

BulkEmail.after.update(function(userId, doc, fieldNames, modifier, options) {
	
});

BulkEmail.after.remove(function(userId, doc) {
	
});
