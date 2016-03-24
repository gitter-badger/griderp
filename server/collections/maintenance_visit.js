MaintenanceVisit.allow({
	insert: function (userId, doc) {
		return MaintenanceVisit.userCanInsert(userId, doc);
	},

	update: function (userId, doc, fields, modifier) {
		return MaintenanceVisit.userCanUpdate(userId, doc);
	},

	remove: function (userId, doc) {
		return MaintenanceVisit.userCanRemove(userId, doc);
	}
});

MaintenanceVisit.before.insert(function(userId, doc) {
	doc.createdAt = new Date();
	doc.createdBy = userId;
	doc.modifiedAt = doc.createdAt;
	doc.modifiedBy = doc.createdBy;

	
	if(!doc.ownerId) doc.ownerId = userId;
});

MaintenanceVisit.before.update(function(userId, doc, fieldNames, modifier, options) {
	modifier.$set = modifier.$set || {};
	modifier.$set.modifiedAt = new Date();
	modifier.$set.modifiedBy = userId;

	
});

MaintenanceVisit.before.remove(function(userId, doc) {
	
});

MaintenanceVisit.after.insert(function(userId, doc) {
	
});

MaintenanceVisit.after.update(function(userId, doc, fieldNames, modifier, options) {
	
});

MaintenanceVisit.after.remove(function(userId, doc) {
	
});
