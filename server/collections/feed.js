Feed.allow({
	insert: function (userId, doc) {
		return Feed.userCanInsert(userId, doc);
	},

	update: function (userId, doc, fields, modifier) {
		return Feed.userCanUpdate(userId, doc);
	},

	remove: function (userId, doc) {
		return Feed.userCanRemove(userId, doc);
	}
});

Feed.before.insert(function(userId, doc) {
	doc.createdAt = new Date();
	doc.createdBy = userId;
	doc.modifiedAt = doc.createdAt;
	doc.modifiedBy = doc.createdBy;

	
	if(!doc.ownerId) doc.ownerId = userId;
});

Feed.before.update(function(userId, doc, fieldNames, modifier, options) {
	modifier.$set = modifier.$set || {};
	modifier.$set.modifiedAt = new Date();
	modifier.$set.modifiedBy = userId;

	
});

Feed.before.remove(function(userId, doc) {
	
});

Feed.after.insert(function(userId, doc) {
	
});

Feed.after.update(function(userId, doc, fieldNames, modifier, options) {
	
});

Feed.after.remove(function(userId, doc) {
	
});
