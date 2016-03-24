IndustryType.allow({
	insert: function (userId, doc) {
		return IndustryType.userCanInsert(userId, doc);
	},

	update: function (userId, doc, fields, modifier) {
		return IndustryType.userCanUpdate(userId, doc);
	},

	remove: function (userId, doc) {
		return IndustryType.userCanRemove(userId, doc);
	}
});

IndustryType.before.insert(function(userId, doc) {
	doc.createdAt = new Date();
	doc.createdBy = userId;
	doc.modifiedAt = doc.createdAt;
	doc.modifiedBy = doc.createdBy;

	
	if(!doc.ownerId) doc.ownerId = userId;
});

IndustryType.before.update(function(userId, doc, fieldNames, modifier, options) {
	modifier.$set = modifier.$set || {};
	modifier.$set.modifiedAt = new Date();
	modifier.$set.modifiedBy = userId;

	
});

IndustryType.before.remove(function(userId, doc) {
	
});

IndustryType.after.insert(function(userId, doc) {
	
});

IndustryType.after.update(function(userId, doc, fieldNames, modifier, options) {
	
});

IndustryType.after.remove(function(userId, doc) {
	
});
