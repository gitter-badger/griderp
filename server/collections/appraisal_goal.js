AppraisalGoal.allow({
	insert: function (userId, doc) {
		return AppraisalGoal.userCanInsert(userId, doc);
	},

	update: function (userId, doc, fields, modifier) {
		return AppraisalGoal.userCanUpdate(userId, doc);
	},

	remove: function (userId, doc) {
		return AppraisalGoal.userCanRemove(userId, doc);
	}
});

AppraisalGoal.before.insert(function(userId, doc) {
	doc.createdAt = new Date();
	doc.createdBy = userId;
	doc.modifiedAt = doc.createdAt;
	doc.modifiedBy = doc.createdBy;

	
	if(!doc.ownerId) doc.ownerId = userId;
});

AppraisalGoal.before.update(function(userId, doc, fieldNames, modifier, options) {
	modifier.$set = modifier.$set || {};
	modifier.$set.modifiedAt = new Date();
	modifier.$set.modifiedBy = userId;

	
});

AppraisalGoal.before.remove(function(userId, doc) {
	
});

AppraisalGoal.after.insert(function(userId, doc) {
	
});

AppraisalGoal.after.update(function(userId, doc, fieldNames, modifier, options) {
	
});

AppraisalGoal.after.remove(function(userId, doc) {
	
});
