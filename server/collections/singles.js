Singles.allow({
	insert: function (userId, doc) {
		return Singles.userCanInsert(userId, doc);
	},

	update: function (userId, doc, fields, modifier) {
		return Singles.userCanUpdate(userId, doc);
	},

	remove: function (userId, doc) {
		return Singles.userCanRemove(userId, doc);
	}
});

Singles.before.insert(function(userId, doc) {
	doc.createdAt = new Date();
	doc.createdBy = userId;
	doc.modifiedAt = doc.createdAt;
	doc.modifiedBy = doc.createdBy;

	
	if(!doc.ownerId) doc.ownerId = userId;
});

Singles.before.update(function(userId, doc, fieldNames, modifier, options) {
	modifier.$set = modifier.$set || {};
	modifier.$set.modifiedAt = new Date();
	modifier.$set.modifiedBy = userId;

	
});

Singles.before.remove(function(userId, doc) {
	
});

Singles.after.insert(function(userId, doc) {
	
});

Singles.after.update(function(userId, doc, fieldNames, modifier, options) {
	
});

Singles.after.remove(function(userId, doc) {
	
});
