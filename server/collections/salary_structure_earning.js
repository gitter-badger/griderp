SalaryStructureEarning.allow({
	insert: function (userId, doc) {
		return SalaryStructureEarning.userCanInsert(userId, doc);
	},

	update: function (userId, doc, fields, modifier) {
		return SalaryStructureEarning.userCanUpdate(userId, doc);
	},

	remove: function (userId, doc) {
		return SalaryStructureEarning.userCanRemove(userId, doc);
	}
});

SalaryStructureEarning.before.insert(function(userId, doc) {
	doc.createdAt = new Date();
	doc.createdBy = userId;
	doc.modifiedAt = doc.createdAt;
	doc.modifiedBy = doc.createdBy;

	
	if(!doc.ownerId) doc.ownerId = userId;
});

SalaryStructureEarning.before.update(function(userId, doc, fieldNames, modifier, options) {
	modifier.$set = modifier.$set || {};
	modifier.$set.modifiedAt = new Date();
	modifier.$set.modifiedBy = userId;

	
});

SalaryStructureEarning.before.remove(function(userId, doc) {
	
});

SalaryStructureEarning.after.insert(function(userId, doc) {
	
});

SalaryStructureEarning.after.update(function(userId, doc, fieldNames, modifier, options) {
	
});

SalaryStructureEarning.after.remove(function(userId, doc) {
	
});
