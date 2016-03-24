UomConversionDetail.allow({
	insert: function (userId, doc) {
		return UomConversionDetail.userCanInsert(userId, doc);
	},

	update: function (userId, doc, fields, modifier) {
		return UomConversionDetail.userCanUpdate(userId, doc);
	},

	remove: function (userId, doc) {
		return UomConversionDetail.userCanRemove(userId, doc);
	}
});

UomConversionDetail.before.insert(function(userId, doc) {
	doc.createdAt = new Date();
	doc.createdBy = userId;
	doc.modifiedAt = doc.createdAt;
	doc.modifiedBy = doc.createdBy;

	
	if(!doc.ownerId) doc.ownerId = userId;
});

UomConversionDetail.before.update(function(userId, doc, fieldNames, modifier, options) {
	modifier.$set = modifier.$set || {};
	modifier.$set.modifiedAt = new Date();
	modifier.$set.modifiedBy = userId;

	
});

UomConversionDetail.before.remove(function(userId, doc) {
	
});

UomConversionDetail.after.insert(function(userId, doc) {
	
});

UomConversionDetail.after.update(function(userId, doc, fieldNames, modifier, options) {
	
});

UomConversionDetail.after.remove(function(userId, doc) {
	
});
