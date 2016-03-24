MonthlyDistribution.allow({
	insert: function (userId, doc) {
		return MonthlyDistribution.userCanInsert(userId, doc);
	},

	update: function (userId, doc, fields, modifier) {
		return MonthlyDistribution.userCanUpdate(userId, doc);
	},

	remove: function (userId, doc) {
		return MonthlyDistribution.userCanRemove(userId, doc);
	}
});

MonthlyDistribution.before.insert(function(userId, doc) {
	doc.createdAt = new Date();
	doc.createdBy = userId;
	doc.modifiedAt = doc.createdAt;
	doc.modifiedBy = doc.createdBy;

	
	if(!doc.ownerId) doc.ownerId = userId;
});

MonthlyDistribution.before.update(function(userId, doc, fieldNames, modifier, options) {
	modifier.$set = modifier.$set || {};
	modifier.$set.modifiedAt = new Date();
	modifier.$set.modifiedBy = userId;

	
});

MonthlyDistribution.before.remove(function(userId, doc) {
	
});

MonthlyDistribution.after.insert(function(userId, doc) {
	
});

MonthlyDistribution.after.update(function(userId, doc, fieldNames, modifier, options) {
	
});

MonthlyDistribution.after.remove(function(userId, doc) {
	
});
