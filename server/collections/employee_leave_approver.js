EmployeeLeaveApprover.allow({
	insert: function (userId, doc) {
		return EmployeeLeaveApprover.userCanInsert(userId, doc);
	},

	update: function (userId, doc, fields, modifier) {
		return EmployeeLeaveApprover.userCanUpdate(userId, doc);
	},

	remove: function (userId, doc) {
		return EmployeeLeaveApprover.userCanRemove(userId, doc);
	}
});

EmployeeLeaveApprover.before.insert(function(userId, doc) {
	doc.createdAt = new Date();
	doc.createdBy = userId;
	doc.modifiedAt = doc.createdAt;
	doc.modifiedBy = doc.createdBy;

	
	if(!doc.ownerId) doc.ownerId = userId;
});

EmployeeLeaveApprover.before.update(function(userId, doc, fieldNames, modifier, options) {
	modifier.$set = modifier.$set || {};
	modifier.$set.modifiedAt = new Date();
	modifier.$set.modifiedBy = userId;

	
});

EmployeeLeaveApprover.before.remove(function(userId, doc) {
	
});

EmployeeLeaveApprover.after.insert(function(userId, doc) {
	
});

EmployeeLeaveApprover.after.update(function(userId, doc, fieldNames, modifier, options) {
	
});

EmployeeLeaveApprover.after.remove(function(userId, doc) {
	
});
