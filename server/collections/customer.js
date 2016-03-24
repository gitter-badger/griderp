Customer.allow({
	insert: function (userId, doc) {
		return Customer.userCanInsert(userId, doc);
	},

	update: function (userId, doc, fields, modifier) {
		return Customer.userCanUpdate(userId, doc);
	},

	remove: function (userId, doc) {
		return Customer.userCanRemove(userId, doc);
	}
});

Customer.before.insert(function(userId, doc) {
	doc.createdAt = new Date();
	doc.createdBy = userId;
	doc.modifiedAt = doc.createdAt;
	doc.modifiedBy = doc.createdBy;

	
	if(!doc.ownerId) doc.ownerId = userId;
});

Customer.before.update(function(userId, doc, fieldNames, modifier, options) {
	modifier.$set = modifier.$set || {};
	modifier.$set.modifiedAt = new Date();
	modifier.$set.modifiedBy = userId;

	
});

Customer.before.remove(function(userId, doc) {
	
});

Customer.after.insert(function(userId, doc) {
	
});

Customer.after.update(function(userId, doc, fieldNames, modifier, options) {
	
});

Customer.after.remove(function(userId, doc) {
	
});
