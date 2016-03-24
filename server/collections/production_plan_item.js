ProductionPlanItem.allow({
	insert: function (userId, doc) {
		return ProductionPlanItem.userCanInsert(userId, doc);
	},

	update: function (userId, doc, fields, modifier) {
		return ProductionPlanItem.userCanUpdate(userId, doc);
	},

	remove: function (userId, doc) {
		return ProductionPlanItem.userCanRemove(userId, doc);
	}
});

ProductionPlanItem.before.insert(function(userId, doc) {
	doc.createdAt = new Date();
	doc.createdBy = userId;
	doc.modifiedAt = doc.createdAt;
	doc.modifiedBy = doc.createdBy;

	
	if(!doc.ownerId) doc.ownerId = userId;
});

ProductionPlanItem.before.update(function(userId, doc, fieldNames, modifier, options) {
	modifier.$set = modifier.$set || {};
	modifier.$set.modifiedAt = new Date();
	modifier.$set.modifiedBy = userId;

	
});

ProductionPlanItem.before.remove(function(userId, doc) {
	
});

ProductionPlanItem.after.insert(function(userId, doc) {
	
});

ProductionPlanItem.after.update(function(userId, doc, fieldNames, modifier, options) {
	
});

ProductionPlanItem.after.remove(function(userId, doc) {
	
});
