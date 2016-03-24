BomItem.allow({
	insert: function (userId, doc) {
		return BomItem.userCanInsert(userId, doc);
	},

	update: function (userId, doc, fields, modifier) {
		return BomItem.userCanUpdate(userId, doc);
	},

	remove: function (userId, doc) {
		return BomItem.userCanRemove(userId, doc);
	}
});

BomItem.before.insert(function(userId, doc) {
	doc.createdAt = new Date();
	doc.createdBy = userId;
	doc.modifiedAt = doc.createdAt;
	doc.modifiedBy = doc.createdBy;

	
	if(!doc.ownerId) doc.ownerId = userId;
});

BomItem.before.update(function(userId, doc, fieldNames, modifier, options) {
	modifier.$set = modifier.$set || {};
	modifier.$set.modifiedAt = new Date();
	modifier.$set.modifiedBy = userId;

	
});

BomItem.before.remove(function(userId, doc) {
	
});

BomItem.after.insert(function(userId, doc) {
	
});

BomItem.after.update(function(userId, doc, fieldNames, modifier, options) {
	
});

BomItem.after.remove(function(userId, doc) {
	
});
