SalaryStructure.allow({
	insert: function (userId, doc) {
		return SalaryStructure.userCanInsert(userId, doc);
	},

	update: function (userId, doc, fields, modifier) {
		return SalaryStructure.userCanUpdate(userId, doc);
	},

	remove: function (userId, doc) {
		return SalaryStructure.userCanRemove(userId, doc);
	}
});

SalaryStructure.before.insert(function(userId, doc) {
	doc.createdAt = new Date();
	doc.createdBy = userId;
	doc.modifiedAt = doc.createdAt;
	doc.modifiedBy = doc.createdBy;

	
	if(!doc.ownerId) doc.ownerId = userId;
});

SalaryStructure.before.update(function(userId, doc, fieldNames, modifier, options) {
	modifier.$set = modifier.$set || {};
	modifier.$set.modifiedAt = new Date();
	modifier.$set.modifiedBy = userId;

	
});

SalaryStructure.before.remove(function(userId, doc) {
	
});

SalaryStructure.after.insert(function(userId, doc) {
	
});

SalaryStructure.after.update(function(userId, doc, fieldNames, modifier, options) {
	
});

SalaryStructure.after.remove(function(userId, doc) {
	
});
