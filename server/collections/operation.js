Operation.allow({
	insert: function (userId, doc) {
		return Operation.userCanInsert(userId, doc);
	},

	update: function (userId, doc, fields, modifier) {
		return Operation.userCanUpdate(userId, doc);
	},

	remove: function (userId, doc) {
		return Operation.userCanRemove(userId, doc);
	}
});

Operation.before.insert(function(userId, doc) {
	doc.createdAt = new Date();
	doc.createdBy = userId;
	doc.modifiedAt = doc.createdAt;
	doc.modifiedBy = doc.createdBy;

	
	if(!doc.ownerId) doc.ownerId = userId;
});

Operation.before.update(function(userId, doc, fieldNames, modifier, options) {
	modifier.$set = modifier.$set || {};
	modifier.$set.modifiedAt = new Date();
	modifier.$set.modifiedBy = userId;

	
});

Operation.before.remove(function(userId, doc) {
	
});

Operation.after.insert(function(userId, doc) {
	
});

Operation.after.update(function(userId, doc, fieldNames, modifier, options) {
	
});

Operation.after.remove(function(userId, doc) {
	
});
