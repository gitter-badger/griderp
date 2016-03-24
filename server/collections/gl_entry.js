GlEntry.allow({
	insert: function (userId, doc) {
		return GlEntry.userCanInsert(userId, doc);
	},

	update: function (userId, doc, fields, modifier) {
		return GlEntry.userCanUpdate(userId, doc);
	},

	remove: function (userId, doc) {
		return GlEntry.userCanRemove(userId, doc);
	}
});

GlEntry.before.insert(function(userId, doc) {
	doc.createdAt = new Date();
	doc.createdBy = userId;
	doc.modifiedAt = doc.createdAt;
	doc.modifiedBy = doc.createdBy;

	
	if(!doc.ownerId) doc.ownerId = userId;
});

GlEntry.before.update(function(userId, doc, fieldNames, modifier, options) {
	modifier.$set = modifier.$set || {};
	modifier.$set.modifiedAt = new Date();
	modifier.$set.modifiedBy = userId;

	
});

GlEntry.before.remove(function(userId, doc) {
	
});

GlEntry.after.insert(function(userId, doc) {
	
});

GlEntry.after.update(function(userId, doc, fieldNames, modifier, options) {
	
});

GlEntry.after.remove(function(userId, doc) {
	
});
