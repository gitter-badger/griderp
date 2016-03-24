QualityInspectionReading.allow({
	insert: function (userId, doc) {
		return QualityInspectionReading.userCanInsert(userId, doc);
	},

	update: function (userId, doc, fields, modifier) {
		return QualityInspectionReading.userCanUpdate(userId, doc);
	},

	remove: function (userId, doc) {
		return QualityInspectionReading.userCanRemove(userId, doc);
	}
});

QualityInspectionReading.before.insert(function(userId, doc) {
	doc.createdAt = new Date();
	doc.createdBy = userId;
	doc.modifiedAt = doc.createdAt;
	doc.modifiedBy = doc.createdBy;

	
	if(!doc.ownerId) doc.ownerId = userId;
});

QualityInspectionReading.before.update(function(userId, doc, fieldNames, modifier, options) {
	modifier.$set = modifier.$set || {};
	modifier.$set.modifiedAt = new Date();
	modifier.$set.modifiedBy = userId;

	
});

QualityInspectionReading.before.remove(function(userId, doc) {
	
});

QualityInspectionReading.after.insert(function(userId, doc) {
	
});

QualityInspectionReading.after.update(function(userId, doc, fieldNames, modifier, options) {
	
});

QualityInspectionReading.after.remove(function(userId, doc) {
	
});
