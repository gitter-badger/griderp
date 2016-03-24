WebsiteTheme.allow({
	insert: function (userId, doc) {
		return WebsiteTheme.userCanInsert(userId, doc);
	},

	update: function (userId, doc, fields, modifier) {
		return WebsiteTheme.userCanUpdate(userId, doc);
	},

	remove: function (userId, doc) {
		return WebsiteTheme.userCanRemove(userId, doc);
	}
});

WebsiteTheme.before.insert(function(userId, doc) {
	doc.createdAt = new Date();
	doc.createdBy = userId;
	doc.modifiedAt = doc.createdAt;
	doc.modifiedBy = doc.createdBy;

	
	if(!doc.ownerId) doc.ownerId = userId;
});

WebsiteTheme.before.update(function(userId, doc, fieldNames, modifier, options) {
	modifier.$set = modifier.$set || {};
	modifier.$set.modifiedAt = new Date();
	modifier.$set.modifiedBy = userId;

	
});

WebsiteTheme.before.remove(function(userId, doc) {
	
});

WebsiteTheme.after.insert(function(userId, doc) {
	
});

WebsiteTheme.after.update(function(userId, doc, fieldNames, modifier, options) {
	
});

WebsiteTheme.after.remove(function(userId, doc) {
	
});
