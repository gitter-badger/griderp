QualityInspection.allow({
	insert: function (userId, doc) {
		return QualityInspection.userCanInsert(userId, doc);
	},

	update: function (userId, doc, fields, modifier) {
		return QualityInspection.userCanUpdate(userId, doc);
	},

	remove: function (userId, doc) {
		return QualityInspection.userCanRemove(userId, doc);
	}
});

QualityInspection.before.insert(function(userId, doc) {
	doc.createdAt = new Date();
	doc.createdBy = userId;
	doc.modifiedAt = doc.createdAt;
	doc.modifiedBy = doc.createdBy;

	
	if(!doc.ownerId) doc.ownerId = userId;
});

QualityInspection.before.update(function(userId, doc, fieldNames, modifier, options) {
	modifier.$set = modifier.$set || {};
	modifier.$set.modifiedAt = new Date();
	modifier.$set.modifiedBy = userId;

	
});

QualityInspection.before.remove(function(userId, doc) {
	
});

QualityInspection.after.insert(function(userId, doc) {
	
});

QualityInspection.after.update(function(userId, doc, fieldNames, modifier, options) {
	
});

QualityInspection.after.remove(function(userId, doc) {
	
});
