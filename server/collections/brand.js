Brand.allow({
	insert: function (userId, doc) {
		return Brand.userCanInsert(userId, doc);
	},

	update: function (userId, doc, fields, modifier) {
		return Brand.userCanUpdate(userId, doc);
	},

	remove: function (userId, doc) {
		return Brand.userCanRemove(userId, doc);
	}
});

Brand.before.insert(function(userId, doc) {
	doc.createdAt = new Date();
	doc.createdBy = userId;
	doc.modifiedAt = doc.createdAt;
	doc.modifiedBy = doc.createdBy;

	
	if(!doc.ownerId) doc.ownerId = userId;
});

Brand.before.update(function(userId, doc, fieldNames, modifier, options) {
	modifier.$set = modifier.$set || {};
	modifier.$set.modifiedAt = new Date();
	modifier.$set.modifiedBy = userId;

	
});

Brand.before.remove(function(userId, doc) {
	
});

Brand.after.insert(function(userId, doc) {
	
});

Brand.after.update(function(userId, doc, fieldNames, modifier, options) {
	
});

Brand.after.remove(function(userId, doc) {
	
});
