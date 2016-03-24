ItemSupplier.allow({
	insert: function (userId, doc) {
		return ItemSupplier.userCanInsert(userId, doc);
	},

	update: function (userId, doc, fields, modifier) {
		return ItemSupplier.userCanUpdate(userId, doc);
	},

	remove: function (userId, doc) {
		return ItemSupplier.userCanRemove(userId, doc);
	}
});

ItemSupplier.before.insert(function(userId, doc) {
	doc.createdAt = new Date();
	doc.createdBy = userId;
	doc.modifiedAt = doc.createdAt;
	doc.modifiedBy = doc.createdBy;

	
	if(!doc.ownerId) doc.ownerId = userId;
});

ItemSupplier.before.update(function(userId, doc, fieldNames, modifier, options) {
	modifier.$set = modifier.$set || {};
	modifier.$set.modifiedAt = new Date();
	modifier.$set.modifiedBy = userId;

	
});

ItemSupplier.before.remove(function(userId, doc) {
	
});

ItemSupplier.after.insert(function(userId, doc) {
	
});

ItemSupplier.after.update(function(userId, doc, fieldNames, modifier, options) {
	
});

ItemSupplier.after.remove(function(userId, doc) {
	
});
