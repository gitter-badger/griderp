MaterialRequest.allow({
	insert: function (userId, doc) {
		return MaterialRequest.userCanInsert(userId, doc);
	},

	update: function (userId, doc, fields, modifier) {
		return MaterialRequest.userCanUpdate(userId, doc);
	},

	remove: function (userId, doc) {
		return MaterialRequest.userCanRemove(userId, doc);
	}
});

MaterialRequest.before.insert(function(userId, doc) {
	doc.createdAt = new Date();
	doc.createdBy = userId;
	doc.modifiedAt = doc.createdAt;
	doc.modifiedBy = doc.createdBy;

	
	if(!doc.ownerId) doc.ownerId = userId;
});

MaterialRequest.before.update(function(userId, doc, fieldNames, modifier, options) {
	modifier.$set = modifier.$set || {};
	modifier.$set.modifiedAt = new Date();
	modifier.$set.modifiedBy = userId;

	
});

MaterialRequest.before.remove(function(userId, doc) {
	
});

MaterialRequest.after.insert(function(userId, doc) {
	
});

MaterialRequest.after.update(function(userId, doc, fieldNames, modifier, options) {
	
});

MaterialRequest.after.remove(function(userId, doc) {
	
});
