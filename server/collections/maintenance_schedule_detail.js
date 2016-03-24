MaintenanceScheduleDetail.allow({
	insert: function (userId, doc) {
		return MaintenanceScheduleDetail.userCanInsert(userId, doc);
	},

	update: function (userId, doc, fields, modifier) {
		return MaintenanceScheduleDetail.userCanUpdate(userId, doc);
	},

	remove: function (userId, doc) {
		return MaintenanceScheduleDetail.userCanRemove(userId, doc);
	}
});

MaintenanceScheduleDetail.before.insert(function(userId, doc) {
	doc.createdAt = new Date();
	doc.createdBy = userId;
	doc.modifiedAt = doc.createdAt;
	doc.modifiedBy = doc.createdBy;

	
	if(!doc.ownerId) doc.ownerId = userId;
});

MaintenanceScheduleDetail.before.update(function(userId, doc, fieldNames, modifier, options) {
	modifier.$set = modifier.$set || {};
	modifier.$set.modifiedAt = new Date();
	modifier.$set.modifiedBy = userId;

	
});

MaintenanceScheduleDetail.before.remove(function(userId, doc) {
	
});

MaintenanceScheduleDetail.after.insert(function(userId, doc) {
	
});

MaintenanceScheduleDetail.after.update(function(userId, doc, fieldNames, modifier, options) {
	
});

MaintenanceScheduleDetail.after.remove(function(userId, doc) {
	
});
