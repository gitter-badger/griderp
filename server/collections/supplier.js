Supplier.allow({
	insert: function (userId, doc) {
		return Supplier.userCanInsert(userId, doc);
	},

	update: function (userId, doc, fields, modifier) {
		return Supplier.userCanUpdate(userId, doc);
	},

	remove: function (userId, doc) {
		return Supplier.userCanRemove(userId, doc);
	}
});

Supplier.before.insert(function(userId, doc) {
	doc.createdAt = new Date();
	doc.createdBy = userId;
	doc.modifiedAt = doc.createdAt;
	doc.modifiedBy = doc.createdBy;

	
	if(!doc.ownerId) doc.ownerId = userId;
});

Supplier.before.update(function(userId, doc, fieldNames, modifier, options) {
	modifier.$set = modifier.$set || {};
	modifier.$set.modifiedAt = new Date();
	modifier.$set.modifiedBy = userId;

	
});

Supplier.before.remove(function(userId, doc) {
	
});

Supplier.after.insert(function(userId, doc) {
	
});

Supplier.after.update(function(userId, doc, fieldNames, modifier, options) {
	
});

Supplier.after.remove(function(userId, doc) {
	
});
