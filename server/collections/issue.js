Issue.allow({
	insert: function (userId, doc) {
		return Issue.userCanInsert(userId, doc);
	},

	update: function (userId, doc, fields, modifier) {
		return Issue.userCanUpdate(userId, doc);
	},

	remove: function (userId, doc) {
		return Issue.userCanRemove(userId, doc);
	}
});

Issue.before.insert(function(userId, doc) {
	doc.createdAt = new Date();
	doc.createdBy = userId;
	doc.modifiedAt = doc.createdAt;
	doc.modifiedBy = doc.createdBy;

	
	if(!doc.ownerId) doc.ownerId = userId;
});

Issue.before.update(function(userId, doc, fieldNames, modifier, options) {
	modifier.$set = modifier.$set || {};
	modifier.$set.modifiedAt = new Date();
	modifier.$set.modifiedBy = userId;

	
});

Issue.before.remove(function(userId, doc) {
	
});

Issue.after.insert(function(userId, doc) {
	
});

Issue.after.update(function(userId, doc, fieldNames, modifier, options) {
	
});

Issue.after.remove(function(userId, doc) {
	
});
