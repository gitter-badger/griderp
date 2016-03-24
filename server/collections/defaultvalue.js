Defaultvalue.allow({
	insert: function (userId, doc) {
		return Defaultvalue.userCanInsert(userId, doc);
	},

	update: function (userId, doc, fields, modifier) {
		return Defaultvalue.userCanUpdate(userId, doc);
	},

	remove: function (userId, doc) {
		return Defaultvalue.userCanRemove(userId, doc);
	}
});

Defaultvalue.before.insert(function(userId, doc) {
	doc.createdAt = new Date();
	doc.createdBy = userId;
	doc.modifiedAt = doc.createdAt;
	doc.modifiedBy = doc.createdBy;

	
	if(!doc.ownerId) doc.ownerId = userId;
});

Defaultvalue.before.update(function(userId, doc, fieldNames, modifier, options) {
	modifier.$set = modifier.$set || {};
	modifier.$set.modifiedAt = new Date();
	modifier.$set.modifiedBy = userId;

	
});

Defaultvalue.before.remove(function(userId, doc) {
	
});

Defaultvalue.after.insert(function(userId, doc) {
	
});

Defaultvalue.after.update(function(userId, doc, fieldNames, modifier, options) {
	
});

Defaultvalue.after.remove(function(userId, doc) {
	
});
