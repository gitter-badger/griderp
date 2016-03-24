PosProfile.allow({
	insert: function (userId, doc) {
		return PosProfile.userCanInsert(userId, doc);
	},

	update: function (userId, doc, fields, modifier) {
		return PosProfile.userCanUpdate(userId, doc);
	},

	remove: function (userId, doc) {
		return PosProfile.userCanRemove(userId, doc);
	}
});

PosProfile.before.insert(function(userId, doc) {
	doc.createdAt = new Date();
	doc.createdBy = userId;
	doc.modifiedAt = doc.createdAt;
	doc.modifiedBy = doc.createdBy;

	
	if(!doc.ownerId) doc.ownerId = userId;
});

PosProfile.before.update(function(userId, doc, fieldNames, modifier, options) {
	modifier.$set = modifier.$set || {};
	modifier.$set.modifiedAt = new Date();
	modifier.$set.modifiedBy = userId;

	
});

PosProfile.before.remove(function(userId, doc) {
	
});

PosProfile.after.insert(function(userId, doc) {
	
});

PosProfile.after.update(function(userId, doc, fieldNames, modifier, options) {
	
});

PosProfile.after.remove(function(userId, doc) {
	
});
