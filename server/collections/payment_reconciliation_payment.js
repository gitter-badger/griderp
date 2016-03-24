PaymentReconciliationPayment.allow({
	insert: function (userId, doc) {
		return PaymentReconciliationPayment.userCanInsert(userId, doc);
	},

	update: function (userId, doc, fields, modifier) {
		return PaymentReconciliationPayment.userCanUpdate(userId, doc);
	},

	remove: function (userId, doc) {
		return PaymentReconciliationPayment.userCanRemove(userId, doc);
	}
});

PaymentReconciliationPayment.before.insert(function(userId, doc) {
	doc.createdAt = new Date();
	doc.createdBy = userId;
	doc.modifiedAt = doc.createdAt;
	doc.modifiedBy = doc.createdBy;

	
	if(!doc.ownerId) doc.ownerId = userId;
});

PaymentReconciliationPayment.before.update(function(userId, doc, fieldNames, modifier, options) {
	modifier.$set = modifier.$set || {};
	modifier.$set.modifiedAt = new Date();
	modifier.$set.modifiedBy = userId;

	
});

PaymentReconciliationPayment.before.remove(function(userId, doc) {
	
});

PaymentReconciliationPayment.after.insert(function(userId, doc) {
	
});

PaymentReconciliationPayment.after.update(function(userId, doc, fieldNames, modifier, options) {
	
});

PaymentReconciliationPayment.after.remove(function(userId, doc) {
	
});
