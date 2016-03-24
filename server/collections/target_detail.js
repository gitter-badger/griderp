TargetDetail.allow({
	insert: function (userId, doc) {
		return TargetDetail.userCanInsert(userId, doc);
	},

	update: function (userId, doc, fields, modifier) {
		return TargetDetail.userCanUpdate(userId, doc);
	},

	remove: function (userId, doc) {
		return TargetDetail.userCanRemove(userId, doc);
	}
});

TargetDetail.before.insert(function(userId, doc) {
	doc.createdAt = new Date();
	doc.createdBy = userId;
	doc.modifiedAt = doc.createdAt;
	doc.modifiedBy = doc.createdBy;

	
	if(!doc.ownerId) doc.ownerId = userId;
});

TargetDetail.before.update(function(userId, doc, fieldNames, modifier, options) {
	modifier.$set = modifier.$set || {};
	modifier.$set.modifiedAt = new Date();
	modifier.$set.modifiedBy = userId;

	
});

TargetDetail.before.remove(function(userId, doc) {
	
});

TargetDetail.after.insert(function(userId, doc) {
	
});

TargetDetail.after.update(function(userId, doc, fieldNames, modifier, options) {
	
});

TargetDetail.after.remove(function(userId, doc) {
	
});
