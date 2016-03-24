SalesInvoice.allow({
	insert: function (userId, doc) {
		return SalesInvoice.userCanInsert(userId, doc);
	},

	update: function (userId, doc, fields, modifier) {
		return SalesInvoice.userCanUpdate(userId, doc);
	},

	remove: function (userId, doc) {
		return SalesInvoice.userCanRemove(userId, doc);
	}
});

SalesInvoice.before.insert(function(userId, doc) {
	doc.createdAt = new Date();
	doc.createdBy = userId;
	doc.modifiedAt = doc.createdAt;
	doc.modifiedBy = doc.createdBy;

	
	if(!doc.ownerId) doc.ownerId = userId;
});

SalesInvoice.before.update(function(userId, doc, fieldNames, modifier, options) {
	modifier.$set = modifier.$set || {};
	modifier.$set.modifiedAt = new Date();
	modifier.$set.modifiedBy = userId;

	
});

SalesInvoice.before.remove(function(userId, doc) {
	
});

SalesInvoice.after.insert(function(userId, doc) {
	
});

SalesInvoice.after.update(function(userId, doc, fieldNames, modifier, options) {
	
});

SalesInvoice.after.remove(function(userId, doc) {
	
});
