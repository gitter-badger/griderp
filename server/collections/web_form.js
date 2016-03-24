WebForm.allow({
	insert: function (userId, doc) {
		return WebForm.userCanInsert(userId, doc);
	},

	update: function (userId, doc, fields, modifier) {
		return WebForm.userCanUpdate(userId, doc);
	},

	remove: function (userId, doc) {
		return WebForm.userCanRemove(userId, doc);
	}
});

WebForm.before.insert(function(userId, doc) {
	doc.createdAt = new Date();
	doc.createdBy = userId;
	doc.modifiedAt = doc.createdAt;
	doc.modifiedBy = doc.createdBy;

	
	if(!doc.ownerId) doc.ownerId = userId;
});

WebForm.before.update(function(userId, doc, fieldNames, modifier, options) {
	modifier.$set = modifier.$set || {};
	modifier.$set.modifiedAt = new Date();
	modifier.$set.modifiedBy = userId;

	
});

WebForm.before.remove(function(userId, doc) {
	
});

WebForm.after.insert(function(userId, doc) {
	
});

WebForm.after.update(function(userId, doc, fieldNames, modifier, options) {
	
});

WebForm.after.remove(function(userId, doc) {
	
});
