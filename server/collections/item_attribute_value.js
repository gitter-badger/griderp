ItemAttributeValue.allow({
	insert: function (userId, doc) {
		return ItemAttributeValue.userCanInsert(userId, doc);
	},

	update: function (userId, doc, fields, modifier) {
		return ItemAttributeValue.userCanUpdate(userId, doc);
	},

	remove: function (userId, doc) {
		return ItemAttributeValue.userCanRemove(userId, doc);
	}
});

ItemAttributeValue.before.insert(function(userId, doc) {
	doc.createdAt = new Date();
	doc.createdBy = userId;
	doc.modifiedAt = doc.createdAt;
	doc.modifiedBy = doc.createdBy;

	
	if(!doc.ownerId) doc.ownerId = userId;
});

ItemAttributeValue.before.update(function(userId, doc, fieldNames, modifier, options) {
	modifier.$set = modifier.$set || {};
	modifier.$set.modifiedAt = new Date();
	modifier.$set.modifiedBy = userId;

	
});

ItemAttributeValue.before.remove(function(userId, doc) {
	
});

ItemAttributeValue.after.insert(function(userId, doc) {
	
});

ItemAttributeValue.after.update(function(userId, doc, fieldNames, modifier, options) {
	
});

ItemAttributeValue.after.remove(function(userId, doc) {
	
});
