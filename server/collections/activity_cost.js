ActivityCost.allow({
	insert: function (userId, doc) {
		return ActivityCost.userCanInsert(userId, doc);
	},

	update: function (userId, doc, fields, modifier) {
		return ActivityCost.userCanUpdate(userId, doc);
	},

	remove: function (userId, doc) {
		return ActivityCost.userCanRemove(userId, doc);
	}
});

ActivityCost.before.insert(function(userId, doc) {
	doc.createdAt = new Date();
	doc.createdBy = userId;
	doc.modifiedAt = doc.createdAt;
	doc.modifiedBy = doc.createdBy;

	
	if(!doc.ownerId) doc.ownerId = userId;
});

ActivityCost.before.update(function(userId, doc, fieldNames, modifier, options) {
	modifier.$set = modifier.$set || {};
	modifier.$set.modifiedAt = new Date();
	modifier.$set.modifiedBy = userId;

	
});

ActivityCost.before.remove(function(userId, doc) {
	
});

ActivityCost.after.insert(function(userId, doc) {
	
});

ActivityCost.after.update(function(userId, doc, fieldNames, modifier, options) {
	
});

ActivityCost.after.remove(function(userId, doc) {
	
});
