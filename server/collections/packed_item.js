PackedItem.allow({
	insert: function (userId, doc) {
		return PackedItem.userCanInsert(userId, doc);
	},

	update: function (userId, doc, fields, modifier) {
		return PackedItem.userCanUpdate(userId, doc);
	},

	remove: function (userId, doc) {
		return PackedItem.userCanRemove(userId, doc);
	}
});

PackedItem.before.insert(function(userId, doc) {
	doc.createdAt = new Date();
	doc.createdBy = userId;
	doc.modifiedAt = doc.createdAt;
	doc.modifiedBy = doc.createdBy;

	
	if(!doc.ownerId) doc.ownerId = userId;
});

PackedItem.before.update(function(userId, doc, fieldNames, modifier, options) {
	modifier.$set = modifier.$set || {};
	modifier.$set.modifiedAt = new Date();
	modifier.$set.modifiedBy = userId;

	
});

PackedItem.before.remove(function(userId, doc) {
	
});

PackedItem.after.insert(function(userId, doc) {
	
});

PackedItem.after.update(function(userId, doc, fieldNames, modifier, options) {
	
});

PackedItem.after.remove(function(userId, doc) {
	
});
