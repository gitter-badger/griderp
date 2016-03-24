Versions.allow({
	insert: function (userId, doc) {
		return Versions.userCanInsert(userId, doc);
	},

	update: function (userId, doc, fields, modifier) {
		return Versions.userCanUpdate(userId, doc);
	},

	remove: function (userId, doc) {
		return Versions.userCanRemove(userId, doc);
	}
});

Versions.before.insert(function(userId, doc) {
	doc.createdAt = new Date();
	doc.createdBy = userId;
	doc.modifiedAt = doc.createdAt;
	doc.modifiedBy = doc.createdBy;

	
	if(!doc.ownerId) doc.ownerId = userId;
});

Versions.before.update(function(userId, doc, fieldNames, modifier, options) {
	modifier.$set = modifier.$set || {};
	modifier.$set.modifiedAt = new Date();
	modifier.$set.modifiedBy = userId;

	
});

Versions.before.remove(function(userId, doc) {
	
});

Versions.after.insert(function(userId, doc) {
	
});

Versions.after.update(function(userId, doc, fieldNames, modifier, options) {
	
});

Versions.after.remove(function(userId, doc) {
	
});
