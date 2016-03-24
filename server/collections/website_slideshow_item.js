WebsiteSlideshowItem.allow({
	insert: function (userId, doc) {
		return WebsiteSlideshowItem.userCanInsert(userId, doc);
	},

	update: function (userId, doc, fields, modifier) {
		return WebsiteSlideshowItem.userCanUpdate(userId, doc);
	},

	remove: function (userId, doc) {
		return WebsiteSlideshowItem.userCanRemove(userId, doc);
	}
});

WebsiteSlideshowItem.before.insert(function(userId, doc) {
	doc.createdAt = new Date();
	doc.createdBy = userId;
	doc.modifiedAt = doc.createdAt;
	doc.modifiedBy = doc.createdBy;

	
	if(!doc.ownerId) doc.ownerId = userId;
});

WebsiteSlideshowItem.before.update(function(userId, doc, fieldNames, modifier, options) {
	modifier.$set = modifier.$set || {};
	modifier.$set.modifiedAt = new Date();
	modifier.$set.modifiedBy = userId;

	
});

WebsiteSlideshowItem.before.remove(function(userId, doc) {
	
});

WebsiteSlideshowItem.after.insert(function(userId, doc) {
	
});

WebsiteSlideshowItem.after.update(function(userId, doc, fieldNames, modifier, options) {
	
});

WebsiteSlideshowItem.after.remove(function(userId, doc) {
	
});
