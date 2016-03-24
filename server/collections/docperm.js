Docperm.allow({
	insert: function (userId, doc) {
		return Docperm.userCanInsert(userId, doc);
	},

	update: function (userId, doc, fields, modifier) {
		return Docperm.userCanUpdate(userId, doc);
	},

	remove: function (userId, doc) {
		return Docperm.userCanRemove(userId, doc);
	}
});

Docperm.before.insert(function(userId, doc) {
	doc.createdAt = new Date();
	doc.createdBy = userId;
	doc.modifiedAt = doc.createdAt;
	doc.modifiedBy = doc.createdBy;

	
	if(!doc.ownerId) doc.ownerId = userId;
});

Docperm.before.update(function(userId, doc, fieldNames, modifier, options) {
	modifier.$set = modifier.$set || {};
	modifier.$set.modifiedAt = new Date();
	modifier.$set.modifiedBy = userId;

	
});

Docperm.before.remove(function(userId, doc) {
	
});

Docperm.after.insert(function(userId, doc) {
	
});

Docperm.after.update(function(userId, doc, fieldNames, modifier, options) {
	
});

Docperm.after.remove(function(userId, doc) {
	
});
