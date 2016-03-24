User.allow({
	insert: function (userId, doc) {
		return User.userCanInsert(userId, doc);
	},

	update: function (userId, doc, fields, modifier) {
		return User.userCanUpdate(userId, doc);
	},

	remove: function (userId, doc) {
		return User.userCanRemove(userId, doc);
	}
});

User.before.insert(function(userId, doc) {
	doc.createdAt = new Date();
	doc.createdBy = userId;
	doc.modifiedAt = doc.createdAt;
	doc.modifiedBy = doc.createdBy;

	
	if(!doc.ownerId) doc.ownerId = userId;
});

User.before.update(function(userId, doc, fieldNames, modifier, options) {
	modifier.$set = modifier.$set || {};
	modifier.$set.modifiedAt = new Date();
	modifier.$set.modifiedBy = userId;

	
});

User.before.remove(function(userId, doc) {
	
});

User.after.insert(function(userId, doc) {
	
});

User.after.update(function(userId, doc, fieldNames, modifier, options) {
	
});

User.after.remove(function(userId, doc) {
	
});
