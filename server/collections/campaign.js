Campaign.allow({
	insert: function (userId, doc) {
		return Campaign.userCanInsert(userId, doc);
	},

	update: function (userId, doc, fields, modifier) {
		return Campaign.userCanUpdate(userId, doc);
	},

	remove: function (userId, doc) {
		return Campaign.userCanRemove(userId, doc);
	}
});

Campaign.before.insert(function(userId, doc) {
	doc.createdAt = new Date();
	doc.createdBy = userId;
	doc.modifiedAt = doc.createdAt;
	doc.modifiedBy = doc.createdBy;

	
	if(!doc.ownerId) doc.ownerId = userId;
});

Campaign.before.update(function(userId, doc, fieldNames, modifier, options) {
	modifier.$set = modifier.$set || {};
	modifier.$set.modifiedAt = new Date();
	modifier.$set.modifiedBy = userId;

	
});

Campaign.before.remove(function(userId, doc) {
	
});

Campaign.after.insert(function(userId, doc) {
	
});

Campaign.after.update(function(userId, doc, fieldNames, modifier, options) {
	
});

Campaign.after.remove(function(userId, doc) {
	
});
