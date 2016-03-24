AsyncTask.allow({
	insert: function (userId, doc) {
		return AsyncTask.userCanInsert(userId, doc);
	},

	update: function (userId, doc, fields, modifier) {
		return AsyncTask.userCanUpdate(userId, doc);
	},

	remove: function (userId, doc) {
		return AsyncTask.userCanRemove(userId, doc);
	}
});

AsyncTask.before.insert(function(userId, doc) {
	doc.createdAt = new Date();
	doc.createdBy = userId;
	doc.modifiedAt = doc.createdAt;
	doc.modifiedBy = doc.createdBy;

	
	if(!doc.ownerId) doc.ownerId = userId;
});

AsyncTask.before.update(function(userId, doc, fieldNames, modifier, options) {
	modifier.$set = modifier.$set || {};
	modifier.$set.modifiedAt = new Date();
	modifier.$set.modifiedBy = userId;

	
});

AsyncTask.before.remove(function(userId, doc) {
	
});

AsyncTask.after.insert(function(userId, doc) {
	
});

AsyncTask.after.update(function(userId, doc, fieldNames, modifier, options) {
	
});

AsyncTask.after.remove(function(userId, doc) {
	
});
