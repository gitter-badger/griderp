StandardReply.allow({
	insert: function (userId, doc) {
		return StandardReply.userCanInsert(userId, doc);
	},

	update: function (userId, doc, fields, modifier) {
		return StandardReply.userCanUpdate(userId, doc);
	},

	remove: function (userId, doc) {
		return StandardReply.userCanRemove(userId, doc);
	}
});

StandardReply.before.insert(function(userId, doc) {
	doc.createdAt = new Date();
	doc.createdBy = userId;
	doc.modifiedAt = doc.createdAt;
	doc.modifiedBy = doc.createdBy;

	
	if(!doc.ownerId) doc.ownerId = userId;
});

StandardReply.before.update(function(userId, doc, fieldNames, modifier, options) {
	modifier.$set = modifier.$set || {};
	modifier.$set.modifiedAt = new Date();
	modifier.$set.modifiedBy = userId;

	
});

StandardReply.before.remove(function(userId, doc) {
	
});

StandardReply.after.insert(function(userId, doc) {
	
});

StandardReply.after.update(function(userId, doc, fieldNames, modifier, options) {
	
});

StandardReply.after.remove(function(userId, doc) {
	
});
