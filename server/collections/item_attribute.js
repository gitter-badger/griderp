ItemAttribute.allow({
	insert: function (userId, doc) {
		return ItemAttribute.userCanInsert(userId, doc);
	},

	update: function (userId, doc, fields, modifier) {
		return ItemAttribute.userCanUpdate(userId, doc);
	},

	remove: function (userId, doc) {
		return ItemAttribute.userCanRemove(userId, doc);
	}
});

ItemAttribute.before.insert(function(userId, doc) {
	doc.createdAt = new Date();
	doc.createdBy = userId;
	doc.modifiedAt = doc.createdAt;
	doc.modifiedBy = doc.createdBy;

	
	if(!doc.ownerId) doc.ownerId = userId;
});

ItemAttribute.before.update(function(userId, doc, fieldNames, modifier, options) {
	modifier.$set = modifier.$set || {};
	modifier.$set.modifiedAt = new Date();
	modifier.$set.modifiedBy = userId;

	
});

ItemAttribute.before.remove(function(userId, doc) {
	
});

ItemAttribute.after.insert(function(userId, doc) {
	
});

ItemAttribute.after.update(function(userId, doc, fieldNames, modifier, options) {
	
});

ItemAttribute.after.remove(function(userId, doc) {
	
});
