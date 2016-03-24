CustomField.allow({
	insert: function (userId, doc) {
		return CustomField.userCanInsert(userId, doc);
	},

	update: function (userId, doc, fields, modifier) {
		return CustomField.userCanUpdate(userId, doc);
	},

	remove: function (userId, doc) {
		return CustomField.userCanRemove(userId, doc);
	}
});

CustomField.before.insert(function(userId, doc) {
	doc.createdAt = new Date();
	doc.createdBy = userId;
	doc.modifiedAt = doc.createdAt;
	doc.modifiedBy = doc.createdBy;

	
	if(!doc.ownerId) doc.ownerId = userId;
});

CustomField.before.update(function(userId, doc, fieldNames, modifier, options) {
	modifier.$set = modifier.$set || {};
	modifier.$set.modifiedAt = new Date();
	modifier.$set.modifiedBy = userId;

	
});

CustomField.before.remove(function(userId, doc) {
	
});

CustomField.after.insert(function(userId, doc) {
	
});

CustomField.after.update(function(userId, doc, fieldNames, modifier, options) {
	
});

CustomField.after.remove(function(userId, doc) {
	
});
