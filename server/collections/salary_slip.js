SalarySlip.allow({
	insert: function (userId, doc) {
		return SalarySlip.userCanInsert(userId, doc);
	},

	update: function (userId, doc, fields, modifier) {
		return SalarySlip.userCanUpdate(userId, doc);
	},

	remove: function (userId, doc) {
		return SalarySlip.userCanRemove(userId, doc);
	}
});

SalarySlip.before.insert(function(userId, doc) {
	doc.createdAt = new Date();
	doc.createdBy = userId;
	doc.modifiedAt = doc.createdAt;
	doc.modifiedBy = doc.createdBy;

	
	if(!doc.ownerId) doc.ownerId = userId;
});

SalarySlip.before.update(function(userId, doc, fieldNames, modifier, options) {
	modifier.$set = modifier.$set || {};
	modifier.$set.modifiedAt = new Date();
	modifier.$set.modifiedBy = userId;

	
});

SalarySlip.before.remove(function(userId, doc) {
	
});

SalarySlip.after.insert(function(userId, doc) {
	
});

SalarySlip.after.update(function(userId, doc, fieldNames, modifier, options) {
	
});

SalarySlip.after.remove(function(userId, doc) {
	
});
