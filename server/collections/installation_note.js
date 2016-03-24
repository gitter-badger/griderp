InstallationNote.allow({
	insert: function (userId, doc) {
		return InstallationNote.userCanInsert(userId, doc);
	},

	update: function (userId, doc, fields, modifier) {
		return InstallationNote.userCanUpdate(userId, doc);
	},

	remove: function (userId, doc) {
		return InstallationNote.userCanRemove(userId, doc);
	}
});

InstallationNote.before.insert(function(userId, doc) {
	doc.createdAt = new Date();
	doc.createdBy = userId;
	doc.modifiedAt = doc.createdAt;
	doc.modifiedBy = doc.createdBy;

	
	if(!doc.ownerId) doc.ownerId = userId;
});

InstallationNote.before.update(function(userId, doc, fieldNames, modifier, options) {
	modifier.$set = modifier.$set || {};
	modifier.$set.modifiedAt = new Date();
	modifier.$set.modifiedBy = userId;

	
});

InstallationNote.before.remove(function(userId, doc) {
	
});

InstallationNote.after.insert(function(userId, doc) {
	
});

InstallationNote.after.update(function(userId, doc, fieldNames, modifier, options) {
	
});

InstallationNote.after.remove(function(userId, doc) {
	
});
