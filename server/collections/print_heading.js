PrintHeading.allow({
	insert: function (userId, doc) {
		return PrintHeading.userCanInsert(userId, doc);
	},

	update: function (userId, doc, fields, modifier) {
		return PrintHeading.userCanUpdate(userId, doc);
	},

	remove: function (userId, doc) {
		return PrintHeading.userCanRemove(userId, doc);
	}
});

PrintHeading.before.insert(function(userId, doc) {
	doc.createdAt = new Date();
	doc.createdBy = userId;
	doc.modifiedAt = doc.createdAt;
	doc.modifiedBy = doc.createdBy;

	
	if(!doc.ownerId) doc.ownerId = userId;
});

PrintHeading.before.update(function(userId, doc, fieldNames, modifier, options) {
	modifier.$set = modifier.$set || {};
	modifier.$set.modifiedAt = new Date();
	modifier.$set.modifiedBy = userId;

	
});

PrintHeading.before.remove(function(userId, doc) {
	
});

PrintHeading.after.insert(function(userId, doc) {
	
});

PrintHeading.after.update(function(userId, doc, fieldNames, modifier, options) {
	
});

PrintHeading.after.remove(function(userId, doc) {
	
});
