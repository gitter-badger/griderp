JobApplicant.allow({
	insert: function (userId, doc) {
		return JobApplicant.userCanInsert(userId, doc);
	},

	update: function (userId, doc, fields, modifier) {
		return JobApplicant.userCanUpdate(userId, doc);
	},

	remove: function (userId, doc) {
		return JobApplicant.userCanRemove(userId, doc);
	}
});

JobApplicant.before.insert(function(userId, doc) {
	doc.createdAt = new Date();
	doc.createdBy = userId;
	doc.modifiedAt = doc.createdAt;
	doc.modifiedBy = doc.createdBy;

	
	if(!doc.ownerId) doc.ownerId = userId;
});

JobApplicant.before.update(function(userId, doc, fieldNames, modifier, options) {
	modifier.$set = modifier.$set || {};
	modifier.$set.modifiedAt = new Date();
	modifier.$set.modifiedBy = userId;

	
});

JobApplicant.before.remove(function(userId, doc) {
	
});

JobApplicant.after.insert(function(userId, doc) {
	
});

JobApplicant.after.update(function(userId, doc, fieldNames, modifier, options) {
	
});

JobApplicant.after.remove(function(userId, doc) {
	
});
