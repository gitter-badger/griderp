Department.allow({
	insert: function (userId, doc) {
		return Department.userCanInsert(userId, doc);
	},

	update: function (userId, doc, fields, modifier) {
		return Department.userCanUpdate(userId, doc);
	},

	remove: function (userId, doc) {
		return Department.userCanRemove(userId, doc);
	}
});

Department.before.insert(function(userId, doc) {
	doc.createdAt = new Date();
	doc.createdBy = userId;
	doc.modifiedAt = doc.createdAt;
	doc.modifiedBy = doc.createdBy;

	
	if(!doc.ownerId) doc.ownerId = userId;
});

Department.before.update(function(userId, doc, fieldNames, modifier, options) {
	modifier.$set = modifier.$set || {};
	modifier.$set.modifiedAt = new Date();
	modifier.$set.modifiedBy = userId;

	
});

Department.before.remove(function(userId, doc) {
	
});

Department.after.insert(function(userId, doc) {
	
});

Department.after.update(function(userId, doc, fieldNames, modifier, options) {
	
});

Department.after.remove(function(userId, doc) {
	
});
