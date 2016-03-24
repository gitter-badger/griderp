PaymentReconciliationInvoice.allow({
	insert: function (userId, doc) {
		return PaymentReconciliationInvoice.userCanInsert(userId, doc);
	},

	update: function (userId, doc, fields, modifier) {
		return PaymentReconciliationInvoice.userCanUpdate(userId, doc);
	},

	remove: function (userId, doc) {
		return PaymentReconciliationInvoice.userCanRemove(userId, doc);
	}
});

PaymentReconciliationInvoice.before.insert(function(userId, doc) {
	doc.createdAt = new Date();
	doc.createdBy = userId;
	doc.modifiedAt = doc.createdAt;
	doc.modifiedBy = doc.createdBy;

	
	if(!doc.ownerId) doc.ownerId = userId;
});

PaymentReconciliationInvoice.before.update(function(userId, doc, fieldNames, modifier, options) {
	modifier.$set = modifier.$set || {};
	modifier.$set.modifiedAt = new Date();
	modifier.$set.modifiedBy = userId;

	
});

PaymentReconciliationInvoice.before.remove(function(userId, doc) {
	
});

PaymentReconciliationInvoice.after.insert(function(userId, doc) {
	
});

PaymentReconciliationInvoice.after.update(function(userId, doc, fieldNames, modifier, options) {
	
});

PaymentReconciliationInvoice.after.remove(function(userId, doc) {
	
});
