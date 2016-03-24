PrintFormat.allow({
	insert: function (userId, doc) {
		return PrintFormat.userCanInsert(userId, doc);
	},

	update: function (userId, doc, fields, modifier) {
		return PrintFormat.userCanUpdate(userId, doc);
	},

	remove: function (userId, doc) {
		return PrintFormat.userCanRemove(userId, doc);
	}
});

PrintFormat.before.insert(function(userId, doc) {
	doc.createdAt = new Date();
	doc.createdBy = userId;
	doc.modifiedAt = doc.createdAt;
	doc.modifiedBy = doc.createdBy;

	
	if(!doc.ownerId) doc.ownerId = userId;
});

PrintFormat.before.update(function(userId, doc, fieldNames, modifier, options) {
	modifier.$set = modifier.$set || {};
	modifier.$set.modifiedAt = new Date();
	modifier.$set.modifiedBy = userId;

	
});

PrintFormat.before.remove(function(userId, doc) {
	
});

PrintFormat.after.insert(function(userId, doc) {
	
});

PrintFormat.after.update(function(userId, doc, fieldNames, modifier, options) {
	
});

PrintFormat.after.remove(function(userId, doc) {
	
});
