FiscalYearCompany.allow({
	insert: function (userId, doc) {
		return FiscalYearCompany.userCanInsert(userId, doc);
	},

	update: function (userId, doc, fields, modifier) {
		return FiscalYearCompany.userCanUpdate(userId, doc);
	},

	remove: function (userId, doc) {
		return FiscalYearCompany.userCanRemove(userId, doc);
	}
});

FiscalYearCompany.before.insert(function(userId, doc) {
	doc.createdAt = new Date();
	doc.createdBy = userId;
	doc.modifiedAt = doc.createdAt;
	doc.modifiedBy = doc.createdBy;

	
	if(!doc.ownerId) doc.ownerId = userId;
});

FiscalYearCompany.before.update(function(userId, doc, fieldNames, modifier, options) {
	modifier.$set = modifier.$set || {};
	modifier.$set.modifiedAt = new Date();
	modifier.$set.modifiedBy = userId;

	
});

FiscalYearCompany.before.remove(function(userId, doc) {
	
});

FiscalYearCompany.after.insert(function(userId, doc) {
	
});

FiscalYearCompany.after.update(function(userId, doc, fieldNames, modifier, options) {
	
});

FiscalYearCompany.after.remove(function(userId, doc) {
	
});
