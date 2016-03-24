SalesPartner.allow({
	insert: function (userId, doc) {
		return SalesPartner.userCanInsert(userId, doc);
	},

	update: function (userId, doc, fields, modifier) {
		return SalesPartner.userCanUpdate(userId, doc);
	},

	remove: function (userId, doc) {
		return SalesPartner.userCanRemove(userId, doc);
	}
});

SalesPartner.before.insert(function(userId, doc) {
	doc.createdAt = new Date();
	doc.createdBy = userId;
	doc.modifiedAt = doc.createdAt;
	doc.modifiedBy = doc.createdBy;

	
	if(!doc.ownerId) doc.ownerId = userId;
});

SalesPartner.before.update(function(userId, doc, fieldNames, modifier, options) {
	modifier.$set = modifier.$set || {};
	modifier.$set.modifiedAt = new Date();
	modifier.$set.modifiedBy = userId;

	
});

SalesPartner.before.remove(function(userId, doc) {
	
});

SalesPartner.after.insert(function(userId, doc) {
	
});

SalesPartner.after.update(function(userId, doc, fieldNames, modifier, options) {
	
});

SalesPartner.after.remove(function(userId, doc) {
	
});
