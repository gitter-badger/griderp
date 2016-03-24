Batch.allow({
	insert: function (userId, doc) {
		return Batch.userCanInsert(userId, doc);
	},

	update: function (userId, doc, fields, modifier) {
		return Batch.userCanUpdate(userId, doc);
	},

	remove: function (userId, doc) {
		return Batch.userCanRemove(userId, doc);
	}
});

Batch.before.insert(function(userId, doc) {
	doc.createdAt = new Date();
	doc.createdBy = userId;
	doc.modifiedAt = doc.createdAt;
	doc.modifiedBy = doc.createdBy;

	
	if(!doc.ownerId) doc.ownerId = userId;
});

Batch.before.update(function(userId, doc, fieldNames, modifier, options) {
	modifier.$set = modifier.$set || {};
	modifier.$set.modifiedAt = new Date();
	modifier.$set.modifiedBy = userId;

	
});

Batch.before.remove(function(userId, doc) {
	
});

Batch.after.insert(function(userId, doc) {
	
});

Batch.after.update(function(userId, doc, fieldNames, modifier, options) {
	
});

Batch.after.remove(function(userId, doc) {
	
});
