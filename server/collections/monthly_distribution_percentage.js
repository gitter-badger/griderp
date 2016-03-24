MonthlyDistributionPercentage.allow({
	insert: function (userId, doc) {
		return MonthlyDistributionPercentage.userCanInsert(userId, doc);
	},

	update: function (userId, doc, fields, modifier) {
		return MonthlyDistributionPercentage.userCanUpdate(userId, doc);
	},

	remove: function (userId, doc) {
		return MonthlyDistributionPercentage.userCanRemove(userId, doc);
	}
});

MonthlyDistributionPercentage.before.insert(function(userId, doc) {
	doc.createdAt = new Date();
	doc.createdBy = userId;
	doc.modifiedAt = doc.createdAt;
	doc.modifiedBy = doc.createdBy;

	
	if(!doc.ownerId) doc.ownerId = userId;
});

MonthlyDistributionPercentage.before.update(function(userId, doc, fieldNames, modifier, options) {
	modifier.$set = modifier.$set || {};
	modifier.$set.modifiedAt = new Date();
	modifier.$set.modifiedBy = userId;

	
});

MonthlyDistributionPercentage.before.remove(function(userId, doc) {
	
});

MonthlyDistributionPercentage.after.insert(function(userId, doc) {
	
});

MonthlyDistributionPercentage.after.update(function(userId, doc, fieldNames, modifier, options) {
	
});

MonthlyDistributionPercentage.after.remove(function(userId, doc) {
	
});
