ItemQualityInspectionParameter.allow({
	insert: function (userId, doc) {
		return ItemQualityInspectionParameter.userCanInsert(userId, doc);
	},

	update: function (userId, doc, fields, modifier) {
		return ItemQualityInspectionParameter.userCanUpdate(userId, doc);
	},

	remove: function (userId, doc) {
		return ItemQualityInspectionParameter.userCanRemove(userId, doc);
	}
});

ItemQualityInspectionParameter.before.insert(function(userId, doc) {
	doc.createdAt = new Date();
	doc.createdBy = userId;
	doc.modifiedAt = doc.createdAt;
	doc.modifiedBy = doc.createdBy;

	
	if(!doc.ownerId) doc.ownerId = userId;
});

ItemQualityInspectionParameter.before.update(function(userId, doc, fieldNames, modifier, options) {
	modifier.$set = modifier.$set || {};
	modifier.$set.modifiedAt = new Date();
	modifier.$set.modifiedBy = userId;

	
});

ItemQualityInspectionParameter.before.remove(function(userId, doc) {
	
});

ItemQualityInspectionParameter.after.insert(function(userId, doc) {
	
});

ItemQualityInspectionParameter.after.update(function(userId, doc, fieldNames, modifier, options) {
	
});

ItemQualityInspectionParameter.after.remove(function(userId, doc) {
	
});
