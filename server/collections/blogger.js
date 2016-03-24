Blogger.allow({
	insert: function (userId, doc) {
		return Blogger.userCanInsert(userId, doc);
	},

	update: function (userId, doc, fields, modifier) {
		return Blogger.userCanUpdate(userId, doc);
	},

	remove: function (userId, doc) {
		return Blogger.userCanRemove(userId, doc);
	}
});

Blogger.before.insert(function(userId, doc) {
	doc.createdAt = new Date();
	doc.createdBy = userId;
	doc.modifiedAt = doc.createdAt;
	doc.modifiedBy = doc.createdBy;

	
	if(!doc.ownerId) doc.ownerId = userId;
});

Blogger.before.update(function(userId, doc, fieldNames, modifier, options) {
	modifier.$set = modifier.$set || {};
	modifier.$set.modifiedAt = new Date();
	modifier.$set.modifiedBy = userId;

	
});

Blogger.before.remove(function(userId, doc) {
	
});

Blogger.after.insert(function(userId, doc) {
	
});

Blogger.after.update(function(userId, doc, fieldNames, modifier, options) {
	
});

Blogger.after.remove(function(userId, doc) {
	
});
