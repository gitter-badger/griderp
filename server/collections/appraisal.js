Appraisal.allow({
	insert: function (userId, doc) {
		return Appraisal.userCanInsert(userId, doc);
	},

	update: function (userId, doc, fields, modifier) {
		return Appraisal.userCanUpdate(userId, doc);
	},

	remove: function (userId, doc) {
		return Appraisal.userCanRemove(userId, doc);
	}
});

Appraisal.before.insert(function(userId, doc) {
	doc.createdAt = new Date();
	doc.createdBy = userId;
	doc.modifiedAt = doc.createdAt;
	doc.modifiedBy = doc.createdBy;

	
	if(!doc.ownerId) doc.ownerId = userId;
});

Appraisal.before.update(function(userId, doc, fieldNames, modifier, options) {
	modifier.$set = modifier.$set || {};
	modifier.$set.modifiedAt = new Date();
	modifier.$set.modifiedBy = userId;

	
});

Appraisal.before.remove(function(userId, doc) {
	
});

Appraisal.after.insert(function(userId, doc) {
	
});

Appraisal.after.update(function(userId, doc, fieldNames, modifier, options) {
	
});

Appraisal.after.remove(function(userId, doc) {
	
});
