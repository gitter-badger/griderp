ProductionPlanSalesOrder.allow({
	insert: function (userId, doc) {
		return ProductionPlanSalesOrder.userCanInsert(userId, doc);
	},

	update: function (userId, doc, fields, modifier) {
		return ProductionPlanSalesOrder.userCanUpdate(userId, doc);
	},

	remove: function (userId, doc) {
		return ProductionPlanSalesOrder.userCanRemove(userId, doc);
	}
});

ProductionPlanSalesOrder.before.insert(function(userId, doc) {
	doc.createdAt = new Date();
	doc.createdBy = userId;
	doc.modifiedAt = doc.createdAt;
	doc.modifiedBy = doc.createdBy;

	
	if(!doc.ownerId) doc.ownerId = userId;
});

ProductionPlanSalesOrder.before.update(function(userId, doc, fieldNames, modifier, options) {
	modifier.$set = modifier.$set || {};
	modifier.$set.modifiedAt = new Date();
	modifier.$set.modifiedBy = userId;

	
});

ProductionPlanSalesOrder.before.remove(function(userId, doc) {
	
});

ProductionPlanSalesOrder.after.insert(function(userId, doc) {
	
});

ProductionPlanSalesOrder.after.update(function(userId, doc, fieldNames, modifier, options) {
	
});

ProductionPlanSalesOrder.after.remove(function(userId, doc) {
	
});
