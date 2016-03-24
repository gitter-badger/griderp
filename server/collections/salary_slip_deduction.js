SalarySlipDeduction.allow({
	insert: function (userId, doc) {
		return SalarySlipDeduction.userCanInsert(userId, doc);
	},

	update: function (userId, doc, fields, modifier) {
		return SalarySlipDeduction.userCanUpdate(userId, doc);
	},

	remove: function (userId, doc) {
		return SalarySlipDeduction.userCanRemove(userId, doc);
	}
});

SalarySlipDeduction.before.insert(function(userId, doc) {
	doc.createdAt = new Date();
	doc.createdBy = userId;
	doc.modifiedAt = doc.createdAt;
	doc.modifiedBy = doc.createdBy;

	
	if(!doc.ownerId) doc.ownerId = userId;
});

SalarySlipDeduction.before.update(function(userId, doc, fieldNames, modifier, options) {
	modifier.$set = modifier.$set || {};
	modifier.$set.modifiedAt = new Date();
	modifier.$set.modifiedBy = userId;

	
});

SalarySlipDeduction.before.remove(function(userId, doc) {
	
});

SalarySlipDeduction.after.insert(function(userId, doc) {
	
});

SalarySlipDeduction.after.update(function(userId, doc, fieldNames, modifier, options) {
	
});

SalarySlipDeduction.after.remove(function(userId, doc) {
	
});
