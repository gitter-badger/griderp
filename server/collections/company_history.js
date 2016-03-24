CompanyHistory.allow({
	insert: function (userId, doc) {
		return CompanyHistory.userCanInsert(userId, doc);
	},

	update: function (userId, doc, fields, modifier) {
		return CompanyHistory.userCanUpdate(userId, doc);
	},

	remove: function (userId, doc) {
		return CompanyHistory.userCanRemove(userId, doc);
	}
});

CompanyHistory.before.insert(function(userId, doc) {
	doc.createdAt = new Date();
	doc.createdBy = userId;
	doc.modifiedAt = doc.createdAt;
	doc.modifiedBy = doc.createdBy;

	
	if(!doc.ownerId) doc.ownerId = userId;
});

CompanyHistory.before.update(function(userId, doc, fieldNames, modifier, options) {
	modifier.$set = modifier.$set || {};
	modifier.$set.modifiedAt = new Date();
	modifier.$set.modifiedBy = userId;

	
});

CompanyHistory.before.remove(function(userId, doc) {
	
});

CompanyHistory.after.insert(function(userId, doc) {
	
});

CompanyHistory.after.update(function(userId, doc, fieldNames, modifier, options) {
	
});

CompanyHistory.after.remove(function(userId, doc) {
	
});
