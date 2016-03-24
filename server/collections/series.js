Series.allow({
	insert: function (userId, doc) {
		return Series.userCanInsert(userId, doc);
	},

	update: function (userId, doc, fields, modifier) {
		return Series.userCanUpdate(userId, doc);
	},

	remove: function (userId, doc) {
		return Series.userCanRemove(userId, doc);
	}
});

Series.before.insert(function(userId, doc) {
	doc.createdAt = new Date();
	doc.createdBy = userId;
	doc.modifiedAt = doc.createdAt;
	doc.modifiedBy = doc.createdBy;

	
	if(!doc.ownerId) doc.ownerId = userId;
});

Series.before.update(function(userId, doc, fieldNames, modifier, options) {
	modifier.$set = modifier.$set || {};
	modifier.$set.modifiedAt = new Date();
	modifier.$set.modifiedBy = userId;

	
});

Series.before.remove(function(userId, doc) {
	
});

Series.after.insert(function(userId, doc) {
	
});

Series.after.update(function(userId, doc, fieldNames, modifier, options) {
	
});

Series.after.remove(function(userId, doc) {
	
});
