SalesOrderItem.allow({
	insert: function (userId, doc) {
		return SalesOrderItem.userCanInsert(userId, doc);
	},

	update: function (userId, doc, fields, modifier) {
		return SalesOrderItem.userCanUpdate(userId, doc);
	},

	remove: function (userId, doc) {
		return SalesOrderItem.userCanRemove(userId, doc);
	}
});

SalesOrderItem.before.insert(function(userId, doc) {
	doc.createdAt = new Date();
	doc.createdBy = userId;
	doc.modifiedAt = doc.createdAt;
	doc.modifiedBy = doc.createdBy;

	
	if(!doc.ownerId) doc.ownerId = userId;
});

SalesOrderItem.before.update(function(userId, doc, fieldNames, modifier, options) {
	modifier.$set = modifier.$set || {};
	modifier.$set.modifiedAt = new Date();
	modifier.$set.modifiedBy = userId;

	
});

SalesOrderItem.before.remove(function(userId, doc) {
	
});

SalesOrderItem.after.insert(function(userId, doc) {
	
});

SalesOrderItem.after.update(function(userId, doc, fieldNames, modifier, options) {
	
});

SalesOrderItem.after.remove(function(userId, doc) {
	
});
