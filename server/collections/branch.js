Branch.allow({
	insert: function (userId, doc) {
		return Branch.userCanInsert(userId, doc);
	},

	update: function (userId, doc, fields, modifier) {
		return Branch.userCanUpdate(userId, doc);
	},

	remove: function (userId, doc) {
		return Branch.userCanRemove(userId, doc);
	}
});

Branch.before.insert(function(userId, doc) {
	doc.createdAt = new Date();
	doc.createdBy = userId;
	doc.modifiedAt = doc.createdAt;
	doc.modifiedBy = doc.createdBy;

	
	if(!doc.ownerId) doc.ownerId = userId;
});

Branch.before.update(function(userId, doc, fieldNames, modifier, options) {
	modifier.$set = modifier.$set || {};
	modifier.$set.modifiedAt = new Date();
	modifier.$set.modifiedBy = userId;

	
});

Branch.before.remove(function(userId, doc) {
	
});

Branch.after.insert(function(userId, doc) {
	
});

Branch.after.update(function(userId, doc, fieldNames, modifier, options) {
	
});

Branch.after.remove(function(userId, doc) {
	
});
