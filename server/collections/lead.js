Lead.allow({
	insert: function (userId, doc) {
		return Lead.userCanInsert(userId, doc);
	},

	update: function (userId, doc, fields, modifier) {
		return Lead.userCanUpdate(userId, doc);
	},

	remove: function (userId, doc) {
		return Lead.userCanRemove(userId, doc);
	}
});

Lead.before.insert(function(userId, doc) {
	doc.createdAt = new Date();
	doc.createdBy = userId;
	doc.modifiedAt = doc.createdAt;
	doc.modifiedBy = doc.createdBy;

	
	if(!doc.ownerId) doc.ownerId = userId;
});

Lead.before.update(function(userId, doc, fieldNames, modifier, options) {
	modifier.$set = modifier.$set || {};
	modifier.$set.modifiedAt = new Date();
	modifier.$set.modifiedBy = userId;

	
});

Lead.before.remove(function(userId, doc) {
	
});

Lead.after.insert(function(userId, doc) {
	
});

Lead.after.update(function(userId, doc, fieldNames, modifier, options) {
	
});

Lead.after.remove(function(userId, doc) {
	
});
