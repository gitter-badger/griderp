Doctype.allow({
	insert: function (userId, doc) {
		return Doctype.userCanInsert(userId, doc);
	},

	update: function (userId, doc, fields, modifier) {
		return Doctype.userCanUpdate(userId, doc);
	},

	remove: function (userId, doc) {
		return Doctype.userCanRemove(userId, doc);
	}
});

Doctype.before.insert(function(userId, doc) {
	doc.createdAt = new Date();
	doc.createdBy = userId;
	doc.modifiedAt = doc.createdAt;
	doc.modifiedBy = doc.createdBy;

	
	if(!doc.ownerId) doc.ownerId = userId;
});

Doctype.before.update(function(userId, doc, fieldNames, modifier, options) {
	modifier.$set = modifier.$set || {};
	modifier.$set.modifiedAt = new Date();
	modifier.$set.modifiedBy = userId;

	
});

Doctype.before.remove(function(userId, doc) {
	
});

Doctype.after.insert(function(userId, doc) {
	
});

Doctype.after.update(function(userId, doc, fieldNames, modifier, options) {
	
});

Doctype.after.remove(function(userId, doc) {
	
});
