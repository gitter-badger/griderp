Holiday.allow({
	insert: function (userId, doc) {
		return Holiday.userCanInsert(userId, doc);
	},

	update: function (userId, doc, fields, modifier) {
		return Holiday.userCanUpdate(userId, doc);
	},

	remove: function (userId, doc) {
		return Holiday.userCanRemove(userId, doc);
	}
});

Holiday.before.insert(function(userId, doc) {
	doc.createdAt = new Date();
	doc.createdBy = userId;
	doc.modifiedAt = doc.createdAt;
	doc.modifiedBy = doc.createdBy;

	
	if(!doc.ownerId) doc.ownerId = userId;
});

Holiday.before.update(function(userId, doc, fieldNames, modifier, options) {
	modifier.$set = modifier.$set || {};
	modifier.$set.modifiedAt = new Date();
	modifier.$set.modifiedBy = userId;

	
});

Holiday.before.remove(function(userId, doc) {
	
});

Holiday.after.insert(function(userId, doc) {
	
});

Holiday.after.update(function(userId, doc, fieldNames, modifier, options) {
	
});

Holiday.after.remove(function(userId, doc) {
	
});
