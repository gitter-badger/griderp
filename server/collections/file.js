File.allow({
	insert: function (userId, doc) {
		return File.userCanInsert(userId, doc);
	},

	update: function (userId, doc, fields, modifier) {
		return File.userCanUpdate(userId, doc);
	},

	remove: function (userId, doc) {
		return File.userCanRemove(userId, doc);
	}
});

File.before.insert(function(userId, doc) {
	doc.createdAt = new Date();
	doc.createdBy = userId;
	doc.modifiedAt = doc.createdAt;
	doc.modifiedBy = doc.createdBy;

	
	if(!doc.ownerId) doc.ownerId = userId;
});

File.before.update(function(userId, doc, fieldNames, modifier, options) {
	modifier.$set = modifier.$set || {};
	modifier.$set.modifiedAt = new Date();
	modifier.$set.modifiedBy = userId;

	
});

File.before.remove(function(userId, doc) {
	
});

File.after.insert(function(userId, doc) {
	
});

File.after.update(function(userId, doc, fieldNames, modifier, options) {
	
});

File.after.remove(function(userId, doc) {
	
});
