SchedulerLog.allow({
	insert: function (userId, doc) {
		return SchedulerLog.userCanInsert(userId, doc);
	},

	update: function (userId, doc, fields, modifier) {
		return SchedulerLog.userCanUpdate(userId, doc);
	},

	remove: function (userId, doc) {
		return SchedulerLog.userCanRemove(userId, doc);
	}
});

SchedulerLog.before.insert(function(userId, doc) {
	doc.createdAt = new Date();
	doc.createdBy = userId;
	doc.modifiedAt = doc.createdAt;
	doc.modifiedBy = doc.createdBy;

	
	if(!doc.ownerId) doc.ownerId = userId;
});

SchedulerLog.before.update(function(userId, doc, fieldNames, modifier, options) {
	modifier.$set = modifier.$set || {};
	modifier.$set.modifiedAt = new Date();
	modifier.$set.modifiedBy = userId;

	
});

SchedulerLog.before.remove(function(userId, doc) {
	
});

SchedulerLog.after.insert(function(userId, doc) {
	
});

SchedulerLog.after.update(function(userId, doc, fieldNames, modifier, options) {
	
});

SchedulerLog.after.remove(function(userId, doc) {
	
});
