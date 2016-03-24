SmsParameter.allow({
	insert: function (userId, doc) {
		return SmsParameter.userCanInsert(userId, doc);
	},

	update: function (userId, doc, fields, modifier) {
		return SmsParameter.userCanUpdate(userId, doc);
	},

	remove: function (userId, doc) {
		return SmsParameter.userCanRemove(userId, doc);
	}
});

SmsParameter.before.insert(function(userId, doc) {
	doc.createdAt = new Date();
	doc.createdBy = userId;
	doc.modifiedAt = doc.createdAt;
	doc.modifiedBy = doc.createdBy;

	
	if(!doc.ownerId) doc.ownerId = userId;
});

SmsParameter.before.update(function(userId, doc, fieldNames, modifier, options) {
	modifier.$set = modifier.$set || {};
	modifier.$set.modifiedAt = new Date();
	modifier.$set.modifiedBy = userId;

	
});

SmsParameter.before.remove(function(userId, doc) {
	
});

SmsParameter.after.insert(function(userId, doc) {
	
});

SmsParameter.after.update(function(userId, doc, fieldNames, modifier, options) {
	
});

SmsParameter.after.remove(function(userId, doc) {
	
});
