Communication.allow({
	insert: function (userId, doc) {
		return Communication.userCanInsert(userId, doc);
	},

	update: function (userId, doc, fields, modifier) {
		return Communication.userCanUpdate(userId, doc);
	},

	remove: function (userId, doc) {
		return Communication.userCanRemove(userId, doc);
	}
});

Communication.before.insert(function(userId, doc) {
	doc.createdAt = new Date();
	doc.createdBy = userId;
	doc.modifiedAt = doc.createdAt;
	doc.modifiedBy = doc.createdBy;

	
	if(!doc.ownerId) doc.ownerId = userId;
});

Communication.before.update(function(userId, doc, fieldNames, modifier, options) {
	modifier.$set = modifier.$set || {};
	modifier.$set.modifiedAt = new Date();
	modifier.$set.modifiedBy = userId;

	
});

Communication.before.remove(function(userId, doc) {
	
});

Communication.after.insert(function(userId, doc) {
	
});

Communication.after.update(function(userId, doc, fieldNames, modifier, options) {
	
});

Communication.after.remove(function(userId, doc) {
	
});
