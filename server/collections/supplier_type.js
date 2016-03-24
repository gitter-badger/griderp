SupplierType.allow({
	insert: function (userId, doc) {
		return SupplierType.userCanInsert(userId, doc);
	},

	update: function (userId, doc, fields, modifier) {
		return SupplierType.userCanUpdate(userId, doc);
	},

	remove: function (userId, doc) {
		return SupplierType.userCanRemove(userId, doc);
	}
});

SupplierType.before.insert(function(userId, doc) {
	doc.createdAt = new Date();
	doc.createdBy = userId;
	doc.modifiedAt = doc.createdAt;
	doc.modifiedBy = doc.createdBy;

	
	if(!doc.ownerId) doc.ownerId = userId;
});

SupplierType.before.update(function(userId, doc, fieldNames, modifier, options) {
	modifier.$set = modifier.$set || {};
	modifier.$set.modifiedAt = new Date();
	modifier.$set.modifiedBy = userId;

	
});

SupplierType.before.remove(function(userId, doc) {
	
});

SupplierType.after.insert(function(userId, doc) {
	
});

SupplierType.after.update(function(userId, doc, fieldNames, modifier, options) {
	
});

SupplierType.after.remove(function(userId, doc) {
	
});
