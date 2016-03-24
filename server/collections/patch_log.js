PatchLog.allow({
	insert: function (userId, doc) {
		return PatchLog.userCanInsert(userId, doc);
	},

	update: function (userId, doc, fields, modifier) {
		return PatchLog.userCanUpdate(userId, doc);
	},

	remove: function (userId, doc) {
		return PatchLog.userCanRemove(userId, doc);
	}
});

PatchLog.before.insert(function(userId, doc) {
	doc.createdAt = new Date();
	doc.createdBy = userId;
	doc.modifiedAt = doc.createdAt;
	doc.modifiedBy = doc.createdBy;

	
	if(!doc.ownerId) doc.ownerId = userId;
});

PatchLog.before.update(function(userId, doc, fieldNames, modifier, options) {
	modifier.$set = modifier.$set || {};
	modifier.$set.modifiedAt = new Date();
	modifier.$set.modifiedBy = userId;

	
});

PatchLog.before.remove(function(userId, doc) {
	
});

PatchLog.after.insert(function(userId, doc) {
	
});

PatchLog.after.update(function(userId, doc, fieldNames, modifier, options) {
	
});

PatchLog.after.remove(function(userId, doc) {
	
});
