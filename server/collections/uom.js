Uom.allow({
	insert: function (userId, doc) {
		return Uom.userCanInsert(userId, doc);
	},

	update: function (userId, doc, fields, modifier) {
		return Uom.userCanUpdate(userId, doc);
	},

	remove: function (userId, doc) {
		return Uom.userCanRemove(userId, doc);
	}
});

Uom.before.insert(function(userId, doc) {
	doc.createdAt = new Date();
	doc.createdBy = userId;
	doc.modifiedAt = doc.createdAt;
	doc.modifiedBy = doc.createdBy;

	
	if(!doc.ownerId) doc.ownerId = userId;
});

Uom.before.update(function(userId, doc, fieldNames, modifier, options) {
	modifier.$set = modifier.$set || {};
	modifier.$set.modifiedAt = new Date();
	modifier.$set.modifiedBy = userId;

	
});

Uom.before.remove(function(userId, doc) {
	
});

Uom.after.insert(function(userId, doc) {
	
});

Uom.after.update(function(userId, doc, fieldNames, modifier, options) {
	
});

Uom.after.remove(function(userId, doc) {
	
});
