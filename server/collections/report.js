Report.allow({
	insert: function (userId, doc) {
		return Report.userCanInsert(userId, doc);
	},

	update: function (userId, doc, fields, modifier) {
		return Report.userCanUpdate(userId, doc);
	},

	remove: function (userId, doc) {
		return Report.userCanRemove(userId, doc);
	}
});

Report.before.insert(function(userId, doc) {
	doc.createdAt = new Date();
	doc.createdBy = userId;
	doc.modifiedAt = doc.createdAt;
	doc.modifiedBy = doc.createdBy;

	
	if(!doc.ownerId) doc.ownerId = userId;
});

Report.before.update(function(userId, doc, fieldNames, modifier, options) {
	modifier.$set = modifier.$set || {};
	modifier.$set.modifiedAt = new Date();
	modifier.$set.modifiedBy = userId;

	
});

Report.before.remove(function(userId, doc) {
	
});

Report.after.insert(function(userId, doc) {
	
});

Report.after.update(function(userId, doc, fieldNames, modifier, options) {
	
});

Report.after.remove(function(userId, doc) {
	
});
