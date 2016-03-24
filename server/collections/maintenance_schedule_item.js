MaintenanceScheduleItem.allow({
	insert: function (userId, doc) {
		return MaintenanceScheduleItem.userCanInsert(userId, doc);
	},

	update: function (userId, doc, fields, modifier) {
		return MaintenanceScheduleItem.userCanUpdate(userId, doc);
	},

	remove: function (userId, doc) {
		return MaintenanceScheduleItem.userCanRemove(userId, doc);
	}
});

MaintenanceScheduleItem.before.insert(function(userId, doc) {
	doc.createdAt = new Date();
	doc.createdBy = userId;
	doc.modifiedAt = doc.createdAt;
	doc.modifiedBy = doc.createdBy;

	
	if(!doc.ownerId) doc.ownerId = userId;
});

MaintenanceScheduleItem.before.update(function(userId, doc, fieldNames, modifier, options) {
	modifier.$set = modifier.$set || {};
	modifier.$set.modifiedAt = new Date();
	modifier.$set.modifiedBy = userId;

	
});

MaintenanceScheduleItem.before.remove(function(userId, doc) {
	
});

MaintenanceScheduleItem.after.insert(function(userId, doc) {
	
});

MaintenanceScheduleItem.after.update(function(userId, doc, fieldNames, modifier, options) {
	
});

MaintenanceScheduleItem.after.remove(function(userId, doc) {
	
});
