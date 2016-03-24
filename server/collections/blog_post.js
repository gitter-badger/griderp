BlogPost.allow({
	insert: function (userId, doc) {
		return BlogPost.userCanInsert(userId, doc);
	},

	update: function (userId, doc, fields, modifier) {
		return BlogPost.userCanUpdate(userId, doc);
	},

	remove: function (userId, doc) {
		return BlogPost.userCanRemove(userId, doc);
	}
});

BlogPost.before.insert(function(userId, doc) {
	doc.createdAt = new Date();
	doc.createdBy = userId;
	doc.modifiedAt = doc.createdAt;
	doc.modifiedBy = doc.createdBy;

	
	if(!doc.ownerId) doc.ownerId = userId;
});

BlogPost.before.update(function(userId, doc, fieldNames, modifier, options) {
	modifier.$set = modifier.$set || {};
	modifier.$set.modifiedAt = new Date();
	modifier.$set.modifiedBy = userId;

	
});

BlogPost.before.remove(function(userId, doc) {
	
});

BlogPost.after.insert(function(userId, doc) {
	
});

BlogPost.after.update(function(userId, doc, fieldNames, modifier, options) {
	
});

BlogPost.after.remove(function(userId, doc) {
	
});
