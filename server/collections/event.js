Event.allow({
	insert: function (userId, doc) {
		return Event.userCanInsert(userId, doc);
	},

	update: function (userId, doc, fields, modifier) {
		return Event.userCanUpdate(userId, doc);
	},

	remove: function (userId, doc) {
		return Event.userCanRemove(userId, doc);
	}
});

Event.before.insert(function(userId, doc) {
	doc.createdAt = new Date();
	doc.createdBy = userId;
	doc.modifiedAt = doc.createdAt;
	doc.modifiedBy = doc.createdBy;

	
	if(!doc.ownerId) doc.ownerId = userId;
});

Event.before.update(function(userId, doc, fieldNames, modifier, options) {
	modifier.$set = modifier.$set || {};
	modifier.$set.modifiedAt = new Date();
	modifier.$set.modifiedBy = userId;

	
});

Event.before.remove(function(userId, doc) {
	
});

Event.after.insert(function(userId, doc) {
	
});

Event.after.update(function(userId, doc, fieldNames, modifier, options) {
	
});

Event.after.remove(function(userId, doc) {
	
});
