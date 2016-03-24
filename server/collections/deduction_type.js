DeductionType.allow({
	insert: function (userId, doc) {
		return DeductionType.userCanInsert(userId, doc);
	},

	update: function (userId, doc, fields, modifier) {
		return DeductionType.userCanUpdate(userId, doc);
	},

	remove: function (userId, doc) {
		return DeductionType.userCanRemove(userId, doc);
	}
});

DeductionType.before.insert(function(userId, doc) {
	doc.createdAt = new Date();
	doc.createdBy = userId;
	doc.modifiedAt = doc.createdAt;
	doc.modifiedBy = doc.createdBy;

	
	if(!doc.ownerId) doc.ownerId = userId;
});

DeductionType.before.update(function(userId, doc, fieldNames, modifier, options) {
	modifier.$set = modifier.$set || {};
	modifier.$set.modifiedAt = new Date();
	modifier.$set.modifiedBy = userId;

	
});

DeductionType.before.remove(function(userId, doc) {
	
});

DeductionType.after.insert(function(userId, doc) {
	
});

DeductionType.after.update(function(userId, doc, fieldNames, modifier, options) {
	
});

DeductionType.after.remove(function(userId, doc) {
	
});
