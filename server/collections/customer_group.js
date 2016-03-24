CustomerGroup.allow({
	insert: function (userId, doc) {
		return CustomerGroup.userCanInsert(userId, doc);
	},

	update: function (userId, doc, fields, modifier) {
		return CustomerGroup.userCanUpdate(userId, doc);
	},

	remove: function (userId, doc) {
		return CustomerGroup.userCanRemove(userId, doc);
	}
});

CustomerGroup.before.insert(function(userId, doc) {
	doc.createdAt = new Date();
	doc.createdBy = userId;
	doc.modifiedAt = doc.createdAt;
	doc.modifiedBy = doc.createdBy;

	
	if(!doc.ownerId) doc.ownerId = userId;
});

CustomerGroup.before.update(function(userId, doc, fieldNames, modifier, options) {
	modifier.$set = modifier.$set || {};
	modifier.$set.modifiedAt = new Date();
	modifier.$set.modifiedBy = userId;

	
});

CustomerGroup.before.remove(function(userId, doc) {
	
});

CustomerGroup.after.insert(function(userId, doc) {
	
});

CustomerGroup.after.update(function(userId, doc, fieldNames, modifier, options) {
	
});

CustomerGroup.after.remove(function(userId, doc) {
	
});
