AppraisalTemplate.allow({
	insert: function (userId, doc) {
		return AppraisalTemplate.userCanInsert(userId, doc);
	},

	update: function (userId, doc, fields, modifier) {
		return AppraisalTemplate.userCanUpdate(userId, doc);
	},

	remove: function (userId, doc) {
		return AppraisalTemplate.userCanRemove(userId, doc);
	}
});

AppraisalTemplate.before.insert(function(userId, doc) {
	doc.createdAt = new Date();
	doc.createdBy = userId;
	doc.modifiedAt = doc.createdAt;
	doc.modifiedBy = doc.createdBy;

	
	if(!doc.ownerId) doc.ownerId = userId;
});

AppraisalTemplate.before.update(function(userId, doc, fieldNames, modifier, options) {
	modifier.$set = modifier.$set || {};
	modifier.$set.modifiedAt = new Date();
	modifier.$set.modifiedBy = userId;

	
});

AppraisalTemplate.before.remove(function(userId, doc) {
	
});

AppraisalTemplate.after.insert(function(userId, doc) {
	
});

AppraisalTemplate.after.update(function(userId, doc, fieldNames, modifier, options) {
	
});

AppraisalTemplate.after.remove(function(userId, doc) {
	
});
