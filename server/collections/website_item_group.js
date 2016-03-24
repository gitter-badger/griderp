WebsiteItemGroup.allow({
	insert: function (userId, doc) {
		return WebsiteItemGroup.userCanInsert(userId, doc);
	},

	update: function (userId, doc, fields, modifier) {
		return WebsiteItemGroup.userCanUpdate(userId, doc);
	},

	remove: function (userId, doc) {
		return WebsiteItemGroup.userCanRemove(userId, doc);
	}
});

WebsiteItemGroup.before.insert(function(userId, doc) {
	doc.createdAt = new Date();
	doc.createdBy = userId;
	doc.modifiedAt = doc.createdAt;
	doc.modifiedBy = doc.createdBy;

	
	if(!doc.ownerId) doc.ownerId = userId;
});

WebsiteItemGroup.before.update(function(userId, doc, fieldNames, modifier, options) {
	modifier.$set = modifier.$set || {};
	modifier.$set.modifiedAt = new Date();
	modifier.$set.modifiedBy = userId;

	
});

WebsiteItemGroup.before.remove(function(userId, doc) {
	
});

WebsiteItemGroup.after.insert(function(userId, doc) {
	
});

WebsiteItemGroup.after.update(function(userId, doc, fieldNames, modifier, options) {
	
});

WebsiteItemGroup.after.remove(function(userId, doc) {
	
});
