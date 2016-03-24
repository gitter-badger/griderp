CustomScript.allow({
	insert: function (userId, doc) {
		return CustomScript.userCanInsert(userId, doc);
	},

	update: function (userId, doc, fields, modifier) {
		return CustomScript.userCanUpdate(userId, doc);
	},

	remove: function (userId, doc) {
		return CustomScript.userCanRemove(userId, doc);
	}
});

CustomScript.before.insert(function(userId, doc) {
	doc.createdAt = new Date();
	doc.createdBy = userId;
	doc.modifiedAt = doc.createdAt;
	doc.modifiedBy = doc.createdBy;

	
	if(!doc.ownerId) doc.ownerId = userId;
});

CustomScript.before.update(function(userId, doc, fieldNames, modifier, options) {
	modifier.$set = modifier.$set || {};
	modifier.$set.modifiedAt = new Date();
	modifier.$set.modifiedBy = userId;

	
});

CustomScript.before.remove(function(userId, doc) {
	
});

CustomScript.after.insert(function(userId, doc) {
	
});

CustomScript.after.update(function(userId, doc, fieldNames, modifier, options) {
	
});

CustomScript.after.remove(function(userId, doc) {
	
});
