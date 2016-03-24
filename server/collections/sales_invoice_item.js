SalesInvoiceItem.allow({
	insert: function (userId, doc) {
		return SalesInvoiceItem.userCanInsert(userId, doc);
	},

	update: function (userId, doc, fields, modifier) {
		return SalesInvoiceItem.userCanUpdate(userId, doc);
	},

	remove: function (userId, doc) {
		return SalesInvoiceItem.userCanRemove(userId, doc);
	}
});

SalesInvoiceItem.before.insert(function(userId, doc) {
	doc.createdAt = new Date();
	doc.createdBy = userId;
	doc.modifiedAt = doc.createdAt;
	doc.modifiedBy = doc.createdBy;

	
	if(!doc.ownerId) doc.ownerId = userId;
});

SalesInvoiceItem.before.update(function(userId, doc, fieldNames, modifier, options) {
	modifier.$set = modifier.$set || {};
	modifier.$set.modifiedAt = new Date();
	modifier.$set.modifiedBy = userId;

	
});

SalesInvoiceItem.before.remove(function(userId, doc) {
	
});

SalesInvoiceItem.after.insert(function(userId, doc) {
	
});

SalesInvoiceItem.after.update(function(userId, doc, fieldNames, modifier, options) {
	
});

SalesInvoiceItem.after.remove(function(userId, doc) {
	
});
