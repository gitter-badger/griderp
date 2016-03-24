BomExplosionItem.allow({
	insert: function (userId, doc) {
		return BomExplosionItem.userCanInsert(userId, doc);
	},

	update: function (userId, doc, fields, modifier) {
		return BomExplosionItem.userCanUpdate(userId, doc);
	},

	remove: function (userId, doc) {
		return BomExplosionItem.userCanRemove(userId, doc);
	}
});

BomExplosionItem.before.insert(function(userId, doc) {
	doc.createdAt = new Date();
	doc.createdBy = userId;
	doc.modifiedAt = doc.createdAt;
	doc.modifiedBy = doc.createdBy;

	
	if(!doc.ownerId) doc.ownerId = userId;
});

BomExplosionItem.before.update(function(userId, doc, fieldNames, modifier, options) {
	modifier.$set = modifier.$set || {};
	modifier.$set.modifiedAt = new Date();
	modifier.$set.modifiedBy = userId;

	
});

BomExplosionItem.before.remove(function(userId, doc) {
	
});

BomExplosionItem.after.insert(function(userId, doc) {
	
});

BomExplosionItem.after.update(function(userId, doc, fieldNames, modifier, options) {
	
});

BomExplosionItem.after.remove(function(userId, doc) {
	
});
