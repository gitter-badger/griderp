PartyAccount.allow({
	insert: function (userId, doc) {
		return PartyAccount.userCanInsert(userId, doc);
	},

	update: function (userId, doc, fields, modifier) {
		return PartyAccount.userCanUpdate(userId, doc);
	},

	remove: function (userId, doc) {
		return PartyAccount.userCanRemove(userId, doc);
	}
});

PartyAccount.before.insert(function(userId, doc) {
	doc.createdAt = new Date();
	doc.createdBy = userId;
	doc.modifiedAt = doc.createdAt;
	doc.modifiedBy = doc.createdBy;

	
	if(!doc.ownerId) doc.ownerId = userId;
});

PartyAccount.before.update(function(userId, doc, fieldNames, modifier, options) {
	modifier.$set = modifier.$set || {};
	modifier.$set.modifiedAt = new Date();
	modifier.$set.modifiedBy = userId;

	
});

PartyAccount.before.remove(function(userId, doc) {
	
});

PartyAccount.after.insert(function(userId, doc) {
	
});

PartyAccount.after.update(function(userId, doc, fieldNames, modifier, options) {
	
});

PartyAccount.after.remove(function(userId, doc) {
	
});
