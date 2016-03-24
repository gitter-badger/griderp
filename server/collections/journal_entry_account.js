JournalEntryAccount.allow({
	insert: function (userId, doc) {
		return JournalEntryAccount.userCanInsert(userId, doc);
	},

	update: function (userId, doc, fields, modifier) {
		return JournalEntryAccount.userCanUpdate(userId, doc);
	},

	remove: function (userId, doc) {
		return JournalEntryAccount.userCanRemove(userId, doc);
	}
});

JournalEntryAccount.before.insert(function(userId, doc) {
	doc.createdAt = new Date();
	doc.createdBy = userId;
	doc.modifiedAt = doc.createdAt;
	doc.modifiedBy = doc.createdBy;

	
	if(!doc.ownerId) doc.ownerId = userId;
});

JournalEntryAccount.before.update(function(userId, doc, fieldNames, modifier, options) {
	modifier.$set = modifier.$set || {};
	modifier.$set.modifiedAt = new Date();
	modifier.$set.modifiedBy = userId;

	
});

JournalEntryAccount.before.remove(function(userId, doc) {
	
});

JournalEntryAccount.after.insert(function(userId, doc) {
	
});

JournalEntryAccount.after.update(function(userId, doc, fieldNames, modifier, options) {
	
});

JournalEntryAccount.after.remove(function(userId, doc) {
	
});
