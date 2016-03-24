Country.allow({
	insert: function (userId, doc) {
		return Country.userCanInsert(userId, doc);
	},

	update: function (userId, doc, fields, modifier) {
		return Country.userCanUpdate(userId, doc);
	},

	remove: function (userId, doc) {
		return Country.userCanRemove(userId, doc);
	}
});

Country.before.insert(function(userId, doc) {
	doc.createdAt = new Date();
	doc.createdBy = userId;
	doc.modifiedAt = doc.createdAt;
	doc.modifiedBy = doc.createdBy;

	
	if(!doc.ownerId) doc.ownerId = userId;
});

Country.before.update(function(userId, doc, fieldNames, modifier, options) {
	modifier.$set = modifier.$set || {};
	modifier.$set.modifiedAt = new Date();
	modifier.$set.modifiedBy = userId;

	
});

Country.before.remove(function(userId, doc) {
	
});

Country.after.insert(function(userId, doc) {
	
});

Country.after.update(function(userId, doc, fieldNames, modifier, options) {
	
});

Country.after.remove(function(userId, doc) {
	
});
