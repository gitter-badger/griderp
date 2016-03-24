Page.allow({
	insert: function (userId, doc) {
		return Page.userCanInsert(userId, doc);
	},

	update: function (userId, doc, fields, modifier) {
		return Page.userCanUpdate(userId, doc);
	},

	remove: function (userId, doc) {
		return Page.userCanRemove(userId, doc);
	}
});

Page.before.insert(function(userId, doc) {
	doc.createdAt = new Date();
	doc.createdBy = userId;
	doc.modifiedAt = doc.createdAt;
	doc.modifiedBy = doc.createdBy;

	
	if(!doc.ownerId) doc.ownerId = userId;
});

Page.before.update(function(userId, doc, fieldNames, modifier, options) {
	modifier.$set = modifier.$set || {};
	modifier.$set.modifiedAt = new Date();
	modifier.$set.modifiedBy = userId;

	
});

Page.before.remove(function(userId, doc) {
	
});

Page.after.insert(function(userId, doc) {
	
});

Page.after.update(function(userId, doc, fieldNames, modifier, options) {
	
});

Page.after.remove(function(userId, doc) {
	
});
