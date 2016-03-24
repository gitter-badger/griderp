SalesTeam.allow({
	insert: function (userId, doc) {
		return SalesTeam.userCanInsert(userId, doc);
	},

	update: function (userId, doc, fields, modifier) {
		return SalesTeam.userCanUpdate(userId, doc);
	},

	remove: function (userId, doc) {
		return SalesTeam.userCanRemove(userId, doc);
	}
});

SalesTeam.before.insert(function(userId, doc) {
	doc.createdAt = new Date();
	doc.createdBy = userId;
	doc.modifiedAt = doc.createdAt;
	doc.modifiedBy = doc.createdBy;

	
	if(!doc.ownerId) doc.ownerId = userId;
});

SalesTeam.before.update(function(userId, doc, fieldNames, modifier, options) {
	modifier.$set = modifier.$set || {};
	modifier.$set.modifiedAt = new Date();
	modifier.$set.modifiedBy = userId;

	
});

SalesTeam.before.remove(function(userId, doc) {
	
});

SalesTeam.after.insert(function(userId, doc) {
	
});

SalesTeam.after.update(function(userId, doc, fieldNames, modifier, options) {
	
});

SalesTeam.after.remove(function(userId, doc) {
	
});
