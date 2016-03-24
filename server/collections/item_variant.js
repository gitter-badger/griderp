ItemVariant.allow({
	insert: function (userId, doc) {
		return ItemVariant.userCanInsert(userId, doc);
	},

	update: function (userId, doc, fields, modifier) {
		return ItemVariant.userCanUpdate(userId, doc);
	},

	remove: function (userId, doc) {
		return ItemVariant.userCanRemove(userId, doc);
	}
});

ItemVariant.before.insert(function(userId, doc) {
	doc.createdAt = new Date();
	doc.createdBy = userId;
	doc.modifiedAt = doc.createdAt;
	doc.modifiedBy = doc.createdBy;

	
	if(!doc.ownerId) doc.ownerId = userId;
});

ItemVariant.before.update(function(userId, doc, fieldNames, modifier, options) {
	modifier.$set = modifier.$set || {};
	modifier.$set.modifiedAt = new Date();
	modifier.$set.modifiedBy = userId;

	
});

ItemVariant.before.remove(function(userId, doc) {
	
});

ItemVariant.after.insert(function(userId, doc) {
	
});

ItemVariant.after.update(function(userId, doc, fieldNames, modifier, options) {
	
});

ItemVariant.after.remove(function(userId, doc) {
	
});
