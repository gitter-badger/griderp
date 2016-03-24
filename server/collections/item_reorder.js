ItemReorder.allow({
	insert: function (userId, doc) {
		return ItemReorder.userCanInsert(userId, doc);
	},

	update: function (userId, doc, fields, modifier) {
		return ItemReorder.userCanUpdate(userId, doc);
	},

	remove: function (userId, doc) {
		return ItemReorder.userCanRemove(userId, doc);
	}
});

ItemReorder.before.insert(function(userId, doc) {
	doc.createdAt = new Date();
	doc.createdBy = userId;
	doc.modifiedAt = doc.createdAt;
	doc.modifiedBy = doc.createdBy;

	
	if(!doc.ownerId) doc.ownerId = userId;
});

ItemReorder.before.update(function(userId, doc, fieldNames, modifier, options) {
	modifier.$set = modifier.$set || {};
	modifier.$set.modifiedAt = new Date();
	modifier.$set.modifiedBy = userId;

	
});

ItemReorder.before.remove(function(userId, doc) {
	
});

ItemReorder.after.insert(function(userId, doc) {
	
});

ItemReorder.after.update(function(userId, doc, fieldNames, modifier, options) {
	
});

ItemReorder.after.remove(function(userId, doc) {
	
});
