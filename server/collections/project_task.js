ProjectTask.allow({
	insert: function (userId, doc) {
		return ProjectTask.userCanInsert(userId, doc);
	},

	update: function (userId, doc, fields, modifier) {
		return ProjectTask.userCanUpdate(userId, doc);
	},

	remove: function (userId, doc) {
		return ProjectTask.userCanRemove(userId, doc);
	}
});

ProjectTask.before.insert(function(userId, doc) {
	doc.createdAt = new Date();
	doc.createdBy = userId;
	doc.modifiedAt = doc.createdAt;
	doc.modifiedBy = doc.createdBy;

	
	if(!doc.ownerId) doc.ownerId = userId;
});

ProjectTask.before.update(function(userId, doc, fieldNames, modifier, options) {
	modifier.$set = modifier.$set || {};
	modifier.$set.modifiedAt = new Date();
	modifier.$set.modifiedBy = userId;

	
});

ProjectTask.before.remove(function(userId, doc) {
	
});

ProjectTask.after.insert(function(userId, doc) {
	
});

ProjectTask.after.update(function(userId, doc, fieldNames, modifier, options) {
	
});

ProjectTask.after.remove(function(userId, doc) {
	
});
