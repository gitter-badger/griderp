JobOpening.allow({
	insert: function (userId, doc) {
		return JobOpening.userCanInsert(userId, doc);
	},

	update: function (userId, doc, fields, modifier) {
		return JobOpening.userCanUpdate(userId, doc);
	},

	remove: function (userId, doc) {
		return JobOpening.userCanRemove(userId, doc);
	}
});

JobOpening.before.insert(function(userId, doc) {
	doc.createdAt = new Date();
	doc.createdBy = userId;
	doc.modifiedAt = doc.createdAt;
	doc.modifiedBy = doc.createdBy;

	
	if(!doc.ownerId) doc.ownerId = userId;
});

JobOpening.before.update(function(userId, doc, fieldNames, modifier, options) {
	modifier.$set = modifier.$set || {};
	modifier.$set.modifiedAt = new Date();
	modifier.$set.modifiedBy = userId;

	
});

JobOpening.before.remove(function(userId, doc) {
	
});

JobOpening.after.insert(function(userId, doc) {
	
});

JobOpening.after.update(function(userId, doc, fieldNames, modifier, options) {
	
});

JobOpening.after.remove(function(userId, doc) {
	
});
