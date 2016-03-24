Docfield.allow({
	insert: function (userId, doc) {
		return Docfield.userCanInsert(userId, doc);
	},

	update: function (userId, doc, fields, modifier) {
		return Docfield.userCanUpdate(userId, doc);
	},

	remove: function (userId, doc) {
		return Docfield.userCanRemove(userId, doc);
	}
});

Docfield.before.insert(function(userId, doc) {
	doc.createdAt = new Date();
	doc.createdBy = userId;
	doc.modifiedAt = doc.createdAt;
	doc.modifiedBy = doc.createdBy;

	
	if(!doc. ownerId) doc. ownerId = userId;
});

Docfield.before.update(function(userId, doc, fieldNames, modifier, options) {
	modifier.$set = modifier.$set || {};
	modifier.$set.modifiedAt = new Date();
	modifier.$set.modifiedBy = userId;

	
});

Docfield.before.remove(function(userId, doc) {
	
});

Docfield.after.insert(function(userId, doc) {
	
});

Docfield.after.update(function(userId, doc, fieldNames, modifier, options) {
	
});

Docfield.after.remove(function(userId, doc) {
	
});
