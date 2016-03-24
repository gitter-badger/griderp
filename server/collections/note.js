Note.allow({
	insert: function (userId, doc) {
		return Note.userCanInsert(userId, doc);
	},

	update: function (userId, doc, fields, modifier) {
		return Note.userCanUpdate(userId, doc);
	},

	remove: function (userId, doc) {
		return Note.userCanRemove(userId, doc);
	}
});

Note.before.insert(function(userId, doc) {
	doc.createdAt = new Date();
	doc.createdBy = userId;
	doc.modifiedAt = doc.createdAt;
	doc.modifiedBy = doc.createdBy;

	
	if(!doc.ownerId) doc.ownerId = userId;
});

Note.before.update(function(userId, doc, fieldNames, modifier, options) {
	modifier.$set = modifier.$set || {};
	modifier.$set.modifiedAt = new Date();
	modifier.$set.modifiedBy = userId;

	
});

Note.before.remove(function(userId, doc) {
	
});

Note.after.insert(function(userId, doc) {
	
});

Note.after.update(function(userId, doc, fieldNames, modifier, options) {
	
});

Note.after.remove(function(userId, doc) {
	
});
