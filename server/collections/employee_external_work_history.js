EmployeeExternalWorkHistory.allow({
	insert: function (userId, doc) {
		return EmployeeExternalWorkHistory.userCanInsert(userId, doc);
	},

	update: function (userId, doc, fields, modifier) {
		return EmployeeExternalWorkHistory.userCanUpdate(userId, doc);
	},

	remove: function (userId, doc) {
		return EmployeeExternalWorkHistory.userCanRemove(userId, doc);
	}
});

EmployeeExternalWorkHistory.before.insert(function(userId, doc) {
	doc.createdAt = new Date();
	doc.createdBy = userId;
	doc.modifiedAt = doc.createdAt;
	doc.modifiedBy = doc.createdBy;

	
	if(!doc.ownerId) doc.ownerId = userId;
});

EmployeeExternalWorkHistory.before.update(function(userId, doc, fieldNames, modifier, options) {
	modifier.$set = modifier.$set || {};
	modifier.$set.modifiedAt = new Date();
	modifier.$set.modifiedBy = userId;

	
});

EmployeeExternalWorkHistory.before.remove(function(userId, doc) {
	
});

EmployeeExternalWorkHistory.after.insert(function(userId, doc) {
	
});

EmployeeExternalWorkHistory.after.update(function(userId, doc, fieldNames, modifier, options) {
	
});

EmployeeExternalWorkHistory.after.remove(function(userId, doc) {
	
});
