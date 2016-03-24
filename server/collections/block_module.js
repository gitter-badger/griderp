BlockModule.allow({
	insert: function (userId, doc) {
		return BlockModule.userCanInsert(userId, doc);
	},

	update: function (userId, doc, fields, modifier) {
		return BlockModule.userCanUpdate(userId, doc);
	},

	remove: function (userId, doc) {
		return BlockModule.userCanRemove(userId, doc);
	}
});

BlockModule.before.insert(function(userId, doc) {
	doc.createdAt = new Date();
	doc.createdBy = userId;
	doc.modifiedAt = doc.createdAt;
	doc.modifiedBy = doc.createdBy;

	
	if(!doc.ownerId) doc.ownerId = userId;
});

BlockModule.before.update(function(userId, doc, fieldNames, modifier, options) {
	modifier.$set = modifier.$set || {};
	modifier.$set.modifiedAt = new Date();
	modifier.$set.modifiedBy = userId;

	
});

BlockModule.before.remove(function(userId, doc) {
	
});

BlockModule.after.insert(function(userId, doc) {
	
});

BlockModule.after.update(function(userId, doc, fieldNames, modifier, options) {
	
});

BlockModule.after.remove(function(userId, doc) {
	
});
