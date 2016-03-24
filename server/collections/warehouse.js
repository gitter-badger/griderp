Warehouse.allow({
	insert: function (userId, doc) {
		return Warehouse.userCanInsert(userId, doc);
	},

	update: function (userId, doc, fields, modifier) {
		return Warehouse.userCanUpdate(userId, doc);
	},

	remove: function (userId, doc) {
		return Warehouse.userCanRemove(userId, doc);
	}
});

Warehouse.before.insert(function(userId, doc) {
	doc.createdAt = new Date();
	doc.createdBy = userId;
	doc.modifiedAt = doc.createdAt;
	doc.modifiedBy = doc.createdBy;

	
	if(!doc.ownerId) doc.ownerId = userId;
});

Warehouse.before.update(function(userId, doc, fieldNames, modifier, options) {
	modifier.$set = modifier.$set || {};
	modifier.$set.modifiedAt = new Date();
	modifier.$set.modifiedBy = userId;

	
});

Warehouse.before.remove(function(userId, doc) {
	
});

Warehouse.after.insert(function(userId, doc) {
	
});

Warehouse.after.update(function(userId, doc, fieldNames, modifier, options) {
	
});

Warehouse.after.remove(function(userId, doc) {
	
});
