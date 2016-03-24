InstallationNoteItem.allow({
	insert: function (userId, doc) {
		return InstallationNoteItem.userCanInsert(userId, doc);
	},

	update: function (userId, doc, fields, modifier) {
		return InstallationNoteItem.userCanUpdate(userId, doc);
	},

	remove: function (userId, doc) {
		return InstallationNoteItem.userCanRemove(userId, doc);
	}
});

InstallationNoteItem.before.insert(function(userId, doc) {
	doc.createdAt = new Date();
	doc.createdBy = userId;
	doc.modifiedAt = doc.createdAt;
	doc.modifiedBy = doc.createdBy;

	
	if(!doc.ownerId) doc.ownerId = userId;
});

InstallationNoteItem.before.update(function(userId, doc, fieldNames, modifier, options) {
	modifier.$set = modifier.$set || {};
	modifier.$set.modifiedAt = new Date();
	modifier.$set.modifiedBy = userId;

	
});

InstallationNoteItem.before.remove(function(userId, doc) {
	
});

InstallationNoteItem.after.insert(function(userId, doc) {
	
});

InstallationNoteItem.after.update(function(userId, doc, fieldNames, modifier, options) {
	
});

InstallationNoteItem.after.remove(function(userId, doc) {
	
});
