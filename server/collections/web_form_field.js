WebFormField.allow({
	insert: function (userId, doc) {
		return WebFormField.userCanInsert(userId, doc);
	},

	update: function (userId, doc, fields, modifier) {
		return WebFormField.userCanUpdate(userId, doc);
	},

	remove: function (userId, doc) {
		return WebFormField.userCanRemove(userId, doc);
	}
});

WebFormField.before.insert(function(userId, doc) {
	doc.createdAt = new Date();
	doc.createdBy = userId;
	doc.modifiedAt = doc.createdAt;
	doc.modifiedBy = doc.createdBy;

	
	if(!doc.ownerId) doc.ownerId = userId;
});

WebFormField.before.update(function(userId, doc, fieldNames, modifier, options) {
	modifier.$set = modifier.$set || {};
	modifier.$set.modifiedAt = new Date();
	modifier.$set.modifiedBy = userId;

	
});

WebFormField.before.remove(function(userId, doc) {
	
});

WebFormField.after.insert(function(userId, doc) {
	
});

WebFormField.after.update(function(userId, doc, fieldNames, modifier, options) {
	
});

WebFormField.after.remove(function(userId, doc) {
	
});
