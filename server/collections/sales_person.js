SalesPerson.allow({
	insert: function (userId, doc) {
		return SalesPerson.userCanInsert(userId, doc);
	},

	update: function (userId, doc, fields, modifier) {
		return SalesPerson.userCanUpdate(userId, doc);
	},

	remove: function (userId, doc) {
		return SalesPerson.userCanRemove(userId, doc);
	}
});

SalesPerson.before.insert(function(userId, doc) {
	doc.createdAt = new Date();
	doc.createdBy = userId;
	doc.modifiedAt = doc.createdAt;
	doc.modifiedBy = doc.createdBy;

	
	if(!doc.ownerId) doc.ownerId = userId;
});

SalesPerson.before.update(function(userId, doc, fieldNames, modifier, options) {
	modifier.$set = modifier.$set || {};
	modifier.$set.modifiedAt = new Date();
	modifier.$set.modifiedBy = userId;

	
});

SalesPerson.before.remove(function(userId, doc) {
	
});

SalesPerson.after.insert(function(userId, doc) {
	
});

SalesPerson.after.update(function(userId, doc, fieldNames, modifier, options) {
	
});

SalesPerson.after.remove(function(userId, doc) {
	
});
