ProductBundleItem.allow({
	insert: function (userId, doc) {
		return ProductBundleItem.userCanInsert(userId, doc);
	},

	update: function (userId, doc, fields, modifier) {
		return ProductBundleItem.userCanUpdate(userId, doc);
	},

	remove: function (userId, doc) {
		return ProductBundleItem.userCanRemove(userId, doc);
	}
});

ProductBundleItem.before.insert(function(userId, doc) {
	doc.createdAt = new Date();
	doc.createdBy = userId;
	doc.modifiedAt = doc.createdAt;
	doc.modifiedBy = doc.createdBy;

	
	if(!doc.ownerId) doc.ownerId = userId;
});

ProductBundleItem.before.update(function(userId, doc, fieldNames, modifier, options) {
	modifier.$set = modifier.$set || {};
	modifier.$set.modifiedAt = new Date();
	modifier.$set.modifiedBy = userId;

	
});

ProductBundleItem.before.remove(function(userId, doc) {
	
});

ProductBundleItem.after.insert(function(userId, doc) {
	
});

ProductBundleItem.after.update(function(userId, doc, fieldNames, modifier, options) {
	
});

ProductBundleItem.after.remove(function(userId, doc) {
	
});
