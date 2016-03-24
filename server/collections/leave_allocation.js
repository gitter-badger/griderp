LeaveAllocation.allow({
	insert: function (userId, doc) {
		return LeaveAllocation.userCanInsert(userId, doc);
	},

	update: function (userId, doc, fields, modifier) {
		return LeaveAllocation.userCanUpdate(userId, doc);
	},

	remove: function (userId, doc) {
		return LeaveAllocation.userCanRemove(userId, doc);
	}
});

LeaveAllocation.before.insert(function(userId, doc) {
	doc.createdAt = new Date();
	doc.createdBy = userId;
	doc.modifiedAt = doc.createdAt;
	doc.modifiedBy = doc.createdBy;

	
	if(!doc.ownerId) doc.ownerId = userId;
});

LeaveAllocation.before.update(function(userId, doc, fieldNames, modifier, options) {
	modifier.$set = modifier.$set || {};
	modifier.$set.modifiedAt = new Date();
	modifier.$set.modifiedBy = userId;

	
});

LeaveAllocation.before.remove(function(userId, doc) {
	
});

LeaveAllocation.after.insert(function(userId, doc) {
	
});

LeaveAllocation.after.update(function(userId, doc, fieldNames, modifier, options) {
	
});

LeaveAllocation.after.remove(function(userId, doc) {
	
});
