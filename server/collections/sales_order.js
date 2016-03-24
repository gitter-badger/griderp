SalesOrder.allow({
	insert: function (userId, doc) {
		return SalesOrder.userCanInsert(userId, doc);
	},

	update: function (userId, doc, fields, modifier) {
		return SalesOrder.userCanUpdate(userId, doc);
	},

	remove: function (userId, doc) {
		return SalesOrder.userCanRemove(userId, doc);
	}
});

SalesOrder.before.insert(function(userId, doc) {
	doc.createdAt = new Date();
	doc.createdBy = userId;
	doc.modifiedAt = doc.createdAt;
	doc.modifiedBy = doc.createdBy;

	
	if(!doc.ownerId) doc.ownerId = userId;
});

SalesOrder.before.update(function(userId, doc, fieldNames, modifier, options) {
	modifier.$set = modifier.$set || {};
	modifier.$set.modifiedAt = new Date();
	modifier.$set.modifiedBy = userId;

	
});

SalesOrder.before.remove(function(userId, doc) {
	
});

SalesOrder.after.insert(function(userId, doc) {
	
});

SalesOrder.after.update(function(userId, doc, fieldNames, modifier, options) {
	
});

SalesOrder.after.remove(function(userId, doc) {
	
});
