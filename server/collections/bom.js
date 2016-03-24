Bom.allow({
	insert: function (userId, doc) {
		return Bom.userCanInsert(userId, doc);
	},

	update: function (userId, doc, fields, modifier) {
		return Bom.userCanUpdate(userId, doc);
	},

	remove: function (userId, doc) {
		return Bom.userCanRemove(userId, doc);
	}
});

Bom.before.insert(function(userId, doc) {
	doc.createdAt = new Date();
	doc.createdBy = userId;
	doc.modifiedAt = doc.createdAt;
	doc.modifiedBy = doc.createdBy;

	
	if(!doc.ownerId) doc.ownerId = userId;
});

Bom.before.update(function(userId, doc, fieldNames, modifier, options) {
	modifier.$set = modifier.$set || {};
	modifier.$set.modifiedAt = new Date();
	modifier.$set.modifiedBy = userId;

	
});

Bom.before.remove(function(userId, doc) {
	
});

Bom.after.insert(function(userId, doc) {
	
});

Bom.after.update(function(userId, doc, fieldNames, modifier, options) {
	
});

Bom.after.remove(function(userId, doc) {
	
});
