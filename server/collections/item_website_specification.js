ItemWebsiteSpecification.allow({
	insert: function (userId, doc) {
		return ItemWebsiteSpecification.userCanInsert(userId, doc);
	},

	update: function (userId, doc, fields, modifier) {
		return ItemWebsiteSpecification.userCanUpdate(userId, doc);
	},

	remove: function (userId, doc) {
		return ItemWebsiteSpecification.userCanRemove(userId, doc);
	}
});

ItemWebsiteSpecification.before.insert(function(userId, doc) {
	doc.createdAt = new Date();
	doc.createdBy = userId;
	doc.modifiedAt = doc.createdAt;
	doc.modifiedBy = doc.createdBy;

	
	if(!doc.ownerId) doc.ownerId = userId;
});

ItemWebsiteSpecification.before.update(function(userId, doc, fieldNames, modifier, options) {
	modifier.$set = modifier.$set || {};
	modifier.$set.modifiedAt = new Date();
	modifier.$set.modifiedBy = userId;

	
});

ItemWebsiteSpecification.before.remove(function(userId, doc) {
	
});

ItemWebsiteSpecification.after.insert(function(userId, doc) {
	
});

ItemWebsiteSpecification.after.update(function(userId, doc, fieldNames, modifier, options) {
	
});

ItemWebsiteSpecification.after.remove(function(userId, doc) {
	
});
