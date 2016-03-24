ProductBundle.allow({
	insert: function (userId, doc) {
		return ProductBundle.userCanInsert(userId, doc);
	},

	update: function (userId, doc, fields, modifier) {
		return ProductBundle.userCanUpdate(userId, doc);
	},

	remove: function (userId, doc) {
		return ProductBundle.userCanRemove(userId, doc);
	}
});

ProductBundle.before.insert(function(userId, doc) {
	doc.createdAt = new Date();
	doc.createdBy = userId;
	doc.modifiedAt = doc.createdAt;
	doc.modifiedBy = doc.createdBy;

	
	if(!doc.ownerId) doc.ownerId = userId;
});

ProductBundle.before.update(function(userId, doc, fieldNames, modifier, options) {
	modifier.$set = modifier.$set || {};
	modifier.$set.modifiedAt = new Date();
	modifier.$set.modifiedBy = userId;

	
});

ProductBundle.before.remove(function(userId, doc) {
	
});

ProductBundle.after.insert(function(userId, doc) {
	
});

ProductBundle.after.update(function(userId, doc, fieldNames, modifier, options) {
	
});

ProductBundle.after.remove(function(userId, doc) {
	
});
