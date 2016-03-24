FiscalYear.allow({
	insert: function (userId, doc) {
		return FiscalYear.userCanInsert(userId, doc);
	},

	update: function (userId, doc, fields, modifier) {
		return FiscalYear.userCanUpdate(userId, doc);
	},

	remove: function (userId, doc) {
		return FiscalYear.userCanRemove(userId, doc);
	}
});

FiscalYear.before.insert(function(userId, doc) {
	doc.createdAt = new Date();
	doc.createdBy = userId;
	doc.modifiedAt = doc.createdAt;
	doc.modifiedBy = doc.createdBy;

	
	if(!doc.ownerId) doc.ownerId = userId;
});

FiscalYear.before.update(function(userId, doc, fieldNames, modifier, options) {
	modifier.$set = modifier.$set || {};
	modifier.$set.modifiedAt = new Date();
	modifier.$set.modifiedBy = userId;

	
});

FiscalYear.before.remove(function(userId, doc) {
	
});

FiscalYear.after.insert(function(userId, doc) {
	
});

FiscalYear.after.update(function(userId, doc, fieldNames, modifier, options) {
	
});

FiscalYear.after.remove(function(userId, doc) {
	
});
