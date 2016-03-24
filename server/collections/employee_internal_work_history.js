EmployeeInternalWorkHistory.allow({
	insert: function (userId, doc) {
		return EmployeeInternalWorkHistory.userCanInsert(userId, doc);
	},

	update: function (userId, doc, fields, modifier) {
		return EmployeeInternalWorkHistory.userCanUpdate(userId, doc);
	},

	remove: function (userId, doc) {
		return EmployeeInternalWorkHistory.userCanRemove(userId, doc);
	}
});

EmployeeInternalWorkHistory.before.insert(function(userId, doc) {
	doc.createdAt = new Date();
	doc.createdBy = userId;
	doc.modifiedAt = doc.createdAt;
	doc.modifiedBy = doc.createdBy;

	
	if(!doc.ownerId) doc.ownerId = userId;
});

EmployeeInternalWorkHistory.before.update(function(userId, doc, fieldNames, modifier, options) {
	modifier.$set = modifier.$set || {};
	modifier.$set.modifiedAt = new Date();
	modifier.$set.modifiedBy = userId;

	
});

EmployeeInternalWorkHistory.before.remove(function(userId, doc) {
	
});

EmployeeInternalWorkHistory.after.insert(function(userId, doc) {
	
});

EmployeeInternalWorkHistory.after.update(function(userId, doc, fieldNames, modifier, options) {
	
});

EmployeeInternalWorkHistory.after.remove(function(userId, doc) {
	
});
