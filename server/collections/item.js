Item.allow({
	insert: function (userId, doc) {
		return Item.userCanInsert(userId, doc);
	},

	update: function (userId, doc, fields, modifier) {
		return Item.userCanUpdate(userId, doc);
	},

	remove: function (userId, doc) {
		return Item.userCanRemove(userId, doc);
	}
});

Item.before.insert(function(userId, doc) {
	doc.createdAt = new Date();
	doc.createdBy = userId;
	doc.modifiedAt = doc.createdAt;
	doc.modifiedBy = doc.createdBy;

	
	if(!doc.ownerId) doc.ownerId = userId;
});

Item.before.update(function(userId, doc, fieldNames, modifier, options) {
	modifier.$set = modifier.$set || {};
	modifier.$set.modifiedAt = new Date();
	modifier.$set.modifiedBy = userId;

	
});

Item.before.remove(function(userId, doc) {
	
});

Item.after.insert(function(userId, doc) {
	
});

Item.after.update(function(userId, doc, fieldNames, modifier, options) {
	
});

Item.after.remove(function(userId, doc) {
	
});
