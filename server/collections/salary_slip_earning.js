SalarySlipEarning.allow({
	insert: function (userId, doc) {
		return SalarySlipEarning.userCanInsert(userId, doc);
	},

	update: function (userId, doc, fields, modifier) {
		return SalarySlipEarning.userCanUpdate(userId, doc);
	},

	remove: function (userId, doc) {
		return SalarySlipEarning.userCanRemove(userId, doc);
	}
});

SalarySlipEarning.before.insert(function(userId, doc) {
	doc.createdAt = new Date();
	doc.createdBy = userId;
	doc.modifiedAt = doc.createdAt;
	doc.modifiedBy = doc.createdBy;

	
	if(!doc.ownerId) doc.ownerId = userId;
});

SalarySlipEarning.before.update(function(userId, doc, fieldNames, modifier, options) {
	modifier.$set = modifier.$set || {};
	modifier.$set.modifiedAt = new Date();
	modifier.$set.modifiedBy = userId;

	
});

SalarySlipEarning.before.remove(function(userId, doc) {
	
});

SalarySlipEarning.after.insert(function(userId, doc) {
	
});

SalarySlipEarning.after.update(function(userId, doc, fieldNames, modifier, options) {
	
});

SalarySlipEarning.after.remove(function(userId, doc) {
	
});
