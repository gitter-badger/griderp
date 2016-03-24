ItemVariantAttribute.allow({
	insert: function (userId, doc) {
		return ItemVariantAttribute.userCanInsert(userId, doc);
	},

	update: function (userId, doc, fields, modifier) {
		return ItemVariantAttribute.userCanUpdate(userId, doc);
	},

	remove: function (userId, doc) {
		return ItemVariantAttribute.userCanRemove(userId, doc);
	}
});

ItemVariantAttribute.before.insert(function(userId, doc) {
	doc.createdAt = new Date();
	doc.createdBy = userId;
	doc.modifiedAt = doc.createdAt;
	doc.modifiedBy = doc.createdBy;

	
	if(!doc.ownerId) doc.ownerId = userId;
});

ItemVariantAttribute.before.update(function(userId, doc, fieldNames, modifier, options) {
	modifier.$set = modifier.$set || {};
	modifier.$set.modifiedAt = new Date();
	modifier.$set.modifiedBy = userId;

	
});

ItemVariantAttribute.before.remove(function(userId, doc) {
	
});

ItemVariantAttribute.after.insert(function(userId, doc) {
	
});

ItemVariantAttribute.after.update(function(userId, doc, fieldNames, modifier, options) {
	
});

ItemVariantAttribute.after.remove(function(userId, doc) {
	
});
