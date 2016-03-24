CForm.allow({
	insert: function (userId, doc) {
		return CForm.userCanInsert(userId, doc);
	},

	update: function (userId, doc, fields, modifier) {
		return CForm.userCanUpdate(userId, doc);
	},

	remove: function (userId, doc) {
		return CForm.userCanRemove(userId, doc);
	}
});

CForm.before.insert(function(userId, doc) {
	doc.createdAt = new Date();
	doc.createdBy = userId;
	doc.modifiedAt = doc.createdAt;
	doc.modifiedBy = doc.createdBy;

	
	if(!doc.ownerId) doc.ownerId = userId;
});

CForm.before.update(function(userId, doc, fieldNames, modifier, options) {
	modifier.$set = modifier.$set || {};
	modifier.$set.modifiedAt = new Date();
	modifier.$set.modifiedBy = userId;

	
});

CForm.before.remove(function(userId, doc) {
	
});

CForm.after.insert(function(userId, doc) {
	
});

CForm.after.update(function(userId, doc, fieldNames, modifier, options) {
	
});

CForm.after.remove(function(userId, doc) {
	
});
