Userrole.allow({
	insert: function (userId, doc) {
		return Userrole.userCanInsert(userId, doc);
	},

	update: function (userId, doc, fields, modifier) {
		return Userrole.userCanUpdate(userId, doc);
	},

	remove: function (userId, doc) {
		return Userrole.userCanRemove(userId, doc);
	}
});

Userrole.before.insert(function(userId, doc) {
	doc.createdAt = new Date();
	doc.createdBy = userId;
	doc.modifiedAt = doc.createdAt;
	doc.modifiedBy = doc.createdBy;

	
	if(!doc.ownerId) doc.ownerId = userId;
});

Userrole.before.update(function(userId, doc, fieldNames, modifier, options) {
	modifier.$set = modifier.$set || {};
	modifier.$set.modifiedAt = new Date();
	modifier.$set.modifiedBy = userId;

	
});

Userrole.before.remove(function(userId, doc) {
	
});

Userrole.after.insert(function(userId, doc) {
	
});

Userrole.after.update(function(userId, doc, fieldNames, modifier, options) {
	
});

Userrole.after.remove(function(userId, doc) {
	
});
