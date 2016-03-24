Company.allow({
	insert: function (userId, doc) {
		return Company.userCanInsert(userId, doc);
	},

	update: function (userId, doc, fields, modifier) {
		return Company.userCanUpdate(userId, doc);
	},

	remove: function (userId, doc) {
		return Company.userCanRemove(userId, doc);
	}
});

Company.before.insert(function(userId, doc) {
	doc.createdAt = new Date();
	doc.createdBy = userId;
	doc.modifiedAt = doc.createdAt;
	doc.modifiedBy = doc.createdBy;

	
	if(!doc.ownerId) doc.ownerId = userId;
});

Company.before.update(function(userId, doc, fieldNames, modifier, options) {
	modifier.$set = modifier.$set || {};
	modifier.$set.modifiedAt = new Date();
	modifier.$set.modifiedBy = userId;

	
});

Company.before.remove(function(userId, doc) {
	
});

Company.after.insert(function(userId, doc) {
	
});

Company.after.update(function(userId, doc, fieldNames, modifier, options) {
	
});

Company.after.remove(function(userId, doc) {
	
});
