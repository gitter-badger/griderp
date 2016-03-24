BlogCategory.allow({
	insert: function (userId, doc) {
		return BlogCategory.userCanInsert(userId, doc);
	},

	update: function (userId, doc, fields, modifier) {
		return BlogCategory.userCanUpdate(userId, doc);
	},

	remove: function (userId, doc) {
		return BlogCategory.userCanRemove(userId, doc);
	}
});

BlogCategory.before.insert(function(userId, doc) {
	doc.createdAt = new Date();
	doc.createdBy = userId;
	doc.modifiedAt = doc.createdAt;
	doc.modifiedBy = doc.createdBy;

	
	if(!doc.ownerId) doc.ownerId = userId;
});

BlogCategory.before.update(function(userId, doc, fieldNames, modifier, options) {
	modifier.$set = modifier.$set || {};
	modifier.$set.modifiedAt = new Date();
	modifier.$set.modifiedBy = userId;

	
});

BlogCategory.before.remove(function(userId, doc) {
	
});

BlogCategory.after.insert(function(userId, doc) {
	
});

BlogCategory.after.update(function(userId, doc, fieldNames, modifier, options) {
	
});

BlogCategory.after.remove(function(userId, doc) {
	
});
