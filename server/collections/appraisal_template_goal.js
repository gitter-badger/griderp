AppraisalTemplateGoal.allow({
	insert: function (userId, doc) {
		return AppraisalTemplateGoal.userCanInsert(userId, doc);
	},

	update: function (userId, doc, fields, modifier) {
		return AppraisalTemplateGoal.userCanUpdate(userId, doc);
	},

	remove: function (userId, doc) {
		return AppraisalTemplateGoal.userCanRemove(userId, doc);
	}
});

AppraisalTemplateGoal.before.insert(function(userId, doc) {
	doc.createdAt = new Date();
	doc.createdBy = userId;
	doc.modifiedAt = doc.createdAt;
	doc.modifiedBy = doc.createdBy;

	
	if(!doc.ownerId) doc.ownerId = userId;
});

AppraisalTemplateGoal.before.update(function(userId, doc, fieldNames, modifier, options) {
	modifier.$set = modifier.$set || {};
	modifier.$set.modifiedAt = new Date();
	modifier.$set.modifiedBy = userId;

	
});

AppraisalTemplateGoal.before.remove(function(userId, doc) {
	
});

AppraisalTemplateGoal.after.insert(function(userId, doc) {
	
});

AppraisalTemplateGoal.after.update(function(userId, doc, fieldNames, modifier, options) {
	
});

AppraisalTemplateGoal.after.remove(function(userId, doc) {
	
});
