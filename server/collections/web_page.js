WebPage.allow({
	insert: function (userId, doc) {
		return WebPage.userCanInsert(userId, doc);
	},

	update: function (userId, doc, fields, modifier) {
		return WebPage.userCanUpdate(userId, doc);
	},

	remove: function (userId, doc) {
		return WebPage.userCanRemove(userId, doc);
	}
});

WebPage.before.insert(function(userId, doc) {
	doc.createdAt = new Date();
	doc.createdBy = userId;
	doc.modifiedAt = doc.createdAt;
	doc.modifiedBy = doc.createdBy;

	
	if(!doc.ownerId) doc.ownerId = userId;
});

WebPage.before.update(function(userId, doc, fieldNames, modifier, options) {
	modifier.$set = modifier.$set || {};
	modifier.$set.modifiedAt = new Date();
	modifier.$set.modifiedBy = userId;

	
});

WebPage.before.remove(function(userId, doc) {
	
});

WebPage.after.insert(function(userId, doc) {
	
});

WebPage.after.update(function(userId, doc, fieldNames, modifier, options) {
	
});

WebPage.after.remove(function(userId, doc) {
	
});
