Newsletter.allow({
	insert: function (userId, doc) {
		return Newsletter.userCanInsert(userId, doc);
	},

	update: function (userId, doc, fields, modifier) {
		return Newsletter.userCanUpdate(userId, doc);
	},

	remove: function (userId, doc) {
		return Newsletter.userCanRemove(userId, doc);
	}
});

Newsletter.before.insert(function(userId, doc) {
	doc.createdAt = new Date();
	doc.createdBy = userId;
	doc.modifiedAt = doc.createdAt;
	doc.modifiedBy = doc.createdBy;

	
	if(!doc.ownerId) doc.ownerId = userId;
});

Newsletter.before.update(function(userId, doc, fieldNames, modifier, options) {
	modifier.$set = modifier.$set || {};
	modifier.$set.modifiedAt = new Date();
	modifier.$set.modifiedBy = userId;

	
});

Newsletter.before.remove(function(userId, doc) {
	
});

Newsletter.after.insert(function(userId, doc) {
	
});

Newsletter.after.update(function(userId, doc, fieldNames, modifier, options) {
	
});

Newsletter.after.remove(function(userId, doc) {
	
});
