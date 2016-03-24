EmployeeEducation.allow({
	insert: function (userId, doc) {
		return EmployeeEducation.userCanInsert(userId, doc);
	},

	update: function (userId, doc, fields, modifier) {
		return EmployeeEducation.userCanUpdate(userId, doc);
	},

	remove: function (userId, doc) {
		return EmployeeEducation.userCanRemove(userId, doc);
	}
});

EmployeeEducation.before.insert(function(userId, doc) {
	doc.createdAt = new Date();
	doc.createdBy = userId;
	doc.modifiedAt = doc.createdAt;
	doc.modifiedBy = doc.createdBy;

	
	if(!doc.ownerId) doc.ownerId = userId;
});

EmployeeEducation.before.update(function(userId, doc, fieldNames, modifier, options) {
	modifier.$set = modifier.$set || {};
	modifier.$set.modifiedAt = new Date();
	modifier.$set.modifiedBy = userId;

	
});

EmployeeEducation.before.remove(function(userId, doc) {
	
});

EmployeeEducation.after.insert(function(userId, doc) {
	
});

EmployeeEducation.after.update(function(userId, doc, fieldNames, modifier, options) {
	
});

EmployeeEducation.after.remove(function(userId, doc) {
	
});
