EarningType.allow({
	insert: function (userId, doc) {
		return EarningType.userCanInsert(userId, doc);
	},

	update: function (userId, doc, fields, modifier) {
		return EarningType.userCanUpdate(userId, doc);
	},

	remove: function (userId, doc) {
		return EarningType.userCanRemove(userId, doc);
	}
});

EarningType.before.insert(function(userId, doc) {
	doc.createdAt = new Date();
	doc.createdBy = userId;
	doc.modifiedAt = doc.createdAt;
	doc.modifiedBy = doc.createdBy;

	
	if(!doc.ownerId) doc.ownerId = userId;
});

EarningType.before.update(function(userId, doc, fieldNames, modifier, options) {
	modifier.$set = modifier.$set || {};
	modifier.$set.modifiedAt = new Date();
	modifier.$set.modifiedBy = userId;

	
});

EarningType.before.remove(function(userId, doc) {
	
});

EarningType.after.insert(function(userId, doc) {
	
});

EarningType.after.update(function(userId, doc, fieldNames, modifier, options) {
	
});

EarningType.after.remove(function(userId, doc) {
	
});
