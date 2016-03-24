AddressTemplate.allow({
	insert: function (userId, doc) {
		return AddressTemplate.userCanInsert(userId, doc);
	},

	update: function (userId, doc, fields, modifier) {
		return AddressTemplate.userCanUpdate(userId, doc);
	},

	remove: function (userId, doc) {
		return AddressTemplate.userCanRemove(userId, doc);
	}
});

AddressTemplate.before.insert(function(userId, doc) {
	doc.createdAt = new Date();
	doc.createdBy = userId;
	doc.modifiedAt = doc.createdAt;
	doc.modifiedBy = doc.createdBy;

	
	if(!doc.ownerId) doc.ownerId = userId;
});

AddressTemplate.before.update(function(userId, doc, fieldNames, modifier, options) {
	modifier.$set = modifier.$set || {};
	modifier.$set.modifiedAt = new Date();
	modifier.$set.modifiedBy = userId;

	
});

AddressTemplate.before.remove(function(userId, doc) {
	
});

AddressTemplate.after.insert(function(userId, doc) {
	
});

AddressTemplate.after.update(function(userId, doc, fieldNames, modifier, options) {
	
});

AddressTemplate.after.remove(function(userId, doc) {
	
});
