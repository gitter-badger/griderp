MaintenanceVisitPurpose.allow({
	insert: function (userId, doc) {
		return MaintenanceVisitPurpose.userCanInsert(userId, doc);
	},

	update: function (userId, doc, fields, modifier) {
		return MaintenanceVisitPurpose.userCanUpdate(userId, doc);
	},

	remove: function (userId, doc) {
		return MaintenanceVisitPurpose.userCanRemove(userId, doc);
	}
});

MaintenanceVisitPurpose.before.insert(function(userId, doc) {
	doc.createdAt = new Date();
	doc.createdBy = userId;
	doc.modifiedAt = doc.createdAt;
	doc.modifiedBy = doc.createdBy;

	
	if(!doc.ownerId) doc.ownerId = userId;
});

MaintenanceVisitPurpose.before.update(function(userId, doc, fieldNames, modifier, options) {
	modifier.$set = modifier.$set || {};
	modifier.$set.modifiedAt = new Date();
	modifier.$set.modifiedBy = userId;

	
});

MaintenanceVisitPurpose.before.remove(function(userId, doc) {
	
});

MaintenanceVisitPurpose.after.insert(function(userId, doc) {
	
});

MaintenanceVisitPurpose.after.update(function(userId, doc, fieldNames, modifier, options) {
	
});

MaintenanceVisitPurpose.after.remove(function(userId, doc) {
	
});
