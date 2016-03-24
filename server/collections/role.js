Role.allow({
	insert: function (userId, doc) {
		return Role.userCanInsert(userId, doc);
	},

	update: function (userId, doc, fields, modifier) {
		return Role.userCanUpdate(userId, doc);
	},

	remove: function (userId, doc) {
		return Role.userCanRemove(userId, doc);
	}
});

Role.before.insert(function(userId, doc) {
	doc.createdAt = new Date();
	doc.createdBy = userId;
	doc.modifiedAt = doc.createdAt;
	doc.modifiedBy = doc.createdBy;

	
	if(!doc.ownerId) doc.ownerId = userId;
});

Role.before.update(function(userId, doc, fieldNames, modifier, options) {
	modifier.$set = modifier.$set || {};
	modifier.$set.modifiedAt = new Date();
	modifier.$set.modifiedBy = userId;

	
});

Role.before.remove(function(userId, doc) {
	
});

Role.after.insert(function(userId, doc) {
	
});

Role.after.update(function(userId, doc, fieldNames, modifier, options) {
	
});

Role.after.remove(function(userId, doc) {
	
});
