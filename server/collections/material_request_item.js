MaterialRequestItem.allow({
	insert: function (userId, doc) {
		return MaterialRequestItem.userCanInsert(userId, doc);
	},

	update: function (userId, doc, fields, modifier) {
		return MaterialRequestItem.userCanUpdate(userId, doc);
	},

	remove: function (userId, doc) {
		return MaterialRequestItem.userCanRemove(userId, doc);
	}
});

MaterialRequestItem.before.insert(function(userId, doc) {
	doc.createdAt = new Date();
	doc.createdBy = userId;
	doc.modifiedAt = doc.createdAt;
	doc.modifiedBy = doc.createdBy;

	
	if(!doc.ownerId) doc.ownerId = userId;
});

MaterialRequestItem.before.update(function(userId, doc, fieldNames, modifier, options) {
	modifier.$set = modifier.$set || {};
	modifier.$set.modifiedAt = new Date();
	modifier.$set.modifiedBy = userId;

	
});

MaterialRequestItem.before.remove(function(userId, doc) {
	
});

MaterialRequestItem.after.insert(function(userId, doc) {
	
});

MaterialRequestItem.after.update(function(userId, doc, fieldNames, modifier, options) {
	
});

MaterialRequestItem.after.remove(function(userId, doc) {
	
});
