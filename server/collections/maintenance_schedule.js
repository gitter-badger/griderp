MaintenanceSchedule.allow({
	insert: function (userId, doc) {
		return MaintenanceSchedule.userCanInsert(userId, doc);
	},

	update: function (userId, doc, fields, modifier) {
		return MaintenanceSchedule.userCanUpdate(userId, doc);
	},

	remove: function (userId, doc) {
		return MaintenanceSchedule.userCanRemove(userId, doc);
	}
});

MaintenanceSchedule.before.insert(function(userId, doc) {
	doc.createdAt = new Date();
	doc.createdBy = userId;
	doc.modifiedAt = doc.createdAt;
	doc.modifiedBy = doc.createdBy;

	
	if(!doc.ownerId) doc.ownerId = userId;
});

MaintenanceSchedule.before.update(function(userId, doc, fieldNames, modifier, options) {
	modifier.$set = modifier.$set || {};
	modifier.$set.modifiedAt = new Date();
	modifier.$set.modifiedBy = userId;

	
});

MaintenanceSchedule.before.remove(function(userId, doc) {
	
});

MaintenanceSchedule.after.insert(function(userId, doc) {
	
});

MaintenanceSchedule.after.update(function(userId, doc, fieldNames, modifier, options) {
	
});

MaintenanceSchedule.after.remove(function(userId, doc) {
	
});
