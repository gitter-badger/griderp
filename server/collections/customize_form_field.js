CustomizeFormField.allow({
	insert: function (userId, doc) {
		return CustomizeFormField.userCanInsert(userId, doc);
	},

	update: function (userId, doc, fields, modifier) {
		return CustomizeFormField.userCanUpdate(userId, doc);
	},

	remove: function (userId, doc) {
		return CustomizeFormField.userCanRemove(userId, doc);
	}
});

CustomizeFormField.before.insert(function(userId, doc) {
	doc.createdAt = new Date();
	doc.createdBy = userId;
	doc.modifiedAt = doc.createdAt;
	doc.modifiedBy = doc.createdBy;

	
	if(!doc.ownerId) doc.ownerId = userId;
});

CustomizeFormField.before.update(function(userId, doc, fieldNames, modifier, options) {
	modifier.$set = modifier.$set || {};
	modifier.$set.modifiedAt = new Date();
	modifier.$set.modifiedBy = userId;

	
});

CustomizeFormField.before.remove(function(userId, doc) {
	
});

CustomizeFormField.after.insert(function(userId, doc) {
	
});

CustomizeFormField.after.update(function(userId, doc, fieldNames, modifier, options) {
	
});

CustomizeFormField.after.remove(function(userId, doc) {
	
});
