SmsLog.allow({
	insert: function (userId, doc) {
		return SmsLog.userCanInsert(userId, doc);
	},

	update: function (userId, doc, fields, modifier) {
		return SmsLog.userCanUpdate(userId, doc);
	},

	remove: function (userId, doc) {
		return SmsLog.userCanRemove(userId, doc);
	}
});

SmsLog.before.insert(function(userId, doc) {
	doc.createdAt = new Date();
	doc.createdBy = userId;
	doc.modifiedAt = doc.createdAt;
	doc.modifiedBy = doc.createdBy;

	
	if(!doc.ownerId) doc.ownerId = userId;
});

SmsLog.before.update(function(userId, doc, fieldNames, modifier, options) {
	modifier.$set = modifier.$set || {};
	modifier.$set.modifiedAt = new Date();
	modifier.$set.modifiedBy = userId;

	
});

SmsLog.before.remove(function(userId, doc) {
	
});

SmsLog.after.insert(function(userId, doc) {
	
});

SmsLog.after.update(function(userId, doc, fieldNames, modifier, options) {
	
});

SmsLog.after.remove(function(userId, doc) {
	
});
