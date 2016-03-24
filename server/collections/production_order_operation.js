ProductionOrderOperation.allow({
	insert: function (userId, doc) {
		return ProductionOrderOperation.userCanInsert(userId, doc);
	},

	update: function (userId, doc, fields, modifier) {
		return ProductionOrderOperation.userCanUpdate(userId, doc);
	},

	remove: function (userId, doc) {
		return ProductionOrderOperation.userCanRemove(userId, doc);
	}
});

ProductionOrderOperation.before.insert(function(userId, doc) {
	doc.createdAt = new Date();
	doc.createdBy = userId;
	doc.modifiedAt = doc.createdAt;
	doc.modifiedBy = doc.createdBy;

	
	if(!doc.ownerId) doc.ownerId = userId;
});

ProductionOrderOperation.before.update(function(userId, doc, fieldNames, modifier, options) {
	modifier.$set = modifier.$set || {};
	modifier.$set.modifiedAt = new Date();
	modifier.$set.modifiedBy = userId;

	
});

ProductionOrderOperation.before.remove(function(userId, doc) {
	
});

ProductionOrderOperation.after.insert(function(userId, doc) {
	
});

ProductionOrderOperation.after.update(function(userId, doc, fieldNames, modifier, options) {
	
});

ProductionOrderOperation.after.remove(function(userId, doc) {
	
});
