BomOperation.allow({
	insert: function (userId, doc) {
		return BomOperation.userCanInsert(userId, doc);
	},

	update: function (userId, doc, fields, modifier) {
		return BomOperation.userCanUpdate(userId, doc);
	},

	remove: function (userId, doc) {
		return BomOperation.userCanRemove(userId, doc);
	}
});

BomOperation.before.insert(function(userId, doc) {
	doc.createdAt = new Date();
	doc.createdBy = userId;
	doc.modifiedAt = doc.createdAt;
	doc.modifiedBy = doc.createdBy;

	
	if(!doc.ownerId) doc.ownerId = userId;
});

BomOperation.before.update(function(userId, doc, fieldNames, modifier, options) {
	modifier.$set = modifier.$set || {};
	modifier.$set.modifiedAt = new Date();
	modifier.$set.modifiedBy = userId;

	
});

BomOperation.before.remove(function(userId, doc) {
	
});

BomOperation.after.insert(function(userId, doc) {
	
});

BomOperation.after.update(function(userId, doc, fieldNames, modifier, options) {
	
});

BomOperation.after.remove(function(userId, doc) {
	
});
