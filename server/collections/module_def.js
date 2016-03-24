ModuleDef.allow({
	insert: function (userId, doc) {
		return ModuleDef.userCanInsert(userId, doc);
	},

	update: function (userId, doc, fields, modifier) {
		return ModuleDef.userCanUpdate(userId, doc);
	},

	remove: function (userId, doc) {
		return ModuleDef.userCanRemove(userId, doc);
	}
});

ModuleDef.before.insert(function(userId, doc) {
	doc.createdAt = new Date();
	doc.createdBy = userId;
	doc.modifiedAt = doc.createdAt;
	doc.modifiedBy = doc.createdBy;

	
	if(!doc.ownerId) doc.ownerId = userId;
});

ModuleDef.before.update(function(userId, doc, fieldNames, modifier, options) {
	modifier.$set = modifier.$set || {};
	modifier.$set.modifiedAt = new Date();
	modifier.$set.modifiedBy = userId;

	
});

ModuleDef.before.remove(function(userId, doc) {
	
});

ModuleDef.after.insert(function(userId, doc) {
	
});

ModuleDef.after.update(function(userId, doc, fieldNames, modifier, options) {
	
});

ModuleDef.after.remove(function(userId, doc) {
	
});
