PageRole.allow({
	insert: function (userId, doc) {
		return PageRole.userCanInsert(userId, doc);
	},

	update: function (userId, doc, fields, modifier) {
		return PageRole.userCanUpdate(userId, doc);
	},

	remove: function (userId, doc) {
		return PageRole.userCanRemove(userId, doc);
	}
});

PageRole.before.insert(function(userId, doc) {
	doc.createdAt = new Date();
	doc.createdBy = userId;
	doc.modifiedAt = doc.createdAt;
	doc.modifiedBy = doc.createdBy;

	
	if(!doc.ownerId) doc.ownerId = userId;
});

PageRole.before.update(function(userId, doc, fieldNames, modifier, options) {
	modifier.$set = modifier.$set || {};
	modifier.$set.modifiedAt = new Date();
	modifier.$set.modifiedBy = userId;

	
});

PageRole.before.remove(function(userId, doc) {
	
});

PageRole.after.insert(function(userId, doc) {
	
});

PageRole.after.update(function(userId, doc, fieldNames, modifier, options) {
	
});

PageRole.after.remove(function(userId, doc) {
	
});
