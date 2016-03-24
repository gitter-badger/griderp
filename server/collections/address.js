Address.allow({
	insert: function (userId, doc) {
		return Address.userCanInsert(userId, doc);
	},

	update: function (userId, doc, fields, modifier) {
		return Address.userCanUpdate(userId, doc);
	},

	remove: function (userId, doc) {
		return Address.userCanRemove(userId, doc);
	}
});

Address.before.insert(function(userId, doc) {
	doc.createdAt = new Date();
	doc.createdBy = userId;
	doc.modifiedAt = doc.createdAt;
	doc.modifiedBy = doc.createdBy;

	
	if(!doc.ownerId) doc.ownerId = userId;
});

Address.before.update(function(userId, doc, fieldNames, modifier, options) {
	modifier.$set = modifier.$set || {};
	modifier.$set.modifiedAt = new Date();
	modifier.$set.modifiedBy = userId;

	
});

Address.before.remove(function(userId, doc) {
	
});

Address.after.insert(function(userId, doc) {
	
});

Address.after.update(function(userId, doc, fieldNames, modifier, options) {
	
});

Address.after.remove(function(userId, doc) {
	
});
