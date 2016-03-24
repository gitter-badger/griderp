SalaryStructureDeduction.allow({
	insert: function (userId, doc) {
		return SalaryStructureDeduction.userCanInsert(userId, doc);
	},

	update: function (userId, doc, fields, modifier) {
		return SalaryStructureDeduction.userCanUpdate(userId, doc);
	},

	remove: function (userId, doc) {
		return SalaryStructureDeduction.userCanRemove(userId, doc);
	}
});

SalaryStructureDeduction.before.insert(function(userId, doc) {
	doc.createdAt = new Date();
	doc.createdBy = userId;
	doc.modifiedAt = doc.createdAt;
	doc.modifiedBy = doc.createdBy;

	
	if(!doc.ownerId) doc.ownerId = userId;
});

SalaryStructureDeduction.before.update(function(userId, doc, fieldNames, modifier, options) {
	modifier.$set = modifier.$set || {};
	modifier.$set.modifiedAt = new Date();
	modifier.$set.modifiedBy = userId;

	
});

SalaryStructureDeduction.before.remove(function(userId, doc) {
	
});

SalaryStructureDeduction.after.insert(function(userId, doc) {
	
});

SalaryStructureDeduction.after.update(function(userId, doc, fieldNames, modifier, options) {
	
});

SalaryStructureDeduction.after.remove(function(userId, doc) {
	
});
