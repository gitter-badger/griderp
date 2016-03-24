ItemTax.allow({
	insert: function (userId, doc) {
		return ItemTax.userCanInsert(userId, doc);
	},

	update: function (userId, doc, fields, modifier) {
		return ItemTax.userCanUpdate(userId, doc);
	},

	remove: function (userId, doc) {
		return ItemTax.userCanRemove(userId, doc);
	}
});

ItemTax.before.insert(function(userId, doc) {
	doc.createdAt = new Date();
	doc.createdBy = userId;
	doc.modifiedAt = doc.createdAt;
	doc.modifiedBy = doc.createdBy;

	
	if(!doc.ownerId) doc.ownerId = userId;
});

ItemTax.before.update(function(userId, doc, fieldNames, modifier, options) {
	modifier.$set = modifier.$set || {};
	modifier.$set.modifiedAt = new Date();
	modifier.$set.modifiedBy = userId;

	
});

ItemTax.before.remove(function(userId, doc) {
	
});

ItemTax.after.insert(function(userId, doc) {
	
});

ItemTax.after.update(function(userId, doc, fieldNames, modifier, options) {
	
});

ItemTax.after.remove(function(userId, doc) {
	
});
