ItemPrice.allow({
	insert: function (userId, doc) {
		return ItemPrice.userCanInsert(userId, doc);
	},

	update: function (userId, doc, fields, modifier) {
		return ItemPrice.userCanUpdate(userId, doc);
	},

	remove: function (userId, doc) {
		return ItemPrice.userCanRemove(userId, doc);
	}
});

ItemPrice.before.insert(function(userId, doc) {
	doc.createdAt = new Date();
	doc.createdBy = userId;
	doc.modifiedAt = doc.createdAt;
	doc.modifiedBy = doc.createdBy;

	
	if(!doc.ownerId) doc.ownerId = userId;
});

ItemPrice.before.update(function(userId, doc, fieldNames, modifier, options) {
	modifier.$set = modifier.$set || {};
	modifier.$set.modifiedAt = new Date();
	modifier.$set.modifiedBy = userId;

	
});

ItemPrice.before.remove(function(userId, doc) {
	
});

ItemPrice.after.insert(function(userId, doc) {
	
});

ItemPrice.after.update(function(userId, doc, fieldNames, modifier, options) {
	
});

ItemPrice.after.remove(function(userId, doc) {
	
});
