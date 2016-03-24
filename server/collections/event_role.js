EventRole.allow({
	insert: function (userId, doc) {
		return EventRole.userCanInsert(userId, doc);
	},

	update: function (userId, doc, fields, modifier) {
		return EventRole.userCanUpdate(userId, doc);
	},

	remove: function (userId, doc) {
		return EventRole.userCanRemove(userId, doc);
	}
});

EventRole.before.insert(function(userId, doc) {
	doc.createdAt = new Date();
	doc.createdBy = userId;
	doc.modifiedAt = doc.createdAt;
	doc.modifiedBy = doc.createdBy;

	
	if(!doc.ownerId) doc.ownerId = userId;
});

EventRole.before.update(function(userId, doc, fieldNames, modifier, options) {
	modifier.$set = modifier.$set || {};
	modifier.$set.modifiedAt = new Date();
	modifier.$set.modifiedBy = userId;

	
});

EventRole.before.remove(function(userId, doc) {
	
});

EventRole.after.insert(function(userId, doc) {
	
});

EventRole.after.update(function(userId, doc, fieldNames, modifier, options) {
	
});

EventRole.after.remove(function(userId, doc) {
	
});
