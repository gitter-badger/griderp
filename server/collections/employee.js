Employee.allow({
	insert: function (userId, doc) {
		return Employee.userCanInsert(userId, doc);
	},

	update: function (userId, doc, fields, modifier) {
		return Employee.userCanUpdate(userId, doc);
	},

	remove: function (userId, doc) {
		return Employee.userCanRemove(userId, doc);
	}
});

Employee.before.insert(function(userId, doc) {
	doc.createdAt = new Date();
	doc.createdBy = userId;
	doc.modifiedAt = doc.createdAt;
	doc.modifiedBy = doc.createdBy;

	
	if(!doc.ownerId) doc.ownerId = userId;
});

Employee.before.update(function(userId, doc, fieldNames, modifier, options) {
	modifier.$set = modifier.$set || {};
	modifier.$set.modifiedAt = new Date();
	modifier.$set.modifiedBy = userId;

	
});

Employee.before.remove(function(userId, doc) {
	
});

Employee.after.insert(function(userId, doc) {
	
});

Employee.after.update(function(userId, doc, fieldNames, modifier, options) {
	
});

Employee.after.remove(function(userId, doc) {
	
});
