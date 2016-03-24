Workstation.allow({
	insert: function (userId, doc) {
		return Workstation.userCanInsert(userId, doc);
	},

	update: function (userId, doc, fields, modifier) {
		return Workstation.userCanUpdate(userId, doc);
	},

	remove: function (userId, doc) {
		return Workstation.userCanRemove(userId, doc);
	}
});

Workstation.before.insert(function(userId, doc) {
	doc.createdAt = new Date();
	doc.createdBy = userId;
	doc.modifiedAt = doc.createdAt;
	doc.modifiedBy = doc.createdBy;

	
	if(!doc.ownerId) doc.ownerId = userId;
});

Workstation.before.update(function(userId, doc, fieldNames, modifier, options) {
	modifier.$set = modifier.$set || {};
	modifier.$set.modifiedAt = new Date();
	modifier.$set.modifiedBy = userId;

	
});

Workstation.before.remove(function(userId, doc) {
	
});

Workstation.after.insert(function(userId, doc) {
	
});

Workstation.after.update(function(userId, doc, fieldNames, modifier, options) {
	
});

Workstation.after.remove(function(userId, doc) {
	
});
