WarrantyClaim.allow({
	insert: function (userId, doc) {
		return WarrantyClaim.userCanInsert(userId, doc);
	},

	update: function (userId, doc, fields, modifier) {
		return WarrantyClaim.userCanUpdate(userId, doc);
	},

	remove: function (userId, doc) {
		return WarrantyClaim.userCanRemove(userId, doc);
	}
});

WarrantyClaim.before.insert(function(userId, doc) {
	doc.createdAt = new Date();
	doc.createdBy = userId;
	doc.modifiedAt = doc.createdAt;
	doc.modifiedBy = doc.createdBy;

	
	if(!doc.ownerId) doc.ownerId = userId;
});

WarrantyClaim.before.update(function(userId, doc, fieldNames, modifier, options) {
	modifier.$set = modifier.$set || {};
	modifier.$set.modifiedAt = new Date();
	modifier.$set.modifiedBy = userId;

	
});

WarrantyClaim.before.remove(function(userId, doc) {
	
});

WarrantyClaim.after.insert(function(userId, doc) {
	
});

WarrantyClaim.after.update(function(userId, doc, fieldNames, modifier, options) {
	
});

WarrantyClaim.after.remove(function(userId, doc) {
	
});
