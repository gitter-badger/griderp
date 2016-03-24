Bin.allow({
	insert: function (userId, doc) {
		return Bin.userCanInsert(userId, doc);
	},

	update: function (userId, doc, fields, modifier) {
		return Bin.userCanUpdate(userId, doc);
	},

	remove: function (userId, doc) {
		return Bin.userCanRemove(userId, doc);
	}
});

Bin.before.insert(function(userId, doc) {
	doc.createdAt = new Date();
	doc.createdBy = userId;
	doc.modifiedAt = doc.createdAt;
	doc.modifiedBy = doc.createdBy;

	
	if(!doc.ownerId) doc.ownerId = userId;
});

Bin.before.update(function(userId, doc, fieldNames, modifier, options) {
	modifier.$set = modifier.$set || {};
	modifier.$set.modifiedAt = new Date();
	modifier.$set.modifiedBy = userId;

	
});

Bin.before.remove(function(userId, doc) {
	
});

Bin.after.insert(function(userId, doc) {
	
});

Bin.after.update(function(userId, doc, fieldNames, modifier, options) {
	
});

Bin.after.remove(function(userId, doc) {
	
});
