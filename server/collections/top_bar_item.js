TopBarItem.allow({
	insert: function (userId, doc) {
		return TopBarItem.userCanInsert(userId, doc);
	},

	update: function (userId, doc, fields, modifier) {
		return TopBarItem.userCanUpdate(userId, doc);
	},

	remove: function (userId, doc) {
		return TopBarItem.userCanRemove(userId, doc);
	}
});

TopBarItem.before.insert(function(userId, doc) {
	doc.createdAt = new Date();
	doc.createdBy = userId;
	doc.modifiedAt = doc.createdAt;
	doc.modifiedBy = doc.createdBy;

	
	if(!doc.ownerId) doc.ownerId = userId;
});

TopBarItem.before.update(function(userId, doc, fieldNames, modifier, options) {
	modifier.$set = modifier.$set || {};
	modifier.$set.modifiedAt = new Date();
	modifier.$set.modifiedBy = userId;

	
});

TopBarItem.before.remove(function(userId, doc) {
	
});

TopBarItem.after.insert(function(userId, doc) {
	
});

TopBarItem.after.update(function(userId, doc, fieldNames, modifier, options) {
	
});

TopBarItem.after.remove(function(userId, doc) {
	
});
