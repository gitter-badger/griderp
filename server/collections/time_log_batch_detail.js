TimeLogBatchDetail.allow({
	insert: function (userId, doc) {
		return TimeLogBatchDetail.userCanInsert(userId, doc);
	},

	update: function (userId, doc, fields, modifier) {
		return TimeLogBatchDetail.userCanUpdate(userId, doc);
	},

	remove: function (userId, doc) {
		return TimeLogBatchDetail.userCanRemove(userId, doc);
	}
});

TimeLogBatchDetail.before.insert(function(userId, doc) {
	doc.createdAt = new Date();
	doc.createdBy = userId;
	doc.modifiedAt = doc.createdAt;
	doc.modifiedBy = doc.createdBy;

	
	if(!doc.ownerId) doc.ownerId = userId;
});

TimeLogBatchDetail.before.update(function(userId, doc, fieldNames, modifier, options) {
	modifier.$set = modifier.$set || {};
	modifier.$set.modifiedAt = new Date();
	modifier.$set.modifiedBy = userId;

	
});

TimeLogBatchDetail.before.remove(function(userId, doc) {
	
});

TimeLogBatchDetail.after.insert(function(userId, doc) {
	
});

TimeLogBatchDetail.after.update(function(userId, doc, fieldNames, modifier, options) {
	
});

TimeLogBatchDetail.after.remove(function(userId, doc) {
	
});
