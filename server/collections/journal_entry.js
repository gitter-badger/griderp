JournalEntry.allow({
	insert: function (userId, doc) {
		return JournalEntry.userCanInsert(userId, doc);
	},

	update: function (userId, doc, fields, modifier) {
		return JournalEntry.userCanUpdate(userId, doc);
	},

	remove: function (userId, doc) {
		return JournalEntry.userCanRemove(userId, doc);
	}
});

JournalEntry.before.insert(function(userId, doc) {
	doc.createdAt = new Date();
	doc.createdBy = userId;
	doc.modifiedAt = doc.createdAt;
	doc.modifiedBy = doc.createdBy;

	
	if(!doc.ownerId) doc.ownerId = userId;
});

JournalEntry.before.update(function(userId, doc, fieldNames, modifier, options) {
	modifier.$set = modifier.$set || {};
	modifier.$set.modifiedAt = new Date();
	modifier.$set.modifiedBy = userId;

	
});

JournalEntry.before.remove(function(userId, doc) {
	
});

JournalEntry.after.insert(function(userId, doc) {
	
});

JournalEntry.after.update(function(userId, doc, fieldNames, modifier, options) {
	
});

JournalEntry.after.remove(function(userId, doc) {
	
});
