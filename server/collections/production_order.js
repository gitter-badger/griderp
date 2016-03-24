ProductionOrder.allow({
	insert: function (userId, doc) {
		return ProductionOrder.userCanInsert(userId, doc);
	},

	update: function (userId, doc, fields, modifier) {
		return ProductionOrder.userCanUpdate(userId, doc);
	},

	remove: function (userId, doc) {
		return ProductionOrder.userCanRemove(userId, doc);
	}
});

ProductionOrder.before.insert(function(userId, doc) {
	doc.createdAt = new Date();
	doc.createdBy = userId;
	doc.modifiedAt = doc.createdAt;
	doc.modifiedBy = doc.createdBy;

	
	if(!doc.ownerId) doc.ownerId = userId;
});

ProductionOrder.before.update(function(userId, doc, fieldNames, modifier, options) {
	modifier.$set = modifier.$set || {};
	modifier.$set.modifiedAt = new Date();
	modifier.$set.modifiedBy = userId;

	
});

ProductionOrder.before.remove(function(userId, doc) {
	
});

ProductionOrder.after.insert(function(userId, doc) {
	
});

ProductionOrder.after.update(function(userId, doc, fieldNames, modifier, options) {
	
});

ProductionOrder.after.remove(function(userId, doc) {
	
});
