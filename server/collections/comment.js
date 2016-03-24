Comment.allow({
	insert: function (userId, doc) {
		return Comment.userCanInsert(userId, doc);
	},

	update: function (userId, doc, fields, modifier) {
		return Comment.userCanUpdate(userId, doc);
	},

	remove: function (userId, doc) {
		return Comment.userCanRemove(userId, doc);
	}
});

Comment.before.insert(function(userId, doc) {
	doc.createdAt = new Date();
	doc.createdBy = userId;
	doc.modifiedAt = doc.createdAt;
	doc.modifiedBy = doc.createdBy;

	
	if(!doc.ownerId) doc.ownerId = userId;
});

Comment.before.update(function(userId, doc, fieldNames, modifier, options) {
	modifier.$set = modifier.$set || {};
	modifier.$set.modifiedAt = new Date();
	modifier.$set.modifiedBy = userId;

	
});

Comment.before.remove(function(userId, doc) {
	
});

Comment.after.insert(function(userId, doc) {
	
});

Comment.after.update(function(userId, doc, fieldNames, modifier, options) {
	
});

Comment.after.remove(function(userId, doc) {
	
});
