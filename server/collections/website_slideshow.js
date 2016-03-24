WebsiteSlideshow.allow({
	insert: function (userId, doc) {
		return WebsiteSlideshow.userCanInsert(userId, doc);
	},

	update: function (userId, doc, fields, modifier) {
		return WebsiteSlideshow.userCanUpdate(userId, doc);
	},

	remove: function (userId, doc) {
		return WebsiteSlideshow.userCanRemove(userId, doc);
	}
});

WebsiteSlideshow.before.insert(function(userId, doc) {
	doc.createdAt = new Date();
	doc.createdBy = userId;
	doc.modifiedAt = doc.createdAt;
	doc.modifiedBy = doc.createdBy;

	
	if(!doc.ownerId) doc.ownerId = userId;
});

WebsiteSlideshow.before.update(function(userId, doc, fieldNames, modifier, options) {
	modifier.$set = modifier.$set || {};
	modifier.$set.modifiedAt = new Date();
	modifier.$set.modifiedBy = userId;

	
});

WebsiteSlideshow.before.remove(function(userId, doc) {
	
});

WebsiteSlideshow.after.insert(function(userId, doc) {
	
});

WebsiteSlideshow.after.update(function(userId, doc, fieldNames, modifier, options) {
	
});

WebsiteSlideshow.after.remove(function(userId, doc) {
	
});
